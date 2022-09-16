import {useState, useEffect} from 'react';
import Confetti from 'react-confetti';

import Title from './components/title';
import Die from './components/die';
import dicesImage from './assets/images/dices.png';
import StopWatch from './components/stopwatch'; 
import './App.css';

function App() {  

  // Dices Values State
  const [dices, setDices] = useState(allNewDice());
  // You won!
  const [tenzies, setTenzies] = useState(false);
  // Sopwatch state
  const [time, setTime] = useState(0);
  // page loaded
  const[loaded, setLoaded] = useState(true);
  // Window size state
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });


  // Checks that the dice are all the same and held, to win the game
  useEffect(() => {
    if(dices.every(die => die.isHeld) &&
      dices.every(die => die.value === dices[0].value)){
      setTenzies(true);
    }
  },[dices]);

  // Updates the window size state
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
  }, []);

  // Stopwatch
  useEffect(() => {
    console.log(loaded);
    let stopWatch = null;
    if(!tenzies){
      stopWatch = setInterval(() => {
        setTime(prevTime => prevTime + 7);
      },7); 
    } else {
      clearInterval(stopWatch);
    } 
    if(loaded){
      clearInterval(stopWatch);
    }
    return () => {
      clearInterval(stopWatch);
    };

  }, [tenzies, loaded]);

  // held the dice
  function holdDice(diceId) {
    setDices(prevDices => {
      return prevDices.map(die => {
        return die.id === diceId ? 
          {...die, isHeld: !die.isHeld} : die
      } )      
  })}

  // Roll all the dices
  function allNewDice(){
    return Array.from({length: 10}, (element, index) => {
      return {
        id: index,
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false
      }
    });
  }

  // Roll the dices that are not held
  const rollDices = () => {
    if(!tenzies){
      setDices(prevDices => prevDices.map(die => {
        return die.isHeld ? die : {...die,
        value: Math.floor(Math.random() * 6) + 1,
      }}));
    } else {
      setTenzies(false);
      setLoaded(false);
      setDices(allNewDice());
      setTime(0); 
    }
    setLoaded(false);
  }

  // mount the dices
  const dicesElements = dices.map(die => {
    return <Die 
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      loaded={loaded}
      tenzies={tenzies}
    />
      
  });

  return (
    <main>
      {tenzies && <Confetti 
        width={windowSize.width} 
        height={windowSize.height}/>}
      <div className="main-container">
        <img className="icon" src={dicesImage} alt=""/>                
        <div className="game">
          <Title />
          <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
          <div className="die-container">
            {dicesElements}
          </div>
          <StopWatch time={time}/>
          <button onClick={rollDices}>{(tenzies || loaded) ? 'New Game' : 'Roll'}</button>
        </div>
        <h6>V 0.1.1b</h6>      
      </div>
    </main>
  );
}

export default App;
