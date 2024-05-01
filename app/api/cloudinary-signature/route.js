import { NextResponse } from "next/server";
import cloudinary from "@/app/config/cloudinaryConfig";

export const routeConfig = {
  api: {
    bodyParser: {
      sizeLimit: "8mb"
    }
  }
};

async function parseJson(req) {
  const { readable, writable } = new TransformStream();
  req.body.pipeTo(writable);
  const reader = readable.getReader();
  let received = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += new TextDecoder().decode(value);
  }
  return JSON.parse(received);
}

export async function POST(req, res) {
  try {
    const body = await parseJson(req);
    const { timestamp, public_id, overwrite, upload_preset } = body;

    const paramsToSign = {
      timestamp,
      ...(public_id && { public_id }),
      ...(overwrite && { overwrite: true }),
      ...(upload_preset && { upload_preset })
    };

    const signature = cloudinary.v2.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);

    return new NextResponse(
      JSON.stringify({
        success: true,
        signature,
        timestamp
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ success: false, message: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
