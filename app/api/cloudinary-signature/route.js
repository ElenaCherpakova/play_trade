import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb"
    }
  }
};

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//Get signiture
export async function GET(req) {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.v2.utils.api_sign_request(
      {
        timestamp: timestamp
      },
      process.env.CLOUDINARY_API_SECRET
    );

    const responseData = JSON.stringify({
      success: true,
      timestamp,
      signature,
      api_key: process.env.CLOUDINARY_API_KEY
    });

    return new NextResponse(responseData, {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ success: false, message: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
