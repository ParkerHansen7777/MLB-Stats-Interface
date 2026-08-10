import React from "react"
import Popup from 'reactjs-popup'
import StatLine from "./statline"
//import 'reactjs-popup/dist/index.css';


export default function StatsDisplay({handleBack, BattingStats, PitchingStats, FieldingStats, Img, PlayerName, PlayerPos, visible, TeamSelector, PlayerSelector}){

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
				<button onClick={() => close() }>Close comparison</button>
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
					<StatLine name={PlayerName} BattingStats={BattingStats} PitchingStats={PitchingStats} FieldingStats={FieldingStats}/>
				</div>
			</>
    )
}