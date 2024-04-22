//code used to populate DB with images' public ids

/*
import { NextResponse } from "next/server";
import cloudinary from "@/app/config/cloudinaryConfig";
import { updateDatabaseWithPublicId } from "@/utils/updateDatabaseWithPublicId"; 

export async function POST(req) {
  try {
    let next_cursor = null;
    do {
      const result = await cloudinary.v2.api.resources({
        type: "upload",
        max_results: 200,
        next_cursor: next_cursor
      });
      await Promise.all(result.resources.map(image => updateDatabaseWithPublicId(image.secure_url, image.public_id)));

      next_cursor = result.next_cursor;
    } while (next_cursor);

    return new NextResponse(JSON.stringify({ message: "Synchronization completed successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
*/
