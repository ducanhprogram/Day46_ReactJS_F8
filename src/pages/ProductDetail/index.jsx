import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const ProductDetail = () => {
    const params = useParams();

    const [product, isLoading] = useFetch(
        `https://api01.f8team.dev/api/products/${params.slug}`
    );

    return (
        <div>
            <h1>Product Detail</h1>
            {isLoading && <div>Loading...</div>}
            <h2>{product.title}</h2>
            <img src={product.thumbnail} alt={product.title} />
            {/* <Link to="/products/1">Product 1</Link> */}
        </div>
    );
};
export default ProductDetail;
