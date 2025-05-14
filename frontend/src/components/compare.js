import React from "react"

export default function Comparison({handleBack}){

    return(
        <>
            <button className="btn btn-primary" onClick={() => handleBack() }>Back</button>
            <div className="container-row" id="compare-row">
                <div className="playercard">
                    <img className="stats-headshot"src={"https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/681911/headshot/67/current"} alt=""/>
                    <div>Alex Tester1</div>
                    <div>P</div>
                </div>
                
                <div className="container-col">
                    <h2>Tester1's Pitching Stats</h2>
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
                        
                            <span>21</span>
                            <span>1</span>
                            <span>0</span>
                            <span>3.38</span>
                            <span>1.13</span>
                            <span>18.2</span>
                        </div>
                    </div>
                </div>
                <div id="statline" className="container-col">
                    <h2>Tester2's Pitching Stats</h2>
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
                        
                            <span>19</span>
                            <span>3</span>
                            <span>0</span>
                            <span>4.58</span>
                            <span>1.32</span>
                            <span>19.2</span>
                        </div>
                    </div>
                </div>
                <div className="playercard">
                    <img className="stats-headshot"src={"https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/607455/headshot/67/current"} alt=""/>
                    <div className="player-name">Anthony Tester2</div>
                    <div className="player-name">P</div>
                </div>
                
            </div>
        </>

    ) 
}