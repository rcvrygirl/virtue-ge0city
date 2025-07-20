import './poetry.scss'
import poemData from '../../db/poetry.json'

export default function Poetry() {

    const poetryItems = poemData.map(poem =>
        <li key={poem.id}>
            {poem.body}
        </li>)

    return (
        <div className="poetry-container">
            <ul className="display-linebreak">{poetryItems}</ul>
        </div>
    )
}