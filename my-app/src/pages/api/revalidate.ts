// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidated: boolean;
  message?: string;
  path?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({
      revalidated: false,
      message: "Method not allowed. Use GET or POST.",
    });
  }

  const token = Array.isArray(req.query.token)
    ? req.query.token[0]
    : req.query.token;

  if (!process.env.REVALIDATE_TOKEN) {
    return res.status(500).json({
      revalidated: false,
      message: "REVALIDATE_TOKEN is not configured.",
    });
  }

  if (!token) {
    return res.status(400).json({
      revalidated: false,
      message: "Token is required.",
    });
  }

  if (token !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({
      revalidated: false,
      message: "Insert correct token",
    });
  }

//   if (req.query.data === "produk") {
//     try {
//       await res.revalidate("/produk/static");
//       return res.status(200).json({ revalidated: true });
//     } catch (error) {
//       console.error("Error in API route:", error);
//       res.status(500).send({ revalidated: false });
//     }
//   }


//   return res.json({
//     revalidated: false,
//     message: "Invalid query parameter. Expected 'data=produk'.",
//   });
// }

  const data = Array.isArray(req.query.data) ? req.query.data[0] : req.query.data;
  const path = Array.isArray(req.query.path) ? req.query.path[0] : req.query.path;
  const targetPath = path || (data === "produk" ? "/produk/static" : "");

  if (!targetPath) {
    return res.status(400).json({
      revalidated: false,
      message: "Invalid query parameter. Use 'path=/your-path' or 'data=produk'.",
    });
  }

  try {
    await res.revalidate(targetPath);
    return res.status(200).json({
      revalidated: true,
      path: targetPath,
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return res.status(500).json({
      revalidated: false,
      message: "Error revalidating path.",
      path: targetPath,
    });
  }
}