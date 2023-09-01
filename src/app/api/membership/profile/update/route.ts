import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { appConfig } from "@/constant/appConfig";
export async function GET(req: Request) {
  const coo = cookies();
  const token = coo.get("token");

  const res = await fetch(`${appConfig.urlApiNutech}/profile/update`, {
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
