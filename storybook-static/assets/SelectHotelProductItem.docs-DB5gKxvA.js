import{j as n}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as i}from"./index-CCQ0JasZ.js";import{M as l,P as c,C as t,S as d}from"./blocks-CRrOoTVt.js";import{S as o}from"./SelectHotelProductItem.stories-BcWhniQD.js";import"./iframe-Df8nsTPe.js";import"./preload-helper-C1FmrZbK.js";import"./index-DOX5JyM7.js";import"./select-hotel-product-item-C4wKuu-M.js";function r(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(l,{of:o}),`
`,n.jsx(e.h1,{id:"selecthotelproductitem",children:"SelectHotelProductItem"}),`
`,n.jsx(e.p,{children:"호텔 상품을 선택하고 표시하는 React 컴포넌트입니다. Sabre API를 통해 실시간 가격 정보를 가져와 표시합니다."}),`
`,n.jsx(c,{}),`
`,n.jsx(e.h2,{id:"props",children:"Props"}),`
`,n.jsx(t,{}),`
`,n.jsx(e.h2,{id:"사용-예시",children:"사용 예시"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { SelectHotelProductItem } from './components/select-hotel-product-item';

function App() {
  return (
    <SelectHotelProductItem
      sabreId={383336}
      checkIn="2025-08-12"
      nights={1}
      numOfPeople="2"
    />
  );
}
`})}),`
`,n.jsx(e.h2,{id:"props-상세-설명",children:"Props 상세 설명"}),`
`,n.jsx(e.h3,{id:"sabreid",children:"sabreId"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"타입"}),": ",n.jsx(e.code,{children:"number"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"필수"}),": ✅"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"설명"}),": Sabre 시스템의 호텔 고유 식별자입니다."]}),`
`]}),`
`,n.jsx(e.h3,{id:"checkin",children:"checkIn"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"타입"}),": ",n.jsx(e.code,{children:"Date | string"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"필수"}),": ✅"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"설명"}),": 체크인 날짜입니다. YYYY-MM-DD 형식의 문자열 또는 Date 객체를 받습니다."]}),`
`]}),`
`,n.jsx(e.h3,{id:"nights",children:"nights"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"타입"}),": ",n.jsx(e.code,{children:"number"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"필수"}),": ❌"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"기본값"}),": ",n.jsx(e.code,{children:"1"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"설명"}),": 숙박 일수입니다."]}),`
`]}),`
`,n.jsx(e.h3,{id:"numofpeople",children:"numOfPeople"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"타입"}),": ",n.jsx(e.code,{children:"string"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"필수"}),": ❌"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"기본값"}),": ",n.jsx(e.code,{children:'"2"'})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"설명"}),": 투숙 인원 수를 나타내는 문자열입니다."]}),`
`]}),`
`,n.jsx(e.h2,{id:"모든-스토리",children:"모든 스토리"}),`
`,n.jsx(d,{})]})}function f(s={}){const{wrapper:e}={...i(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(r,{...s})}):r(s)}export{f as default};
