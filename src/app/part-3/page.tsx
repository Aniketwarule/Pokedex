import { Container, Stack, Typography } from "@mui/material";

import { FilterablePokedexTable } from "~/app/_components/filterable-pokedex-table";

export default function Part3Page() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h4">Part 3: Filterable Pokedex Table</Typography>
        <FilterablePokedexTable />
      </Stack>
    </Container>
  );
}
