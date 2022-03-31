import "@/styles/globals.module.css";
import { AppContextProvider } from "../context/profileContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}
export default MyApp;
