import dbConnect from "@/lib/mongo/dbConnect";
import CardComponent from "../components/CardComponent";

const card = {
  name: "Pikachu V - SWSH061",
  price: "$ 0.42",
  imageURL: "https://m.media-amazon.com/images/I/51skd-tjunL._AC_.jpg"
};
export default async function Home() {
  await dbConnect();
  return (
    <div>
      <h1>Hello Next with MongoDB</h1>
      <CardComponent card={card} />
    </div>
  );
}
