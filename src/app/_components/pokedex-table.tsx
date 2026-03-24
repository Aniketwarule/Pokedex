import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { PokemonRow, type PokemonRowData } from "~/app/_components/pokemon-row";

type PokedexTableProps = {
  pokemonArray: PokemonRowData[];
  title?: string;
};

export function PokedexTable({ pokemonArray, title }: PokedexTableProps) {
  if (!pokemonArray.length) {
    return (
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography>No Pokemon found.</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      {title ? (
        <Typography variant="h6" sx={{ px: 2, pt: 2 }}>
          {title}
        </Typography>
      ) : null}
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
          {pokemonArray.map((pokemon) => (
            <PokemonRow key={pokemon.id} bulbasaur={pokemon} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
