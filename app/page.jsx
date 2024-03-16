import dbConnect from "@/lib/mongo/dbConnect";
import { Typography, Button, TextField, Box } from "@mui/material";
<<<<<<< HEAD
// import Footer from "@/components/Footer";

=======
import CardComponent from "../components/CardComponent";

const card = {
  name: "Pikachu V - SWSH061",
  price: "$ 0.42",
  imageURL: "https://m.media-amazon.com/images/I/51skd-tjunL._AC_.jpg"
};
>>>>>>> c100b649db849895c70d752ad377b8bd309bdd98
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
<<<<<<< HEAD
      {/* <Footer /> */}
=======

      <CardComponent card={card} />
>>>>>>> c100b649db849895c70d752ad377b8bd309bdd98
    </>
  );
}
