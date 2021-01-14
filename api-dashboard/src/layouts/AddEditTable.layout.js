
import {useState} from 'react';
import Styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {Headline1, CenteredWithFlex, Row, Card} from '../utils/constants/globalStyle.constant';
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
                    <SearchInput type="text" />
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

const AddEditTablePageWrapper = Styled(CenteredWithFlex)`
    padding: 3rem;
    flex-direction: column;
    gap: 3rem;
`;

const SearchInput = Styled.input`
    padding: 0.5rem;
    margin: 0.5rem;
    width: 50%;
`;

export default AddEditTable;