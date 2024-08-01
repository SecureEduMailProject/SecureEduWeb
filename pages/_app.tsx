import '../app/css/style.css';
import type { AppProps } from 'next/app';
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect} from "react";



function MyApp({ Component, pageProps }: AppProps) {

    useEffect(() => {
        AOS.init({
            once: true,
            disable: "phone",
            duration: 700,
            easing: "ease-out-cubic",
        });
    });

    return (
        <><Header/><Component {...pageProps} /><Footer/></>
    );
}

export default MyApp;
