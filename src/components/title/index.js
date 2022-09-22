import './tile.css';
import trophy from '../../assets/images/trophy.png';

function Title({handleModal}) {
    return(
        <div className="title-container">
            <div></div>
            <div className="title"><h1>Tenzies</h1></div>
            <div onClick={() => handleModal('trophy')} className="rank"><img src={trophy} alt="trophy" /></div>
        </div>
    );
}

export default Title;