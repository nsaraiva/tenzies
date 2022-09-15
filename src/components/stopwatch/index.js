import './stopwatch.css';

function StopWatch(props) {

    const milliseconds = props.time;
    const seconds =  Math.floor((milliseconds/1000) % 60);
    const minutes = Math.floor(((milliseconds/1000)/60) % 60);

    return(
        <div className="stopwatch">
            {minutes < 10 ? '0'+minutes : minutes}:
            {seconds < 10 ? '0'+seconds : seconds}.
            {String(milliseconds).slice(-2)}
        </div>
    );
}

export default StopWatch;