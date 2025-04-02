import { Link } from "react-router-dom";

import config from "@/config";

import { useEffect, useState } from "react";
import * as productService from "@/services/productService";

/*
Route: /products/:id

Link to: /products/${product.id}
*/

const Products = () => {
    // const [result, isLoading] = useFetch(
    //     `https://api01.f8team.dev/api/products`
    // );

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function handle() {
            const res = await productService.getAll();
            setProducts(res.data);
        }
        handle();
    }, []);

    // console.log({ products, isLoading });
    return (
        <div>
            <h1>Products Page</h1>
            {/* {isLoading && <div>Loading...</div>} */}
            <ul>
                {products.map((product) => {
                    return (
                        <li key={product.id}>
                            <Link
                                to={`${config.routes.products}/${product.slug}`}
                            >
                                {product.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
export default Products;
