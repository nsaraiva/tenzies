import {Button, Modal} from 'react-bootstrap';

import Content from './content';
import './ranking.css';

//

function Ranking({show, handleModal,ranking, setRanking, 
    buttonTypeClicked, setUpdateRanking}) {
    return(
        <Modal show={show} onHide={handleModal} 
        backdrop={buttonTypeClicked !== 'trophy' ? 'static' : 'false'} >
            <Modal.Header closeButton>
            <div className="ranking-header">
                <h2>Top 5 times</h2>
            </div>
            </Modal.Header>
            <Modal.Body>

                <Content ranking={ranking} setRanking={setRanking} 
                    setUpdateRanking={setUpdateRanking} 
                    buttonTypeClicked={buttonTypeClicked} />
            </Modal.Body>
            <Modal.Footer>
                {buttonTypeClicked !== 'trophy' &&  
                    <Button onClick={() => handleModal('save')}>Save</Button>}
                <Button onClick={() => handleModal('cancel')}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Ranking;