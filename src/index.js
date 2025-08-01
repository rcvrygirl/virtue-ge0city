import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Guestbook from './components/guestbook/guestbook';
import ErrorPage from './components/error/page-not-found';
import TumblrPage from './components/tumblr/TumblrPage';
import LibraryPage from './components/library/LibraryPage';
import WordGeneratorPage from './components/words-generator/WordGeneratorPage'
import HallOfFamePage from './components/hall-of-fame/HallOfFamePage';
import { AuthProvider } from './components/auth/AuthContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/homeplanet",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "guestbook",
    element: <Guestbook />,
  },
  {
    path: "tumblr",
    element: <TumblrPage />,
  },
  {
    path: "library",
    element: <LibraryPage />,
  },
  {
    path: "yugiohpoetrygenerator",
    element: <WordGeneratorPage />
  },
  {
    path: "halloffame",
    element: <HallOfFamePage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    {/* <App /> */}
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
