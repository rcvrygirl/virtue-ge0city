import Poetry from './poetry.jsx'
import Track from '../audio/tracks.jsx'
import chiStar from '../../assets/chi-and-a-star.png'
import './PoetryPage.scss'
import Loader from '../loader/Loader.jsx'


function PoetryPage() {
    return (
        <Loader>
        <div>
        <div className="p-page">
            <h1><a className="title" href="/">Berry me in the realm of release...</a></h1>
            <img className="chi" src={chiStar} width="300" />
            <Poetry></Poetry>
            <Track classname="mobile" trackId="1"></Track>
            <div className="spacer"></div>
        </div>
        </div>
        </Loader>
    )

}

export default PoetryPage