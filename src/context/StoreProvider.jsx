import { createContext, useEffect, useState } from "react"
import customerAxios from "../config/axios"
import {toast} from 'react-toastify'
import {calculateDiscountedPrice} from "../helpers/index"

const StoreContext = createContext()

const StoreProvider = ({children}) => {

    const [categories, setCategories] = useState([])
    const [currentCategory, setCurrentCategory] = useState({})
    const [modal, setModal] = useState(false)
    const [modalUser, setModalUser] = useState(false)
    const [modalNewProduct, setModalNewProduct] = useState(false)
    const [modalOrder, setModalOrder] = useState(false)
    const [modalPurchase, setModalPurchase] = useState(false)
    const [product, setProduct] = useState({})
    const [user, setUser] = useState({})
    const [order, setOrder] = useState ({})
    const [cart, setCart] = useState([])
    const [userCart, setUserCart] = useState({})
    const [total, setTotal] = useState(0)

    const getCategories = async () => {
        try {
            const {data} = await customerAxios('/api/categories')
            setCategories(data.data)
            setCurrentCategory(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickCategory = id => {
        const category = categories.filter(category => category.id === id)[0]
        setCurrentCategory(category)
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleClickModalUser = () => {
        setModalUser(!modalUser)
    }

    const handleClickModalOrder = () => {
        setModalOrder(!modalOrder)
    }

    const handleClickModalNewProduct = () => {
        setModalNewProduct(!modalNewProduct)
    }

    const handleClickModalPurchase = () => {
        setModalPurchase(!modalPurchase)
    }

    const handleSetProduct = product => {
        setProduct(product)
    }

    const handleSetUser = user => {
        setUser(user)
    }

    const handleSetOrder = order => {
        setOrder(order)
    }

    const handleClickAddProductCart = product => {
        if(cart.some(cartState => cartState.id === product.id)){
            updateItem(product)
            toast.success('Update successfully')
        } else {
            addItem(product)
            toast.success('Added successfully')
        }
    }

    const handleEditCartProduct = id => {
        const productUpdate = cart.filter(product => product.id === id)[0]
        setProduct(productUpdate)
        setModal(!modal)
    }

    const handleDeleteCartProduct = id => {
        deleteItem(id)
        .then(success => {
            if (success) {
                getCartItems()
                toast.success('Product removed');
            }
        });
    }

    const handleClickPurchase = paymentMethod => {
        addOrder(paymentMethod)
        .then(success => {
            if (success) {
                getCartItems()
                toast.success('Order created');
            } else {
                toast.success('Error to create order');
            }
        });
        setModalPurchase(!modalPurchase);
    }

    const addOrder = async (paymentMethod) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        const payment_method = paymentMethod;
      
        try {
            await customerAxios.post('/api/order-store', {
                payment_method,
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
        
            // Devuelve true si la eliminación fue exitosa
            return true;
        } catch (error) {
            console.log(error);
        
            // Devuelve false si hubo un error en la eliminación
            return false;
        }
    }

    const deleteItem = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        const product_id = id;
      
        try {
            await customerAxios.post('/api/items-destroy', {
            product_id,
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
        
            // Devuelve true si la eliminación fue exitosa
            return true;
        } catch (error) {
            console.log(error);
        
            // Devuelve false si hubo un error en la eliminación
            return false;
        }
      }

    const getCart = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await customerAxios('/api/cart-index',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const cartData = data[0];
            setUserCart(cartData[0])
        } catch (error) {
            console.log(error)
        }
    }

    const getCartItems = async () =>{
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await customerAxios('/api/items-index',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const cartItems = [];
            const products = (data[0])
            const quantities = data[1];
            for (let i = 0; i < products.length; i++){
                const cartItem = {
                    id: products[i].id,
                    name: products[i].name,
                    price: products[i].price,
                    size: products[i].size,
                    stock: products[i].stock,
                    discount: products[i].discount,
                    image: products[i].image,
                    category_id: products[i].category_id,
                    amount: quantities[i]
                };

                cartItems.push(cartItem);
            }
            setCart(cartItems)
        } catch (error) {
            console.log(error)
        }
    }

    const addItem = async (product) => {
        const token = localStorage.getItem('AUTH_TOKEN')

        const cart_id = userCart.id
        const product_id = product.id
        const quantity = product.amount

        try {
            const {data} = await customerAxios.post('/api/items-store',
            {
                cart_id,
                product_id,
                quantity
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getCartItems()
        } catch (error) {
            console.log(error)
        }
    }

    const updateItem = async (product) => {
        const token = localStorage.getItem('AUTH_TOKEN')

        const cart_id = userCart.id
        const product_id = product.id
        const quantity = product.amount

        try {
            const {data} = await customerAxios.post('/api/items-update',
            {
                cart_id,
                product_id,
                quantity
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getCartItems()
        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = async (updatedUserData) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        
        try {
            await customerAxios.post('/api/user-update', updatedUserData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    const updateOrder = async (formData) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        
        try {
            const {data} =await customerAxios.post('/api/order-update', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const createProduct = async (formData) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        
        try {
            const {data} = await customerAxios.post('/api/products-store', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        getCategories()
        getCart()
        getCartItems()
    }, [])

    useEffect(() => {
        let newTotal = 0;
    
        for (const product of cart) {
            const subtotal = calculateDiscountedPrice(Number(product.price), Number(product.discount), product.amount);
            newTotal += Number(subtotal);
        }
        setTotal(newTotal);
    }, [cart]);

    return (
        <StoreContext.Provider
            value={{
                categories,
                currentCategory,
                handleClickCategory,
                modal,
                handleClickModal,
                product,
                handleSetProduct,
                cart,
                handleClickAddProductCart,
                handleEditCartProduct,
                handleDeleteCartProduct,
                total,
                userCart,
                handleClickModalUser,
                modalUser,
                handleSetUser,
                user,
                modalPurchase,
                handleClickModalPurchase,
                handleClickPurchase,
                updateUser,
                handleClickModalNewProduct,
                modalNewProduct,
                createProduct,
                order,
                modalOrder,
                handleClickModalOrder,
                handleSetOrder,
                updateOrder
            }}
        >{children}</StoreContext.Provider>
    )
}

export {
    StoreProvider
}

export default StoreContext