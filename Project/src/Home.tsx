import "./Crossover.css"
import {Header} from './Header'

function Home() {
  return (
    <div className="Home">
        <Header></Header>
        <div className="title">
            <h2>
                <p className="s">
                    Events
                </p>
                    Open
                <p className="w">
                    Parties
                </p>
            </h2>
            <div id='h3'>
                Invite
            </div>
        </div>

        <p className="reg">
           Find fun and fresh events happening in your area!
        </p>

        <div className="ourG">
            <img className="ourG" src="img2.png"/>
                <h4>
                    Find <br></br>
                    Events
                    <br></br>
    
                <ul>
                    <li><a href="/board">RSVP</a></li>
                </ul>
            </h4>

           </div>
           <div id="bar">
            <p className="reg">
            Post your party for all to enjoy!
            </p>
            </div>

    </div>
  );
}

export default Home;
