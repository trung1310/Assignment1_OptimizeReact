import React from 'react';
import reactDOM from 'react-dom';
import './style.css'
import Nature from './images/image-human-brain_99433-298.jpg';

const App = () => {
    return (
        <>
            <h1>Hello React Webpack !!!!!!!!</h1>
            <img src={Nature} width='400' height='400' alt='Nature' />
        </>
    )
}

reactDOM.render(<App />, document.getElementById('root'));