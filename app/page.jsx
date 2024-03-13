import dbConnect from "@/lib/mongo/dbConnect";
import { Typography, Button, TextField, Box } from "@mui/material";
import Navbar from '../components/Navbar';

export default async function Home() {
  await dbConnect();
  return (
    <Box p={5}>
      <Navbar />
      <Typography color="primary" variant="h1">
        Hello Next with
      </Typography>
      <Typography color="accent.main" variant="h2">
        MongoDB
      </Typography>
      
    </Box>
    
  );
}
