import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const pokemonSeedData = [
  {
    name: "Bulbasaur",
    types: ["grass", "poison"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  {
    name: "Ivysaur",
    types: ["grass", "poison"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
  },
  {
    name: "Venusaur",
    types: ["grass", "poison"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
  },
  {
    name: "Charmander",
    types: ["fire"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  },
  {
    name: "Charmeleon",
    types: ["fire"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
  },
  {
    name: "Charizard",
    types: ["fire", "flying"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
  },
  {
    name: "Squirtle",
    types: ["water"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  },
  {
    name: "Wartortle",
    types: ["water"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
  },
  {
    name: "Blastoise",
    types: ["water"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
  },
  {
    name: "Pikachu",
    types: ["electric"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  },
  {
    name: "Sandshrew",
    types: ["ground"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/27.png",
  },
  {
    name: "Nidoran-f",
    types: ["poison"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png",
  },
  {
    name: "Vulpix",
    types: ["fire"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png",
  },
  {
    name: "Oddish",
    types: ["grass", "poison"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/43.png",
  },
  {
    name: "Psyduck",
    types: ["water"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png",
  },
  {
    name: "Growlithe",
    types: ["fire"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png",
  },
  {
    name: "Poliwag",
    types: ["water"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png",
  },
  {
    name: "Machop",
    types: ["fighting"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png",
  },
  {
    name: "Geodude",
    types: ["rock", "ground"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png",
  },
  {
    name: "Gastly",
    types: ["ghost", "poison"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png",
  },
];

async function main() {
  await Promise.all(
    pokemonSeedData.map((pokemon) =>
      prisma.pokemon.upsert({
        where: { name: pokemon.name },
        update: {
          types: pokemon.types,
          spriteUrl: pokemon.spriteUrl,
        },
        create: pokemon,
      })
    )
  );

  console.log(`Seeded ${pokemonSeedData.length} pokemon.`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
