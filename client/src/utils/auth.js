import { useEffect } from "react"
import { UpdateAuthAction } from "../store/actions/Auth"
import axiosFetch from "./axiosFetch"

export const useAuthState = dispatch => {
  useEffect(() => {
    axiosFetch
      .get("user/auth")
      .then(res => {
        if (res.data) {
          const data = localStorage.getItem("Authorization")

          dispatch(UpdateAuthAction(JSON.parse(data), true))
        } else {
          console.log("login error")
          throw new Error("Not logged in")
        }
      })
      .catch(er => {
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
