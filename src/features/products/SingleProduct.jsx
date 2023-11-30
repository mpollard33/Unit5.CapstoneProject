import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from './productsApi';
import './productCard.css';

const ProductDetails = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  console.log('Product Details: ', data);

  return (
    <>
      <div className="product-card-container">
        <img
          src={data.image}
          alt={data.title}
          className="single-product-image"
        />
        <div className="product-info">
          <header>
            <h2 className="single-product-title">{data.title}</h2>
          </header>
          <p className="single-product-price">{data.price.toFixed(2)}</p>
          <p className="single-product-description">{data.description}</p>
          <form>
            <button className="single-product-button">Add to Cart</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
