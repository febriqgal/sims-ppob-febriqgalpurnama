import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = await fetch(`${process.env.URL_API}/topup`, {
    method: "POST",
    body: JSON.stringify({
      top_up_amount: 4000000,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZlYnJpcWdhbHBAZ21haWwuY29tIiwibWVtYmVyQ29kZSI6IkxMWDFQUlZWIiwiaWF0IjoxNjkzNDI2MjQ1LCJleHAiOjE2OTM0Njk0NDV9.DAh1ppTg6KkdT9Mwby41LeA1QAr-88HtsTz-2kyqThQ`,
    },
  });
  const data = await res.json();
  console.log(data);

  return NextResponse.json(data);
}
