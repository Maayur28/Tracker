import React from 'react';
import {Link} from 'react-router-dom'

const My404 = () => {
    return ( <div className="notfound" ><Link to="/" exact={true}>
    <img src="/404Page.gif" alt="404Page" style={{width:'100vw',height:'90vh',objectFit:'contain'}}/>
    </Link>
    </div> 
    );
}
export default My404;