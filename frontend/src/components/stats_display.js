import React from "react"

export default function StatsDisplay({handleBack, bat, pitch}){

    
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
    
    
    
    function batLine(bat){
		//console.log(bat)
		
			return <Bat stat={bat} />;
	}
	
	function pitchLine(pitch){
		return <Pitch stat={pitch} />
	}


    return(
        <>
				<button className="btn btn-primary" onClick={() => handleBack() }>Back</button>
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
			</>
    )
}