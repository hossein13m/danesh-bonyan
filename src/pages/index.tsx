import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import GeneralTable from '../components/general-table';
import { GeneralInput } from '../components/general-input';
import * as React from 'react';
import { useState } from 'react';
import { AdvertisementList, JobinjaFetchAdProvider } from '../store/fetchJobinjaAdvertisementsContext';
import EmptyState from '../components/emptyState';
import Script from 'next/script';

const Home: NextPage = () => {
  const [data, setData] = useState<Array<AdvertisementList>>([]);
  const childToParent = (childData: Array<AdvertisementList>) => setData(childData);

  return (
    <>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

      <Script strategy="lazyOnload" id="google-analytics-id">
        {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                        page_path: window.location.pathname,
                        });
                    `}
      </Script>
      <Head>
        <title>Welcome!</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div className={styles.container}>
        <Head>
          <title>فهرست شرکت‌های دانش‌بنیان</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col justify-center items-center mt-4 static overflow-hidden">
          <h1 className="font-black text-2xl mb-6">جستجوی آگهی شغلی</h1>
          <JobinjaFetchAdProvider>
            <GeneralInput childToParent={childToParent} />
          </JobinjaFetchAdProvider>
          {data.length ? <GeneralTable dataParentToChild={data} /> : <EmptyState />}
        </main>
      </div>
    </>
  );
};

export default Home;
