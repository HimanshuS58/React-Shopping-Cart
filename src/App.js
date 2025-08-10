import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Navbar from "./components/Navbar";


function App() {

  return (
    <div className='min-h-screen h-auto bg-slate-200'>
      <Router>
        <Navbar />
        <div className='w-[70%] m-auto bg-white my-4 p-10'>
          <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/:category' element={<Products />} /> {/*  this path suggests dynamic(:category) routing */}
            <Route path='/cart' element={<Cart />} />
            <Route path='/success' element={<Success />} />
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;
