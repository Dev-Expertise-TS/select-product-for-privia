import{S as a}from"./select-hotel-product-item-C4wKuu-M.js";const n={title:"React Components/SelectHotelProductItem",component:a,parameters:{layout:"fullscreen",docs:{description:{component:"호텔 상품을 선택하고 표시하는 React 컴포넌트입니다. Sabre API를 통해 실시간 가격 정보를 가져와 표시합니다."}}},argTypes:{sabreId:{control:"number",description:"Sabre 시스템의 호텔 고유 식별자",table:{type:{summary:"number"},category:"필수"}},checkIn:{control:"text",description:"체크인 날짜 (YYYY-MM-DD 형식의 문자열 또는 Date 객체)",table:{type:{summary:"Date | string"},category:"필수"}},nights:{control:"number",description:"숙박 일수",table:{type:{summary:"number"},defaultValue:{summary:"1"},category:"선택"}},numOfPeople:{control:"text",description:"투숙 인원 수를 나타내는 formatted string",table:{type:{summary:"string"},defaultValue:{summary:'"2"'},category:"선택"}}}},e={args:{sabreId:383336,checkIn:"2025-08-12",nights:1,numOfPeople:"2"},parameters:{docs:{description:{story:"기본 호텔 상품 표시 예제입니다. Sabre ID 383336 호텔의 2025년 8월 12일 체크인, 1박, 2인 기준 가격을 표시합니다."}}}};var t,r,o;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    sabreId: 383336,
    checkIn: '2025-08-12',
    nights: 1,
    numOfPeople: '2'
  },
  parameters: {
    docs: {
      description: {
        story: '기본 호텔 상품 표시 예제입니다. Sabre ID 383336 호텔의 2025년 8월 12일 체크인, 1박, 2인 기준 가격을 표시합니다.'
      }
    }
  }
}`,...(o=(r=e.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};const s=["Default"],m=Object.freeze(Object.defineProperty({__proto__:null,Default:e,__namedExportsOrder:s,default:n},Symbol.toStringTag,{value:"Module"}));export{m as S};
