import Library from './library.jsx'
import Header from '../header/header.jsx'
import './LibraryPage.scss'
import Loader from '../loader/Loader.jsx'


function LibraryPage() {
    return (
        <>
        <div>
            <Loader>
            <Header />
            <Library/>
            <div className="spacer-lib"></div>
            </Loader>
        </div>
        </>
    )

}

export default LibraryPage