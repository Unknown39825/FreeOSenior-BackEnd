import { useEffect } from "react"
import { UpdateAuthAction } from "../store/actions/Auth"
import axiosFetch from "./axiosFetch"

export const useAuthState = dispatch => {
  // check the query param sso in url true or false
  useEffect(() => {
    const sso = new URLSearchParams(window.location.search).get("sso") || false
    console.log(sso)
    
    axiosFetch
      .get("user/auth?sso="+sso)
      .then(res => {
        if (res.data) {
          console.log(res.data)
          const data = {
            token: res.data.token,
            userId: res.data.userId,
            admin : res.data.admin,
          }

          console.log(data)
          
          localStorage.setItem("Authorization", JSON.stringify(data))
          // remoe the sso query param from url
          const url = new URL(window.location.href)
          url.searchParams.delete("sso")
          window.history.replaceState({}, document.title, url)

          dispatch(UpdateAuthAction(data, true))
        } else {
          console.log("login error")
          throw new Error("Not logged in")
        }
      })
      .catch(er => {
        console.log(er)
        localStorage.removeItem("Authorization")
        dispatch(UpdateAuthAction({}, false))
      })
    return () => {
      console.log("Error")
    }
  }, [dispatch])
}

export const useAuthActions = dispatch => {
  const Logout = () => {
    axiosFetch
      .get("user/logout")
      .then(res => {
        if (res.data) {
          localStorage.removeItem("Authorization")
          dispatch(UpdateAuthAction({}, false))
        }
      })
      .catch(err => {
        console.log(err.response)
        localStorage.removeItem("Authorization")
        dispatch(UpdateAuthAction({}, false))
      })
  }

  return { Logout }
}
