import { useState } from "react";

const useImageUpload = () => {
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState("");

  const handleImageUpload = async (file, callback) => {
    try {
      const res = await fetch("/api/cloudinary-signature");
      if (!res.ok) throw new Error("Failed to fetch the Cloudinary signature.");
      const { signature, timestamp, api_key } = await res.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);

      const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`;
      const uploadRes = await fetch(uploadUrl, { method: "POST", body: formData });
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) throw new Error(uploadData.error?.message || "Upload to Cloudinary failed.");

      setImageURL(uploadData.secure_url);
      if (callback) callback(uploadData.secure_url);
    } catch (error) {
      setError("Failed to upload the image. Please try again.");
      setImageURL("");
      if (callback) callback("");
    }
  };

  return { handleImageUpload, imageURL, error };
};

export default useImageUpload;
