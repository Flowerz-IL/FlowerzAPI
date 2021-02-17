
import {useState, useEffect} from 'react';
import Styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {Headline1, CenteredWithFlex, Row, Card, ScrollFix} from '../utils/constants/globalStyle.constant';
import Colors from '../utils/constants/colors.constant';
import StripedDataTable from '../components/Table/StripedDataTable.component';
import DynamicForm from '../components/Form/DynamicForm.component';

const ITEMS_PER_PAGE = 25;

function AddEditTable({dataAsObject, dataAsArray, dispatchActions, inputType, dataType, dataName, FormToUse=DynamicForm}) {

    const [currentPage, setCurrentPage] = useState(1);
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
    useEffect(() => setDisplayedData(dataAsArray.slice()), [dataAsArray]);

    return (
        <AddEditTablePageWrapper>
            {windowWidth > 800 && 
                <Row>
                    <Card>
                        <ScrollFix>
                            <Headline1> Add {dataName} </Headline1>
                            <FormToUse handleSubmit={handleItemAdd} inputsType={inputType}/>
                        </ScrollFix>
                    </Card>
                    <Card>
                        <ScrollFix>
                            <Headline1> Edit {dataName} </Headline1>
                            <FormToUse handleSubmit={handleItemEdit} dataToEdit={currentDataToEdit} inputsType={inputType}/>
                        </ScrollFix>
                    </Card>
                </Row>
            }
            <Row>
                <Card width="100%" height="auto">
                    <ScrollFix>
                        <SearchInput type="text" placeholder="Search" onChange={handleSearch}/>
                        <StripedDataTable 
                            dataToPresent={displayedData.slice((currentPage-1) * ITEMS_PER_PAGE, Math.min(currentPage * ITEMS_PER_PAGE, displayedData.length))} 
                            dataType={dataType}
                            onDelete={handleItemDelete}
                            onEdit={id => setDataToEdit(dataAsObject[id])}
                            windowWidth={windowWidth}
                        />
                        {Math.ceil(displayedData.length / ITEMS_PER_PAGE) > 1 && <PaginationWrapper>
                            {[...Array(Math.ceil(displayedData.length / ITEMS_PER_PAGE))].map((e,i) => 
                                <Pagination 
                                    onClick={() => setCurrentPage(i + 1)}
                                    active={i + 1 === currentPage}>
                                        {i + 1} 
                                </Pagination>)
                            }
                        </PaginationWrapper>}
                    </ScrollFix>
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

const PaginationWrapper = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Pagination = Styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    background-color: ${ props => props.active ? Colors.primaryColor + Colors.opacity60 : 'transparent'};

    &:hover {
        background-color: ${Colors.primaryColor}${Colors.opacity40};
    }
`;

export default AddEditTable;