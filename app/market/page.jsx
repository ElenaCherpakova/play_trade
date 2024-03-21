import { CardsWithFilters } from "@/components/CardsWithFilters";

export default function Market() {
  const card = {
    name: "Pikachu V - SWSH061",
    price: "$ 0.42",
    imageURL: "https://m.media-amazon.com/images/I/51skd-tjunL._AC_.jpg"
  };
  return (
    <div>
      <h2>Market</h2>
      <CardsWithFilters card={card} />
    </div>
  );
}
