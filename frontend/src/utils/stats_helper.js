
const Bat = props => (
    <>
    <td>{props.stat.gamesPlayed}</td>
    <td>{props.stat.hits}</td>
    <td>{props.stat.atBats}</td>
    <td>{props.stat.strikeOuts}</td>
    <td>{props.stat.baseOnBalls}</td>
    <td>{props.stat.avg}</td>
    <td>{props.stat.obp}</td>
    <td>{props.stat.slg}</td>
    <td>{props.stat.ops}</td>
    <td>{props.stat.homeRuns}</td>
    </>
    
);


const Pitch = props => (
    <>
    <td>{props.stat.gamesPitched}</td>
    <td>{props.stat.gamesStarted}</td>
    <td>{props.stat.wins}</td>
    <td>{props.stat.losses}</td>
    <td>{props.stat.inningsPitched}</td>
    <td>{props.stat.earnedRuns}</td>
    <td>{props.stat.era}</td>
    <td>{props.stat.strikeOuts}</td>
    <td>{props.stat.baseOnBalls}</td>
    <td>{props.stat.whip}</td>
    </>
);


const Field = props => (
    <>
    <td>{props.stat.position?.name}</td>
    <td>{props.stat.assists}</td>
    <td>{props.stat.putOuts}</td>
    <td>{props.stat.errors}</td>
    <td>{props.stat.fielding}</td>
    </>
);


export function batLine(bat){
    return <Bat stat={bat} />;
    
}

export function pitchLine(pitch){
    return <Pitch stat={pitch} />
    
}

export function fieldLine(field){
    //console.log(field)
    return <Field stat={field} />
}