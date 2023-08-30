
import { useEffect, useState, useReducer } from "react";

import "./style.scss";

import productAPI from "../../service/product";
import CardProduct from "../../components/UI/Card/CardProduct";
const index = () => {

    const initState = {
        products: [],
        loading: true,
        errorMessage: ""
    }
    const reducer = (state, action) => {

        switch (action.type) {
            case "SET_PRODUCTS":
                return { ...state, products: [...action.payload] };
            case "LOADER_OFF":
                return { ...state, loading: false };
            case "SET_ERROR":
                return { ...state, errorMessage: action.payload };
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, initState);

    const fetchingProduct = async () => {
        try {
            const response = await productAPI.getProduct();
            if (response.status === 200) {
                dispatch({ type: "SET_PRODUCTS", payload: response.data })
                dispatch({ type: "LOADER_OFF" })
            } else {
                dispatch({ type: "SET_ERROR", payload: response.status })
            }
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }
    useEffect(() => {
        fetchingProduct();
    }, [])
    return (
        <section>
            <div className="container">
                <div className="py-5">
                        <h2 className="font-semibold text-center text-xl">Our Products</h2>
                        <div className="grid grid-cols-4 gap-y-5">
                            {
                                state.products.map((item) => {
                                    return <CardProduct key={item.id} case={item}/>
                                })
                            }
                            
                        </div>
                </div>
            </div>

        </section>
    );
};

export default index;