import Header from "../header/header";
import HallOfFame from "./hall-of-fame";

export default function HallOfFamePage() {
  return (
    <>
    <Header />
    <main className="page-layout">
      <HallOfFame />
    </main>
    </>
  );
}