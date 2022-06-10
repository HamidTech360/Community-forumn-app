import "../styles/bootstrap.css";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import {Provider} from "react-redux"
import {store} from "@/redux/store"
import Header from "../components/Organisms/Layout/Header";
import Footer from "../components/Organisms/Layout/Footer";

import client from "../utils/apollo-client";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
       
          <Header />
          <div className="body">
            <Component {...pageProps} />
          </div>
          <Footer />
        
      </Provider>
    </>
  );
}

export default MyApp;
