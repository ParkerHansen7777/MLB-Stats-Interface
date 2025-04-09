import React, { useState, useEffect } from "react";
import "./App.css";



const Team = props => (
	<option value={props.team.id}>{props.team.name}</option>
);

const Player = props => (
	<option>{props.player.name}</option>
);

export default function App() {
    
	const [teams, setTeams] = useState([]);
	const [roster, setRoster] = useState([]);
	
	
	 // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("/teams").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                //console.log(data);
				setTeams(data);
				//console.log(teams);
				
				
            })
        );
    }, [roster]);
	
	
	function teamList(teams){
		
		//console.log(teams)
		return teams.map(curr => {
			return <Team team={curr} key={curr.id}/>;
		})
	}
	
	function rosterList(roster){
		return roster.map(curr => {
			return <Player player={curr} key={curr.id} />;
		})
	}
	
	
	function handleChoice(e){
		console.log(e)
		fetch(`/teams/${e}`).then((res) =>
			res.json().then((data) => {
				setRoster(data);
			})
		);
	}
	
    return (
        <div className="App">
            <h1>MLB Stats API</h1>
			<label>Choose a Team</label>
			<select onClick={e => handleChoice(e.target.value)}>
			{teamList(teams)}
			</select>
			
			<label>Choose a Player</label>
			<select>
			{rosterList(roster)}
			</select>
			
        </div>
    );
}

