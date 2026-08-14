import React, {useEffect} from "react"

const TEAM_COLORS = {
    "Arizona Diamondbacks": "#A71930",
    "Atlanta Braves": "#CE1141",
    "Baltimore Orioles": "#DF4601",
    "Boston Red Sox": "#BD3039",
    "Chicago Cubs": "#0E3386",
    "Chicago White Sox": "#27251F",
    "Cincinnati Reds": "#C6011F",
    "Cleveland Guardians": "#E31937",
    "Colorado Rockies": "#33006F",
    "Detroit Tigers": "#0C2340",
    "Houston Astros": "#EB6E1F",
    "Kansas City Royals": "#004687",
    "Los Angeles Angels": "#BA0021",
    "Los Angeles Dodgers": "#005A9C",
    "Miami Marlins": "#00A3E0",
    "Milwaukee Brewers": "#12284C",
    "Minnesota Twins": "#002B5C",
    "New York Mets": "#FF5910",
    "New York Yankees": "#0C2340",
    "Oakland Athletics": "#003831",
    "Philadelphia Phillies": "#E81828",
    "Pittsburgh Pirates": "#27251F",
    "San Diego Padres": "#2F241D",
    "San Francisco Giants": "#101010",
    "Seattle Mariners": "#005C5C",
    "St. Louis Cardinals": "#C41E3A",
    "Tampa Bay Rays": "#8FBCE6",
    "Texas Rangers": "#003278",
    "Toronto Blue Jays": "#134A8E",
    "Washington Nationals": "#AB0003",
};

export default function TeamSelector({handleTeam, Teams, setTeams}){

    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOSTNAME}/teams`).then((res) =>
            res.json().then((data) => {
                setTeams(data);
            })
        );
    }, [setTeams]);
    
    function teamList(teams){
		return teams.map(curr => {
			return <Team team={curr} key={curr.id}/>;
		})
	}

    const Team = props => {
        const color = TEAM_COLORS[props.team.name] || "#0E5F43";
        return (
            <div
                className="team-button"
                value={props.team.id}
                onClick={() => handleTeam(props.team.id, props.team.name)}
                style={{
                    background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
                    borderColor: color,
                    boxShadow: `0 14px 28px -18px ${color}`
                }}
            >
                <img src={`https://www.mlbstatic.com/team-logos/team-cap-on-dark/${props.team.id}.svg`} alt=""/>
                <span>{props.team.name}</span>
            </div>
        );
    };

    return(
        <>
            {Teams.length === 0 && <h3>Please wait and or refresh after two minutes while the backend (hosted for free) spins up to populate the page, thanks.</h3>}
            <div className="selector-header">
                <span>Choose a Team</span>
            </div>
			<div className="grid-container team-grid-container">
				{teamList(Teams)}
			</div>
		</>
    );
}