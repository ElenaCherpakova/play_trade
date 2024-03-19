import { Typography, Button, TextField, Box } from "@mui/material";
import CardComponent from "../components/CardComponent";
import Home from "../components/Home"; // import Home component
import UserProfileEditPage from "@/components/UserProfileEditPage";


export default function Page() {

  return (
    <>
      
      <Home/>
      <CardComponent card={card} />
    </>
  );
}
