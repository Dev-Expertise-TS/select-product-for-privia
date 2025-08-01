# 🏨 Select Hotel Product Widget - Web Component

React 컴포넌트를 Web Component로 변환하여 어떤 웹사이트에서도 사용할 수 있는 호텔 상품 선택 위젯입니다.

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 개발 모드 (HMR 지원)

```bash
# Web Component 개발 서버 시작
pnpm dev:widget

# 브라우저에서 http://localhost:5173/src/dev.html 접속
```

### 3. 프로덕션 빌드

```bash
# Web Component 빌드
pnpm build:widget

# dist/ 폴더에 빌드 결과 생성됨
```

## 📦 사용법

### HTML에서 사용

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <!-- 위젯 스크립트 로드 -->
    <script src="select-hotel-product-widget.umd.js"></script>
    
    <!-- 위젯 사용 -->
    <select-hotel-product 
        sabre-id="12345"
        check-in="2024-03-15"
        nights="2"
        num-of-people="2"
        api-base-url="https://your-api.com">
    </select-hotel-product>
</body>
</html>
```

### JavaScript에서 동적 생성

```javascript
// 위젯 요소 생성
const widget = document.createElement('select-hotel-product');
widget.setAttribute('sabre-id', '12345');
widget.setAttribute('check-in', '2024-03-15');
widget.setAttribute('nights', '2');
widget.setAttribute('api-base-url', 'https://your-api.com');

// DOM에 추가
document.body.appendChild(widget);
```

## 🔧 속성 (Attributes)

### 필수 속성

| 속성 | 타입 | 설명 |
|------|------|------|
| `sabre-id` | number | Sabre 시스템의 호텔 ID |
| `check-in` | string | 체크인 날짜 (YYYY-MM-DD) |
| `api-base-url` | string | API 서버 주소 |

### 선택적 속성

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `nights` | number | 1 | 숙박 일수 |
| `num-of-people` | string | "2" | 인원 수 |
| `prd-title` | string | "럭셔리 셀렉트 - 후불 현장 결제" | 상품 제목 |
| `benefits` | json | 기본 혜택 | 혜택 목록 (JSON 문자열) |
| `cautions` | json | 기본 주의사항 | 주의사항 목록 (JSON 문자열) |

### 복합 속성 예제

```html
<select-hotel-product 
    sabre-id="67890"
    check-in="2024-04-01"
    nights="3"
    num-of-people="4"
    api-base-url="https://api.example.com"
    prd-title="프리미엄 패키지 - 특별 혜택"
    benefits='[{"icon":"🍽️","benefit":"4인 조식 포함"},{"icon":"💳","benefit":"$200 크레딧 제공"}]'
    cautions='["환율 변동에 따라 최종 금액이 달라질 수 있습니다."]'>
</select-hotel-product>
```

## 🛠️ 개발 환경

### 파일 구조

```
├── src/
│   ├── widget.tsx          # Web Component 래퍼
│   └── dev.html           # 개발용 테스트 페이지
├── components/
│   └── select-hotel-product-item.tsx  # React 컴포넌트
├── vite.config.ts         # Vite 설정
└── package.json
```

### 개발 스크립트

```bash
# Next.js 앱 개발 (기존)
pnpm dev

# Web Component 개발 (HMR 지원)
pnpm dev:widget

# Web Component 빌드
pnpm build:widget

# 빌드 결과 미리보기
pnpm preview
```

## 🎯 주요 특징

- ✅ **HMR 지원**: React 코드 수정 시 실시간 반영
- ✅ **Tailwind CSS 포함**: 스타일이 번들에 포함됨
- ✅ **TypeScript 지원**: 타입 안전성 보장
- ✅ **범용성**: 모든 HTML 환경에서 사용 가능
- ✅ **최적화**: 1.26KB (gzipped) + 컴포넌트 코드

## 🚀 배포

### CDN 배포
```html
<script src="https://your-cdn.com/select-hotel-product-widget.umd.js"></script>
```

### NPM 패키지 배포
```bash
npm publish
```

### 직접 호스팅
`dist/` 폴더의 파일들을 웹서버에 업로드

## 🔄 개발 워크플로

1. **React 컴포넌트 수정** → `components/select-hotel-product-item.tsx`
2. **실시간 테스트** → `pnpm dev:widget` 실행
3. **브라우저 확인** → `http://localhost:5173/src/dev.html`
4. **프로덕션 빌드** → `pnpm build:widget`
5. **배포** → `dist/` 파일들 업로드

## 📋 API 연동

위젯은 다음 API 엔드포인트를 호출합니다:

```
GET {apiBaseUrl}/{sabreId}/select-rooms-price/?check_in={date}&nights={nights}&number_of_people={people}
```

응답 형식:
```json
{
  "propertyNameKor": "호텔명",
  "propertyNameEng": "Hotel Name", 
  "roomDescriptions": [
    {
      "price": 150000,
      "roomCode": "STD",
      "roomName": "Standard Room",
      "roomDescription": "객실 설명",
      "cancelDeadLine": "20240314"
    }
  ]
}
```