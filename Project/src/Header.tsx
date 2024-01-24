import React from 'react';
import "./Crossover.css"

export function Header() {
    return(
        <div className='Header'>
            <h1>
                <a className='home' href="/"> OPEN </a>
            </h1>
            <ul>
                <li><a href="/board">Events</a></li>
            </ul>
        </div>
    );
}
