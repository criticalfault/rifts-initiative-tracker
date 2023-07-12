//import Fade from 'react-bootstrap/Fade';
import { Card } from 'react-bootstrap';
const InitativeDisplay = (props) => {
    //const PhaseActionCost = {'SR1':7, 'SR2':10, 'SR3':10};

    const renderInitativeList = (initative) => {
        var originalList = props.List;
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
        <div>
            <h2>Initative Order</h2>
            {
                renderInitativeList(props.List).map((character, index) => {
                    return (
                        <Card style={{ width: '18rem', margin:'2px auto' }} key={index}>
                            <Card.Body>
                                <Card.Title>{character.name} - {character.initative}</Card.Title>
                            </Card.Body>
                        </Card>
                    );
                })
            }
        </div>
    );
}
export default InitativeDisplay;