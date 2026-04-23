// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signUp } from "@/utils/db/servicefirebase";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    status: "success" | "error";
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            status: "error",
            message: "Method not allowed",
        });
    }

    const { email, fullname, password, role } = req.body;
    const normalizedEmail = typeof email === "string" ? email.trim() : "";
    const normalizedPassword = typeof password === "string" ? password : "";
    const normalizedRole = typeof role === "string" ? role.trim().toLowerCase() : "member";

    if (!normalizedEmail) {
        return res.status(400).json({
            status: "error",
            message: "Email wajib diisi",
        });
    }

    if (normalizedPassword.length < 6) {
        return res.status(400).json({
            status: "error",
            message: "Password minimal 6 karakter",
        });
    }

    if (!fullname) {
        return res.status(400).json({
            status: "error",
            message: "Fullname wajib diisi",
        });
    }

    if (!["admin", "member", "editor"].includes(normalizedRole)) {
        return res.status(400).json({
            status: "error",
            message: "Role tidak valid",
        });
    }

    const result = await signUp({
        email: normalizedEmail,
        fullname,
        password: normalizedPassword,
        role: normalizedRole,
    });

    if (result.status === "success") {
        return res.status(200).json({
            status: "success",
            message: result.message,
        });
    }

    return res.status(400).json({
        status: "error",
        message: result.message,
    });
}
