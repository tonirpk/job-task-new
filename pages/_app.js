import StateWrapper from "../components/Context/StateManger";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <StateWrapper>
      <Component {...pageProps} />
    </StateWrapper>
  );
}

export default MyApp;
