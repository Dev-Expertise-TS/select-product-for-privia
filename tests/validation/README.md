# 빌드 검증 테스트

이 디렉토리는 빌드된 결과물의 유효성을 검증하는 자동화된 테스트를 포함합니다.

## 테스트 구성

### 1. React 컴포넌트 모듈 검증 (`test-react-module.js`)
- TypeScript 정의 파일 존재 여부 확인
- ES Module import 테스트
- React 컴포넌트 인스턴스화 테스트
- 번들 크기 확인

### 2. 웹 컴포넌트 모듈 검증 (`test-web-component.js`)
- 웹 컴포넌트 등록 테스트
- ES Module import 테스트
- CSS 번들 확인
- 브라우저 테스트용 HTML 생성

### 3. Storybook 정적 빌드 검증 (`test-storybook-build.js`)
- 빌드 디렉토리 구조 확인
- 필수 파일 존재 여부 확인
- 스토리 에셋 확인
- HTML 구조 검증
- HTTP 서버 테스트
- 빌드 크기 확인

## 사용법

### 모든 테스트 실행
```bash
pnpm test:validate
```

### 개별 테스트 실행
```bash
# React 컴포넌트 테스트
pnpm test:react

# 웹 컴포넌트 테스트
pnpm test:webcomponent

# Storybook 빌드 테스트
pnpm test:storybook
```

### 브라우저 테스트
1. 빌드 실행: `pnpm build:widget`
2. 브라우저에서 열기: `tests/validation/browser-test.html`
3. 또는 생성된 테스트 HTML 열기: `tests/validation/test-web-component.html`

## 테스트 결과

테스트 실행 후 `validation-report.json` 파일이 생성되며, 다음 정보를 포함합니다:
- 실행 시간
- 전체 테스트 수
- 성공/실패 수
- 각 테스트의 상태

## 주의사항

1. Node.js 환경에서는 브라우저 API (HTMLElement 등)가 없어 일부 테스트가 실패할 수 있습니다. 이는 정상적인 동작입니다.
2. 웹 컴포넌트는 실제 브라우저 환경에서만 완전히 테스트할 수 있습니다.
3. Storybook 빌드 테스트는 먼저 `pnpm build:storybook`을 실행해야 합니다.

## 검증 항목 체크리스트

✅ **React 컴포넌트**
- [ ] TypeScript 타입 정의 파일 생성
- [ ] ES Module로 import 가능
- [ ] CommonJS로 require 가능
- [ ] 번들 크기 적정 (< 1MB)

✅ **웹 컴포넌트**
- [ ] 브라우저에서 customElements.define() 실행
- [ ] 속성(attributes) 바인딩 작동
- [ ] CSS 스타일 포함
- [ ] React 없이 독립 실행 가능

✅ **Storybook**
- [ ] 정적 사이트 빌드 성공
- [ ] 모든 스토리 포함
- [ ] Documentation 페이지 생성
- [ ] 로컬 서버에서 호스팅 가능

## 문제 해결

### HTMLElement is not defined 오류
Node.js 환경에서 브라우저 API를 사용하려 할 때 발생합니다. 브라우저 테스트를 사용하세요.

### 빌드 파일을 찾을 수 없음
먼저 `pnpm build`를 실행하여 빌드 결과물을 생성하세요.

### Storybook 테스트 실패
`pnpm build:storybook`을 먼저 실행하세요.