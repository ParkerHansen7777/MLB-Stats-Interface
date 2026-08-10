import { batLine, pitchLine, fieldLine } from "../utils/stats_helper.js"
    
export default function StatLine({name, BattingStats, PitchingStats, FieldingStats}){
    console.log({name, BattingStats, PitchingStats, FieldingStats})
    return(
        <>
        {(BattingStats.length !== 0 && BattingStats.atBats !== 0) && 
            <div className="container-col">
                <h2> {name}'s Hitting Stats</h2>
                <div className="container-row">
                    <div className="container-col">
                        <span>Games Played</span>
                        <span>Hits</span>
                        <span>At Bats</span>
                        <span>Strikeouts</span>
                        <span>Walks</span>
                        <span>Batting Average</span>
                        <span>On-base Percentage</span>
                        <span>Slugging Percentage</span>
                        <span>On-base Plus Slugging (OPS)</span>
                        <span>Home Runs</span>
                    </div>
                    <div className="container-col">
                        {batLine(BattingStats)}
                    </div>
                </div>
            </div>}
            
            {PitchingStats.length !== 0 && 
            <div className="container-col">
                <h2> {name}'s Pitching Stats</h2>
                <div className="container-row">
                    <div className="container-col">
                        <span>Games Played</span>
                        <span>Games Started</span>
                        <span>Wins</span>
                        <span>Loses</span>
                        <span>Innings Pitched</span>
                        <span>Earned Runs</span>
                        <span>Earned Run Average (ERA)</span>
                        <span>Strikeouts</span>
                        <span>Walks</span>
                        <span>Walks and Hits per Inning Pitched (WHIP)</span>
                    </div>
                    <div className="container-col">
                        {pitchLine(PitchingStats)}
                    </div>
                </div>
            </div>}
            
            <div className="container-col">
                <h2> {name}'s Fielding Stats</h2>
                <div className="container-row">
                    <div className="container-col">
                        <span>Position</span>
                        <span>Assists</span>
                        <span>Put Outs</span>
                        <span>Errors</span>
                        <span>Fielding Percentage</span>
                    </div>
                    <div className="container-col">
                        {fieldLine(FieldingStats)}
                    </div>
                </div>
            </div>
        </>
    )
}