"use client";

import { CircularProgress, Typography } from "@mui/material";

import { api } from "~/trpc/react";

export function LatestPost() {
  const helloQuery = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <div>
      {helloQuery.isLoading ? (
        <CircularProgress size={18} />
      ) : (
        <Typography>{helloQuery.data?.greeting ?? "No message"}</Typography>
      )}
    </div>
  );
}
