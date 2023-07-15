import { useState, useRef } from 'react';
import { Container, InputGroup, Card, Form, Button, Col, Row } from 'react-bootstrap';
import ConditionMonitor from './ConditionMonitor/ConditionMonitor';
let nextId = 0;

export default function List() {
  const initialList = [
      {"id":1000,"name":"Jim","initative":21,"condition":{"stun":10,"physical":10}},
      {"id":1001,"name":"Dan","initative":15,"condition":{"stun":10,"physical":10}},
      {"id":1002,"name":"Mike","initative":10,"condition":{"stun":10,"physical":10}},
      {"id":1003,"name":"Lane","initative":9,"condition":{"stun":10,"physical":10}},
      {"id":1004,"name":"Eric","initative":35,"condition":{"stun":10,"physical":10}}
  ];
  const Initative = useRef([
      {"id":1000,"name":"Jim","initative":21,"condition":{"stun":10,"physical":10}},
      {"id":1001,"name":"Dan","initative":15,"condition":{"stun":10,"physical":10}},
      {"id":1002,"name":"Mike","initative":10,"condition":{"stun":10,"physical":10}},
      {"id":1003,"name":"Lane","initative":9,"condition":{"stun":10,"physical":10}},
      {"id":1004,"name":"Eric","initative":35,"condition":{"stun":10,"physical":10}}
  ]);
  const [name, setName] = useState('');
  const [InitativeList, setInitativeList] = useState(initialList);


  const handleChangeInitative = (e) => { 
    // let initChange = e.target.value;
    // let target = e.target.getAttribute('data-key');
    // console.log(InitativeList);
    // var originalList = InitativeList;

    // for(let i = 0;i < originalList.length;i++){
    //   if(originalList[i].id === target){
    //     originalList[i].initative = initChange;
    //   }
    // }
    //setInitativeList([...originalList]);
    setInitativeList([
      ...InitativeList,
      {"id": nextId++,"name":name,"initative":0,"condition":{"stun":10,"physical":10}}
    ]);
  }

  const renderInitativeList = (initative) => {
    var originalList = InitativeList;
    var finalList = [];
    originalList.sort(function(a, b){
        return b.initative-a.initative
    });

    while (originalList.length > 0) {
        let TempInitHolder = originalList.shift();
        finalList.push({ ...TempInitHolder });
        TempInitHolder.initative -= 10;
        if(TempInitHolder.initative > 0){
            originalList.push(TempInitHolder);
        }
    }
    finalList.sort(function(a, b){
        return b.initative-a.initative
    });

    return(finalList);
}

  return (
    <>
    <Container>
        <Row>
            <Col>
            <h1>Actors:</h1>
            <InputGroup className='mb-2'>
                <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Button onClick={() => {
              setInitativeList([
                ...InitativeList,
                {"id": nextId++,"name":name,"initative":0,"condition":{"stun":10,"physical":10}}
              ]);
            }}>Add</Button>
            </InputGroup>
              {InitativeList.map(actor => (

                <Card style={{ width: '21rem', margin:'2px auto' }} key={actor.id}>
                  <Card.Body>
                      <Card.Title>{actor.name}: <input value={actor.initative} onChange={handleChangeInitative} data-key={actor.id} type='number' /></Card.Title>
                      <ConditionMonitor type='S'></ConditionMonitor>
                      <ConditionMonitor type='P'></ConditionMonitor>
                      <Button onClick={() => {
                        setInitativeList(
                          InitativeList.filter(a =>
                            a.id !== actor.id
                          )
                        );
                      }}>Remove</Button>
                  </Card.Body>
                </Card>
              ))}
            </Col>
            <Col>
              <div>
                <h2>Initative Order</h2>
                {
                    // renderInitativeList(InitativeList)
                }
              </div>
            </Col>
          </Row>
      </Container>
    </>
  );
}