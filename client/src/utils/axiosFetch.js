import axios from "axios"
let access_token =
  typeof window !== "undefined"
    ? localStorage.getItem("Authorization") ||
      window.localStorage.getItem("Authorization")
    : null

let token = JSON.parse(access_token)?.token
console.log(token)
const axiosFetch = axios.default.create({
  baseURL: "/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export default axiosFetch
