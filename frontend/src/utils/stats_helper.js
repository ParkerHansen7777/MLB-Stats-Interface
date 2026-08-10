
const Bat = props => (
    <>
    <span>{props.stat.gamesPlayed}</span>
    <span>{props.stat.hits}</span>
    <span>{props.stat.atBats}</span>
    <span>{props.stat.strikeOuts}</span>
    <span>{props.stat.baseOnBalls}</span>
    <span>{props.stat.avg}</span>
    <span>{props.stat.obp}</span>
    <span>{props.stat.slg}</span>
    <span>{props.stat.ops}</span>
    <span>{props.stat.homeRuns}</span>
    </>
    
);


const Pitch = props => (
    <>
    <span>{props.stat.gamesPitched}</span>
    <span>{props.stat.gamesStarted}</span>
    <span>{props.stat.wins}</span>
    <span>{props.stat.losses}</span>
    <span>{props.stat.inningsPitched}</span>
    <span>{props.stat.earnedRuns}</span>
    <span>{props.stat.era}</span>
    <span>{props.stat.strikeOuts}</span>
    <span>{props.stat.baseOnBalls}</span>
    <span>{props.stat.whip}</span>
    </>
);


const Field = props => (
    <>
    <span>{props.stat.position?.name}</span>
    <span>{props.stat.assists}</span>
    <span>{props.stat.putOuts}</span>
    <span>{props.stat.errors}</span>
    <span>{props.stat.fielding}</span>
    </>
);


export function batLine(bat){
    return <Bat stat={bat} />;
    
}

export function pitchLine(pitch){
    return <Pitch stat={pitch} />
    
}

export function fieldLine(field){
    console.log(field)
    return <Field stat={field} />
}