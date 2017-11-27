import React from 'react';
import ReactDOM from 'react-dom';

//create a new component
const App = () => {
    return(
     <div>
            <h1>Hello World</h1>
     </div>
    )
};


//put generated HTML and put it  
//on the page DOM
ReactDOM.render(<App />, document.querySelector('.container'))
