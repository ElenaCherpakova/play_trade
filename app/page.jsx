import dbConnect from "@/lib/mongo/dbConnect";

export default function Home() {
  dbConnect()
  return (
   <div>
    <h1>Hello Next with MongoDB</h1>
   </div>
  );
}
