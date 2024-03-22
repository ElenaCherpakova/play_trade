"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import CardComponent from "@/components/CardComponent";
import CardForm from "@/components/CardForm";

export default function Page({ params }) {
  const [data, setData] = useState(null);
  const router = useRouter();
  const id = params.id;
  useEffect(() => {
    if (id) {
      const fetchCard = async () => {
        const response = await fetch(`/api/cards/${id}`);
        const data = await response.json();
        setData(data.data);
      };
      fetchCard();
    }
  }, [id]);

  // console.log("card", card);
  const editCard = async editProperty => {
    const editCard = {
      ...data,
      ...editProperty
    };
    console.log("editCard", editCard);
    const body = JSON.stringify({ ...editCard });
    console.log("body", body);
    console.log("url", `/api/cards/${id}`);
    try {
      const response = await fetch(`/api/cards/${id}`, {
        method: "PATCH",
        headers: {
          // "Content-Type": "multipart/form-data"
          "Content-Type": "application/json"
        },
        body
      });
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong!");
      } else {
        const data = await response.json();
        console.log(data);
        setData(data.data);
        router.push(`/market/item/${id}`);
      }
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  return <div>{data && <CardForm cardValue={data} onSubmitForm={editCard} />}</div>;
}
