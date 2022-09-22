import {useState, useEffect} from 'react';

import './content.css';

function Content({ranking, setRanking, buttonTypeClicked, setUpdateRanking}) {

    const [formData, setFormData] = useState({
        newTime: ''
    });
    
    function formatTime(time) {
        const milliseconds = time;
        const seconds =  Math.floor((milliseconds/1000) % 60);
        const minutes = Math.floor(((milliseconds/1000)/60) % 60);
        return(
            `${minutes < 10 ? '0'+minutes : minutes}:
            ${seconds < 10 ? '0'+seconds : seconds}.
            ${String(milliseconds).slice(-2)}`
        );
    }
    // Focus on the new time 
    useEffect(() => {
        const names = document.getElementsByTagName('input');
        for(let i = 0; i < names.length; i++){
            if(names[i].getAttribute('name') === 'newTime'){
                names[i].focus();
            }
        }   
    },[]);

    useEffect(() => {    
        if(buttonTypeClicked === 'save'){    
            setRanking(prevRanking => prevRanking.map(x => {
                return x.name === 'newTime' ? 
                    {...x, name: formData.newTime} : x;           
                })
            );
             
            setUpdateRanking(true);
        } else if(buttonTypeClicked === 'cancel'){
            setRanking(prevRanking => prevRanking.map(x => {
                return x.name === 'newTime' ? 
                    {...x, name: ''} : x;           
                })
            );

            setUpdateRanking(true);
        }
    },[formData.newTime, setRanking, buttonTypeClicked, setUpdateRanking]);

    const handleChange = (e) => {
        const{name, value} = e.target;
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        });
    };

    const rankingList = ranking.map((score, index) => {
        return (
            <div className="scores" key={index}>
            <h6>#{index + 1}</h6>
            {score.name === 'newTime' ?
                <input 
                    name="newTime"
                    id="newTime"
                    onChange={handleChange}
                    type="text" 
                    value={formData.newTime} /> :
                <h6>{score.name}</h6>
            }            
            <h6>{formatTime(score.time)}</h6>
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