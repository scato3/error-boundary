# Error Boundary Example

## Error Boundary 작동 원리

### 1. 기본 구조

```tsx
<ModalProvider>
  <ErrorBoundary>
    <QueryProvider>{children}</QueryProvider>
  </ErrorBoundary>
</ModalProvider>
```

### 2. 에러 처리 흐름

#### React Query Mutation 에러 (useGetPosts)

1. mutation이 실패하면 `throwOnError: true` 설정으로 인해 에러가 throw됨
2. throw된 에러는 ErrorBoundary의 `componentDidCatch`에 전달
3. `componentDidCatch`는 에러의 title과 message를 추출하여 Modal을 표시

#### 일반 Axios 요청 에러 (getPosts2)

1. try-catch로 감싸지 않은 경우, 에러는 React의 이벤트 핸들러에서 캐치됨
2. ErrorBoundary는 렌더링 과정의 에러만 캐치하므로 이 에러는 감지하지 못함
3. 별도의 에러 처리 로직이 필요

### 3. 주요 컴포넌트 역할

#### ErrorBoundaryClass

- React의 Error Boundary 기능을 구현한 클래스 컴포넌트
- `getDerivedStateFromError`: 에러 발생 시 상태 업데이트
- `componentDidCatch`: 에러 발생 시 모달 표시

#### ModalProvider

- 모달 상태 관리 및 표시 로직 제공
- Portal을 사용하여 모달을 body 직접 하위에 렌더링

#### QueryProvider

- React Query 설정 제공
- `throwOnError: true`로 설정하여 mutation 에러를 ErrorBoundary로 전파

### 4. 에러 객체 구조

```typescript
interface CustomError {
  title: string; // 에러 제목
  message: string; // 에러 메시지
}
```

### 5. 제한사항

1. ErrorBoundary는 다음 상황의 에러를 캐치하지 못함:

   - 이벤트 핸들러
   - 비동기 코드 (async/await)
   - 서버 사이드 렌더링
   - ErrorBoundary 자체의 에러

2. 이러한 에러들은 다음과 같이 처리해야 함:
   - try-catch 사용
   - .catch() 메서드 사용
   - 별도의 에러 핸들링 로직 구현
