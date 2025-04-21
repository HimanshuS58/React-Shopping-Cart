import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { IoIosRemoveCircleOutline } from 'react-icons/io';

const Cart = () => {

  const { cart, invoice, removeCart, setCart, setInvoice } = useContext(ProductContext);
  
  const navigate = useNavigate();

  const orderPlaced = () => {

    setCart([]);
    setInvoice({count:0, subTotal:0});
    navigate('/success');
  }


  return (
    <div>
      {
        cart.length > 0 ?
        <div>
          {
            cart.map((prod, index)=> {
              return (
                <div key={index} className='shadow-md p-4 flex items-center gap-4 justify-between'>
                 <img src={prod.image} alt={prod.name} className='w-[120px] h-[120px] object-contain'/>
                 <div className='flex flex-col gap-2 w-[450px]'>
                  <p className='font-bold'>{prod.name}</p>
                  <p className='text-xs text-gray-500'>{prod.smallDescription}</p>
                  <p className='text-xs'>Qty: {prod.quantity}</p>
                 </div>
                 <p className='font-bold'>${prod.price}</p>
                 <IoIosRemoveCircleOutline className='text-red-600 text-2xl cursor-pointer' onClick={()=>removeCart(prod)}/>
                </div>
              )
            })
          }
          <div className='flex flex-col items-end gap-3 py-4'>
            <p className='font-bold'>Subtotal({invoice.count} {invoice.count > 1 ? 'items' : 'item'}): ${invoice.subTotal.toFixed(2)}</p>
            <button className='bg-blue-600 text-sm text-white p-2 w-[200px] rounded-md' onClick={orderPlaced}>Place Order</button>
          </div>
        </div>
        :
        <div className='flex items-center justify-center text-2xl p-4 gap-2'>
         <span>Empty</span>
         <FaShoppingCart className='text-3xl'/>
         <Link to={'/'} className='text-blue-600'>Add Products</Link>
        </div>
      }
    </div>
  )
}

export default Cart