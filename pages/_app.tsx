import '../app/css/style.css';
import type { AppProps } from 'next/app';
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <><Header/><Component {...pageProps} /><Footer/></>
    );
}

export default MyApp;
