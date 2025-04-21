import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext';
import { useParams } from 'react-router-dom';

const Products = () => {

  const { products, filterProducts, addCart } = useContext(ProductContext);

  const {category} = useParams();

  useEffect(() => {
                      
                     filterProducts(category)

                   }, [category])

  return (
    <div className='flex flex-wrap gap-6 text-center'>
      {
        products.map((product, index) => {
          return (
          <div key={index} className='w-[200px] rounded-md hover:shadow-lg m-2'>
            <img src={product.image} alt={product.name} className='w-[200px] h-[150px] object-contain block m-auto p-4'/>
            <div className='flex flex-col gap-2 my-4 h-[120px] p-2'>
              <p className='text-center font-bold'>{product.name}</p>
              <p className='text-center text-sm'>${product.price}</p>
              <p className='text-xs text-gray-500'>{product.smallDescription}</p>
            </div>
            <button 
                   className='w-full bg-blue-600 text-white text-center text-sm p-2'
                   onClick={() => addCart(product)} 
                    >
              + Add To Cart
            </button>
          </div>
        )})
      }
    </div>
  )
}

export default Products