"use state";
"use client";
import React, { useState, useEffect } from "react";
import Home from "../components/Home"; // import Home component
import Loader from "@/components/loader/Loader";

export default function Page() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 8000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Home />
        </>
      )}
    </>
  );
}
