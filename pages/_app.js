import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";

function MyApp({ Component, pageProps }) {

  const [queryClient] = useState(() => new QueryClient());

  let theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    }
  });

  return (
    <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
    </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp
