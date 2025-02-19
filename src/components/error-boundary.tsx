"use client";

import { Component, ReactNode } from "react";
import { useModal } from "@/providers/modal-provider";

interface Props {
  children: ReactNode;
}

class ErrorBoundaryClass extends Component<
  Props & { showModal: (title: string, message: string) => void }
> {
  // 모든 에러를 모달로 표시
  componentDidCatch(error: Error & { title?: string }) {
    this.props.showModal(
      error.title || "Error",
      error.message || "An error occurred"
    );
  }

  render() {
    return this.props.children;
  }
}

// 함수형 컴포넌트에서 ErrorBoundary를 사용하기 위한 래퍼 컴포넌트
// useModal 훅을 사용하여 모달 기능을 ErrorBoundary에 주입
export function ErrorBoundary({ children }: Props) {
  const { showModal } = useModal();
  return (
    <ErrorBoundaryClass showModal={showModal}>{children}</ErrorBoundaryClass>
  );
}
