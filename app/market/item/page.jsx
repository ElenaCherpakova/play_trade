import CardComponent from "../../../components/CardComponent";
const card = {
  name: "Pikachu V - SWSH061",
  price: "$ 0.42",
  imageURL: "https://m.media-amazon.com/images/I/51skd-tjunL._AC_.jpg"
};

export default function Item() {
  return (
    <div>
      <h2>Item</h2>
      <CardComponent card={card} />
    </div>
  );
}
