import Container from 'react-bootstrap/Container';
import ControlPanel from './ControlPanel';
import InitativeDisplay from './InitativeDisplay';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
let nextId = 0;
const Dashboard = (props) => {
    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const [InitativeList, setInitativeList] = useState([]);
    const [showModal, setShowModal] = useState(false)
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
    
    const  handleSaveProject = (event) => {
        let systemJSON =JSON.stringify(InitativeList);
        const blob = new Blob([systemJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
      
        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'InitativeList.json';
        link.click();
      
        // Clean up by revoking the object URL
        URL.revokeObjectURL(url);
      }
    
    const handleLoadProject = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileData = e.target.result;
            setInitativeList(fileData);
        }    
        reader.readAsText(file); 
      }

  return (
    <Container>
        <Row>
            <Col>
                
                <Button onClick={handleSaveProject} >Save Project</Button>              
                <Button onClick={handleModalOpen} >Load Project</Button><br></br>
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload initive List</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="file" accept=".json" onChange={handleLoadProject} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleModalClose}>
                            Upload
                        </Button>
                    </Modal.Footer>
                </Modal>
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