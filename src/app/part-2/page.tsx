"use client";

import {
  Alert,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

import { PokedexTable } from "~/app/_components/pokedex-table";
import { api } from "~/trpc/react";

export default function Part2Page() {
  const [namesInput, setNamesInput] = useState("Bulbasaur, Charmander, Squirtle");
  const [submittedNames, setSubmittedNames] = useState<string[]>([]);

  const pokemonArrayQuery = api.pokemon.getPokemonArray.useQuery(submittedNames, {
    enabled: submittedNames.length > 0,
  });

  const parsedNames = useMemo(
    () => namesInput.split(",").map((name) => name.trim()).filter(Boolean),
    [namesInput]
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h4">Part 2: Fetch Pokemon Array</Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Pokemon Names (comma separated)"
              value={namesInput}
              onChange={(event) => setNamesInput(event.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={() => setSubmittedNames(parsedNames)}
              disabled={!parsedNames.length}
            >
              Search
            </Button>
          </Stack>
        </Paper>

        {pokemonArrayQuery.isError ? (
          <Alert severity="error">Unable to fetch Pokemon array.</Alert>
        ) : null}

        <PokedexTable pokemonArray={pokemonArrayQuery.data ?? []} />
      </Stack>
    </Container>
  );
}
