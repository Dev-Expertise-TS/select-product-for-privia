
import React from 'react';
import { SelectHotelProductItem } from '/Users/ts1233/select-product-for-privia/dist/select-hotel-product-widget.es.js';

// Check if component has expected properties
const props = {
  sabreId: 123456,
  checkIn: '2025-08-12',
  nights: 1,
  numOfPeople: '2'
};

try {
  const element = React.createElement(SelectHotelProductItem, props);
  console.log(element.type === SelectHotelProductItem ? 'Component instantiation successful' : 'Component instantiation failed');
} catch (error) {
  console.log('Component instantiation failed:', error.message);
}
