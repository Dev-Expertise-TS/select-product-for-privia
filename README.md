# Select Hotel Product Widget

호텔 상품 선택 위젯을 위한 React 기반 웹 컴포넌트입니다. React로 개발하되, 최종 배포는 표준 웹 컴포넌트(Custom Element)로 패키징되어 어떤 웹 환경에서도 사용 가능합니다.

## 🚀 빠른 시작

### 1분 만에 시작하기

```bash
# 1. 프로젝트 클론 및 의존성 설치
git clone [repository-url]
cd select-product-for-privia
pnpm install

# 2. 빌드
pnpm build

# 3. 브라우저에서 테스트
open tests/validation/browser-test.html
```

### 빌드된 파일 바로 사용하기

```html
<!-- HTML 파일에 추가 -->
<link rel="stylesheet" href="dist/style.css">
<script src="dist/select-hotel-product-widget.umd.js"></script>

<select-hotel-product 
  sabre-id="383336" 
  check-in="2025-08-15"
  nights="2"
  num-of-people="2">
</select-hotel-product>
```

## 🎯 주요 특징

- **듀얼 모드**: 하나의 번들로 React 컴포넌트와 웹 컴포넌트 모두 사용 가능
- **TypeScript 지원**: 완전한 타입 정의 제공
- **실시간 가격 조회**: Sabre API를 통한 실시간 호텔 가격 정보
- **반응형 디자인**: 모바일과 데스크톱 환경에서 최적화된 UI
- **카카오톡 연동**: 고객 상담을 위한 카카오톡 통합
- **자동 검증**: 빌드 결과물의 유효성을 자동으로 검증

## 🚀 개발 및 빌드

### 통합 개발 환경 (Storybook)

```bash
# React 컴포넌트와 Web Component를 모두 Storybook에서 HMR로 개발
pnpm dev
```

http://localhost:6006 에서 Storybook이 실행됩니다. React 컴포넌트와 Web Component 모두 실시간으로 수정사항이 반영됩니다.

### 통합 빌드

```bash
# 모든 패키지를 한 번에 빌드
pnpm build
```

이 명령어는 다음을 생성합니다:

#### 1. 스탠드얼론 웹 컴포넌트 (`dist/webcomponent/`)
모든 의존성(React, ReactDOM 등)이 포함된 독립 실행형 웹 컴포넌트:
- `select-hotel-product-widget-standalone.es.js` - ES 모듈
- `select-hotel-product-widget-standalone.umd.js` - UMD 모듈
- `style.css` - 컴포넌트 스타일시트
- `README.md` - 사용 가이드

#### 2. React 컴포넌트 모듈 (`dist/react/`)
React를 peer dependency로 요구하는 순수 React 컴포넌트:
- `select-hotel-product-widget.es.js` - ES 모듈
- `select-hotel-product-widget.umd.js` - UMD 모듈
- `index.d.ts` - TypeScript 타입 정의
- `README.md` - 사용 가이드

#### 3. 통합 번들 (`dist/`)
하위 호환성을 위한 기존 형태의 번들 (React 컴포넌트 + 웹 컴포넌트):
- `select-hotel-product-widget.es.js` - ES 모듈
- `select-hotel-product-widget.umd.js` - UMD 모듈
- `style.css` - 컴포넌트 스타일시트
- `index.d.ts` - TypeScript 타입 정의

#### 4. Storybook 정적 사이트 (`storybook-static/`)
호스팅 가능한 컴포넌트 문서 사이트

### 빌드 결과물 상세 설명

빌드된 번들은 **React 컴포넌트와 웹 컴포넌트를 모두 포함**하고 있습니다:

```javascript
// 📦 하나의 번들에서 두 가지 방식으로 사용 가능!

// 1. 웹 컴포넌트로 사용 (자동으로 customElements.define 실행됨)
import './dist/select-hotel-product-widget.es.js';
// HTML: <select-hotel-product sabre-id="123"></select-hotel-product>

// 2. React 컴포넌트로 직접 사용
import { SelectHotelProductItem } from './dist/select-hotel-product-widget.es.js';
// JSX: <SelectHotelProductItem sabreId={123} />
```

## 🚀 사용 방법

빌드된 번들은 **React 컴포넌트와 웹 컴포넌트를 모두 지원**합니다. 프로젝트 상황에 따라 적절한 방식을 선택하세요.

### 방법 1: 빌드된 번들에서 React 컴포넌트 사용하기

빌드된 번들에는 React 컴포넌트가 포함되어 있어, React 프로젝트에서 직접 import할 수 있습니다.

```tsx
// ES Module 번들에서 React 컴포넌트 import
import { SelectHotelProductItem } from './dist/select-hotel-product-widget.es.js';
// CSS도 함께 import
import './dist/style.css';

export default function HotelPage() {
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

#### TypeScript 지원

TypeScript 프로젝트에서는 타입 정의도 사용할 수 있습니다:

```tsx
// 타입 정의 import
import type { SelectHotelProductItemProps } from './dist/select-hotel-product-widget';

// 컴포넌트와 함께 사용
import { SelectHotelProductItem } from './dist/select-hotel-product-widget.es.js';
```

### 방법 2: 소스 코드에서 React 컴포넌트 직접 사용하기

개발 중이거나 더 세밀한 제어가 필요한 경우:

```tsx
// 소스에서 직접 import
import { SelectHotelProductItem } from './src/components/select-hotel-product-item';
import './src/globals.css';

// 사용법은 동일
<SelectHotelProductItem sabreId={383336} checkIn="2025-08-15" />
```

### 방법 3: NPM 패키지로 설치 후 사용 (패키지 배포 시)

```bash
# 패키지 설치
npm install @your-org/select-hotel-product-widget

# React 컴포넌트로 사용
import { SelectHotelProductItem } from '@your-org/select-hotel-product-widget';
import '@your-org/select-hotel-product-widget/dist/style.css';
```

## 📦 웹 컴포넌트 사용방법

웹 컴포넌트는 프레임워크에 독립적으로 작동하며, 순수 HTML/JavaScript 환경에서도 사용할 수 있습니다.

### 방법 1: CDN을 통한 사용

가장 간단한 방법으로, CDN URL을 통해 직접 로드합니다:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- CSS 스타일 포함 -->
  <link rel="stylesheet" href="https://cdn.example.com/select-hotel-product-widget/style.css">
</head>
<body>
  <!-- 웹 컴포넌트 사용 -->
  <select-hotel-product 
    sabre-id="383336"
    check-in="2025-08-15"
    nights="2"
    num-of-people="2">
  </select-hotel-product>

  <!-- 웹 컴포넌트 스크립트 로드 -->
  <script type="module" src="https://cdn.example.com/select-hotel-product-widget.es.js"></script>
</body>
</html>
```

### 방법 2: 로컬 파일 사용

빌드된 파일을 프로젝트에 포함시켜 사용:

#### 스탠드얼론 버전 (권장 - 의존성 설치 불필요)
```html
<!DOCTYPE html>
<html>
<head>
  <!-- CSS 스타일 포함 -->
  <link rel="stylesheet" href="./dist/webcomponent/style.css">
</head>
<body>
  <!-- 웹 컴포넌트 사용 -->
  <select-hotel-product 
    sabre-id="383336"
    check-in="2025-08-15"
    nights="2"
    num-of-people="2">
  </select-hotel-product>

  <!-- 스탠드얼론 웹 컴포넌트 로드 (모든 의존성 포함) -->
  <script type="module" src="./dist/webcomponent/select-hotel-product-widget-standalone.es.js"></script>
  
  <!-- 또는 레거시 브라우저 지원 -->
  <!-- <script src="./dist/webcomponent/select-hotel-product-widget-standalone.umd.js"></script> -->
</body>
</html>
```

#### NPM 패키지 버전 (React가 이미 있는 경우)
```html
<!-- React와 ReactDOM이 이미 로드되어 있어야 함 -->
<link rel="stylesheet" href="./node_modules/select-hotel-item/dist/style.css">
<script type="module">
  import './node_modules/select-hotel-item/dist/select-hotel-product-widget.es.js';
</script>
```

### 방법 3: JavaScript 프레임워크에서 웹 컴포넌트 사용

#### Vue.js에서 사용
```vue
<template>
  <select-hotel-product 
    :sabre-id="hotelId"
    :check-in="checkInDate"
    nights="3"
    num-of-people="2">
  </select-hotel-product>
</template>

<script>
import 'path/to/select-hotel-product-widget.es.js';
import 'path/to/style.css';

export default {
  data() {
    return {
      hotelId: 383336,
      checkInDate: '2025-08-15'
    }
  }
}
</script>
```

#### Angular에서 사용
```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'path/to/select-hotel-product-widget.es.js';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

// component.html
<select-hotel-product 
  sabre-id="383336"
  check-in="2025-08-15">
</select-hotel-product>
```

### 방법 4: 동적 생성 및 이벤트 처리

```javascript
// 웹 컴포넌트 동적 생성
const createHotelWidget = (container, options) => {
  const widget = document.createElement('select-hotel-product');
  
  // 속성 설정
  Object.entries(options).forEach(([key, value]) => {
    widget.setAttribute(key, value);
  });
  
  // 커스텀 이벤트 리스너 (향후 지원 시)
  widget.addEventListener('booking-click', (e) => {
    console.log('예약 버튼 클릭:', e.detail);
  });
  
  container.appendChild(widget);
  return widget;
};

// 사용 예제
const hotelWidget = createHotelWidget(document.getElementById('hotel-container'), {
  'sabre-id': '383336',
  'check-in': '2025-08-15',
  'nights': '2',
  'num-of-people': '2'
});

// 나중에 속성 업데이트
hotelWidget.setAttribute('nights', '5');
```

## 🏗️ 개발 환경 설정

### 사전 요구사항

- Node.js 18.x 이상
- pnpm 10.x 이상

### 설치

```bash
# 의존성 설치
pnpm install
```

### 개발 명령어

```bash
# Storybook 개발 서버 (권장) - React & Web Component 모두 지원
pnpm dev

# 개별 개발 서버
pnpm dev:widget    # Vite 개발 서버 (웹 컴포넌트)
pnpm dev:next      # Next.js 개발 서버
pnpm storybook     # Storybook 개발 서버
```

## 🔨 빌드 명령어

```bash
# 통합 빌드 (권장) - 모든 형식 한 번에 빌드
pnpm build

# 개별 빌드
pnpm build:widget        # 통합 번들 빌드
pnpm build:webcomponent  # 스탠드얼론 웹 컴포넌트 빌드
pnpm build:react         # React 컴포넌트 모듈 빌드
pnpm build:storybook     # Storybook 정적 사이트 빌드
```

## 🧪 테스트 및 검증

### 빌드 검증 테스트

프로젝트에는 빌드된 결과물의 유효성을 자동으로 검증하는 테스트 시스템이 포함되어 있습니다.

```bash
# 모든 검증 테스트 실행
pnpm test:validate

# 개별 테스트 실행
pnpm test:react        # React 컴포넌트 모듈 검증
pnpm test:webcomponent # 웹 컴포넌트 모듈 검증
pnpm test:storybook    # Storybook 빌드 검증
```

#### 검증 항목

**✅ React 컴포넌트 검증**
- TypeScript 정의 파일 존재 여부
- ES Module import 가능 여부
- 컴포넌트 인스턴스 생성 가능 여부
- 번들 크기 확인 (1MB 이하)

**✅ 웹 컴포넌트 검증**
- customElements 등록 여부
- HTML 속성 바인딩 작동 여부
- CSS 스타일 포함 여부
- 브라우저 호환성

**✅ Storybook 검증**
- 정적 빌드 파일 생성 여부
- 모든 스토리 포함 여부
- Documentation 페이지 생성 여부
- HTTP 서버 호스팅 가능 여부

### 브라우저에서 직접 테스트

```bash
# 1. 빌드 실행
pnpm build:widget

# 2. 브라우저에서 테스트 페이지 열기
open tests/validation/browser-test.html
```

테스트 페이지에서는:
- 웹 컴포넌트 렌더링 확인
- 동적 속성 변경 테스트
- 콘솔 로그 모니터링
- 여러 인스턴스 동시 렌더링 테스트

### 검증 보고서

테스트 실행 후 `validation-report.json` 파일이 생성되며, 다음 정보를 포함합니다:
```json
{
  "timestamp": "2025-08-01T07:10:17.354Z",
  "summary": {
    "total": 3,
    "passed": 3,
    "failed": 0
  },
  "results": [...]
}
```

## 📋 API 속성

### 필수 속성

| 속성 | 타입 | 설명 |
|------|------|------|
| `sabre-id` | number | Sabre 시스템의 호텔 ID |
| `check-in` | string | 체크인 날짜 (YYYY-MM-DD 형식) |
| `api-base-url` | string | Sabre API 서버 주소 |

### 선택 속성

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `nights` | number | 1 | 숙박 일수 |
| `num-of-people` | string | "2" | 투숙 인원 |
| `prd-title` | string | - | 상품 제목 |
| `benefits` | JSON string | - | 혜택 목록 (JSON 배열) |
| `cautions` | JSON string | - | 주의사항 목록 (JSON 배열) |

### 고급 사용 예제

```html
<select-hotel-product 
    sabre-id="383336"
    check-in="2025-08-15"
    nights="3"
    num-of-people="4"
    api-base-url="https://api.example.com"
    prd-title="프리미엄 스위트룸"
    benefits='["조식 포함", "늦은 체크아웃", "공항 셔틀"]'
    cautions='["취소 불가", "성인 전용"]'>
</select-hotel-product>
```

## 📊 빌드 결과물 상세 정보

### 번들 크기

#### 스탠드얼론 웹 컴포넌트 (모든 의존성 포함)
- **ES Module**: ~1MB (gzip: ~250KB)
- **UMD Module**: ~700KB (gzip: ~200KB)

#### React 컴포넌트 모듈 (React 제외)
- **ES Module**: ~50KB (gzip: ~15KB)
- **UMD Module**: ~40KB (gzip: ~12KB)

#### 공통 파일
- **CSS**: ~11KB (gzip: ~3KB)
- **Storybook**: ~5.5MB (정적 사이트 전체)

### 포함된 내용
- ✅ React 19 런타임
- ✅ 웹 컴포넌트 래퍼 (@r2wc/react-to-web-component)
- ✅ Tailwind CSS 스타일
- ✅ TypeScript 타입 정의
- ✅ Source Map (디버깅용)

## 🏛️ 프로젝트 구조

```
select-product-for-privia/
├── src/
│   ├── components/
│   │   ├── select-hotel-product-item.tsx           # 메인 React 컴포넌트
│   │   └── select-hotel-product-item.web-component.ts  # 웹 컴포넌트 래퍼
│   ├── stories/                # Storybook 스토리 및 문서
│   └── types/                  # TypeScript 타입 정의
├── tests/
│   └── validation/            # 빌드 검증 테스트
│       ├── test-react-module.js
│       ├── test-web-component.js
│       ├── test-storybook-build.js
│       └── browser-test.html
├── dist/                      # 빌드 결과물 (빌드 후 생성)
├── storybook-static/          # Storybook 정적 사이트 (빌드 후 생성)
├── scripts/
│   └── build-all.js          # 통합 빌드 스크립트
└── vite.config.build.ts      # Vite 빌드 설정
```

## 🔧 기술 스택

- **코어**: React 19, TypeScript
- **빌드**: Vite (웹 컴포넌트), Next.js 15 (개발 환경)
- **스타일링**: Tailwind CSS, shadcn/ui
- **웹 컴포넌트 변환**: @r2wc/react-to-web-component
- **아이콘**: Lucide React

## 🌐 브라우저 지원

웹 컴포넌트는 다음 브라우저에서 지원됩니다:
- Chrome/Edge 54+
- Firefox 63+
- Safari 10.1+
- iOS Safari 10.3+

## 🚀 배포

빌드된 웹 컴포넌트는 다음과 같이 배포할 수 있습니다:

1. **CDN 배포**
   ```html
   <script src="https://cdn.example.com/select-hotel-product-widget.es.js" type="module"></script>
   ```

2. **NPM 패키지**
   ```bash
   npm install @your-org/select-hotel-product-widget
   ```

3. **직접 호스팅**
   - `dist/` 폴더의 파일들을 웹 서버에 업로드
   - 적절한 CORS 헤더 설정 필요

## 🔍 트러블슈팅 가이드

### 일반적인 문제 해결

#### 1. "Failed to resolve module specifier 'react'" 에러

**증상**: ES 모듈로 웹 컴포넌트를 로드할 때 React 의존성 에러 발생

**해결 방법**:
```html
<!-- 스탠드얼론 버전 사용 (권장) -->
<script type="module" src="./dist/webcomponent/select-hotel-product-widget-standalone.es.js"></script>

<!-- 이 버전은 모든 의존성이 포함되어 있어 별도의 React 설치가 필요 없음 -->
```

#### 2. 번들 선택 가이드

**사용 상황별 권장 번들**:
- 순수 HTML에서 사용: 스탠드얼론 웹 컴포넌트 (`dist/webcomponent/`)
- React 앱에서 사용: React 컴포넌트 모듈 (`dist/react/`)
- 기존 프로젝트 호환성: 통합 번들 (`dist/`)

#### 3. 웹 컴포넌트가 렌더링되지 않음

**증상**: `<select-hotel-product>` 태그가 HTML에 그대로 표시됨

**해결 방법**:
```javascript
// 웹 컴포넌트 등록 확인
console.log(customElements.get('select-hotel-product')); // undefined면 미등록

// 스크립트 로드 순서 확인 - 컴포넌트 사용 전에 스크립트가 로드되어야 함
// 올바른 순서:
<script src="select-hotel-product-widget.js"></script>
<select-hotel-product></select-hotel-product>
```

#### 2. 스타일이 적용되지 않음

**증상**: 컴포넌트는 표시되지만 스타일이 없음

**해결 방법**:
```html
<!-- CSS 파일이 포함되었는지 확인 -->
<link rel="stylesheet" href="path/to/style.css">

<!-- 또는 빌드 시 CSS가 번들에 포함되었는지 확인 -->
```

#### 3. TypeScript 타입 오류

**증상**: "Property 'select-hotel-product' does not exist on type 'JSX.IntrinsicElements'"

**해결 방법**:
```typescript
// src/types/web-components.d.ts 파일 생성
declare namespace JSX {
  interface IntrinsicElements {
    'select-hotel-product': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        'sabre-id'?: number | string;
        'check-in'?: string;
        'nights'?: number | string;
        'num-of-people'?: string;
      },
      HTMLElement
    >;
  }
}
```

#### 4. API 호출 실패

**증상**: "카카오톡 상담 필요" 메시지만 표시

**해결 방법**:
```javascript
// 브라우저 콘솔에서 네트워크 오류 확인
// CORS 정책 확인
// API 엔드포인트 URL 확인

// 개발 중에는 환경 변수 설정
NEXT_PUBLIC_SABRE_API_BASE=https://your-api-url.com
```

#### 5. Node.js에서 테스트 시 오류

**증상**: "HTMLElement is not defined"

**해결 방법**:
```bash
# 이는 정상적인 동작입니다. 웹 컴포넌트는 브라우저 환경이 필요합니다.
# 브라우저에서 테스트하세요:
open tests/validation/browser-test.html
```

### 성능 최적화 팁

#### 번들 크기 줄이기
```javascript
// Tree shaking을 위해 필요한 컴포넌트만 import
import { SelectHotelProductItem } from './dist/select-hotel-product-widget.es.js';
// 전체 번들 import 피하기
// import * as Widget from './dist/select-hotel-product-widget.es.js';
```

#### Lazy Loading
```javascript
// 웹 컴포넌트 지연 로드
const loadHotelWidget = async () => {
  await import('./dist/select-hotel-product-widget.es.js');
  // 이제 <select-hotel-product> 사용 가능
};

// 필요할 때만 로드
if (document.querySelector('[data-need-hotel-widget]')) {
  loadHotelWidget();
}
```

### 디버깅 도구

#### 브라우저 개발자 도구
1. **Console**: 에러 메시지 및 로그 확인
2. **Network**: API 호출 상태 확인
3. **Elements**: DOM 구조 및 속성 확인
4. **React DevTools**: React 컴포넌트 상태 확인 (React로 사용 시)

#### 유용한 디버깅 코드
```javascript
// 웹 컴포넌트 상태 확인
const widget = document.querySelector('select-hotel-product');
console.log('Attributes:', widget.getAttributeNames().map(name => 
  `${name}="${widget.getAttribute(name)}"`
).join(' '));

// React 컴포넌트 props 확인 (개발 모드)
console.log('Component props:', widget._reactProps);
```

### 지원 및 문의

문제가 해결되지 않는 경우:
1. `validation-report.json` 확인
2. 브라우저 콘솔 에러 메시지 수집
3. 재현 가능한 최소 예제 준비
4. GitHub Issues에 문의

## 📝 라이센스

이 프로젝트는 비공개 프로젝트입니다.