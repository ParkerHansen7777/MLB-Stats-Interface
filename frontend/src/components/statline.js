import React from "react"
import { batLine, pitchLine, fieldLine } from "../utils/stats_helper.js"
    
export default function StatLine({name, BattingStats, PitchingStats, FieldingStats}){
    //console.log({name, BattingStats, PitchingStats, FieldingStats})
    const [toggleHitting, setToggleHitting] = React.useState(false)
    const [togglePitching, setTogglePitching] = React.useState(false)
    const [toggleFielding, setToggleFielding] = React.useState(false)
    
    return(
        
        <div className="container-col">
        {(BattingStats.length !== 0 && BattingStats.atBats !== 0) && 
        
        <button onClick={() => setToggleHitting(!toggleHitting)}>Show Hitting Stats</button> }
            {toggleHitting &&
            <div className="container-col">
                <h2> {name}'s Hitting Stats</h2>
                <table className="stats-table">
                    <thead>
                        <tr>
                            <th>Games Played</th>
                            <th>Hits</th>
                            <th>At Bats</th>
                            <th>Strikeouts</th>
                            <th>Walks</th>
                            <th>Batting Average</th>
                            <th>On-base Percentage</th>
                            <th>Slugging Percentage</th>
                            <th>On-base Plus Slugging (OPS)</th>
                            <th>Home Runs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {batLine(BattingStats)}
                        </tr>
                    </tbody>
                </table>
            </div>}
        
            
            {PitchingStats.length !== 0 && 
            <button onClick={() => setTogglePitching(!togglePitching)}>Show Pitching Stats</button>}
            {togglePitching &&
            <div className="container-col">
                <h2> {name}'s Pitching Stats</h2>
                <table className="stats-table">
                    <thead>
                        <tr>
                            <th>Games Played</th>
                            <th>Games Started</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Innings Pitched</th>
                            <th>Earned Runs</th>
                            <th>Earned Run Average (ERA)</th>
                            <th>Strikeouts</th>
                            <th>Walks</th>
                            <th>Walks and Hits per Inning Pitched (WHIP)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {pitchLine(PitchingStats)}
                        </tr>
                    </tbody>
                </table>
            </div>}
            
            
            <div className="container-col">
                <button onClick={() => setToggleFielding(!toggleFielding)}>Show Fielding Stats</button>
                {toggleFielding &&
                <>
                <h2> {name}'s Fielding Stats</h2>
                <table className="stats-table">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Assists</th>
                            <th>Put Outs</th>
                            <th>Errors</th>
                            <th>Fielding Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {fieldLine(FieldingStats)}
                        </tr>
                    </tbody>
                </table>
                </>
}
            </div>
        </div>
        
    )
}