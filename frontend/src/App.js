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

	const [compVisible, setCVisible] = useState("teams")
	const [compRoster, setCRoster] = useState([])
	const [compImg, setCImg] = useState("")
	const [compName, setCName] = useState("")
	const [compPos, setCPos] = useState("")
	const [compBat, setCBat] = useState([])
	const [compPitch, setCPitch] = useState([])


	function handleTeam(e){
		//console.log(e)
		setVisible("players")
		fetch(`https://mlb-stats-interface-backend.onrender.com/teams/${e}`).then((res) =>
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
		
		
			fetch(`https://mlb-stats-interface-backend.onrender.com//player/${e[0]}/hitting`).then((res) =>
				res.json().then((data) => {
					setBat(data);
				})
			);
		
			fetch(`https://mlb-stats-interface-backend.onrender.com//player/${e[0]}/pitching`).then((res) =>
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

	
	function handleCompBack(){
		setVisible("stats")
		setCVisible("teams")
		setCRoster([])
		setCBat([])
		setCPitch([])
		setCImg("")
		setCName("")
		setCPos("")
	}
	
	function handleCompPlayer(e){
		setVisible("compare")
		setCImg(`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${e[0]}/headshot/67/current`)
		setCPos(e[1])
		setCName(e[2])
		
		
			fetch(`https://mlb-stats-interface-backend.onrender.com//player/${e[0]}/hitting`).then((res) =>
				res.json().then((data) => {
					setCBat(data);
				})
			);
		
			fetch(`https://mlb-stats-interface-backend.onrender.com//player/${e[0]}/pitching`).then((res) =>
				res.json().then((data) => {
					setCPitch(data);
				})
			);

	}
	
	function handleCompTeam(e){
		//console.log(e)
		setCVisible("players")
		fetch(`https://mlb-stats-interface-backend.onrender.com//teams/${e}`).then((res) =>
			res.json().then((data) => {
				setCRoster(data);
			})
		);
	}
	
    return (
        <div className="App">
            <div className="header"><h1>MLB Stats API</h1></div>
			
			{ teams === [] && 
				<h3>Please wait and or refresh after two minutes while the backend (hosted for free) spins up to populate the page, thanks.</h3>
			}

			{visible === "teams" && 
				<TeamSelector Teams={teams} setTeams={setTeams} handleTeam={handleTeam}/>
			}
			{visible === "players" &&
				<PlayerSelector roster={roster} handlePlayer={handlePlayer} handleBack={handleBack} /> 
			}
			{visible === "stats" && 
				<StatsDisplay BattingStats={bat} PitchingStats={pitch} handleBack={handleBack} Img={img} PlayerName={playerName} PlayerPos={playerPos} visible={compVisible} 
					TeamSelector={<TeamSelector Teams={teams} setTeams={setTeams} handleTeam={handleCompTeam}/>}
					PlayerSelector={<PlayerSelector roster={compRoster} handlePlayer={handleCompPlayer} handleBack={handleCompBack}/>} 
				/>
			}
			{visible === "compare" &&
				<Comparison handleBack={handleCompBack} Img={img} Name={playerName} Pos={playerPos} BattingStats={bat} PitchingStats={pitch} CImg={compImg} CName={compName} CPos={compPos} CBattingStats={compBat} CPitchingStats={compPitch}/>
			}
			<footer>
				© 2025 MLB Advanced Media, LP. All rights reserved. Webapp created and used only for educational non-commercial purposes. 
			</footer>
        </div>
    );
}

