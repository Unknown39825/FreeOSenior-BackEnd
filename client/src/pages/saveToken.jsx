import React, { useState } from "react"
import { useLocation } from "react-router-dom"

export default function Savetoken(props) {
  const [created, setCreated] = useState(false)
  const location  = useLocation();
  const query = new URLSearchParams(location.search)
  const JWT = query.get("JWT")
  const admin = query.get("admin")
  const userId = query.get("userId")
  
  const jwt = { token: JWT, admin: admin === "true", userId: userId }

  if (typeof window !== "undefined") {
    window.localStorage.setItem("Authorization", JSON.stringify(jwt))
    setCreated(true)
  }

  if (created) {
    if (typeof window !== "undefined") {
      window.location = "/"
    }
  }

  return <div></div>
}
