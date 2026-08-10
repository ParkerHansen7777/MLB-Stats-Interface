import { batLine, pitchLine } from "../utils/stats_helper.js"

export default function Comparison({handleBack, Img, Name, Pos, BattingStats, PitchingStats, CImg, CName, CPos, CBattingStats, CPitchingStats}){

    
    return(
        <>
            <button className="btn btn-primary" onClick={() => handleBack() }>Back</button>
            <div className="container-row" id="compare-row">
                <div className="playercard">
                    <img className="stats-headshot"src={Img} alt=""/>
                    <div>{Name}</div>
                    <div>{Pos}</div>
                </div>
                
                <div className="container-col">
                    {PitchingStats.length !== 0 &&
                    <>
                    <h2>{Name}'s Pitching Stats</h2>
                    <div className="container-row">
                        <div className="container-col">
                            <span>Games Played</span>
                            <span>Wins</span>
                            <span>Loses</span>
                            <span>ERA</span>
                            <span>WHIP</span>
                            <span>Innings Pitched</span>
                        </div>
                        <div className="container-col">
                            {pitchLine(PitchingStats)}
                        </div>
                    </div>
                    </>}
                    {BattingStats.length !== 0 &&
                    <>
                    <h2>{Name}'s Hitting Stats</h2>
                    <div className="container-row">
                        <div className="container-col">
                            <span>AVG</span>
                            <span>OBP</span>
                            <span>SLG</span>
                            <span>OPS</span>
                            <span>HR</span>
                        </div>
                        <div className="container-col">
                            {batLine(BattingStats)}
                        </div>
                    </div>
                    </>}
                </div>
                <div id="statline" className="container-col">
                    {CPitchingStats.length !== 0 &&
                    <>
                    <h2>{CName}'s Pitching Stats</h2>
                    <div className="container-row">
                        <div className="container-col">
                            <span>Games Played</span>
                            <span>Wins</span>
                            <span>Loses</span>
                            <span>ERA</span>
                            <span>WHIP</span>
                            <span>Innings Pitched</span>
                        </div>
                        <div className="container-col">
                            {pitchLine(CPitchingStats)}
                        </div>
                    </div>
                    </>}
                    {CBattingStats.length !== 0 &&
                    <>
                    <h2>{CName}'s Hitting Stats</h2>
                    <div className="container-row">
                        <div className="container-col">
                            <span>AVG</span>
                            <span>OBP</span>
                            <span>SLG</span>
                            <span>OPS</span>
                            <span>HR</span>
                        </div>
                        <div className="container-col">
                            {batLine(CBattingStats)}
                        </div>
                    </div>
                    </>}
                </div>
                
                <div className="playercard">
                    <img className="stats-headshot"src={CImg} alt=""/>
                    <div className="player-name">{CName}</div>
                    <div className="player-name">{CPos}</div>
                </div>
            </div>
        </>

    ) 
}