import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, password } = req.body;

    const springRes = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: email,
        userPass: password,
      }),
    });

    const text = await springRes.text();

    res.status(springRes.status).json({ message: text });
  } catch (error) {
    console.error("Error connecting to backend:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
