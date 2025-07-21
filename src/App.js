import './App.css';
import PoetryPage from './components/poetry/PoetryPage.jsx';
import './index.css'
import Header from './components/header/header.jsx'
import { Suspense } from 'react'
import Loader from './components/loader/Loader.jsx'

function App() {
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <Loader>
        <Header></Header>
        <PoetryPage></PoetryPage>
      </Loader>
    </Suspense>
    </>
  );
}

export default App;
