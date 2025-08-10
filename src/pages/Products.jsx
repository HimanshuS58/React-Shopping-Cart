import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext';
import { useParams } from 'react-router-dom';

const Products = () => {

  const { products, filterProducts, addCart } = useContext(ProductContext);

  const {category} = useParams();

  useEffect(() => {
            //  console.log("Filtered products:", products.filter((prod) => prod.category === category));  
                  //  console.log('Products to display:', products);
                     filterProducts(category)

                   }, [category])


// Ensure images are loaded from the public folder or external URLs
// Debug: Log the image paths to verify correctness
  useEffect(() => {
                    products.forEach((product) => {
                      if (product.image) {
                        console.log('Image path:', product.image);
                      }
                    });
                  }, [products]);
                  

  return (
    <div className='flex flex-wrap gap-6 text-center'>
      {
        products.map((product, index) => {
          return (
            //  <div key={index} className='w-[200px] rounded-md hover:shadow-lg m-2'>
            // <img src={product.image} alt={product.name}  // Not able to load the images correctly. 
            // className='w-[200px] h-[150px] object-contain block m-auto p-4'
            // />
            
          <div key={index} className='w-[200px] rounded-md hover:shadow-lg m-2'>
            {/* Below image rendering logic is used because the images inside the public folder is broken or not able to load the images correctly.
                So using this logic we ensure that the images are loaded correctly.
                The below logic supports both local images (in your public folder) and external URLs.
                This approach assumes all local images are in the public folder. */}
            <img
              src={
                product.image && !product.image.startsWith('http')
                  ? process.env.PUBLIC_URL + '/' + product.image // process.env.PUBLIC_URL is a special variable in Create React App that points to your public folder.
                  : product.image
              }
              
              alt={product.name}
              className='w-[200px] h-[150px] object-contain block m-auto p-4'
            />
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