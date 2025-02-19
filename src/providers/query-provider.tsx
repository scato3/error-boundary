"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { useModal } from "./modal-provider";

const QueryProvider = ({ children }: { children: ReactNode }) => {
  // const { showModal } = useModal();

  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
        mutations: {
          // onError: (error: Error & { title?: string }) => {
          //   showModal(error.title || "Error", error.message);
          // },
          throwOnError: true,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
