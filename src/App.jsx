import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Tenzies from "./components/tenzies"

function App() {
  const [count, setCount] = useState(0)

  return (
    <Tenzies />
  )
}

export default App
