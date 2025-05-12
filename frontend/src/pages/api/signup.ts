import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, password } = req.body;

  const backend = await fetch("http://localhost:8080/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userEmail: email, userPass: password }),
  });

  const text = await backend.text();
  return res.status(backend.status).send(text);
}
