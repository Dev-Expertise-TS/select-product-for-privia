import React from 'react';
import { createRoot } from 'react-dom/client';
import r2wc from '@r2wc/react-to-web-component';
import { SelectHotelProductItem } from '../components/select-hotel-product-item';
import '../app/globals.css';

// Web Component 래퍼 생성
const SelectHotelProductWidget = r2wc(SelectHotelProductItem, {
  props: {
    sabreId: 'number',
    checkIn: 'string',
    nights: 'number', 
    numOfPeople: 'string',
    prdTitle: 'string',
    // benefits와 cautions는 JSON 문자열로 전달
    benefits: 'json',
    cautions: 'json'
  }
});

// Custom Element 등록
customElements.define('select-hotel-product', SelectHotelProductWidget);

// 개발 모드에서 직접 React 컴포넌트도 내보내기
export { SelectHotelProductItem };
export default SelectHotelProductWidget;