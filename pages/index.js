import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Gutter } from "../components/layout/Gutter";
import MainNav from "../components/layout/MainNav";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>WebGeoda Scaffolding</title>
        <meta name="description" content="A free and open source geo data framework" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,900;1,400;1,700&family=Lora:ital@0;1&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,900;1,400;1,700&family=Lora:ital@0;1&display=swap"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,900;1,400;1,700&family=Lora:ital@0;1&display=swap"
          />
        </noscript>
      </Head>
      <MainNav />
      <main className={styles.main}>
        <h1 className={styles.title}>
          More maps. <br />
          All yours.
        </h1>
        <p className={styles.description}>
          Start mapping by editing{" "}
          <code className={styles.code}>map-config.js</code>
        </p>
        <Gutter em={5} />
        <div className="row rules">
          <div className="col-xs-12 col-md-4 col-lg-4">
            <h2 className={styles.subhead}>Add Data</h2>
            <p>
              Webgeoda enables free-to-host flatfile data storage with powerful
              WebAssembly-based geoprocessing. Load in your geospatial data,
              join tables, derive fields, generate binning and more with a
              simple JSON spec.
            </p>
            <a
              className={styles.docsLink}
              target="_blank"
              href="https://docs.webgeoda.org/data/importing-data" rel="noreferrer"
            >
              Read More 🗺️
            </a>
          </div>
          <div className="col-xs-12 col-md-4 col-lg-4 rules-on">
            <h2 className={styles.subhead}>Customize Pages</h2>
            <p>
              Describe and cite your data, provide links to related research,
              contact information, and download links. Layout tools help to
              quickly modify or create new pages.
            </p>
            <a
              className={styles.docsLink}
              target="_blank"
              href="https://docs.webgeoda.org/pages/adding-and-customizing-pages" rel="noreferrer"
            >
              Read More 📝{" "}
            </a>
          </div>
          <div className="col-xs-12 col-md-4 col-lg-4">
            <h2 className={styles.subhead}>Publish Insights</h2>
            <p>
              Sharing out insights should be painless. Webgeoda is built to be
              published on your platform of choice: Github pages, Vercel,
              Netlify, or any static web hosting provider.
            </p>
            <a
              className={styles.docsLink}
              target="_blank"
              href="https://docs.webgeoda.org/deploy/vercel" rel="noreferrer"
            >
              Read More 🌐
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
