import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo/dbConnect";
import Card from "@/models/Card";

/**
 *
 * @param {NextRequest} req
 * @param {NextResponse} res
 */
export default async function handler(req, res) {
  const { id, method } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const card = await Card.findById(id);
        if (!card) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: card });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const card = await Card.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!card) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: card });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedCard = await Card.deleteOne({ _id: id });
        if (!deletedCard) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
