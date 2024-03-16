import dbConnect from "@/lib/mongo/dbConnect";
import { Typography, Button, TextField, Box } from "@mui/material";
// import Footer from "@/components/Footer";

export default async function Home() {
  await dbConnect();
  //ask Lena
  return (
    <>
      <Box p={5}>
        <Typography color="primary" variant="h1">
          Hello Next with
        </Typography>
        <Typography color="accent.main" variant="h2">
          MongoDB
        </Typography>
      </Box>
      {/* <Footer /> */}
    </>
  );
}
