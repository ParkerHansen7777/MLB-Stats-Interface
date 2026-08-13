import React, { useState } from "react";
import "./App.css";
import TeamSelector from "./components/team_selector";
import PlayerSelector from "./components/player_selector";
import StatsDisplay from "./components/stats_display";
import Comparison from "./components/compare";

const TEAM_COLORS = {
  "Arizona Diamondbacks": "#A71930",
  "Atlanta Braves": "#CE1141",
  "Baltimore Orioles": "#DF4601",
  "Boston Red Sox": "#BD3039",
  "Chicago Cubs": "#0E3386",
  "Chicago White Sox": "#27251F",
  "Cincinnati Reds": "#C6011F",
  "Cleveland Guardians": "#E31937",
  "Colorado Rockies": "#33006F",
  "Detroit Tigers": "#0C2340",
  "Houston Astros": "#EB6E1F",
  "Kansas City Royals": "#004687",
  "Los Angeles Angels": "#BA0021",
  "Los Angeles Dodgers": "#005A9C",
  "Miami Marlins": "#00A3E0",
  "Milwaukee Brewers": "#12284C",
  "Minnesota Twins": "#002B5C",
  "New York Mets": "#FF5910",
  "New York Yankees": "#0C2340",
  "Oakland Athletics": "#003831",
  "Philadelphia Phillies": "#E81828",
  "Pittsburgh Pirates": "#27251F",
  "San Diego Padres": "#2F241D",
  "San Francisco Giants": "#101010",
  "Seattle Mariners": "#005C5C",
  "St. Louis Cardinals": "#C41E3A",
  "Tampa Bay Rays": "#8FBCE6",
  "Texas Rangers": "#003278",
  "Toronto Blue Jays": "#134A8E",
  "Washington Nationals": "#AB0003",
};

function getTeamColor(teamName) {
  return TEAM_COLORS[teamName] || "#0E5F43";
}

export default function App() {
  const [visible, setVisible] = useState("teams");
  const [team, setTeam] = useState("");
  const [teamColor, setTeamColor] = useState("#0E5F43");
  const [teams, setTeams] = useState([]);
  const [roster, setRoster] = useState([]);
  const [bat, setBat] = useState([]);
  const [pitch, setPitch] = useState([]);
  const [field, setField] = useState([]);
  const [img, setImg] = useState("");
  const [playerName, setName] = useState("");
  const [playerPos, setPos] = useState("");
  const [playerStatus, setPlayerStatus] = useState("");

  const [compVisible, setCVisible] = useState("teams");
  const [compTeam, setCTeam] = useState("");
  const [compTeamColor, setCCompTeamColor] = useState("#0E5F43");
  const [compRoster, setCRoster] = useState([]);
  const [compImg, setCImg] = useState("");
  const [compName, setCName] = useState("");
  const [compPos, setCPos] = useState("");
  const [compStatus, setCompStatus] = useState("");
  const [compBat, setCBat] = useState([]);
  const [compPitch, setCPitch] = useState([]);
  const [compField, setCField] = useState([]);

  function handleTeam(id, name) {
    setTeam(id);
    setTeamColor(getTeamColor(name));
    setVisible("players");
  }

  function handleRoster(e) {
    fetch(`${process.env.REACT_APP_HOSTNAME}/teams/${team}/${e}`).then((res) =>
      res.json().then((data) => {
        setRoster(data);
      })
    );
  }

  function handlePlayer(e) {
    const [id, pos, name, status] = e;
    setVisible("stats");
    setImg(`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${id}/headshot/67/current`);
    setPos(pos);
    setName(name);
    setPlayerStatus(status || "Status unavailable");

    fetch(`${process.env.REACT_APP_HOSTNAME}/player/${id}/hitting`).then((res) =>
      res.json().then((data) => {
        setBat(data);
      })
    );

    fetch(`${process.env.REACT_APP_HOSTNAME}/player/${id}/pitching`).then((res) =>
      res.json().then((data) => {
        setPitch(data);
      })
    );

    fetch(`${process.env.REACT_APP_HOSTNAME}/player/${id}/fielding`).then((res) =>
      res.json().then((data) => {
        setField(data);
      })
    );
  }

  function handleBack() {
    if (visible === "players") {
      setRoster([]);
      setTeam("");
      setVisible("teams");
    } else if (visible === "stats") {
      setBat([]);
      setPitch([]);
      setField([]);
      setVisible("players");
      setImg("");
      setName("");
      setPos("");
      setPlayerStatus("");
    } else if (visible === "compare") {
      setVisible("players");
    }
  }

  function handleCompBack() {
    setVisible("stats");
    setCVisible("teams");
    setCRoster([]);
    setCBat([]);
    setCPitch([]);
    setCField([]);
    setCImg("");
    setCName("");
    setCPos("");
    setCompStatus("");
  }

  function handleCompRoster(e) {
    fetch(`${process.env.REACT_APP_HOSTNAME}/teams/${compTeam}/${e}`).then((res) =>
      res.json().then((data) => {
        setCRoster(data);
      })
    );
  }

  function handleCompPlayer(e) {
    const [id, pos, name, status] = e;
    setVisible("compare");
    setCImg(`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${id}/headshot/67/current`);
    setCPos(pos);
    setCName(name);
    setCompStatus(status || "Status unavailable");

    fetch(`${process.env.REACT_APP_HOSTNAME}/player/${id}/hitting`).then((res) =>
      res.json().then((data) => {
        setCBat(data);
      })
    );

    fetch(`${process.env.REACT_APP_HOSTNAME}/player/${id}/pitching`).then((res) =>
      res.json().then((data) => {
        setCPitch(data);
      })
    );
    // also fetch fielding stats for comparison player
    fetch(`${process.env.REACT_APP_HOSTNAME}/player/${id}/fielding`).then((res) =>
      res.json().then((data) => {
        setCField(data);
      })
    );
  }

  function handleCompTeam(id, name) {
    setCTeam(id);
    setCCompTeamColor(getTeamColor(name));
    setCVisible("players");
  }

  return (
    <div className="App">
      <div className="header"><h1>MLB Stats API</h1></div>
      <div className="main">
        {visible === "teams" &&
          <TeamSelector Teams={teams} setTeams={setTeams} handleTeam={handleTeam} />
        }
        {visible === "players" &&
          <PlayerSelector roster={roster} handleRoster={handleRoster} handlePlayer={handlePlayer} handleBack={handleBack} teamColor={teamColor} />
        }
        {visible === "stats" &&
          <StatsDisplay
            BattingStats={bat}
            PitchingStats={pitch}
            FieldingStats={field}
            handleBack={handleBack}
            Img={img}
            PlayerName={playerName}
            PlayerPos={playerPos}
            PlayerStatus={playerStatus}
            TeamColor={teamColor}
            visible={compVisible}
            TeamSelector={<TeamSelector Teams={teams} setTeams={setTeams} handleTeam={handleCompTeam} />}
            PlayerSelector={<PlayerSelector roster={compRoster} handleRoster={handleCompRoster} handlePlayer={handleCompPlayer} handleBack={handleCompBack} teamColor={compTeamColor} />}
          />
        }
        {visible === "compare" &&
          <Comparison
            handleBack={handleCompBack}
            Img={img}
            Name={playerName}
            Pos={playerPos}
            Status={playerStatus}
            TeamColor={teamColor}
            BattingStats={bat}
            PitchingStats={pitch}
            FieldingStats={field}
            CImg={compImg}
            CName={compName}
            CPos={compPos}
            CStatus={compStatus}
            CTeamColor={compTeamColor}
            CBattingStats={compBat}
            CPitchingStats={compPitch}
            CFieldingStats={compField}
          />
        }
      </div>
      <footer>
        © 2025 MLB Advanced Media, LP. All rights reserved. Webapp created and used only for educational non-commercial purposes.
      </footer>
    </div>
  );
}

