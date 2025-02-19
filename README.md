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

1. `try-catch`로 감싸서 axios 에러를 잡고 CustomError 형태로 변환하여 throw
2. 하지만 일반 비동기 함수의 에러는 React의 렌더링 사이클 밖에서 발생하므로 ErrorBoundary가 감지하지 못함
3. React Query는 내부적으로 비동기 에러를 렌더링 사이클로 가져오기 때문에 ErrorBoundary가 감지할 수 있음

### 3. 주요 컴포넌트 역할

#### ErrorBoundaryClass

- React의 Error Boundary 기능을 구현한 클래스 컴포넌트
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

1. ErrorBoundary는 기본적으로 다음 상황의 에러를 캐치하지 못함:

   - 일반적인 이벤트 핸들러 내부의 에러
   - 일반적인 비동기 코드 (async/await)의 에러
   - 서버 사이드 렌더링 중의 에러
   - ErrorBoundary 자체의 에러

2. 하지만 다음 경우는 예외적으로 캐치 가능:

   - React Query의 mutation 에러 (`throwOnError: true` 설정 시)
   - 렌더링 과정에서 발생하는 동기적인 에러
