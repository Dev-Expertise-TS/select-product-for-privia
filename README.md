# Select Hotel Product Widget

호텔 상품 선택 위젯을 위한 React 기반 웹 컴포넌트입니다. React로 개발하되, 최종 배포는 표준 웹 컴포넌트(Custom Element)로 패키징되어 어떤 웹 환경에서도 사용 가능합니다.

## 🎯 주요 특징

- **웹 컴포넌트**: 프레임워크 독립적으로 어떤 웹 환경에서도 사용 가능
- **React 개발**: 개발은 React로 진행하되, 빌드 시 웹 컴포넌트로 변환
- **실시간 가격 조회**: Sabre API를 통한 실시간 호텔 가격 정보
- **반응형 디자인**: 모바일과 데스크톱 환경에서 최적화된 UI
- **카카오톡 연동**: 고객 상담을 위한 카카오톡 통합

## 📦 웹 컴포넌트 사용방법

### 1. 빌드된 파일 포함하기

```html
<!-- UMD 버전 (레거시 환경) -->
<script src="path/to/select-hotel-product-widget.umd.js"></script>

<!-- 또는 ES Module 버전 (모던 브라우저) -->
<script type="module" src="path/to/select-hotel-product-widget.es.js"></script>
```

### 2. HTML에서 사용하기

```html
<select-hotel-product 
    sabre-id="383336"
    check-in="2025-08-15"
    nights="2"
    num-of-people="2"
    api-base-url="https://api.example.com">
</select-hotel-product>
```

### 3. JavaScript에서 동적 생성

```javascript
const widget = document.createElement('select-hotel-product');
widget.setAttribute('sabre-id', '383336');
widget.setAttribute('check-in', '2025-08-15');
widget.setAttribute('nights', '2');
widget.setAttribute('num-of-people', '2');
widget.setAttribute('api-base-url', 'https://api.example.com');
document.body.appendChild(widget);
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

### 개발 서버 실행

```bash
# 웹 컴포넌트 개발 서버 (http://localhost:5173)
pnpm dev:widget

# Next.js 개발 서버 (http://localhost:3000)
pnpm dev
```

## 🔨 빌드 방법

### 웹 컴포넌트 빌드

```bash
pnpm build:widget
```

이 명령어는 다음 파일들을 생성합니다:
- `dist/select-hotel-product-widget.es.js` - ES Module 형식
- `dist/select-hotel-product-widget.umd.js` - UMD 형식 (레거시 지원)
- `dist/style.css` - 스타일시트 (자동으로 컴포넌트에 포함됨)

### Next.js 앱 빌드

```bash
pnpm build
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

## 🏛️ 프로젝트 구조

```
select-product-for-privia/
├── src/
│   ├── widget.tsx          # 웹 컴포넌트 엔트리 포인트
│   └── mock-server.js      # 개발용 Mock API 서버
├── components/
│   ├── select-hotel-product-item.tsx  # 메인 React 컴포넌트
│   └── ui/                 # shadcn/ui 컴포넌트
├── app/                    # Next.js 앱 (개발/테스트용)
├── dist/                   # 빌드된 웹 컴포넌트 (빌드 후 생성)
├── vite.config.ts          # Vite 빌드 설정
└── index.html              # 웹 컴포넌트 개발 환경
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

## 🔍 디버깅

개발 중 문제가 발생하면:

1. 브라우저 개발자 도구의 콘솔 확인
2. 네트워크 탭에서 API 호출 확인
3. Elements 탭에서 Shadow DOM 구조 확인

## 📝 라이센스

이 프로젝트는 비공개 프로젝트입니다.