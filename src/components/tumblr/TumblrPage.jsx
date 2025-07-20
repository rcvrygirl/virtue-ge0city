import Track from '../audio/tracks.jsx'
import Tumblr from './tumblr.jsx'
import Header from '../header/header.jsx'
import Loader from '../../components/loader/Loader.jsx'
import './TumblrPage.scss'


function TumblrPage() {
    return (
        <div>
            <Loader>
            <Header />
            <Tumblr />
            </Loader>
        </div>
    )

}

export default TumblrPage