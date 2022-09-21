import {Button, Modal} from 'react-bootstrap';

import Content from './content';
import './ranking.css';

//

function Ranking({show, handleModal,ranking, setRanking}) {
    return(
        <Modal show={show} onHide={handleModal} backdrop="static">
            <Modal.Header closeButton>
            <div className="ranking-header">
                <h2>Top 5 times</h2>
            </div>
            </Modal.Header>
            <Modal.Body>

                <Content ranking={ranking} show={show} setRanking={setRanking} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleModal}>Save</Button>
                <Button onClick={handleModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Ranking;