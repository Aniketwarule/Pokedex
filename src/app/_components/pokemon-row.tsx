import { Avatar, TableCell, TableRow } from "@mui/material";

export type PokemonRowData = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
};

type PokemonRowProps = {
  bulbasaur: PokemonRowData;
};

export function PokemonRow({ bulbasaur }: PokemonRowProps) {
  return (
    <TableRow hover>
      <TableCell>{bulbasaur.id}</TableCell>
      <TableCell>{bulbasaur.name}</TableCell>
      <TableCell>{bulbasaur.types.join(", ")}</TableCell>
      <TableCell>
        <Avatar
          src={bulbasaur.sprite}
          alt={bulbasaur.name}
          variant="rounded"
          sx={{ width: 56, height: 56 }}
        />
      </TableCell>
    </TableRow>
  );
}
