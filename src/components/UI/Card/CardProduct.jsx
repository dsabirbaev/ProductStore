

import "./style.scss";
import { Card } from 'flowbite-react';

const CardProduct = ({case:{image, title, description}}) => {

    return (
        <Card className="w-[280px]">
            <img src={image} className="object-contain object-center h-[150px]"/>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                {description}
            </p>
        </Card>
    );
};

export default CardProduct;