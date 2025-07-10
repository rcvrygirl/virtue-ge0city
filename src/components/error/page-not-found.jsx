import { useRouteError } from "react-router-dom";
import './page-not-found.scss'
import maid from '../../assets/maid.png'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <img src={maid} />
    </div>
  );
}