import { useRouteError } from "react-router-dom";
import './page-not-found.scss'
import maid from '../../assets/maid.png'
import Snowfall from 'react-snowfall'
import Header from '../header/header'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
    <Header />
    <div className="error-page">
      <Snowfall 
        snowflakeCount={100}
        speed={[0.1, 3]}
        wind={[-0.5, 2]}
      />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <img src={maid} />
    </div>
    </>
  );
}