import dbConnect from '@/lib/mongo/dbConnect';

export default async function Home() {
  await dbConnect();
  return (
    <div>
      <h1>Hello Next with MongoDB</h1>
    </div>
  );
}
