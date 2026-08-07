import React from "react"
import Popup from 'reactjs-popup'
//import 'reactjs-popup/dist/index.css';


export default function StatsDisplay({handleBack, BattingStats, PitchingStats, FieldingStats, Img, PlayerName, PlayerPos, visible, TeamSelector, PlayerSelector}){

    
    const Bat = props => (
        <>
		<span>{props.stat.gamesPlayed}</span>
		<span>{props.stat.hits}</span>
		<span>{props.stat.atBats}</span>
		<span>{props.stat.strikeOuts}</span>
		<span>{props.stat.baseOnBalls}</span>
		<span>{props.stat.avg}</span>
		<span>{props.stat.obp}</span>
		<span>{props.stat.slg}</span>
		<span>{props.stat.ops}</span>
		<span>{props.stat.homeRuns}</span>
		</>
		
    );
    
    
    const Pitch = props => (
        <>
		<span>{props.stat.gamesPitched}</span>
		<span>{props.stat.gamesStarted}</span>
		<span>{props.stat.wins}</span>
		<span>{props.stat.losses}</span>
		<span>{props.stat.inningsPitched}</span>
		<span>{props.stat.earnedRuns}</span>
		<span>{props.stat.era}</span>
		<span>{props.stat.strikeOuts}</span>
		<span>{props.stat.baseOnBalls}</span>
		<span>{props.stat.whip}</span>
		</>
    );


    const Field = props => (
		<>
		<span>{props.stat.position?.name}</span>
		<span>{props.stat.assists}</span>
		<span>{props.stat.putOuts}</span>
		<span>{props.stat.errors}</span>
		<span>{props.stat.fielding}</span>
		</>
	);
    
    
    function batLine(bat){
		return <Bat stat={bat} />;
		
	}
	
	function pitchLine(pitch){
		return <Pitch stat={pitch} />
		
	}

	function fieldLine(field){
		return <Field stat={field} />
	}
	
	function handleCompare(close){
		return(
		<div className="c-container">
			<div className="c-content">
				{visible === "teams" &&
					TeamSelector
				}
				{visible === "players" &&
					PlayerSelector
				}
			</div>
			<div>
				<button onClick={() => close() }>Close modal</button>
			</div>
		</div>
		)
	}
	

    return(
        <>
				<button className="btn btn-primary" onClick={() => handleBack() }>Back</button>
				<Popup className="selector" trigger=
				{<button className="btn btn-success">Compare</button>}
				modal nested>
					{
					close => (
					handleCompare(close)
				)}
				</Popup>
				<div className="container-row">
					<div className="playercard">
						<img className="stats-headshot"src={Img} alt=""/>
						<div className="player-name">{PlayerName}</div>
            			<div className="player-name">{PlayerPos}</div>
					</div>
					
						{(BattingStats.length !== 0 && BattingStats.atBats !== 0) && 
						<div className="container-col">
							<h2>Hitting Stats</h2>
							<div className="container-row">
								<div className="container-col">
									<span>Games Played</span>
									<span>Hits</span>
									<span>At Bats</span>
									<span>Strikeouts</span>
									<span>Walks</span>
									<span>Batting Average</span>
									<span>On-base Percentage</span>
									<span>Slugging Percentage</span>
									<span>On-base Plus Slugging (OPS)</span>
									<span>Home Runs</span>
								</div>
								<div className="container-col">
									{batLine(BattingStats)}
								</div>
							</div>
						</div>}
						{PitchingStats.length !== 0 && 
						<div className="container-col">
							<h2>Pitching Stats</h2>
							<div className="container-row">
								<div className="container-col">
									<span>Games Played</span>
									<span>Games Started</span>
									<span>Wins</span>
									<span>Loses</span>
									<span>Innings Pitched</span>
									<span>Earned Runs</span>
									<span>Earned Run Average (ERA)</span>
									<span>Strikeouts</span>
									<span>Walks</span>
									<span>Walks and Hits per Inning Pitched (WHIP)</span>
								</div>
								<div className="container-col">
									{pitchLine(PitchingStats)}
								</div>
							</div>
						</div>}
						<div className="container-col">
							<h2>Fielding Stats</h2>
							<div className="container-row">
								<div className="container-col">
									<span>Position</span>
									<span>Assists</span>
									<span>Put Outs</span>
									<span>Errors</span>
									<span>Fielding Percentage</span>
								</div>
								<div className="container-col">
									{fieldLine(FieldingStats)}
								</div>
							</div>
						</div>
				</div>
			</>
    )
}