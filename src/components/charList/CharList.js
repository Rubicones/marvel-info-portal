import './charList.scss';
import { Component } from 'react';
import MarvelService from '../services/MarvelDBService';
import {ReactComponent as Spinner} from '../spinner/spinner.svg';

class Char extends Component {
    render () {
        const {thumbnail, name, id} = this.props.char
        const picStyles = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? 
                      {objectFit: "contain", alignItems: "start"} : {objectFit: "cover"}

        return (
            <li onClick={() => {this.props.onChoose(id)}} className="char__item">
                <img src={thumbnail} style={picStyles} alt={name}/>
                <div className="char__name">{name}</div>
            </li>
        )
    }
}

class CharList extends Component {
    state = {
        chars: [],
        loadedCount: 210,
        loading: true
    }

    MarvelService = new MarvelService()

    componentWillMount = () => {
        this.fetchChars()
    }

    fetchChars = (offset = 210, limit = 36) => {
        this.MarvelService
        .getAllCharacters(offset, limit)
        .then(res => {
            res.forEach((char, i) => {
                this.setState(({chars}) => ({
                    chars: [...chars, <Char onChoose={(id) => {this.props.onChoose(id)}} char={char} key={char.id}/>]
                }))
            })
        }).then(() => {
            this.setState(({loadedCount}) => ({
                loadedCount: loadedCount + limit,
                loading: false
            }));
        })
        
    }

    loadMore = () => {
        this.setState(({
            loading: true
        }))
        this.fetchChars(this.state.loadedCount, 12)
    }

    

    render () {
        const {loading} = this.state
        let characters = [...this.state.chars]
        return (
            <div className="char__list" >
                <ul className="char__grid">
                    {characters}
                </ul>
                {loading ? <Spinner/> : 
                <button className="button button__main button__long">
                    <div className="inner" onClick={this.loadMore}>load more</div>
                </button>}
                
            </div>
        )
    }
}

export default CharList;