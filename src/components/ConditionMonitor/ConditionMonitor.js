import React, { useState } from 'react';
import './ConditionMonitor.css';

const ConditionMonitor = (props) => {
  const [selectedCondition, setSelectedCondition] = useState(null);

  const handleClick = (number) => {
    let reset = false;
    setSelectedCondition((prevCondition) => {
      if (prevCondition === number) {
        reset = true;
        return null; // Unselect the condition if it was already selected
      } else {
        return number; // Select the condition if it was not previously selected
      }
    });
    props.onConditionSelect(number,props.type,reset);
  };

  const renderBoxes = () => {
    const boxes = ['L', '_', 'M', '_', '_', 'S', '_', '_', '_', 'D'];

    return boxes.map((box, index) => {
      const isSelected = selectedCondition !== null && index <= selectedCondition;

      return (
        <div
          key={index}
          data-number={index}
          onClick={() => handleClick(index)}
          style={{
            ...styles.rectangle,
            borderColor: isSelected ? 'black' : 'black',
            backgroundColor: isSelected ? 'cyan' : 'transparent',
          }}
        >
          <span>{box}</span>
        </div>
      );
    });
  };

  return (
    <div className="conditionMonitor">
      <div className="conditionBoxes">
        <span>{props.type}</span>
        {renderBoxes()}
      </div>
    </div>
  );
};

const styles = {
  rectangle: {
    width: '25px',
    height: '25px',
    border: 'solid 1px black',
    display: 'inline-block',
    margin: '1px',
    cursor: 'pointer',
    textAlign: 'center',
  },
};

export default ConditionMonitor;
