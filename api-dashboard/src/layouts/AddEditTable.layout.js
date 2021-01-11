
import {useState} from 'react';
import Styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {Headline1, centeredWithFlex, Row, Card} from '../utils/constants/globalStyle.constant';
import StripedDataTable from '../components/Table/StripedDataTable.component';
import DynamicForm from '../components/Form/DynamicForm.component';

function AddEditTable({dataAsObject, dataAsArray, dispatchActions, inputType, dataType, dataName, FormToUse=DynamicForm}) {

    const [currentDataToEdit, setDataToEdit] = useState(dataAsArray ? dataAsArray[0] : {});
    const dispatch = useDispatch();

    const handleItemAdd = newItem => { dispatch(dispatchActions.add(newItem)); };
    const handleItemEdit = (updatedItem, itemId) => { dispatch(dispatchActions.edit(updatedItem, itemId)); };
    const handleItemDelete = itemId => { dispatch(dispatchActions.delete(itemId));};

    return (
        <AddEditTablePageWrapper>
            <Row>
                <Card>
                    <Headline1> Add {dataName} </Headline1>
                    <FormToUse handleSubmit={handleItemAdd} inputsType={inputType}/>
                </Card>
                <Card>
                    <Headline1> Edit {dataName} </Headline1>
                    <FormToUse handleSubmit={handleItemEdit} dataToEdit={currentDataToEdit} inputsType={inputType}/>
                </Card>
            </Row>
            <Row>
                <Card width="100%" height="auto">
                    <StripedDataTable 
                        dataToPresent={dataAsArray} 
                        dataType={dataType}
                        onDelete={handleItemDelete}
                        onEdit={id => setDataToEdit(dataAsObject[id])}
                    />
                </Card>
            </Row>
        </AddEditTablePageWrapper>
    );
}

const AddEditTablePageWrapper = Styled(centeredWithFlex)`
    padding: 3rem;
    flex-direction: column;
    gap: 3rem;
`;

export default AddEditTable;