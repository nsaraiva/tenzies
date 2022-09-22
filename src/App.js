import {useState, useEffect} from 'react';
import Confetti from 'react-confetti';

import Title from './components/title';
import Die from './components/die';
import dicesImage from './assets/images/dices.png';
import StopWatch from './components/stopwatch'; 
import Ranking from './components/ranking';
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
  // Modal state
  const [show, setShow] = useState(false);
  // Modal button type clicked
  const [buttonTypeClicked, setButtonTypeClicked] = useState('');
  // Update ranking state
  const [updateRanking, setUpdateRanking] = useState(false);
  // Ranking state
  const [ranking, setRanking] = useState([]);
  // Window size state
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });


  // get ranking from JSONBin
  useEffect(() => {
    fetch('https://api.jsonbin.io/v3/b/632b0b605c146d63caa37183', {
      method: 'GET',      
      headers: {
        'X-MASTER-KEY': '$2b$10$CSXCVVHBA5ndyu5/nybMeeOY0zDKv0RULv8fV24vtFP.faxVTHfu.',
        'X-ACCESS-KEY': '$2b$10$miFrL41BdzRA.3Wta6Urf..RIxW./XBaeVrgJxx7cmWJbbgC5DNZ.',
      }
    })
    .then(response => response.json())
    .then(data => setRanking(data.record.ranking))
  },[])

  // Updating ranking on JSONBin
  useEffect(() => {
    if(updateRanking && buttonTypeClicked === 'save'){
      fetch('https://api.jsonbin.io/v3/b/632b0b605c146d63caa37183', {
        method: 'PUT',      
        headers: {
          'X-MASTER-KEY': '$2b$10$CSXCVVHBA5ndyu5/nybMeeOY0zDKv0RULv8fV24vtFP.faxVTHfu.',          
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ranking: ranking
        })
      })
      .then(response => response.json())
      .then(data => console.log(data))

      setUpdateRanking(false);
      setButtonTypeClicked('');
    }
  },[ranking, buttonTypeClicked, updateRanking]);

  // Checks that the dices are all the same and held, to win the game
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

  // Add new time to ranking
  useEffect(() =>{
    if(tenzies){
      setRanking(prevRanking => [...prevRanking, {
        name: 'newTime', 
        time: time, 
        date: new Date().toLocaleDateString(), 
        media: ''
        }
      ]);  
    }
  },[tenzies, time]); 

  // Sorting the ranking
  useEffect(() => {
    setRanking(prevRanking => prevRanking.sort((x, y) => {
      return x.time - y.time;
      })
    );
  },[tenzies]);

  // Only 5 items at the ranking
  useEffect(() =>  {
    if(tenzies){
      if(ranking.length > 5){
        setRanking(prevRanking => prevRanking.slice(0,5));        
      }

      if (ranking.some(item => item.name === 'newTime') &&
        ranking.length === 5) {
        handleModal('tenzies');
      }
  }
  },[ranking, tenzies]);
    
  // Change Modal state
   function handleModal(button) {
    setShow(prevShow => !prevShow);
    setButtonTypeClicked(button);
  }

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
          <Title handleModal={handleModal}/>
          <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
          <div className="die-container">
            {dicesElements}
          </div>
          <StopWatch time={time}/>
          <button onClick={rollDices}>{(tenzies || loaded) ? 'New Game' : 'Roll'}</button>
        </div>
        <h6 className="version">V1.0b</h6>      
      </div>
        <Ranking show={show} handleModal={handleModal}         
          buttonTypeClicked={buttonTypeClicked} setUpdateRanking={setUpdateRanking} 
          ranking={ranking} setRanking={setRanking} />
    </main>
  );
}

export default App;
