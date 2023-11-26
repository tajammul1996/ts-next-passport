"use client";

import { useEffect, useState } from "react";


function DashboardPage() {
  console.log(process.env.NEXT_PUBLIC_SERVER_URL)
  const [response, setResponse] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/user`, {
      credentials: "include",
      
    })
      .then((res) => {
        console.log(res)
        
        return res.json()})
      .then((data) => setResponse(data));
  });

  return (
    <div>
      <h1>{JSON.stringify(response)}</h1>
    </div>
  );
}

export default DashboardPage;