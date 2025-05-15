import React from "react"

export default function PlayerSelector({handlePlayer, handleBack, roster}){
    
    
    
    
    const Player = props => (
		<div className="button" value={[props.player.id, props.player.pos]} onClick={() => handlePlayer([props.player.id, props.player.pos, props.player.name])}> 
            <img src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${props.player.id}/headshot/67/current`} alt=""/>
			<div>{props.player.name}</div>
            <div>{props.player.pos}</div>
        </div>
	);


    function pitcherList(roster){
        
        function checkPos(curr){
            return curr.pos === "P" || curr.pos === "TWP"
        }
        
        
        const filtered = roster.filter(checkPos)
        return filtered.map(curr => {
            return <Player player={curr} key={curr.id} />;
		})
    }

    function pPlayerList(roster){
        
        function checkPos(curr){
            return curr.pos !== "P"
        }

        const filtered = roster.filter(checkPos)
        return filtered.map(curr => {
            return <Player player={curr} key={curr.id} />;
		})
    }
    
    return (
        <>
            <button className="btn btn-primary" onClick={() => handleBack() }>Back</button>
            <span>Choose a player from the active roster</span>
            <div className="container-row">
                <div className="grid-container" style={{gridTemplateColumns: "repeat(3, 15vh)"}}>
                    {pitcherList(roster)}
                </div> 
                <div className="grid-container" style={{gridTemplateColumns: "repeat(3, 15vh)"}}>
                    {pPlayerList(roster)}
                </div>
            </div>

        </>
    )
}