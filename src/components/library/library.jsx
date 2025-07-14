
import libraryData from '../../db/library.json'

function Library() {

        const libraryItems = libraryData.map(library =>
            <li key={library.link}>
                <a href={library.link} target="_blank">{library.title}</a>
            </li>)
    
        return (
            <div className="library-container">
                <ul>{libraryItems}</ul>
            </div>
        )
  }

  export default Library;