import './ControlPanel.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import ConditionMonitor from '../ConditionMonitor/ConditionMonitor';
function ControlPanel(props){
    const handleAddItem = (e) => {
        let name = document.getElementById('addNewParticipant').value;
        if(name === ''){ return;}
        props.addItem(name)
        name = '';
    }
    
    const changeInitative = (e) => {
        let index = e.target.getAttribute('data-index');
        props.changeInitative(index, e.target.value);
    }

    return (
        <div className="ControlPanel">
            <h1>Control Panel</h1>
            <Form><span>SR2</span>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                /><span>SR3</span>
            </Form>
            <InputGroup className='mb-2'>
                <Form.Control
                    placeholder="Name"
                    aria-label="Name of the participant you want to track intiative for."
                    id="addNewParticipant"
                />
                <Button variant="outline-secondary" onClick={handleAddItem}>Add</Button>
            </InputGroup>
            {
                props.InitativeList.map((initative, index) => {
                    return (
                        <Card style={{ width: '21rem', margin:'2px auto' }} key={index}>
                            <Card.Body>
                                <Card.Title>{initative.name}: <input onChange={changeInitative} key={initative.id} value={initative.initative} type='number' /></Card.Title>
                                <ConditionMonitor type='S'></ConditionMonitor>
                                <ConditionMonitor type='P'></ConditionMonitor>
                            </Card.Body>
                        </Card>
                    );
                })
            }
        </div>
    );

}
export default ControlPanel