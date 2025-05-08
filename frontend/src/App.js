import React, { useState, useEffect } from "react";
import "./App.css";



const Bat = props => (
	<tr>
		<td>{props.stat.avg}</td>
		<td>{props.stat.obp}</td>
		<td>{props.stat.slg}</td>
		<td>{props.stat.ops}</td>
		<td>{props.stat.homeRuns}</td>
	</tr>
);


const Pitch = props => (
	<tr>
		<td>{props.stat.gamesPlayed}</td>
		<td>{props.stat.wins}</td>
		<td>{props.stat.losses}</td>
		<td>{props.stat.era}</td>
		<td>{props.stat.whip}</td>
		<td>{props.stat.inningsPitched}</td>
		
	</tr>
);

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
        fetch("/teams").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                //console.log(data);
				setTeams(data);
				//console.log(teams);
				
				
            })
        );
    }, [visible]);
	
	
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
	
	function batLine(bat){
		//console.log(bat)
		
			return <Bat stat={bat} />;
	}
	
	function pitchLine(pitch){
		return <Pitch stat={pitch} />
	}
	
	
	function handleTeam(e){
		//console.log(e)
		setVisible("players")
		fetch(`/teams/${e}`).then((res) =>
			res.json().then((data) => {
				setRoster(data);
			})
		);
	}

	const Player = props => (
		<button value={[props.player.id, props.player.pos]} onClick={() => handlePlayer([props.player.id, props.player.pos])}> 
			<img src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${props.player.id}/headshot/67/current`}/>
			<span>{props.player.name + " - " + props.player.pos}</span>
		</button>
	);

	const Team = props => (
		<button value={props.team.id} onClick={() => handleTeam(props.team.id)} >
			<img src={`https://www.mlbstatic.com/team-logos/team-cap-on-dark/${props.team.id}.svg`}/>
			<span>{props.team.name}</span>
		</button>
	);
	
	

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
			<>
				<span>Choose a Team</span>
				<div className="grid-container">
					{teamList(teams)}
				</div>
			</>
			}
			{visible === "players" && 
			<>
				<button onClick={() => handleBack() }>Back</button>
				<span>Choose a player</span>
				<div className="grid-container">
					{rosterList(roster)}
				</div>
			</>}
			{visible === "stats" && 
			<>
				<button onClick={() => handleBack() }>Back</button>
				<h2>Hitting Stats</h2>
				<table class="table">
					<thead>
						<tr>
							<th>AVG</th>
							<th>OBP</th>
							<th>SLG</th>
							<th>OPS</th>
							<th>HR</th>
						</tr>
					</thead>
					<tbody>
					{batLine(bat)}
					</tbody>
				</table>
				
				<h2>Pitching Stats</h2>
				<table class="table">
					<thead>
						<tr>
							<th>Games Played</th>
							<th>W</th>
							<th>L</th>
							<th>ERA</th>
							<th>WHIP</th>
							<th>Innings Pitched</th>
						</tr>
					</thead>
					<tbody>
					{pitchLine(pitch)}
					</tbody>
				</table>
			</>}
			<footer>
				© 2025 MLB Advanced Media, LP. All rights reserved. Webapp created and used only for educational non-commercial purposes. 
			</footer>
        </div>
    );
}

