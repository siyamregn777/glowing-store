'use client'
import { productsDummyData } from "../assets/assets";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
}

export const AppContextProvider = ({ children }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY;
    const router = useRouter();
    const { data: session, status } = useSession();

    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchProductData = async () => {
        setProducts(productsDummyData); // Temporary dummy data
        // try {
        //     const { data } = await axios.get("/api/product/list");
        //     if (data.success) {
        //         setProducts(data.products);
        //     } else {
        //         toast.error(data.message);
        //     }
        // } catch (err) {
        //     toast.error(err.message);
        // }
    };

    const fetchUserData = async () => {
        try {
            if (status === "authenticated") {
                const { data } = await axios.get("/api/user/data");
                
                if (data.success) {
                    setUserData(data.user);
                    setCartItems(data.user.cartItems || {});
                    setIsSeller(data.user.role === 'seller');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (itemId) => {
        const newCartItems = { ...cartItems };
        newCartItems[itemId] = (newCartItems[itemId] || 0) + 1;
        setCartItems(newCartItems);

        if (status === "authenticated") {
            try {
                await axios.post("/api/cart/update", { cartData: newCartItems });
                toast.success("Item added to cart");
            } catch (err) {
                toast.error(err.response?.data?.message || err.message);
                setCartItems(cartItems); // Revert on error
            }
        }
    };

    const updateCartQuantity = async (itemId, quantity) => {
        const newCartItems = { ...cartItems };
        if (quantity <= 0) {
            delete newCartItems[itemId];
        } else {
            newCartItems[itemId] = quantity;
        }
        setCartItems(newCartItems);

        if (status === "authenticated") {
            try {
                await axios.post("/api/cart/update", { cartData: newCartItems });
                toast.success("Cart updated successfully");
            } catch (err) {
                toast.error(err.response?.data?.message || err.message);
                setCartItems(cartItems); // Revert on error
            }
        }
    };

    const getCartCount = () => {
        return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
    };

    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, qty]) => {
            const product = products.find(p => p._id === itemId);
            return product ? total + (product.offerPrice * qty) : total;
        }, 0).toFixed(2);
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    useEffect(() => {
        if (status === "authenticated") {
            fetchUserData();
        } else if (status === "unauthenticated") {
            setLoading(false);
            setUserData(null);
            setIsSeller(false);
            setCartItems({});
        }
    }, [status]);

    const value = {
        user: userData,
        session,
        status,
        loading,
        currency,
        router,
        isSeller,
        setIsSeller,
        userData,
        fetchUserData,
        products,
        fetchProductData,
        cartItems,
        setCartItems,
        addToCart,
        updateCartQuantity,
        getCartCount,
        getCartAmount
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};


// // context/AppContext.jsx



// 'use client'
// import { productsDummyData, userDummyData } from "../assets/assets";
// import { useAuth, useUser } from "@clerk/nextjs";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { createContext, use, useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export const AppContext = createContext();

// export const useAppContext = () => {
//     return useContext(AppContext)
// }

// export const AppContextProvider = (props) => {

//     const currency = process.env.NEXT_PUBLIC_CURRENCY
//     const router = useRouter()

//     const {user} = useUser();

//     const {getToken} = useAuth()

//     const [products, setProducts] = useState([])
//     const [userData, setUserData] = useState(false)
//     const [isSeller, setIsSeller] = useState(false)
//     const [cartItems, setCartItems] = useState({})

//     const fetchProductData = async () => {
//         setProducts(productsDummyData) //(it will be removed later)
//         // try{
//         //     const {data} = await axios.get("/api/product/list", {
//         //         method: "GET",
//         //         headers: {
//         //             "Content-Type": "application/json"
//         //         }
//         //     })
//         //     if(data.success){
//         //         setProducts(data.products)
//         //     }
//         //     else{
//         //         toast.error(data.message)
//         //     }
//         // }

//         // catch(err) {
//         //     toast.error(err.message)
//         // }
//     }
//     const fetchUserData = async () => {
//         try{
//             if (user.publicMetadata.role === "seller") {
//                 setIsSeller(true)
//             }
//             const token= await getToken()

//             const {data} = await axios.get("/api/user/data", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`
//                 }
//             })
//             if(data.succuss){
//                 setUserData(data.user)
//                 setCartItems(data.user.cartItems)
//             }
//             else{
//                 toast.error(data.message)
//             }
//         }
//         catch(err) {
//             toast.err(err.message)
//         }
//     }

//     const addToCart = async (itemId) => {

//         let cartData = structuredClone(cartItems);
//         if (cartData[itemId]) {
//             cartData[itemId] += 1;
//         }
//         else {
//             cartData[itemId] = 1;
//         }
//         setCartItems(cartData);
//         if(user){
//             try{
//                 const token = await getToken()
//                 await axios.post("/api/cart/update", {
//                     cartData: cartData
//                 }, {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`
//                     }
//                 })
                
//                     toast.success("Items added to Cart ")
               
//             }
//             catch(err) {
//                 toast.error(err.message)
//             }
//         }

//     }

//     const updateCartQuantity = async (itemId, quantity) => {

//         let cartData = structuredClone(cartItems);
//         if (quantity === 0) {
//             delete cartData[itemId];
//         } else {
//             cartData[itemId] = quantity;
//         }
//         setCartItems(cartData)
//         if(user){
//             try{
//                 const token = await getToken()
//                 await axios.post("/api/cart/update", {
//                     cartData: cartData
//                 }, {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`
//                     }
//                 })
                
//                     toast.success("Cart updated successfully")
               
//             }
//             catch(err) {
//                 toast.error(err.message)
//             }
//         }
//     }

//     const getCartCount = () => {
//         let totalCount = 0;
//         for (const items in cartItems) {
//             if (cartItems[items] > 0) {
//                 totalCount += cartItems[items];
//             }
//         }
//         return totalCount;
//     }

//     const getCartAmount = () => {
//         let totalAmount = 0;
//         for (const items in cartItems) {
//             let itemInfo = products.find((product) => product._id === items);
//             if (cartItems[items] > 0) {
//                 totalAmount += itemInfo.offerPrice * cartItems[items];
//             }
//         }
//         return Math.floor(totalAmount * 100) / 100;
//     }

//     useEffect(() => {
//         fetchProductData()
//     }, [])

//     useEffect(() => {
//         if(user) {
//             fetchUserData()
//         }
//     }, [user])

//     const value = {
//         user, getToken,
//         currency, router,
//         isSeller, setIsSeller,
//         userData, fetchUserData,
//         products, fetchProductData,
//         cartItems, setCartItems,
//         addToCart, updateCartQuantity,
//         getCartCount, getCartAmount,
//         router
//     }

//     return (
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }