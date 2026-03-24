import Link from "next/link";

import { Button, Container, Paper, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Typography variant="h3">Pokedex Problem</Typography>
        <Typography color="text.secondary">
          This project includes all three required routes using Next.js, Prisma,
          tRPC, and Material UI.
        </Typography>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Button component={Link} href="/part-1" variant="contained">
              Open Part 1: Single Pokemon Fetch
            </Button>
            <Button component={Link} href="/part-2" variant="contained">
              Open Part 2: Pokemon Array Fetch
            </Button>
            <Button component={Link} href="/part-3" variant="contained">
              Open Part 3: Filter by Type
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
