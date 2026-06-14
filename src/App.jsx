import Navbar from './components/Navbar';
import './App.css'
import "tailwindcss"
import Manager from './components/Manager'
import Footer from "./components/Footer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />

        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
