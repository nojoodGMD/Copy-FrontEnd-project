import { ProductsManager } from './components/ProductsManager'
import './index.css'
import Home from './components/pages/Home'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import ProductList from './components/ProductList'
import Navigation from './components/components/Navigation'
import Routing  from './routing/Routing'


function App() {
  return (
    <>
      <Routing/>
    </>
  )
}

export default App
