import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCsrf } from "../hooks/useCsrf"
import { login } from "../../api/api"
import { useQuery } from "@tanstack/react-query"

const Login = ({ setIsLoggedin }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const csrf = useCsrf()
  const { refetch } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      const data = await login(email, password, csrf)
      return data
    },
    enabled: false,
  })

  const navigate = useNavigate()

  const handleLognin = async (e) => {
    e.preventDefault()

    const refetchLogin = await refetch()

    if (refetchLogin.isSuccess) {
      setIsLoggedin(true)
      navigate("/profile")
    }

    if (refetchLogin.isError) {
      console.log(refetchLogin.error)
    }
  }
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <h1 className="text-5xl text-gray-800">
            Fabri<span className="text-indigo-600">Blog</span>
          </h1>
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p className="">
              Don't have an account?
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <form onSubmit={handleLognin} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Sign in
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login
