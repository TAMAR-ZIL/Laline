import { useDispatch, useSelector } from "react-redux"
import { addToCart, deleteFromCart } from '../features/cartSlice'
import { useEffect } from "react";


const useCart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cartArr);
    const totalSum = useSelector((state) => state.cart.totalSum);
    const cnt = useSelector((state) => state.cart.cnt)
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const Add = (product) => {
        dispatch(addToCart(product))
    }
    const Remove = (productId) => {
        dispatch(deleteFromCart(productId))
    }
    return ({ cart, totalSum, cnt, addToCart: Add, removeFromCart: Remove });
}

export default useCart;