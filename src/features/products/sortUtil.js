const sortData = (data, sort) => {
  return (data || []).slice().sort((a, b) => {
    switch (sort.sortType) {
      case 'price':
        return sort.order === 'asc' ? a.price - b.price : b.price - a.price;
      case 'rating':
        return sort.order === 'asc'
          ? a.rating.rate - b.rating.rate
          : b.rating.rate - a.rating.rate;
      case 'count':
        return sort.order === 'asc'
          ? a.rating.count - b.rating.count
          : b.rating.count - a.rating.count;
      default:
        return 0;
    }
  });
};

export default sortData;