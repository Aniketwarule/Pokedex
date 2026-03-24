"use client";

import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";

import { PokedexTable } from "~/app/_components/pokedex-table";
import { PokemonTypeSelection } from "~/app/_components/pokemon-type-selection";
import { api } from "~/trpc/react";

export function FilterablePokedexTable() {
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);

  const filteredPokemonQuery = api.pokemon.getFilteredPokemon.useInfiniteQuery(
    {
      type: selectedType,
      limit: 8,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const pokemonRows = useMemo(
    () =>
      filteredPokemonQuery.data?.pages.flatMap((page) => page.items) ?? [],
    [filteredPokemonQuery.data]
  );

  return (
    <Stack spacing={2}>
      <PokemonTypeSelection
        selectedType={selectedType}
        selectType={setSelectedType}
      />

      {filteredPokemonQuery.isLoading ? (
        <Stack direction="row" spacing={1} alignItems="center">
          <CircularProgress size={18} />
          <Typography>Loading Pokemon...</Typography>
        </Stack>
      ) : null}

      <PokedexTable
        pokemonArray={pokemonRows}
        title={selectedType ? `Type: ${selectedType}` : "All Pokemon"}
      />

      <Button
        variant="contained"
        onClick={() => void filteredPokemonQuery.fetchNextPage()}
        disabled={
          !filteredPokemonQuery.hasNextPage || filteredPokemonQuery.isFetchingNextPage
        }
      >
        {filteredPokemonQuery.isFetchingNextPage ? "Loading..." : "Load More"}
      </Button>
    </Stack>
  );
}
