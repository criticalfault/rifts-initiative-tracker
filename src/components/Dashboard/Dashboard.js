import Container from 'react-bootstrap/Container';
import ControlPanel from './ControlPanel';
import InitativeDisplay from './InitativeDisplay';
import { Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
let nextId = 0;
const Dashboard = (props) => {
    const initialList = [
        {"id":1000,"name":"Jim","initative":21,"condition":{"stun":10,"physical":10}},
        {"id":1001,"name":"Dan","initative":15,"condition":{"stun":10,"physical":10}},
        {"id":1002,"name":"Mike","initative":10,"condition":{"stun":10,"physical":10}},
        {"id":1003,"name":"Lane","initative":9,"condition":{"stun":10,"physical":10}},
        {"id":1004,"name":"Eric","initative":35,"condition":{"stun":10,"physical":10}}
    ];

    const [InitativeList, setInitativeList] = useState([]);

    const handleAddItem = (name) => {
        const myNextList = [...InitativeList,{"id": nextId++,"name":name,"initative":0,"condition":{"stun":10,"physical":10}}];
        setInitativeList(myNextList);
    }

    const handleInitativeChange = (index,initative) => {
        console.log(index,initative);
        //InitativeList[index].initative = initative;
        setInitativeList(InitativeList);
    }

    const preBuildList = () => {
        setInitativeList(initialList);
    }

  return (
    <Container>
        <Row>
            <Col>
                <ControlPanel InitativeList={InitativeList} addItem={handleAddItem} changeInitative={handleInitativeChange}></ControlPanel>
                <Button variant="primary" onClick={() => preBuildList()}>Prebuild InitativeList</Button>
            </Col>
            <Col>
                <InitativeDisplay List={InitativeList} />
            </Col>
        </Row>
  </Container>
  )
} 
export default Dashboard;