import React, { useState } from 'react'; // Import useState hook
import { Card } from 'react-bootstrap';

const InitiativeDisplay = (props) => {
    const [selectedCardIndex, setSelectedCardIndex] = useState(null); // State to track the selected card

    const handleCardClick = (index) => { // Function to handle card click
        setSelectedCardIndex(index); // Update the selected card index
    };

    const renderInitiativeList = (initiative) => {
        var originalList = [...props.List]; // Create a shallow copy to avoid mutating props directly
        var finalList = [];
        originalList.sort(function(a, b){
            return b.initiative - a.initiative;
        });

        while (originalList.length > 0) {
            let TempInitHolder = originalList.shift();
            finalList.push({ ...TempInitHolder });
            TempInitHolder.initiative -= 10;
            if(TempInitHolder.initiative > 0){
                originalList.push(TempInitHolder);
            }
        }
        finalList.sort(function(a, b){
            return b.initiative - a.initiative;
        });
        return(finalList);
    };

    return (
        <div>
            <h2>Initiative Order</h2>
            {
                renderInitiativeList(props.List).map((character, index) => {
                    // Apply conditional styling for the selected card
                    const cardStyles = selectedCardIndex === index ? 
                        { width: '18rem', margin: '2px auto', backgroundColor: '#f0f0f0' } : // Highlighted style
                        { width: '18rem', margin: '2px auto' }; // Default style

                    return (
                        <Card>
                            <Card.Body style={cardStyles} key={index} onClick={() => handleCardClick(index)}>
                                <Card.Title>{character.name} - {character.initiative}</Card.Title>
                            </Card.Body>
                        </Card>
                    );
                })
            }
        </div>
    );
};

export default InitiativeDisplay;
