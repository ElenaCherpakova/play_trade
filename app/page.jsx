import dbConnect from "@/lib/mongo/dbConnect";
import { Typography, Button, TextField, Box } from "@mui/material";
import CardComponent from "../components/CardComponent";

const card = {
  name: "Pikachu V - SWSH061",
  price: "$ 0.42",
  imageURL: "https://m.media-amazon.com/images/I/51skd-tjunL._AC_.jpg"
};
export default async function Home() {
  await dbConnect();
  return (
    <>
      <Box p={5}>
        <Navbar />
      <Typography color="primary" variant="h1">
          Hello Next with
        </Typography>
        <Typography color="accent.main" variant="h2">
          MongoDB
        </Typography>
        
    </Box>

      <CardComponent card={card} />
    </>
    
  );
}
