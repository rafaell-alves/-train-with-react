import React from 'react';

const Main = props => {
    return (
        <div>
           <main>
             {props.children}
           </main> 
        </div>
    );
}

export default Main;
