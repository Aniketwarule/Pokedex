"use client";

import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";

import { api } from "~/trpc/react";

export type PokemonTypeSelectionProps = {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
};

export function PokemonTypeSelection({
  selectedType,
  selectType,
}: PokemonTypeSelectionProps) {
  const { data: pokemonTypes } = api.pokemon.getPokemonTypes.useQuery();

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    selectType(value === "all" ? undefined : value);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="pokemon-type-label">Pokemon Type</InputLabel>
      <Select
        labelId="pokemon-type-label"
        value={selectedType ?? "all"}
        label="Pokemon Type"
        onChange={handleTypeChange}
      >
        <MenuItem value="all">All</MenuItem>
        {(pokemonTypes ?? []).map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
