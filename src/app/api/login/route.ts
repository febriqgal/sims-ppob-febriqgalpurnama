import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = await fetch(`${process.env.URL_API}/login`, {
    method: "POST",
    body: JSON.stringify({
      email: "febriqgalp@gmail.com",
      password: "11111111",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
  const data = await res.json();
  console.log(data);

  return NextResponse.json(data);
}
