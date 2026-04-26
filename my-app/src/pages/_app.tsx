import "../styles/globals.css";
import type { AppProps } from "next/app";
import Appshell from "@/components/layouts/Appshell";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      ) : null}
      <div className={inter.className}>
        <Appshell>
          <Component {...pageProps} />
        </Appshell>
      </div>
    </SessionProvider>
  );
}
