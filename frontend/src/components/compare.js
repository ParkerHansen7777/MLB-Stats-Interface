import StatLine from "./statline"

export default function Comparison({handleBack, Img, Name, Pos, BattingStats, PitchingStats, FieldingStats, CImg, CName, CPos, CBattingStats, CPitchingStats, CFieldingStats}){

    //console.log({handleBack, Img, Name, Pos, BattingStats, PitchingStats, FieldingStats, CImg, CName, CPos, CBattingStats, CPitchingStats, CFieldingStats})
    return(
        <>
            <button className="btn btn-primary" onClick={() => handleBack() }>Back</button>
            <div className="container-row" id="compare-row">
                <div className="playercard">
                    <img className="stats-headshot"src={Img} alt=""/>
                    <div>{Name}</div>
                    <div>{Pos}</div>
                </div>
                
                <StatLine name={Name} BattingStats={BattingStats} PitchingStats={PitchingStats} FieldingStats={FieldingStats} />
                    
                <StatLine name={CName} BattingStats={CBattingStats} PitchingStats={CPitchingStats} FieldingStats={CFieldingStats} />

                <div className="playercard">
                    <img className="stats-headshot"src={CImg} alt=""/>
                    <div className="player-name">{CName}</div>
                    <div className="player-name">{CPos}</div>
                </div>
            </div>
        </>

    ) 
}