import React from "react"

export default function Comparison({handleBack, Img, Name, Pos, BattingStats, PitchingStats, CImg, CName, CPos, CBattingStats, CPitchingStats}){

    
    const Bat = props => (
        <>
		<span>{props.stat.avg}</span>
		<span>{props.stat.obp}</span>
		<span>{props.stat.slg}</span>
		<span>{props.stat.ops}</span>
		<span>{props.stat.homeRuns}</span>
		</>
		
    );
    
    
    const Pitch = props => (
        <>
		<span>{props.stat.gamesPlayed}</span>
		<span>{props.stat.wins}</span>
		<span>{props.stat.losses}</span>
		<span>{props.stat.era}</span>
		<span>{props.stat.whip}</span>
		<span>{props.stat.inningsPitched}</span>
		</>
    );
    
    
    
    function batLine(bat){
		//console.log(bat)
		return <Bat stat={bat} />;
	}
	
	function pitchLine(pitch){
		//console.log(pitch)
		return <Pitch stat={pitch} />
	}
    
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