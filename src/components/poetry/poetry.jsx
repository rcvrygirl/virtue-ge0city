import './poetry.scss'

const poetry = [{
    id: 1,
    body: "spear-wound moonlight lights their many forms \n former selves being the scars \n red star, rise into the air\nspirits remain\nthey are invisible, black in the darkness\nstaying near the grave, eternal home\nbirds of lifeless flight"
},
{id: 2,
    body: "keeps me company\nwarm body and memory\nyou ask where i would stab you \nand bite my fingers \na 9 lives heart remembers:\ncut to pieces sewn to many\nhere and here - and here"
},
{
id: 3,
body: "galactic vampire \nto the tick of world rhythm \ndance until clock strike"
}];

export default function Poetry() {
    const poetryItems = poetry.map(poem =>
        <li key={poem.id}>
            {poem.body}
        </li>
    )
    return (
        <div>
            <ul className="display-linebreak">{poetryItems}</ul>
        </div>
    )
}