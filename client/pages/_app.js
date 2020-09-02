import React, { Fragment } from "react";
import App from "next/app";
// import cookies from "next-cookies";
// import NProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";
import Nav from "../components/Nav";
import styled from "styled-components";
import "../public/style.css";

// NProgress.configure({ showSpinner: false });
// NProgress.configure({ easing: "ease", speed: 500 });

// Router.events.on("routeChangeStart", (url) => {
//   console.log(`Loading: ${url}`);
//   NProgress.start();
// });
// Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on("routeChangeError", () => NProgress.done());

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    const Wrapper = styled.div`
      width: 90%;
      margin: 0 auto;
    `;

    return (
      <>
        <Head>
          {/* <link rel="stylesheet" type="text/css" href="/nprogress.css" /> */}
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat|PT+Sans|Spartan&display=swap"
            rel="stylesheet"
          />
        </Head>

        <Nav />
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </>
    );
  }
}
