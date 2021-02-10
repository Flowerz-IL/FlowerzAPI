
import {useState, useEffect} from 'react';
import Styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {Headline1, CenteredWithFlex, Row, Card} from '../utils/constants/globalStyle.constant';
import StripedDataTable from '../components/Table/StripedDataTable.component';
import DynamicForm from '../components/Form/DynamicForm.component';

function AddEditTable({dataAsObject, dataAsArray, dispatchActions, inputType, dataType, dataName, FormToUse=DynamicForm}) {

    const [displayedData, setDisplayedData] = useState(dataAsArray);
    const [currentDataToEdit, setDataToEdit] = useState(dataAsArray ? dataAsArray[0] : {});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();

    const handleItemAdd = newItem => { dispatch(dispatchActions.add(newItem)); };
    const handleItemEdit = (updatedItem, itemId) => { dispatch(dispatchActions.edit(updatedItem, itemId)); };
    const handleItemDelete = itemId => { dispatch(dispatchActions.delete(itemId));};
    const handleWindowsSizeChange = () => setWindowWidth(window.innerWidth);
    const handleSearch = event => {
        const value = event.target.value.toLowerCase();
        if(value !== '')
            setDisplayedData(prev => prev.filter( item => Object.values(item).some( 
                propertyValue => String(propertyValue).toLowerCase().includes(value))))
        else setDisplayedData(dataAsArray);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowsSizeChange);
        return () => { window.removeEventListener('resize', handleWindowsSizeChange); }
    }, []);
    useEffect(() => setDisplayedData(dataAsArray), [dataAsArray]);

    return (
        <AddEditTablePageWrapper>
            {windowWidth > 800 && 
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
            }
            <Row>
                <Card width="100%" height="auto">
                    <SearchInput type="text" placeholder="Search" onChange={handleSearch}/>
                    <StripedDataTable 
                        dataToPresent={displayedData} 
                        dataType={dataType}
                        onDelete={handleItemDelete}
                        onEdit={id => setDataToEdit(dataAsObject[id])}
                        windowWidth={windowWidth}
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

    @media screen and (max-width: 600px){
        padding: 0.6rem;
    }
`;

const SearchInput = Styled.input`
    padding: 0.5rem;
    margin: 1.5rem;
    width: 50%;

    @media screen and (max-width: 600px){
        width: 90%;
    }
`;

export default AddEditTable;