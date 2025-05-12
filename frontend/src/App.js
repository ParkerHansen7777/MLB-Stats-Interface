import React, { useState, useEffect } from "react";
import "./App.css";
import TeamSelector from "./components/team_selector";
import PlayerSelector from "./components/player_selector";
import StatsDisplay from "./components/stats_display";




export default function App() {
    
	const [visible, setVisible] = useState("teams")
	const [teams, setTeams] = useState([]);
	const [roster, setRoster] = useState([]);
	const [bat, setBat] = useState([]);
	const [pitch, setPitch] = useState([]);
	
	
	 // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
       
    }, [visible]);
	
	
	
	
	
	function handleTeam(e){
		//console.log(e)
		setVisible("players")
		fetch(`/teams/${e}`).then((res) =>
			res.json().then((data) => {
				setRoster(data);
			})
		);
	}

	
	function handlePlayer(e){
		setVisible("stats")
		
		
		if (e[1] !== 'P'){
		
			fetch(`/player/${e[0]}/hitting`).then((res) =>
				res.json().then((data) => {
					setBat(data);
				})
			);
		}
		else{
			fetch(`/player/${e[0]}/pitching`).then((res) =>
				res.json().then((data) => {
					setPitch(data);
				})
			);
		}
	}

	function handleBack(){
		if (visible === "players"){
			setRoster([])
			setVisible("teams")
		}
		else if (visible === "stats"){
			setBat([])
			setPitch([])
			setVisible("players")
		}
	}
	
	
    return (
        <div className="App">
            <h1>MLB Stats API</h1>
			{visible === "teams" && 
				<TeamSelector teams={teams} setTeams={setTeams} handleTeam={handleTeam}/>
			}
			{visible === "players" &&
				<PlayerSelector roster={roster} handlePlayer={handlePlayer} handleBack={handleBack}/> 
			}
			{visible === "stats" && 
				<StatsDisplay bat={bat} pitch={pitch} handleBack={handleBack}/>
			}
			<footer>
				© 2025 MLB Advanced Media, LP. All rights reserved. Webapp created and used only for educational non-commercial purposes. 
			</footer>
        </div>
    );
}

