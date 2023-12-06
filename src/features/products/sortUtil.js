import { useGetProductsQuery } from './productsApi';

const sortData = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  return (data || []).slice().sort((a, b) => {
    switch (data.sort.sortType) {
      case 'price':
        return data.sort.order === 'asc'
          ? a.price - b.price
          : b.price - a.price;
      case 'rating':
        return data.sort.order === 'asc'
          ? a.rating.rate - b.rating.rate
          : b.rating.rate - a.rating.rate;
      case 'count':
        return data.sort.order === 'asc'
          ? a.rating.count - b.rating.count
          : b.rating.count - a.rating.count;
      default:
        return 0;
    }
  });
};

export default sortData;
