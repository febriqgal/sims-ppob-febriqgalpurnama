"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session }: any = useSession();
  const [user, setUser] = useState(null);
  console.log(session?.user?.token);

  useEffect(() => {
    fetch(`https://take-home-test-api.nutech-integrasi.app/balance`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${session?.user?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.data));
  }, [session?.user?.token]);

  console.log(user);

  return <div>page</div>;
}
