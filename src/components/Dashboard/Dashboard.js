import Container from 'react-bootstrap/Container';
import ControlPanel from './ControlPanel';
import InitativeDisplay from './InitativeDisplay';
import { Row, Col } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
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
    const PreviousInitative = useRef(initialList);

    useEffect(() => {
        PreviousInitative.current = InitativeList;
    },[InitativeList]);


    const handleAddItem = (name) => {
        console.log(PreviousInitative.current);
        setInitativeList([...PreviousInitative.current,{"id": nextId++,"name":name,"initative":0,"condition":{"stun":10,"physical":10}}]);
    }

    const handleInitativeChange = (index,initative) => {
        console.log(index,initative);
        // PreviousInitative.current[index].initative = initative;
        // setInitativeList(PreviousInitative.current);
    }

  return (
    <Container>
        <Row>
            <Col>
                <ControlPanel InitativeList={PreviousInitative.current} addItem={handleAddItem} changeInitative={handleInitativeChange}></ControlPanel>
            </Col>
            <Col>
                <InitativeDisplay List={PreviousInitative.current} />
            </Col>
        </Row>
  </Container>
  )
} 
export default Dashboard;