import Header from "../header/header";
import HallOfFame from "./hall-of-fame";
import Loader from '../../components/loader/Loader'

export default function HallOfFamePage() {
  return (
    <>
    <Loader>
    <Header />
    <main className="page-layout">
      <HallOfFame />
    </main>
    </Loader>
    </>
  );
}