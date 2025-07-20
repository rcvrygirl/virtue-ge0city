import Library from './library.jsx'
import Header from '../header/header.jsx'
import './LibraryPage.scss'
import Loader from '../loader/Loader.jsx'


function LibraryPage() {
    return (
        <div>
            <Loader>
            <Header />
            <Library/>
            </Loader>
        </div>
    )

}

export default LibraryPage