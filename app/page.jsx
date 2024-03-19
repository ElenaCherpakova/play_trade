//import dbConnect from "@/lib/mongo/dbConnect";
import { Typography, Button, TextField, Box } from "@mui/material";
import CardComponent from "../components/CardComponent";
import Home from "../components/Home"; // import Home component

const card = {
  name: "Pikachu V - SWSH061",
  price: "$ 0.42",
  imageURL: "https://m.media-amazon.com/images/I/51skd-tjunL._AC_.jpg"
};
export default function Page() {
  return (
    <>
      <Home />
    </>
  );
}
