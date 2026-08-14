import React from "react"
import Popup from 'reactjs-popup'
import StatLine from "./statline"

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

function StatusBadge({status, teamColor}) {
    const currentStatus = status || "Status unavailable";
    const statusType = normalizeStatus(currentStatus);

    return (
        <div className="player-status" style={{ '--team-color': teamColor || '#0E5F43' }}>
            <span className="status-square" style={{ backgroundColor: STATUS_COLORS[statusType] || STATUS_COLORS.other }} />
            <span className="player-status-text">{currentStatus}</span>
        </div>
    );
}

export default function StatsDisplay({handleBack, BattingStats, PitchingStats, FieldingStats, Img, PlayerName, PlayerPos, PlayerStatus, TeamColor, visible, TeamSelector, PlayerSelector}){

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
				<button className="btn btn-primary" onClick={() => close() }>Close comparison</button>
			</div>
		</div>
		)
	}
	

    return(
        <>
			<button className="btn btn-primary" onClick={handleBack}>Back</button>
			<Popup className="selector" trigger=
				{<button className="btn btn-success">Compare</button>}
				modal nested>
					{
					close => (
					handleCompare(close)
				)}
			</Popup>
			<div className="container-row">
				<div className="playercard" style={{ '--team-color-top': TeamColor || '#0E5F43', '--team-color-bottom': (TeamColor === '#101010' ? '#FD5A1E' : TeamColor) || '#0E5F43' }}>
					<img className="stats-headshot"src={Img} alt=""/>
					<div className="player-name">{PlayerName}</div>
					<div className="player-name">{PlayerPos}</div>
					<StatusBadge status={PlayerStatus} teamColor={TeamColor} />
				</div>
				<StatLine name={PlayerName} BattingStats={BattingStats} PitchingStats={PitchingStats} FieldingStats={FieldingStats} TeamColor={TeamColor} />
			</div>
		</>
    )
}