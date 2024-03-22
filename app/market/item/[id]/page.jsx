"use client";

import { useEffect, useState } from "react";
import CardComponent from "@/components/CardComponent";

export default function Page({ params }) {
  const [data, setData] = useState(null);
  const id = params.id;
  useEffect(() => {
    const fetchCard = async () => {
      const response = await fetch(`/api/cards/${params.id}`);
      const data = await response.json();
      setData(data.data);
    };
    fetchCard();
  }, [params.id]);

  return <div>{data && <CardComponent card={data} />}</div>;
}
