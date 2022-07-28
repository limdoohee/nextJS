import Layout from "../components/layout/Layout";
import "../styles/globals.css";

// 최상위 컴포넌트라고 생각하면 됨
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
