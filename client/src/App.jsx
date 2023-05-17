import Register from "./pages/Register"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Articles from "./pages/Articles"
import Profile from "./pages/Profile"
import { useState } from "react"
import Navbar from "./components/Navbar"

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false)
  console.log({ applog: isLoggedin })
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 1000 * 60 * 60 * 24,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsLoggedin={setIsLoggedin} />}
          />
          <Route
            path="/profile"
            element={
              isLoggedin ? <Profile /> : <Login setIsLoggedin={setIsLoggedin} />
            }
          />
          <Route path="/articles" element={<Articles />} />
          <Route path="/" element={<Navigate replace to="articles" />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
