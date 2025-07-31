# SelectHotelProductItem 컴포넌트

호텔 상품 정보를 표시하고 실시간 가격을 조회하는 React 컴포넌트입니다.

## 설치 및 설정

### 1. 상위 프로젝트 요구사항

#### Tailwind CSS 필수
이 컴포넌트는 Tailwind CSS에 완전히 의존합니다. 상위 프로젝트에서 Tailwind CSS가 설정되어 있어야 합니다.

**Tailwind CSS가 없는 경우:**
```bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**빠른 테스트용 (CDN):**
```html
<script src="https://cdn.tailwindcss.com"></script>
```

#### 필수 의존성
```bash
npm install next react react-dom lucide-react
```

### 2. 필수 환경 변수 설정
```bash
# .env
NEXT_PUBLIC_SABRE_API_BASE=https://your-sabre-api-endpoint.com
```
위 환경변수가 올바른 값으로 정확히 설정되어 있어야만 합니다.

## 사용 방법

```tsx
import { SelectHotelProductItem } from 'path/to/select-hotel-product-item';

export default function HotelPage() {
  return (
    <SelectHotelProductItem
      sabreId={383336}
      checkIn="2025-08-01"
      nights={2}
      numOfPeople="2"
    />
  );
}
```

## Props 명세

### 필수 Props (외부 주입)
이 Props들은 동적으로 변경되는 값들로, 상위 컴포넌트에서 반드시 제공해야 합니다.

| Prop | 타입 | 필수 | 설명 |
|------|------|------|------|
| `sabreId` | `number` | ✅ | Sabre API에서 사용하는 호텔 식별자 |
| `checkIn` | `Date \| string` | ✅ | 체크인 날짜 (YYYY-MM-DD 형식 권장) |
| `nights` | `number` | ❌ | 숙박 일수 (기본값: 1) |
| `numOfPeople` | `string` | ❌ | 인원 수 (기본값: "2") |

**사용 예시:**
```tsx
<SelectHotelProductItem
  sabreId={383336}
  checkIn="2025-08-01"
  nights={3}
  numOfPeople="4"
/>
```

### 선택적 Props (정적 값)
이 Props들은 대부분의 경우 기본값을 사용하며, 특별한 경우에만 커스터마이징합니다.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `prdTitle` | `string` | "럭셔리 셀렉트 - 후불 현장 결제" | 상품 제목 |
| `benefits` | `Benefit[]` | 기본 혜택 목록 | 호텔 혜택 리스트 |
| `cautions` | `string[]` | 기본 주의사항 | 결제 관련 주의사항 |

#### Benefit 타입 정의
```tsx
type Benefit = {
  icon: string | ReactNode;  // 아이콘 (문자열 URL 또는 React 컴포넌트)
  benefit: string;           // 혜택 설명
}
```

**커스텀 혜택 예시:**
```tsx
import { Wifi, Car } from 'lucide-react';

const customBenefits = [
  {
    icon: <Wifi className="w-4 h-4 text-gray-500" />,
    benefit: '무료 Wi-Fi'
  },
  {
    icon: <Car className="w-4 h-4 text-gray-500" />,
    benefit: '무료 주차'
  }
];

<SelectHotelProductItem
  sabreId={383336}
  checkIn="2025-08-01"
  benefits={customBenefits}
/>
```

## API 연동

### Sabre API 엔드포인트 형식
```
${NEXT_PUBLIC_SABRE_API_BASE}/${sabreId}/select-rooms-price/?check_in=${checkIn}&nights=${nights}&number_of_people=${numOfPeople}
```

### API 응답 형식
```tsx
type SabreResponseBody = {
  propertyNameKor: string;    // 호텔명 (한국어)
  propertyNameEng: string;    // 호텔명 (영어)
  destinationKor: string;     // 목적지 (한국어)
  destinationEng: string;     // 목적지 (영어)
  cityKor: string;           // 도시 (한국어)
  cityEng: string;           // 도시 (영어)
  paragonId: number;         // Paragon ID
  roomDescriptions: {        // 객실 정보 배열
    price: number;           // 가격
    roomCode: string;        // 객실 코드
    roomName: string;        // 객실명
    roomDescription: string; // 객실 설명
    cancelDeadLine: string;  // 취소 마감일 (YYYYMMDD)
  }[];
}
```

## 기능

### 실시간 가격 조회
- 컴포넌트 마운트시 Sabre API에서 실시간 가격 조회
- 로딩 상태 표시 (스켈레톤 UI)
- API 오류시 "카카오톡 상담 필요" 메시지 표시

### 반응형 디자인
- 모바일, 태블릿, 데스크톱 최적화
- `sm:`, `lg:` 등 Tailwind CSS 반응형 클래스 사용

### 카카오톡 상담 연동
- 고정된 카카오톡 채널로 연결: `https://pf.kakao.com/_cxmxgNG/chat`
- 가격 조회 실패시 상담 버튼으로 대체

## 스타일링

### 주요 색상
- 브랜드 컬러: `#e5398f` (헤더 배경, 테두리)
- 텍스트: 파란색 (`text-blue-600`), 회색 (`text-gray-500`)

### 커스터마이징
Tailwind CSS 클래스를 직접 수정하거나 CSS-in-JS로 변환하여 스타일 커스터마이징 가능합니다.

## 주의사항

1. **Tailwind CSS 필수**: 상위 프로젝트에서 Tailwind CSS가 설정되어 있어야 합니다.
2. **환경 변수**: `NEXT_PUBLIC_SABRE_API_BASE` 환경 변수가 .env 파일에 설정되어 있어야 합니다. api 호출상의 보안을 위한 장치가 별도로 없기 때문에 환경 변수로 제공합니다.
3. **날짜 형식**: `checkIn`은 YYYY-MM-DD 형식 문자열이나 유효한 Date 객체여야 합니다.
4. **CORS**: Sabre API 서버에서 브라우저 요청을 허용해야 합니다.

## 문제 해결

### 스타일이 적용되지 않는 경우
- Tailwind CSS가 올바르게 설정되었는지 확인
- CDN 방식으로 테스트해보기

### API 요청이 실패하는 경우
- 환경 변수 `NEXT_PUBLIC_SABRE_API_BASE` 확인
- 네트워크 탭에서 API 응답 확인
- CORS 설정 확인