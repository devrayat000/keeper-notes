// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";

export default (function handler(_req, res) {
  res.status(200).json({ name: "John Doe" });
} as NextApiHandler);
