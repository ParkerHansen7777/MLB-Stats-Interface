import React from "react"

export default function PlayerSelector({handleRoster,handlePlayer, handleBack, roster}){
    
    
    
    
    const Player = props => (
		<div className="button" value={[props.player.id, props.player.pos]} style={{ backgroundColor: props.color }} onClick={() => handlePlayer([props.player.id, props.player.pos, props.player.name])}>
            <img src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${props.player.id}/headshot/67/current`} alt=""/>
			<div>{props.player.name}</div>
            <div>{props.player.pos}</div>
            <div>{props.player.status}</div>
        </div>
	);


    function pitcherList(roster){
        
        function checkPos(curr){
            return curr.pos === "P" || curr.pos === "TWP"
        }

        function checkStatus(e){

            if (e === 'Active'){
                return "green"
            } 
            else if (e.includes('Injured')){ 
                return "red"
            }
            else {
                return "yellow"
            }
        }
        
        const filtered = roster.filter(checkPos)
        return filtered.map(curr => {
            return <Player player={curr} key={curr.id}/>;
		})
    }

    function pPlayerList(roster){
        
        function checkPos(curr){
            return curr.pos !== "P"
        }

        function checkStatus(e){

            if (e === 'Active'){
                return "green"
            } 
            else if (e.includes('Injured')){ 
                return "red"
            }
            else {
                return "yellow"
            }
        }

        const filtered = roster.filter(checkPos)
        return filtered.map(curr => {
            return <Player player={curr} key={curr.id} color={checkStatus(curr.status)}/>;
		})
    }
    
    return (
        <>
            <button className="btn btn-primary" onClick={() => handleBack() }>Back</button>
            <span>Choose a roster type</span>
            <select name="rosterType" id="rosterType" onChange={(e) => handleRoster(e.target.value)}>
                <option value="">Select a roster</option>
                <option value="active">Active Roster</option>
                <option value="40Man">40-Man Roster</option>
            </select>
            <span>Choose a player from the selected roster</span>
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

 