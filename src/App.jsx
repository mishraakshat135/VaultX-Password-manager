import Navbar from './components/Navbar';
import './App.css'
import "tailwindcss"
import Manager from './components/Manager'
import Footer from "./components/Footer"

function App() {


  return (
    <>
    <Navbar />
    <div className="min-h-screen">
    <Manager />
    </div>
    <Footer/>
    </>
  )
}

export default App
