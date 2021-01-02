
import {useState} from 'react';
import Styled from 'styled-components';
import {Headline1, centeredWithFlex, Row, Card} from '../../utils/constants/globalStyle.constant';
import StripedDataTable, {DATA_TYPES} from '../../components/Table/StripedDataTable.component';
import DynamicForm, {INPUT_TYPES} from '../../components/Form/DynamicForm.component';
import Flowers from '../../Dummy_Data/flower.dummy.data';

function FlowersPage() {

    const [flowers, setFlowers] = useState(Flowers);
    const [currentDataToEdit, setDataToEdit] = useState(flowers[0]);

    const handleItemDelete = itemId => {
        setFlowers(prev => prev.filter(flower => flower._id !== itemId));
    };

    const handleItemEdit = (newFlower, id) => {
        setFlowers(prev => {
            const index = prev.findIndex(item => item._id === id);
            prev[index] = {...newFlower, _id:id };
            return prev;
        });
        setDataToEdit(flowers[0]);
    };

    const handleItemAdd = newFlower => {
        setFlowers(prev => [...prev, {...newFlower, _id:flowers.length + 1 }]);
    };

    return (
        <FlowersPageWrapper>
            <Row>
                <Card>
                    <Headline1> Add Flower </Headline1>
                    <DynamicForm handleSubmit={handleItemAdd} inputsType={flowerInputsType}/>
                </Card>
                <Card>
                    <Headline1> Edit Flower </Headline1>
                    <DynamicForm handleSubmit={handleItemEdit} dataToEdit={currentDataToEdit} inputsType={flowerInputsType}/>
                </Card>
            </Row>
            <Row>
                <Card width="100%" height="auto">
                    <StripedDataTable 
                        dataToPresent={flowers} 
                        dataType={flowerDataType}
                        onDelete={handleItemDelete}
                        onEdit={id => setDataToEdit(flowers.find(({_id}) => _id === id))}
                    />
                </Card>
            </Row>
        </FlowersPageWrapper>
    );
}

const flowerDataType = {
    _id: DATA_TYPES.TEXT,
    type: DATA_TYPES.TEXT,
    color: DATA_TYPES.COLOR,
    productDescription: DATA_TYPES.TEXT,
    productImage: DATA_TYPES.IMAGE,
};

const flowerInputsType = {
    type: INPUT_TYPES.TEXT,
    color: INPUT_TYPES.TEXT,
    productDescription: INPUT_TYPES.LONG_TEXT,
    productImage: INPUT_TYPES.IMAGE,
};


const FlowersPageWrapper = Styled(centeredWithFlex)`
    padding: 3rem;
    flex-direction: column;
    gap: 3rem;
`;

export default FlowersPage;