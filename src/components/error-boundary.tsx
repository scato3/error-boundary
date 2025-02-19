"use client";

import { Component, ReactNode } from "react";
import { useModal } from "@/providers/modal-provider";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundaryClass extends Component<
  Props & { showModal: (title: string, message: string) => void },
  State
> {
  constructor(
    props: Props & { showModal: (title: string, message: string) => void }
  ) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error & { title?: string }) {
    this.props.showModal(
      error.title || "Error",
      error.message || "An error occurred"
    );
    this.setState({ hasError: false });
  }

  render() {
    return this.props.children;
  }
}

export function ErrorBoundary({ children }: Props) {
  const { showModal } = useModal();

  return (
    <ErrorBoundaryClass showModal={showModal}>{children}</ErrorBoundaryClass>
  );
}
