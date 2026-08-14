import React from "react"

const STATUS_COLORS = {
    active: "#2e7d32",
    minors: "#f4b400",
    injured: "#d62f2f",
    other: "#6b7280",
};

function normalizeStatus(status) {
    const value = (status || "").toLowerCase();
    if (!value) return "other";
    if (value.includes("active") || value.includes("available") || value.includes("starter")) return "active";
    if (value.includes("minor") || value.includes("aaa") || value.includes("aa") || value.includes("a+") || value.includes("a-")) return "minors";
    if (value.includes("injured") || value.includes("disabled") || value.includes("dl") || value.includes("il")) return "injured";
    return "other";
}

export default function PlayerSelector({handleRoster,handlePlayer, handleBack, roster, teamColor}){
    const Player = props => {
        const playerStatus = props.player.status || "Unknown";
        const statusType = normalizeStatus(playerStatus);
        const buttonColor = props.teamColor || teamColor || "#0E5F43";

        // special gradient for SF Giants (black top to orange bottom)
        const isGiants = buttonColor.toLowerCase() === '#101010' || buttonColor.toLowerCase() === ' #101010';
        const backgroundStyle = isGiants
            ? `linear-gradient(135deg, #101010 0%, #FD5A1E 100%)`
            : `linear-gradient(135deg, ${buttonColor} 0%, ${buttonColor}CC 100%)`;

        return (
            <div
                className="player-button"
                value={[props.player.id, props.player.pos, props.player.name, playerStatus]}
                style={{
                    background: backgroundStyle,
                    borderColor: buttonColor,
                    boxShadow: `0 14px 28px -22px ${buttonColor}`
                }}
                onClick={() => handlePlayer([props.player.id, props.player.pos, props.player.name, playerStatus])}
            >
                <div className="player-button-inner">
                    <img src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${props.player.id}/headshot/67/current`} alt=""/>
                    <div className="player-name">{props.player.name}</div>
                    <div className="player-pos">{props.player.pos}</div>
                    <div className="player-status">
                        <span className="status-square" style={{ backgroundColor: STATUS_COLORS[statusType] || STATUS_COLORS.other }} />
                        <span className="player-status-text">{playerStatus}</span>
                    </div>
                </div>
            </div>
        );
    };

    function pitcherList(roster){
        function checkPos(curr){
            return curr.pos === "P" || curr.pos === "TWP"
        }

        const filtered = roster.filter(checkPos)
        return filtered.map(curr => {
            return <Player player={curr} key={curr.id} teamColor={teamColor}/>;
		})
    }

    function pPlayerList(roster){
        function checkPos(curr){
            return curr.pos !== "P"
        }

        const filtered = roster.filter(checkPos)
        return filtered.map(curr => {
            return <Player player={curr} key={curr.id} teamColor={teamColor}/>;
		})
    }
    
    return (
        <>
            <div className="selector-header">
                <button className="btn btn-primary" onClick={() => handleBack() }>Back</button>
                <span>Choose a roster type</span>
                <select name="rosterType" id="rosterType" onChange={(e) => handleRoster(e.target.value)}>
                    <option value="">Select a roster</option>
                    <option value="active">Active Roster</option>
                    <option value="40Man">40-Man Roster</option>
                </select>
            </div>
            <span className="selector-subhead">Choose a player from the selected roster</span>
            <div className="container-row roster-row">
                <div className="grid-container roster-grid" style={{gridTemplateColumns: "repeat(3, minmax(110px, 1fr))"}}>
                    {pitcherList(roster)}
                </div> 
                <div className="grid-container roster-grid" style={{gridTemplateColumns: "repeat(3, minmax(110px, 1fr))"}}>
                    {pPlayerList(roster)}
                </div>
            </div>

        </>
    )
}

