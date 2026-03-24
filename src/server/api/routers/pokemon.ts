import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const pokemonSelect = {
  id: true,
  name: true,
  types: true,
  spriteUrl: true,
} as const;

const mapPokemon = (pokemon: {
  id: number;
  name: string;
  types: string[];
  spriteUrl: string;
}) => ({
  id: pokemon.id,
  name: pokemon.name,
  types: pokemon.types,
  sprite: pokemon.spriteUrl,
});

export const pokemonRouter = createTRPCRouter({
  getPokemon: publicProcedure
    .input(z.string().trim().min(1))
    .query(async ({ ctx, input }) => {
      const pokemon = await ctx.db.pokemon.findFirst({
        where: {
          name: {
            equals: input,
            mode: "insensitive",
          },
        },
        select: pokemonSelect,
      });

      if (!pokemon) return null;

      return mapPokemon(pokemon);
    }),

  getPokemonArray: publicProcedure
    .input(z.array(z.string().trim().min(1)).min(1).max(50))
    .query(async ({ ctx, input }) => {
      const names = [...new Set(input)];

      const pokemon = await ctx.db.pokemon.findMany({
        where: {
          OR: names.map((name) => ({
            name: {
              equals: name,
              mode: "insensitive",
            },
          })),
        },
        orderBy: { id: "asc" },
        select: pokemonSelect,
      });

      return pokemon.map(mapPokemon);
    }),

  getPokemonTypes: publicProcedure.query(async ({ ctx }) => {
    const pokemonWithTypes = await ctx.db.pokemon.findMany({
      select: { types: true },
    });

    return [...new Set(pokemonWithTypes.flatMap((pokemon) => pokemon.types))].sort(
      (a, b) => a.localeCompare(b)
    );
  }),

  getFilteredPokemon: publicProcedure
    .input(
      z.object({
        type: z.string().trim().min(1).optional(),
        cursor: z.number().int().positive().optional(),
        limit: z.number().int().min(1).max(50).default(8),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;

      const pokemon = await ctx.db.pokemon.findMany({
        where: input.type
          ? {
              types: {
                has: input.type.toLowerCase(),
              },
            }
          : undefined,
        orderBy: { id: "asc" },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
        select: pokemonSelect,
      });

      let nextCursor: number | undefined;
      if (pokemon.length > limit) {
        const next = pokemon.pop();
        nextCursor = next?.id;
      }

      return {
        items: pokemon.map(mapPokemon),
        nextCursor,
      };
    }),
});
