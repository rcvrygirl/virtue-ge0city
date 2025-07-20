// import Track from '../audio/tracks.jsx'
import './WordGenerator.scss'
import WordGenerator from './WordGenerator.jsx'
import Header from '../header/header.jsx'
import Loader from '../../components/loader/Loader'


function WordGeneratorPage() {
    return (
        <div>
            <Loader>
            <Header />
            <WordGenerator />
            </Loader>
        </div>
    )

}

export default WordGeneratorPage