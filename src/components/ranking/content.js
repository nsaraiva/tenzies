import {useState, useEffect} from 'react';

import './content.css';

function Content(props) {

    // const [formData, setFormData] = useState({
    //     newTime: ''
    // });


    useEffect(() => {
        const names = document.getElementsByTagName('input');
        for(let i = 0; i < names.length; i++){
            if(names[i].getAttribute('data-time') === props.time.toString()){
                names[i].focus();
            }
        }   

    },[props.time]);

    // const handleChange = (e) => {
    //     const{name, value} = e.target;
    //     setFormData(prevData => {
    //         return {
    //             ...prevData,
    //             [name]: value
    //         }
    //     });
    // };

    console.log(props.data);
    const rankingList = props.data.map((score, index) => {
        return (
            <div className="scores" key={index}>
            <h6>#{index + 1}</h6>
            {/* {score.time === props.time ?
                <input 
                name="newTime"
                id="newTime"
                placeholder="Your name here"
                onChange={handleChange}
                 type="text" 
                 value={formData.newTime}
                 data-time={score.time} /> :
                <h6>{score.name}</h6>
            }             */}
            <h6>{score.name}</h6>
            <h6>{score.time}</h6>
            <h6>{score.date}</h6>
            </div>            
        ); 
    })

    return(
        <div>
            <div className="scores">
                <h4>&nbsp;</h4>
                <h4>Name</h4>
                <h4>Time</h4>
                <h4>Date</h4>
            </div>
            <form>
                {rankingList}
            </form>
        </div>
    );
}

export default Content;