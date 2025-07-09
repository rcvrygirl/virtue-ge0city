import Track from '../audio/tracks.jsx'
import Tumblr from './tumblr.jsx'
import Header from '../header/header.jsx'
import './TumblrPage.scss'


function TumblrPage() {
    return (
        <div>
            <Header />
            <div>
                <h1>Today's top picks!</h1>
            </div>
            <Tumblr />
        </div>
    )

}

export default TumblrPage