import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const App = () => {
    const [clickedCharId, setChar] = useState(null) 

    const onChoose = (id) => {
        if (id !== clickedCharId){
            setChar(id)
        }
    }
    
    return (
        <div className="app">
            <AppHeader/>
            <main>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
                <div className="char__content">
                    <CharList onChoose={(id) => onChoose(id)}/>
                    <ErrorBoundary>
                        <CharInfo clickedChar={clickedCharId}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;