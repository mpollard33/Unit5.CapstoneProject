import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

test('renders product card with correct information', () => {
  const product = {
    id: 1,
    title: 'Sample Product',
    price: 19.99,
    description: 'Sample description',
    
  };

  render(<ProductCard product={product} />);
  
  expect(screen.getByText('Sample Product')).toBeInTheDocument();
  expect(screen.getByText('$19.99')).toBeInTheDocument();
  expect(screen.getByText('Sample description')).toBeInTheDocument();
});
