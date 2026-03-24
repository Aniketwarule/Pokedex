"use client";

import {
  Alert,
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { PokemonRow } from "~/app/_components/pokemon-row";
import { api } from "~/trpc/react";

export default function Part1Page() {
  const [nameInput, setNameInput] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const pokemonQuery = api.pokemon.getPokemon.useQuery(submittedName, {
    enabled: submittedName.length > 0,
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h4">Part 1: Fetch Single Pokemon</Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Pokemon Name"
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              fullWidth
              placeholder="Bulbasaur"
            />
            <Button
              variant="contained"
              onClick={() => setSubmittedName(nameInput.trim())}
              disabled={!nameInput.trim()}
            >
              Search
            </Button>
          </Stack>
        </Paper>

        {pokemonQuery.isError ? (
          <Alert severity="error">Unable to fetch Pokemon.</Alert>
        ) : null}

        {pokemonQuery.data ? (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Types</TableCell>
                  <TableCell>Sprite</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <PokemonRow bulbasaur={pokemonQuery.data} />
              </TableBody>
            </Table>
          </TableContainer>
        ) : submittedName && !pokemonQuery.isLoading ? (
          <Alert severity="info">
            No Pokemon found for &quot;{submittedName}&quot;.
          </Alert>
        ) : null}
      </Stack>
    </Container>
  );
}
