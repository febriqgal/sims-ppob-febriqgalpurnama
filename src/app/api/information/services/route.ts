import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function GET(req: Request) {
  const res = await fetch(
    `${process.env.URL_API}/services`,

    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    }
  );
  const data = await res.json();
  console.log(data);

  return NextResponse.json(data);
}
