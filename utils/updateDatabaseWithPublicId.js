//code used to populate DB with images' public ids
/*

import dbConnect from "@/lib/mongo/dbConnect";
import Card from "../models/Card";
import User from "../models/User";


export async function updateDatabaseWithPublicId(imageUrl, publicId) {
  await dbConnect();
  try {
    const result = await Card.findOneAndUpdate(
      { imageURL: imageUrl }, // finds the document by image URL
      { imagePublicId: publicId }, // sets the new public ID
      { new: true } // returns the updated document
    );

    if (!result) {
      console.log(`No document found with image URL: ${imageUrl}`);
      return null;
    }
    console.log(`Updated document with new public ID: ${publicId}`);
    return result;
  } catch (error) {
    console.error("Failed to update database with public ID:", error);
    throw error;
  }
}


export async function updateDatabaseWithPublicId(imageUrl, publicId) {
  await dbConnect();
  try {
    const result = await User.findOneAndUpdate(
      { imageProfileURL: imageUrl }, // finds the user by image profile URL
      { imageProfilePublicId: publicId },
      { new: true } // returns the updated document
    );

    if (!result) {
      console.log(`No user found with image profile URL: ${imageUrl}`);
      return null;
    }
    console.log(`Updated document with new public ID: ${publicId}`);
    return result;
  } catch (error) {
    console.error("Failed to update database with public ID:", error);
    throw error;
  }
}
*/
