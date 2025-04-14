import React, { useState, useEffect } from "react";
import "./App.css";



const Team = props => (
	<option value={props.team.id}>{props.team.name}</option>
);

const Player = props => (
	<option value={[props.player.id, props.player.pos]}>{props.player.name + " - " + props.player.pos}</option>
);


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
    
	const [teams, setTeams] = useState([]);
	const [roster, setRoster] = useState([]);
	const [bat, setBat] = useState([]);
	const [pitch, setPitch] = useState([]);
	const [img, setImg] = useState("");
	
	
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
    }, []);
	
	
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
		console.log(bat)
		
			return <Bat stat={bat} />;
	}
	
	function pitchLine(pitch){
		return <Pitch stat={pitch} />
	}
	
	
	function handleTeam(e){
		console.log(e)
		fetch(`/teams/${e}`).then((res) =>
			res.json().then((data) => {
				setRoster(data);
			})
		);
	}
	
	function handlePlayer(e){
		setBat([])
		setPitch([])
		console.log(e)
		e = e.split(",")
		setImg(`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${e[0]}/headshot/67/current`);
		console.log(e)
		if (e[1] != 'P'){
		
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
	
    return (
        <div className="App">
            <h1>MLB Stats API</h1>
			<label>Choose a Team</label>
			<select onClick={e => handleTeam(e.target.value)}>
			{teamList(teams)}
			</select>
			
			<label>Choose a Player</label>
			<select onClick={e => handlePlayer(e.target.value)}>
			{rosterList(roster)}
			</select>
			
			<img src={img} alt="player"/>
			
			<h2>Hitting Stats</h2>
			<table>
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
			<table>
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
        </div>
    );
}

