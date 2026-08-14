import React from "react"
    
export default function StatLine({name, BattingStats, PitchingStats, FieldingStats, TeamColor}){
    const [toggleHitting, setToggleHitting] = React.useState(false)
    const [togglePitching, setTogglePitching] = React.useState(false)
    const [toggleFielding, setToggleFielding] = React.useState(false)
    
    return(
        <div className="container-col" id="statline" style={{ '--team-color': TeamColor || 'var(--mlb-green)'}}>
            <div className="container-row">
                {(BattingStats.length !== 0 && BattingStats.atBats !== 0) && 
                <button className="btn btn-hitting" style={{ background: `linear-gradient(135deg, ${TeamColor || 'var(--mlb-green)'} 0%, ${TeamColor || 'var(--mlb-green)'} 90%, rgba(0,0,0,0.2) 100%)` }} onClick={() => setToggleHitting(!toggleHitting)}>Show Hitting Stats</button> }
                {PitchingStats.length !== 0 && 
                <button className="btn btn-pitching" style={{ background: `linear-gradient(135deg, ${TeamColor || 'var(--mlb-green)'} 0%, ${TeamColor || 'var(--mlb-green)'} 90%, rgba(0,0,0,0.2) 100%)` }} onClick={() => setTogglePitching(!togglePitching)}>Show Pitching Stats</button>}
                <button className="btn btn-fielding" style={{ background: `linear-gradient(135deg, ${TeamColor || 'var(--mlb-green)'} 0%, ${TeamColor || 'var(--mlb-green)'} 90%, rgba(0,0,0,0.2) 100%)` }} onClick={() => setToggleFielding(!toggleFielding)}>Show Fielding Stats</button>
            </div>
            {toggleHitting &&
            <div className="container-col">
                <h2> {name}'s Hitting Stats</h2>
                <table className="stats-table vertical-table">
                    <tbody>
                        <tr><th>Games Played</th><td>{BattingStats.gamesPlayed ?? "-"}</td></tr>
                        <tr><th>Hits</th><td>{BattingStats.hits ?? "-"}</td></tr>
                        <tr><th>At Bats</th><td>{BattingStats.atBats ?? "-"}</td></tr>
                        <tr><th>Strikeouts</th><td>{BattingStats.strikeOuts ?? "-"}</td></tr>
                        <tr><th>Walks</th><td>{BattingStats.baseOnBalls ?? "-"}</td></tr>
                        <tr><th>Batting Average</th><td>{BattingStats.avg ?? "-"}</td></tr>
                        <tr><th>On-base Percentage</th><td>{BattingStats.obp ?? "-"}</td></tr>
                        <tr><th>Slugging Percentage</th><td>{BattingStats.slg ?? "-"}</td></tr>
                        <tr><th>On-base Plus Slugging (OPS)</th><td>{BattingStats.ops ?? "-"}</td></tr>
                        <tr><th>Home Runs</th><td>{BattingStats.homeRuns ?? "-"}</td></tr>
                    </tbody>
                </table>
            </div>}
        
            
            {togglePitching &&
            <div className="container-col">
                <h2> {name}'s Pitching Stats</h2>
                <table className="stats-table vertical-table">
                    <tbody>
                        <tr><th>Games Played</th><td>{PitchingStats.gamesPitched ?? "-"}</td></tr>
                        <tr><th>Games Started</th><td>{PitchingStats.gamesStarted ?? "-"}</td></tr>
                        <tr><th>Wins</th><td>{PitchingStats.wins ?? "-"}</td></tr>
                        <tr><th>Losses</th><td>{PitchingStats.losses ?? "-"}</td></tr>
                        <tr><th>Innings Pitched</th><td>{PitchingStats.inningsPitched ?? "-"}</td></tr>
                        <tr><th>Earned Runs</th><td>{PitchingStats.earnedRuns ?? "-"}</td></tr>
                        <tr><th>Earned Run Average (ERA)</th><td>{PitchingStats.era ?? "-"}</td></tr>
                        <tr><th>Strikeouts</th><td>{PitchingStats.strikeOuts ?? "-"}</td></tr>
                        <tr><th>Walks</th><td>{PitchingStats.baseOnBalls ?? "-"}</td></tr>
                        <tr><th>Walks and Hits per Inning Pitched (WHIP)</th><td>{PitchingStats.whip ?? "-"}</td></tr>
                    </tbody>
                </table>
            </div>}
            
            
            <div className="container-col">
                
                {toggleFielding &&
                <>
                <h2> {name}'s Fielding Stats</h2>
                <table className="stats-table vertical-table">
                    <tbody>
                        <tr><th>Position</th><td>{FieldingStats.position?.name ?? "-"}</td></tr>
                        <tr><th>Assists</th><td>{FieldingStats.assists ?? "-"}</td></tr>
                        <tr><th>Put Outs</th><td>{FieldingStats.putOuts ?? "-"}</td></tr>
                        <tr><th>Errors</th><td>{FieldingStats.errors ?? "-"}</td></tr>
                        <tr><th>Fielding Percentage</th><td>{FieldingStats.fielding ?? "-"}</td></tr>
                    </tbody>
                </table>
                </>
                }
            </div>
        </div>
    )
}