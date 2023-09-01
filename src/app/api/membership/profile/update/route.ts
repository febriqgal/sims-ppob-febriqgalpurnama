import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(req: Request) {
  const coo = cookies();
  const token = coo.get("token");

  const res = await fetch(`${process.env.URL_API}/profile/update`, {
    method: "PUT",
    body: JSON.stringify({
      first_name: req.body,
      last_name: req.body,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token?.value}`,
    },
  });
  const data = await res.json();

  return NextResponse.json(data);
}