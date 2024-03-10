import dbConnect from "@/lib/mongo/dbConnect";
import CardComponent from "../components/CardComponent";

export default async function Home() {
  await dbConnect();
  return (
    <div>
      <h1>Hello Next with MongoDB</h1>
      <CardComponent />
    </div>
  );
}
