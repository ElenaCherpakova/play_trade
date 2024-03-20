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
    const fetchCard = async () => {
      const response = await fetch(`/api/cards/${params.id}`);
      const data = await response.json();
      setData(data.data);
    };
    fetchCard();
  }, []);
  const editProperty = {
    name: "edited card's name",
    imageURL: "https://m.media-amazon.com/images/I/615ij7aqRJL._AC_SL1000_.jpg"
  };
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
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => editCard(editProperty)}>
        Edit card
      </Button>
      <CardForm cardValue={data} onSubmitForm={editCard} />
      {/* {data && <CardComponent card={data} />} */}
    </div>
  );
}
