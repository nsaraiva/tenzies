import {Button, Modal} from 'react-bootstrap';

import Content from './content';
import './ranking.css';

//

function Ranking(props) {

    return(
        <Modal show={props.show} onHide={props.handleModal}>
            <Modal.Header closeButton>
            <div className="ranking-header">
                <h2>Top 5 times {props.time}</h2>
            </div>
            </Modal.Header>
            <Modal.Body>

                <Content data={props.data} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.handleModal}>Close</Button>
                <Button onClick={props.handleModal}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Ranking;