import './tile.css';
import trophy from '../../assets/images/trophy.png';

function Title() {
    return(
        <div className="title-container">
            <div></div>
            <div className="title"><h1>Tenzies</h1></div>
            <div className="rank"><img src={trophy} alt="trophy" /></div>
        </div>
    );
}

export default Title;