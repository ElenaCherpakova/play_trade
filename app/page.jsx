import dbConnect from "@/lib/mongo/dbConnect";
import { Typography, Button, TextField, Box } from "@mui/material";

export default async function Home() {
  await dbConnect();
  return (
    <Box p={5}>
      <Typography color="primary" variant="h2">
        Hello Next with MongoDB
      </Typography>
    </Box>
  );
}
