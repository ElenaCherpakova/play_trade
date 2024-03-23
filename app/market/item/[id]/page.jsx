"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button } from "@mui/material";
import CardComponent from "@/components/CardComponent";

/**
 * @param {params} Object
 
*/
export default function Page({ params }) {
  const [data, setData] = useState(null);
  const router = useRouter();
  const id = params.id;
  useEffect(() => {
    //fetch data need to move to file in utils
    const fetchCard = async () => {
      const response = await fetch(`/api/cards/${id}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setData(data.data);
    };
    fetchCard();
  }, [id]);

  return (
    <Box>
      {data && <CardComponent card={data} />}
      <Button variant="contained" color="primary" onClick={() => router.push(`/sell/edit/${id}`)}>
        Edit card
      </Button>
    </Box>
  );
}
