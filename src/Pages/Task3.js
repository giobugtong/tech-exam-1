import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';

export default function Task3() {
  // Fighter 1
  const [fighterOneName, setFighterOneName] = useState("");
  const [fighterOneStrength, setFighterOneStrength] = useState("");
  const [fighterOneAgility, setFighterOneAgility] = useState("");
  const [fighterOneVitality, setFighterOneVitality] = useState("");

  // Fighter 2
  const [fighterTwoName, setFighterTwoName] = useState("");
  const [fighterTwoStrength, setFighterTwoStrength] = useState("");
  const [fighterTwoAgility, setFighterTwoAgility] = useState("");
  const [fighterTwoVitality, setFighterTwoVitality] = useState("");

  // Fight Message
  const [fightMessage, setFightMessage] = useState([]);

  // Winner
  const [fightWinner, setFightWinner] = useState("");
  
  class Fighter {
    constructor(name, strength, agility, vitality) {
      let max = 30;
      if (strength > max) strength = max;
      if (agility > max) agility = max;
      if (vitality > max) vitality = max;

      this.getName = function () {
        return name;
      };

      let hp = 50 + (vitality * 10) + (strength * 5) + (agility * 3);
      this.getHp = function () {
        return hp;
      };
      let defense = 10 + (agility * 5) + (strength * 3) + vitality;
      this.takeDamage = function (damageTaken) {
        hp -= damageTaken;
        return hp;
      };
      let damage = (10 + (strength * 5)) - (agility * 3);
      this.dealDamage = function (rival) {
        return rival.takeDamage(damage);
      };
    }
  }
  
  const fight = (red, blue) => {
    let redFirst = parseInt(Math.random() * 100) % 2 === 0;
    let winner = "";
    let array = [];
    const redAttack = () => {
      const result = red.dealDamage(blue);
      const message = {result, damaged: blue.getName()};
      array.push(message);
      if (result <= 0) {
        winner = red.getName();
        const mapped = array.map((item, index) => {
          return(
            <div key={index} className="mb-2">
              {item.damaged} was attacked! They have {item.result} HP left!
            </div>
          )
        })
        setFightMessage(mapped);
        const fightWinner = <div className="text-center fw-bold fs-2">Great fight! {winner} wins!</div>
        return setFightWinner(fightWinner)
      }
      blueAttack();
    }
    const blueAttack = () => {
      const result = blue.dealDamage(red);
      const message = {result, damaged: red.getName()};
      array.push(message);
      if (result <= 0) {
        winner = blue.getName();
        const mapped = array.map((item, index) => {
          return(
            <div key={index} className="mb-2">
              {item.damaged} was attacked! They have {item.result} HP left!
            </div>
          )
        })
        setFightMessage(mapped);
        const fightWinner = <div className="text-center fw-bold fs-2">Great fight! {winner} wins!</div>
        return setFightWinner(fightWinner)
      }
      redAttack();
    }
    if (redFirst) {
      redAttack();
    } else {
      blueAttack();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const red = new Fighter(fighterOneName, fighterOneStrength, fighterOneAgility, fighterOneVitality);
    const blue = new Fighter(fighterTwoName, fighterTwoStrength, fighterTwoAgility, fighterTwoVitality);
    fight(red, blue);
  }

  const handleReset = () => {
    setFightMessage([]);
    setFightWinner("");
  }

  const handleClearFighterOne = () => {
    setFighterOneName("");
    setFighterOneStrength("");
    setFighterOneAgility("");
    setFighterOneVitality("");
  }

  const handleClearFighterTwo = () => {
    setFighterTwoName("");
    setFighterTwoStrength("");
    setFighterTwoAgility("");
    setFighterTwoVitality("");
  }

  return <>
    <h1 className="text-center">Task 3 - Fighter Simulator</h1>
    <div className="mx-auto" style={{ maxWidth: "600px" }}>
      <Form onSubmit={e => handleSubmit(e)} onReset={handleReset}>
        <div className="p-2 mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <span>Fighter 1</span>
            <Button className="pe-0 pb-0 text-muted" variant="" onClick={handleClearFighterOne}>Clear</Button>
          </div>
          <div className="my-2">
            <FormControl required onChange={e => setFighterOneName(e.target.value)} value={fighterOneName} aria-label="Name" placeholder="Name" />
          </div>
          <InputGroup className="mb-2">
            <InputGroup.Text>Stats</InputGroup.Text>
            <FormControl min={1} max={30} type="number" value={fighterOneStrength} required onChange={e => setFighterOneStrength(e.target.value)} aria-label="strength" placeholder="strength" />
            <FormControl min={1} max={30} type="number" value={fighterOneAgility} required onChange={e => setFighterOneAgility(e.target.value)} aria-label="agility" placeholder="agility" />
            <FormControl min={1} max={30} type="number" value={fighterOneVitality} required onChange={e => setFighterOneVitality(e.target.value)} aria-label="vitality" placeholder="vitality" />
          </InputGroup>
        </div>
        <div className="p-2 mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <span>Fighter 2</span>
            <Button className="pe-0 pb-0 text-muted" variant="" onClick={handleClearFighterTwo}>Clear</Button>
          </div>
          <div className="my-2">
            <FormControl required onChange={e => setFighterTwoName(e.target.value)} value={fighterTwoName} aria-label="Name" placeholder="Name" />
          </div>
          <InputGroup className="mb-2">
            <InputGroup.Text>Stats</InputGroup.Text>
            <FormControl min={1} max={30} type="number" value={fighterTwoStrength} required onChange={e => setFighterTwoStrength(e.target.value)} aria-label="strength" placeholder="strength" />
            <FormControl min={1} max={30} type="number" value={fighterTwoAgility} required onChange={e => setFighterTwoAgility(e.target.value)} aria-label="agility" placeholder="agility" />
            <FormControl min={1} max={30} type="number" value={fighterTwoVitality} required onChange={e => setFighterTwoVitality(e.target.value)} aria-label="vitality" placeholder="vitality" />
          </InputGroup>
        </div>
        <div className="d-flex justify-content-around my-3 mx-auto w-100">
          <Button
            type="reset"
            variant='secondary'
            className="px-4"
          >
          Reset
          </Button>
          <Button
            type="submit"
            variant='danger'
            className="px-4"
          >
          Fight!
          </Button>
        </div>
      </Form>
      {
        fightMessage.length > 0 &&
        <div className="mt-4 mx-auto w-100 py-3 px-4 bg-light rounded border shadow-sm">
          <div className="mb-2 fw-bold">Fight message:</div>
          {fightMessage}
        </div>
      }
      { fightWinner &&
        <div className="mt-2 mb-4 mx-auto w-100 p-3 bg-success text-light rounded border shadow-sm">
          {fightWinner}
        </div>
      }
    </div>
  </>;
}
