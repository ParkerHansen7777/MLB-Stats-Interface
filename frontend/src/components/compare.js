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

export default function Comparison({handleBack, Img, Name, Pos, Status, TeamColor, BattingStats, PitchingStats, FieldingStats, CImg, CName, CPos, CStatus, CTeamColor, CBattingStats, CPitchingStats, CFieldingStats}){
    return(
        <>
            <button className="btn btn-primary" onClick={() => handleBack() }>Back</button>
            <div className="container-row" id="compare-row">
                <div className="playercard" style={{ '--team-color-top': TeamColor || '#0E5F43', '--team-color-bottom': (TeamColor === '#101010' ? '#FD5A1E' : TeamColor) || '#0E5F43' }}>
                    <img className="stats-headshot"src={Img} alt=""/>
                    <div className="player-name">{Name}</div>
                    <div className="player-name">{Pos}</div>
                    <StatusBadge status={Status} teamColor={TeamColor} />
                </div>
                
                <StatLine name={Name} BattingStats={BattingStats} PitchingStats={PitchingStats} FieldingStats={FieldingStats} TeamColor={TeamColor} />
                    
                <StatLine name={CName} BattingStats={CBattingStats} PitchingStats={CPitchingStats} FieldingStats={CFieldingStats} TeamColor={CTeamColor} />

                <div className="playercard" style={{ '--team-color-top': CTeamColor || '#0E5F43', '--team-color-bottom': (CTeamColor === '#101010' ? '#FD5A1E' : CTeamColor) || '#0E5F43' }}>
                    <img className="stats-headshot"src={CImg} alt=""/>
                    <div className="player-name">{CName}</div>
                    <div className="player-name">{CPos}</div>
                    <StatusBadge status={CStatus} teamColor={CTeamColor} />
                </div>
            </div>
        </>

    ) 
}