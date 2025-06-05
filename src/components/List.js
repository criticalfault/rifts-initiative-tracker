import { useState } from 'react';
import { Container, InputGroup, Card, Form, Button, Col, Row, Modal } from 'react-bootstrap';
import ButtonConfirm from './ButtonConfirm';
import './List.css';

let nextId = 0;

export default function List() {
  const initialList = [];
  const [InitiativeList, setInitiativeList] = useState(initialList);
  const [showModal, setShowModal] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);

  const handleSaveProject = () => {
    const systemJSON = JSON.stringify(InitiativeList);
    const blob = new Blob([systemJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'RiftsInitiativeList.json';
    link.click();
    URL.revokeObjectURL(url);
    fathom.trackEvent('Saved Initiative for Rifts'); // eslint-disable-line
  };

  const handleLoadProject = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target.result;
      const inits = JSON.parse(fileData);
      setInitiativeList(inits);
      nextId = inits.length;
      setShowModal(false);
      fathom.trackEvent('Loaded Initiative'); // eslint-disable-line
    };
    reader.readAsText(file);
  };

  const handleChangeInitiative = (event) => {
    const { value, dataset } = event.target;
    const { key } = dataset;

    setInitiativeList((prevState) =>
      prevState.map((actor) =>
        actor.id === parseInt(key) ? { ...actor, initiative: value } : { ...actor }
      )
    );
  };

  const handleChangeStat = (event, key, stat) => {
    const value = event.target.value;
    setInitiativeList((prevState) =>
      prevState.map((actor) =>
        actor.id === parseInt(key) ? { ...actor, [stat]: value } : { ...actor }
      )
    );
  };

  const handleToggleMelee = (id, index) => {
    setInitiativeList((prevState) =>
      prevState.map((actor) => {
        if (actor.id === id) {
          const melees = [...(actor.melees || Array(Number(actor.totalMelees) || 0).fill(false))];
          melees[index] = !melees[index];
          return { ...actor, melees };
        }
        return actor;
      })
    );
  };

  const handleTotalMeleesChange = (e, id) => {
    const value = parseInt(e.target.value) || 0;
    setInitiativeList((prevState) =>
      prevState.map((actor) => {
        if (actor.id === id) {
          const newMelees = Array(value).fill(false);
          return { ...actor, totalMelees: value, melees: newMelees };
        }
        return actor;
      })
    );
  };

  const handleResetAllMelees = () => {
    setInitiativeList((prevState) =>
      prevState.map((actor) => {
        const total = parseInt(actor.totalMelees) || 0;
        return { ...actor, melees: Array(total).fill(false) };
      })
    );
  };

  const toggleDead = (id) => {
    setInitiativeList((prevState) =>
      prevState.map((actor) =>
        actor.id === id ? { ...actor, isDead: !actor.isDead } : actor
      )
    );
  };

  const renderInitiativeList = () => {
    let originalList = InitiativeList.slice();
    originalList.sort((a, b) => b.initiative - a.initiative);
    return originalList;
  };

  const onConfirmDel = (type, param, id) => {
    if (type === 'yes') {
      setInitiativeList(InitiativeList.filter((a) => a.id !== id));
    }
  };

  return (
    <>
      <nav className="pv3 ph3 ph4-ns" role="navigation" style={{ background: 'black' }}>
        <div className="flex-l justify-between items-center center">
          <a href="/" className="f3 fw2 hover-white no-underline white-90 dib">NullSheen Rifts Tools</a>
          <div className="flex-l items-center">
            <ul className="pl0 mr3">
              <li className="list f5 f4-ns fw4 dib pr3">
                <a className="hover-white no-underline white-90" href="https://www.nullsheen.com/software/" title="Tools page">Tools</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h1>Rifts Initiative Tracker</h1>
      <Container>
        <Row>
          <Col>
            <Button className='saveButton' onClick={handleSaveProject}>Save Order</Button>
            <Button className='loadButton' onClick={handleModalOpen}>Load Order</Button>
            <Button variant="warning" onClick={handleResetAllMelees} style={{ marginLeft: '10px' }}>Reset All Melees</Button>
            <br />
            <Modal show={showModal} onHide={handleModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Upload Initiative List</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input type="file" accept=".json" onChange={handleLoadProject} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                <Button variant="primary" onClick={handleModalClose}>Upload</Button>
              </Modal.Footer>
            </Modal>

            <h1>Actors:</h1>
            <InputGroup className="mb-2">
              <Form.Control id="newName" />
              <Button
                onClick={() => {
                  const name = document.getElementById('newName').value;
                  setInitiativeList([
                    ...InitiativeList,
                    { id: nextId++, name, initiative: 1, MDC: 0, SDC: 0, HP: 0, totalMelees: 0, melees: [], isDead: false }
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
                    {actor.name}: <input value={actor.initiative} style={{ width: '100px' }} onChange={handleChangeInitiative} data-key={actor.id} type="number" />
                    <ButtonConfirm onConfirm={onConfirmDel} targetID={actor.id} title="Delete" query="Are you sure...?" />
                    <Button variant="outline-danger" size="sm" style={{ marginLeft: '5px' }} onClick={() => toggleDead(actor.id)}>{actor.isDead ? 'Undo X' : 'X'}</Button>
                  </Card.Title>
                  <div>MDC: <input type="number" value={actor.MDC} onChange={(e) => handleChangeStat(e, actor.id, 'MDC')} /></div>
                  <div>SDC: <input type="number" value={actor.SDC} onChange={(e) => handleChangeStat(e, actor.id, 'SDC')} /></div>
                  <div>HP: <input type="number" value={actor.HP} onChange={(e) => handleChangeStat(e, actor.id, 'HP')} /></div>
                  <div>Total Melees: <input type="number" value={actor.totalMelees || 0} onChange={(e) => handleTotalMeleesChange(e, actor.id)} /></div>
                  <div>Melees:
                    {(actor.melees || []).map((used, idx) => (
                      <Form.Check
                        inline
                        key={idx}
                        type="checkbox"
                        checked={used}
                        onChange={() => handleToggleMelee(actor.id, idx)}
                      />
                    ))}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Col>

          <Col>
            <div>
              <h2>Initiative Order</h2>
              {renderInitiativeList().map((character, index) => {
                const cardStyles = {
                  width: '18rem',
                  margin: '2px auto',
                  cursor: 'pointer',
                  backgroundColor: selectedCardIndex === index ? 'rgb(0, 169, 256)' : undefined,
                  textDecoration: character.isDead ? 'line-through' : 'none',
                  position: 'relative'
                };

                return (
                  <Card style={cardStyles} key={index} onClick={() => handleCardClick(index)}>
                    <Card.Body>
                      <Card.Title>{character.name} - {character.initiative}</Card.Title>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
