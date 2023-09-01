import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const coo = cookies();
  const token = coo.get("token");
  const res = await fetch(
    `https://take-home-test-api.nutech-integrasi.app/transaction/history?offset=0&limit=99`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );
  const data = await res.json();

  return NextResponse.json(data);
}
