import { NextResponse } from "next/server";
import cloudinary from "@/app/config/cloudinaryConfig";

export const routeConfig = {
  api: {
    bodyParser: {
      sizeLimit: "8mb"
    }
  }
};

//Get signiture
export async function GET(req) {
  try {
    console.log("Handler function invoked.");
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
    console.log("response", responseData);
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
