import { useState } from 'react';
import { Container, InputGroup, Card, Form, Button, Col, Row } from 'react-bootstrap';
import ConditionMonitor from './ConditionMonitor/ConditionMonitor';
import ButtonConfirm from './ButtonConfirm';
import './List.css';

let nextId = 0;

export default function List() {
  const initialList = [
    {"id": 1000, "name": "Jim",  "initiative": 21, "PPenalty":0, "SPenalty":0},
    {"id": 1001, "name": "Dan",  "initiative": 15, "PPenalty":0, "SPenalty":0},
    {"id": 1002, "name": "Mike", "initiative": 10, "PPenalty":0, "SPenalty":0},
    {"id": 1003, "name": "Lane", "initiative": 9,  "PPenalty":0, "SPenalty":0},
    {"id": 1004, "name": "Eric", "initiative": 35, "PPenalty":0, "SPenalty":0}
  ];
  const [EditionSwitch, EditionSwitchSet] = useState(false);
  const [InitiativeList, setInitiativeList] = useState(initialList);

  const handleChangeInitiative = (event) => {
    const { value, dataset } = event.target;
    const { key } = dataset;
    
    setInitiativeList((prevState) =>
      prevState.map((actor) =>
        actor.id === parseInt(key) ? { ...actor, initiative: value } : {...actor}
      )
    );
  };

  const handleChangeEdition = (event) => {
    EditionSwitchSet(event.target.value);
  }

  const handleConditionSelect = (number, type, reset, key) => {
    if(reset){
      const penalty = getInitiativePenalty(-1);
      applyInitiativePenalty(penalty, type, key);
    }else{
      const penalty = getInitiativePenalty(number);
      applyInitiativePenalty(penalty, type, key);
    }
  }

  const applyInitiativePenalty = (penalty, type, key) => {
    if(type === 'P') {
      setInitiativeList((prevList) =>
        prevList.map((actor) => (
          actor.id+'P' === key ? { ...actor, PPenalty: penalty } : {...actor}
        ))
      );
    }else if(type === 'S') {
      setInitiativeList((prevList) =>
        prevList.map((actor) => (
          actor.id+'S' === key ? { ...actor, SPenalty: penalty } : {...actor}
        ))
      );
    }
  };

  const getInitiativePenalty = (number) => {
    switch (number) {
      case -1:
        return 0;
      case 0:
      case 1:
        return -1;
      case 2:
      case 3:
      case 4:
        return -2;
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        return -3;
      default:
        return 0;
    }
  };

  const renderInitiativeList = () => {
    let originalList = InitiativeList.slice();
    let finalList = [];
  
    originalList.sort(function (a, b) {
      return b.initiative - a.initiative;
    });
  
    while (originalList.length > 0) {
      let tempInitHolder = { ...originalList.shift() };
      tempInitHolder.initiative = parseInt(tempInitHolder.initiative) + parseInt(tempInitHolder.SPenalty) + parseInt(tempInitHolder.PPenalty);
      finalList.push({...tempInitHolder});
      tempInitHolder.initiative -= 10;
      if(tempInitHolder.initiative > 0) {
        originalList.push(tempInitHolder);
      }
    }
  
    finalList.sort(function (a, b) {
      return b.initiative - a.initiative;
    });
  
    return finalList;
  };

  const onConfirmDel = (type, param, id) =>
  {
    if(type === 'yes') {
      setInitiativeList(InitiativeList.filter((a) => a.id !== id));
    }
  }
  
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Actors:</h1>
            <Form><span>SR2</span>
                <Form.Check
                    value={EditionSwitch}
                    type="switch"
                    id="custom-switch"
                    onChange={handleChangeEdition}
                /><span>SR3</span>
            </Form>
            <hr />
            <InputGroup className="mb-2">
              <Form.Control id="newName" />
              <Button
                onClick={() => {
                  let name = document.getElementById('newName').value;
                  setInitiativeList([
                    ...InitiativeList,
                    {"id": nextId++, "name": name, "initiative": 0, "condition": {"stun": 10, "physical": 10}}
                  ]);
                }}
              >
                Add
              </Button>
            </InputGroup>
            {InitiativeList.map((actor) => (
              <Card style={{ width: '21rem', margin: '2px auto' }} key={actor.id}>
                <Card.Body>
                  <Card.Title>
                    {actor.name}: <input value={actor.initiative} onChange={handleChangeInitiative} data-key={actor.id} type="number" />
                  </Card.Title>
                  <ConditionMonitor type="S" key={actor.id+'S'} targetID={actor.id+'S'} onConditionSelect={handleConditionSelect} />
                  <ConditionMonitor type="P" key={actor.id+'P'} targetID={actor.id+'P'} onConditionSelect={handleConditionSelect} />
                  <ButtonConfirm onConfirm={onConfirmDel} targetID={actor.id}  title="Delete" query="Are you sure...?"  />
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col>
            <div>
              <h2>Initiative Order</h2>
              {renderInitiativeList(InitiativeList).map((character, index) => (
                <Card style={{ width: '18rem', margin: '2px auto' }} key={index}>
                  <Card.Body>
                    <Card.Title>{character.name} - {character.initiative}</Card.Title>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}