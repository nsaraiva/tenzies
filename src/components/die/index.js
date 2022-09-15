import './die.css';

function Die(props) {
    return(
        <div 
            className={props.isHeld ? 'die die-held' : 'die'}
            onClick={props.holdDice}>
            <h1>{props.value}</h1>
        </div>
    );
}

export default Die;