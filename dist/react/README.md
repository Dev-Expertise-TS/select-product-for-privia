# React Component Module

This is a React component module that requires React and ReactDOM as peer dependencies.

## Usage

```javascript
import { SelectHotelProductItem } from 'select-hotel-product-widget/react';

function App() {
  return (
    <SelectHotelProductItem
      sabreId={383336}
      checkIn="2025-08-15"
      nights={2}
      numOfPeople="2"
    />
  );
}
```
