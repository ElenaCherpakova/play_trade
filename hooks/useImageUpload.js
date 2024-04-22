import { useState } from "react";

  const useImageUpload = () => {
    const [imageURL, setImageURL] = useState("");
    const [imagePublicId, setImagePublicId] = useState("");
    const [error, setError] = useState("");
  
    const handleImageUpload = async (file, callback, existingPublicId = null) => {
      try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const bodyData = JSON.stringify({
          public_id: existingPublicId, //include if overwriting
          overwrite: !!existingPublicId, //include overwrite parameter if public_id is present
          upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_SECRET,
          timestamp: timestamp
        });

        const signatureRes = await fetch("/api/cloudinary-signature", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: bodyData
        });
  
        if (!signatureRes.ok) {
          throw new Error("Failed to fetch the Cloudinary signature.");
        }
        const { signature } = await signatureRes.json();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_SECRET);
        if (existingPublicId) {
          formData.append("public_id", existingPublicId);
          formData.append("overwrite", true); //to overwrite existing image
        }
  
        const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`;
        const uploadRes = await fetch(uploadUrl, { method: "POST", body: formData });
        const uploadData = await uploadRes.json();
  
        if (!uploadRes.ok) {
          throw new Error(uploadData.error?.message || "Upload to Cloudinary failed.");
        }
          setImageURL(uploadData.secure_url);
        setImagePublicId(uploadData.public_id);
        callback(uploadData.secure_url, uploadData.public_id);
      } catch (error) {
        setError("Failed to upload the image. Please try again.");
        setImageURL("");
        setImagePublicId("");
        callback("");
      }
    };
  
    return { handleImageUpload, imageURL, imagePublicId, error };
  }
  
  export default useImageUpload;
  
  