import React from "react"

export default function StatsDisplay({handleBack, BattingStats, PitchingStats, Img}){

    
    const Bat = props => (
        <>
		<span>{props.stat.avg}</span>
		<span>{props.stat.obp}</span>
		<span>{props.stat.slg}</span>
		<span>{props.stat.ops}</span>
		<span>{props.stat.homeRuns}</span>
		</>
		
    );
    
    
    const Pitch = props => (
        <>
		<span>{props.stat.gamesPlayed}</span>
		<span>{props.stat.wins}</span>
		<span>{props.stat.losses}</span>
		<span>{props.stat.era}</span>
		<span>{props.stat.whip}</span>
		<span>{props.stat.inningsPitched}</span>
		</>
    );
    
    
    
    function batLine(bat){
		//console.log(bat)
		return <Bat stat={bat} />;
		
	}
	
	function pitchLine(pitch){
		//console.log(pitch)
		return <Pitch stat={pitch} />
		
	}


    return(
        <>
				<button className="btn btn-primary" onClick={() => handleBack() }>Back</button>
				<div className="container-row">
					<img className="stats-headshot"src={Img} alt=""/>
					<div className="container-row">
						{BattingStats.length !== 0 && 
						<div className="container-col">
							<h2>Hitting Stats</h2>
							<div className="container-row">
								<div className="container-col">
									<span>AVG</span>
									<span>OBP</span>
									<span>SLG</span>
									<span>OPS</span>
									<span>HR</span>
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
									<span>Wins</span>
									<span>Loses</span>
									<span>ERA</span>
									<span>WHIP</span>
									<span>Innings Pitched</span>
								</div>
								<div className="container-col">
									{pitchLine(PitchingStats)}
								</div>
							</div>
						</div>}
					</div>
				</div>
			</>
    )
}