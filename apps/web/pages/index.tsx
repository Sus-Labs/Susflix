import type { NextPage } from "next";
import Head from "next/head";
import Layout from "layouts/Layout";

import Header from "components/Header";
import Hero from "components/Hero"
import Features from "components/Features";
import FAQ from "components/FAQ";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>SusFlix</title>
      </Head>
      <Header />
      <Hero />
      <Features />
      <FAQ />
    </Layout>
  );
};

export default Home;
