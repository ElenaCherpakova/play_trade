"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CardForm from "@/components/CardForm";
import { createCardData } from "@/utils/fetchData";

const SellAddPage = () => {
  const router = useRouter();

  const [card, setCard] = useState({
    name: "",
    set: "",
    price: 0,
    currency: "",
    shippingCost: 0,
    description: "",
    conditions: "",
    category: "",
    imageURL: "",
    imagePublicId: "",
    quantity: 0,
    available: ""
  });

  const addCard = async formData => {
    try {
      const data = await createCardData(formData);
      // Navigate to the new page upon successful card addition
      router.push(`/market/item/${data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <CardForm cardValue={card} onSubmitForm={addCard} />
    </div>
  );
};

export default SellAddPage;
