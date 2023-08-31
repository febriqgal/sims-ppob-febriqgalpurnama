import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const coo = cookies();
  const token = coo.get("token");
  console.log(token?.value);
  const res = await fetch(`${process.env.URL_API}/balance`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token?.value}`,
    },
  });
  const data = await res.json();
  console.log(data);

  return NextResponse.json(data);
}
