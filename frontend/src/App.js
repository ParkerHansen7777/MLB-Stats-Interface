import React, { useState } from "react";
import "./App.css";
import TeamSelector from "./components/team_selector";
import PlayerSelector from "./components/player_selector";
import StatsDisplay from "./components/stats_display";
import Comparison from "./components/compare";




export default function App() {
    
	const [visible, setVisible] = useState("teams")
	const [teams, setTeams] = useState([]);
	const [roster, setRoster] = useState([]);
	const [bat, setBat] = useState([]);
	const [pitch, setPitch] = useState([]);
	const [img, setImg] = useState("");
	const [playerName, setName] = useState("");
	const [playerPos, setPos] = useState("");


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
		setImg(`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${e[0]}/headshot/67/current`)
		setPos(e[1])
		setName(e[2])
		
		
			fetch(`/player/${e[0]}/hitting`).then((res) =>
				res.json().then((data) => {
					setBat(data);
				})
			);
		
			fetch(`/player/${e[0]}/pitching`).then((res) =>
				res.json().then((data) => {
					setPitch(data);
				})
			);
		
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
			setImg("")
			setName("")
			setPos("")
		}
		else if (visible === "compare"){
			setVisible("players")
			
		}
	}

	function handleCompare(){
		setVisible("compare")
	}
	
	
    return (
        <div className="App">
            <div className="header"><h1>MLB Stats API</h1></div>
			
			{visible === "teams" && 
				<TeamSelector Teams={teams} setTeams={setTeams} handleTeam={handleTeam}/>
			}
			{visible === "players" &&
				<PlayerSelector roster={roster} handlePlayer={handlePlayer} handleBack={handleBack} /> 
			}
			{visible === "stats" && 
				<StatsDisplay BattingStats={bat} PitchingStats={pitch} handleBack={handleBack} Img={img} PlayerName={playerName} PlayerPos={playerPos} handleCompare={handleCompare}/>
			}
			{visible === "compare" &&
				<Comparison handleBack={handleBack} />
			}
			<footer>
				© 2025 MLB Advanced Media, LP. All rights reserved. Webapp created and used only for educational non-commercial purposes. 
			</footer>
        </div>
    );
}

