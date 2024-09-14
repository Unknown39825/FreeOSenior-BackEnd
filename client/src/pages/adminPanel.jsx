import React from "react"
import Layout from "../components/main/layout"
import Protected from "../components/adminPanel/Protected"
import { useSelector } from "react-redux"
const AdminPanel = () => {
  const state = useSelector(({ auth }) => auth)

  if (state.isLoggedin && state.admin)
    return (
      <>
        <Layout>
            <Protected  />
          {/* <KommunicateChat /> */}
        </Layout>
      </>
    )

  if (typeof window !== "undefined") {
    console.log("Redirecting...")
    window.location = "/404"
  }

  return <></>
}

export default AdminPanel
