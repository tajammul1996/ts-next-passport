"use client";

import { useEffect } from "react";


function DashboardPage() {
  console.log(process.env.NEXT_PUBLIC_SERVER_URL)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/user`, {
      credentials: "include",
      
    })
      .then((res) => {
        console.log(res)
        return res.json()})
      .then((data) => console.log(data));
  });

  return (
    <div>
      {/* <h1>{JSON.stringify(response)}</h1> */}
    </div>
  );
}

export default DashboardPage;