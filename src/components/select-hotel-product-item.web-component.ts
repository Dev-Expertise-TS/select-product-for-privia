import r2wc from '@r2wc/react-to-web-component';
import { SelectHotelProductItem } from './select-hotel-product-item';
import '../globals.css';

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
customElements.define('select-hotel-product', SelectHotelProductWidget);

// 개발 모드에서 직접 React 컴포넌트도 내보내기
export { SelectHotelProductItem };
export default SelectHotelProductWidget;