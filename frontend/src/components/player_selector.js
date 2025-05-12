import React from "react"

export default function PlayerSelector({handlePlayer, handleBack, roster}){
    
    
    
    
    const Player = props => (
		<div className="button" value={[props.player.id, props.player.pos]} onClick={() => handlePlayer([props.player.id, props.player.pos])}> 
            <img src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${props.player.id}/headshot/67/current`} alt=""/>
			<div className="player-name">{props.player.name}</div>
            <div className="player-name">{props.player.pos}</div>
        </div>
	);

    function rosterList(roster){
		return roster.map(curr => {
			return <Player player={curr} key={curr.id} />;
		})
	}
    
    return (
        <>
            <button className="btn btn-primary" onClick={() => handleBack() }>Back</button>
            <span>Choose a player from the active roster</span>
            <div className="grid-container">
                {rosterList(roster)}
            </div>
        </>
    )
}