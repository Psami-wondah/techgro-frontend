import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{ duration: 3000 }}
        />
        <Component {...pageProps} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
