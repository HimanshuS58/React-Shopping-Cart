import React, { useContext } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { RiShoppingBag4Fill } from "react-icons/ri"
import { products_categories } from '../data/products'
import { NavLink } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'

const Navbar = () => {

    const { invoice } = useContext(ProductContext);

  return (
    <div className='w-full h-20 border shadow:lg flex items-center justify-between px-8 bg-white'>
        <NavLink className='flex flex-col items-center' to={'/'}>
          <RiShoppingBag4Fill className='text-red-500 text-4xl'/>
        </NavLink>
        <ul className='flex items-center gap-10'>
          {
            products_categories.map((item, index) => (
                <li key={index}><NavLink className={({ isActive }) => isActive ? 'text-blue-600' : ''} to={`/${item.value}`}>{item.label}</NavLink></li>
            ))                      // Note: 'isActive' state is a property of NavLink and we define it using className and not by onClick
          }
        </ul>
        <NavLink to={'/cart'}>
            <FaShoppingCart className='text-2xl'/>
            {
          invoice?.count > 0 &&
          <div className='relative -top-8 -right-4 w-4 h-4 text-xs bg-blue-700 text-white flex justify-center rounded-full'>
            {invoice?.count}
          </div>
        }
     </NavLink>                   
    </div>
  )
} 

export default Navbar

  // Read about relative and absolute position difference: https://www.youtube.com/shorts/jyi8s_AyxKA 
  // Note: while defining an element as absolute first mention its parent element as relative otherwise it align with the page body.  
