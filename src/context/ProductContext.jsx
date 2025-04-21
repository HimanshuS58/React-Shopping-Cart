import { createContext, useEffect, useState } from "react";
import { products_data } from "../data/products";


export const ProductContext = createContext([]);

export const ProductContextProvider = ({ children }) => {

    const [products, setProducts] = useState(products_data);
    const [cart, setCart] = useState([]);
    const [invoice, setInvoice] = useState({count:0, subTotal:0});
    const [message, setMessage] = useState('');


    //  *** //     
    const addCart = (product)=>{

        setMessage(`${product.name} added to the cart`);

        setCart(oldCart=>{
            let previous = [...oldCart];
            if(previous.length<1){
                previous.push({...product,quantity:1}); // Note: here inside .push() we are using spread operator instead of simply pushing 
                                                        //       product because we are adding a new property 'quantity' in the product object.
                                                        //       See products.js file for reference
            }
            else{
                const isProduct = previous.find(prod=>prod.id === product.id) // Note: find() return a value if test case passed or else 
                                                                              //       return 'undefined'. 
                if(!isProduct){
                    previous.push({...product,quantity:1}); 
                }
                else{
                    previous = previous.map(prod=>{
                        return prod.id === isProduct.id ? {...isProduct,quantity:isProduct.quantity + 1 } : prod;
                    })
                }
            }
            return previous;
        })
    }


    const removeCart =(product) => {

        setMessage(`${product.name} removed from the cart`); 

        setCart((oldCart)=>{
            let previous = [...oldCart];

            const isProduct = previous.find((prod)=> prod.id === product.id);   // Note: find() return a value if test case passed or else 
                                                                                //       return 'undefined'.

            if(isProduct){
                const index = previous.indexOf(isProduct);
                previous.splice(index,1);
            }

            return previous;
        })
    }



    const filterProducts = (category) => {
           if(category) {
            const filteredProducts = products_data.filter((prod) => {
               if(prod.category === category){
                return prod;
               }
           })
           setProducts(filteredProducts);
           }
           else {
            setProducts(products_data);
           }
    }

    //  *** //    .
    const setInvoiceData = ()=>{
        setInvoice(previous=>{
            let newInvoice = {...previous,count:0,subTotal:0};
            cart.forEach(product=>{
                newInvoice.count += product.quantity;
                newInvoice.subTotal += product.quantity * product.price;
            })
            return newInvoice;
        })
    }

    useEffect(()=> {

        const timer = setTimeout(()=>{
                                       setMessage('');
                                            }, 600)
        setInvoiceData();

        return () => {clearTimeout(timer)}             // it works even if you dont't mention return.
        
    }, [cart]);


    return (
        <ProductContext.Provider value={{ products, filterProducts, addCart, invoice, cart, removeCart, setCart, setInvoice }}>
            {
                message && (
                    <div className='border fixed right-0 top-20 bg-green-600 rounded-md shadow-lg text-white text-center p-2 w-[300px]'>
                        {message}
                        </div>
                )
            }
            {children}
        </ProductContext.Provider>
    )
}