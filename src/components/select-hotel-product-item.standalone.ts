// 웹 컴포넌트 스탠드얼론 버전 - 모든 의존성 포함
import React from 'react';
import ReactDOM from 'react-dom/client';
import r2wc from '@r2wc/react-to-web-component';
import { SelectHotelProductItem } from './select-hotel-product-item';
import '../globals.css';

// window 객체에 React와 ReactDOM 노출 (디버깅용)
if (typeof window !== 'undefined') {
  (window as any).React = React;
  (window as any).ReactDOM = ReactDOM;
}

// Web Component 래퍼 생성
const SelectHotelProductWidget = r2wc(SelectHotelProductItem, {
  props: {
    sabreId: 'number',
    checkIn: 'string',
    nights: 'number', 
    numOfPeople: 'string'
  }
});

// Custom Element 등록
if (typeof customElements !== 'undefined' && !customElements.get('select-hotel-product')) {
  customElements.define('select-hotel-product', SelectHotelProductWidget);
}

// 전역 네임스페이스에 노출 (선택사항)
if (typeof window !== 'undefined') {
  (window as any).SelectHotelProductWidget = SelectHotelProductWidget;
}