const ProductCard = ({ product }) => {
  return (
    <>
      <li>
        <img src={product.image} alt={product.title} />
        <header>
          <h3>{product.title}</h3>
        </header>
        <p className="price">${product.price.toFixed(2)}</p>
        <div className="blue-box">
          <p>{product.description}</p>
        </div>
      </li>
    </>
  );
};

export default ProductCard;
