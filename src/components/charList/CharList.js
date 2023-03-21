import './charList.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../services/MarvelDBService';
import {ReactComponent as Spinner} from '../spinner/spinner.svg';

const Char = (props) =>  {
    const {thumbnail, name, id} = props.char
    const picStyles = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? 
                  {objectFit: "contain", alignItems: "start"} : {objectFit: "cover"}

    return (
        <li onClick={() => {props.onChoose(id)}} className="char__item">
            <img src={thumbnail} style={picStyles} alt={name}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

const CharList = (props) => {
    const [chars, setChars] = useState([])
    const [loadedCount, setCount] = useState(210)

    const {loading, getAllCharacters} = useMarvelService()

    useEffect(() => {
        fetchChars()
        useMarvelService.loading = true
    }, [])

    const fetchChars = (offset = 210, limit = 36) => {
        getAllCharacters(offset, limit)
        .then(res => {
            res.forEach((char) => {
                setChars(chars => [[...chars, <Char onChoose={(id) => {props.onChoose(id)}} char={char} key={char.id}/>]])
            })
        }).then(() => {
            setCount(loadedCount => loadedCount + limit)
        })
        
    }

    const loadMore = () => {
        fetchChars(loadedCount, 12)
    }

    
    
    let characters = [...chars]
    return (
        <div className="char__list" >
            <ul className="char__grid">
                {characters}
            </ul>
            {loading ? <Spinner/> : 
            <button className="button button__main button__long">
                <div className="inner" onClick={loadMore}>load more</div>
            </button>}
            
        </div>
    )
}

export default CharList;