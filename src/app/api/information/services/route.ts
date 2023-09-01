import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function GET(req: Request) {
  const res = await fetch(
    `https://take-home-test-api.nutech-integrasi.app/services`,

    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    }
  );
  const data = await res.json();

  return NextResponse.json(data);
}
