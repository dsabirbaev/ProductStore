import { useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router-dom";
import productAPI from "../../service/product";
import "./style.scss";
import {Button} from "flowbite-react";
const index = () => {

    const [state, setState] = useState([]);
    const [load, setLoad] = useState(true);

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        productAPI.getProductItem(id).then((response) => {
            setState(response.data);
            setLoad(false);
        }).catch((err) => {
            console.log(err.message);
        })
    },[])

    if(load){
        return <h1>Loading...</h1>
    }
    return (
        <section className="py-10 min-h-[calc(100vh-80px-80px)]">
            <div className="container">
                <div className="border border-sky-500 rounded-xl p-5">
                    <Button onClick={() => navigate(-1)} className="mb-5">Back</Button>

                    <div className="flex gap-x-5">
                        <img src={state?.image} alt="image" className="w-[300px] h-[200px] object-contain object-center"/>
                        <div className="flex flex-col gap-y-4 text-[18px] border-[2px] border-sky-500 rounded-2xl p-4">
                            <h2 className="font-medium text-[25px]">{state?.title}</h2>
                            <p><span className="font-bold">Category: </span> {state?.category}</p>
                            <p>{state?.description}</p>   
                            <p><span className="font-bold">Price: </span>$ {state?.price}</p>
                            <p><span className="font-bold">Rate:</span> {state?.rating?.rate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default index;