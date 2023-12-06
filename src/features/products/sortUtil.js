const sortData = (data, sortType, sortOrder) => {
  return (data || []).slice().sort((a, b) => {
    switch (sortType) {
      case 'price':
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      case 'rating':
        return sortOrder === 'asc'
          ? a.rating.rate - b.rating.rate
          : b.rating.rate - a.rating.rate;
      case 'rating count':
        return sortOrder === 'asc'
          ? a.rating.count - b.rating.count
          : b.rating.count - a.rating.count;
      default:
        return 0;
    }
  });
};

export default sortData;
