import Poetry from './poetry/poetry.jsx'
import Track from './audio/tracks.jsx'
import chiStar from '../assets/chi-and-a-star.png'
import './PoetryPage.scss'


function PoetryPage() {
    return (
        <div>
            <img className="chi" src={chiStar} width="300" />
            <Poetry></Poetry>
            <Track></Track>
        </div>
    )

}

export default PoetryPage