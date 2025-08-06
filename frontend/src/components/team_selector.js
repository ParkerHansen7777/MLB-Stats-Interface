import React, {useEffect} from "react"


export default function TeamSelector({handleTeam, Teams, setTeams}){

    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("https://mlb-stats-interface-backend.onrender.com/teams").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                //console.log(data);
				setTeams(data);
            })
        );
    }, [setTeams]);
    
    function teamList(teams){
		
		return teams.map(curr => {
			return <Team team={curr} key={curr.id}/>;
		})
	}

    const Team = props => (
		<div className="button" value={props.team.id} onClick={() => handleTeam(props.team.id)} style={{alignContent: "center"}}>
			<img src={`https://www.mlbstatic.com/team-logos/team-cap-on-dark/${props.team.id}.svg`} alt=""/>
			<span>{props.team.name}</span>
		</div>
	);

    let connected;
	if(Teams === []){
		connected = <h3>Please wait and or refresh after two minutes while the backend (hosted for free) spins up to populate the page, thanks.</h3>
	}
    return(
        <>
			{connected}
            <span>Choose a Team</span>
			<div className="grid-container">
				{teamList(Teams)}
			</div>
		</>
    );
}