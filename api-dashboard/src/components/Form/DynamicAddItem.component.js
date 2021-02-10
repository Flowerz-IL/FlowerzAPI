
import {useState} from 'react';
import Styled from 'styled-components';
import {INPUT_TYPES, formatText} from './FormInput.component';
import {DeleteIcon, Button} from '../../utils/constants/globalStyle.constant';
import {SelectInput, TextInput, AmountInput} from './DynamicForm.style';
import Loader from '../Loader/Loader.component';


function DynamicAddItem({formState, setFormState, formName, formInputs, data}) {
    const [tempFormState, setTempFormState] = useState({});
    const currentInputDetails = formInputs[formName][0];
    const handleChange = ({target:{value, name}}) => setTempFormState(prev => ({...prev, [name]: value}));
    const handleSubmit = () => {
        const validationRes = currentInputDetails.mustBeFilled.every( input => tempFormState[input] && tempFormState[input] !== '');
        if(!validationRes){
            alert(`one or more fields from these fields ${JSON.stringify(currentInputDetails.mustBeFilled)} are missing`);
            return;
        }
        setFormState(prev => {
            const propertyToCompare = currentInputDetails.propertyToCompare;
            const currentIndex = prev[formName].findIndex(item => item[propertyToCompare] === tempFormState[propertyToCompare]);
            const temp = [...prev[formName]];
            if(currentIndex !== -1) 
                temp[currentIndex] = tempFormState;
            else 
                temp.push(tempFormState);
            return {...prev, [formName]: temp};
        });
        setTempFormState({});
    };

    if(!formState) return <Loader />;

    return (
        <>
            <ItemsWrapper>
                {formState[formName].map( item => 
                    <div>
                        {currentInputDetails.mustBeFilled.map( propertyToDisplay => `${item[propertyToDisplay]} - `)}
                        <span onClick={() => setFormState(prev => ({
                            ...prev,
                            [formName]: prev[formName].filter(i => i[currentInputDetails.propertyToCompare] !== item[currentInputDetails.propertyToCompare])
                        }))}>
                            <DeleteIcon /> 
                        </span>
                    </div>
                )}
            </ItemsWrapper>
            <AddItemWrapper>
                {Object.keys(currentInputDetails.inputs).map(inputKey => {
                    const inputType = currentInputDetails.inputs[inputKey].type;
                    const placeHolder = formatText(inputKey);

                    switch(inputType){
                        case INPUT_TYPES.SELECT: 
                            const propertyToCompare = currentInputDetails.propertyToCompare;
                            const dataAsAnObject = data[currentInputDetails.inputs[inputKey].data];

                            if(!dataAsAnObject) return <Loader />;
                            return (
                                <SelectInput
                                    onChange={handleChange} name={propertyToCompare}
                                    value={tempFormState[propertyToCompare] ?? ''}
                                >
                                    <option value={''}> select {placeHolder} </option>
                                    {Array.isArray(data[currentInputDetails.inputs[inputKey].data]) ?
                                        currentInputDetails.inputs[inputKey].data.map(item => <option value={item}> {item} </option> ):
                                        Object.keys(dataAsAnObject).map(itemKey =>(
                                            <option value={itemKey}> 
                                                {currentInputDetails.inputs[inputKey].toDisplay.map(propertyToDisplay =>
                                                    `${dataAsAnObject[itemKey][propertyToDisplay]} - `)}
                                            </option>
                                        ))
                                    }
                                </SelectInput>
                            );

                        case INPUT_TYPES.NUMBER:
                            const min = currentInputDetails.inputs[inputKey].min ?? 0;
                            const max = currentInputDetails.inputs[inputKey].max ?? 1000;
                            return (
                                <AmountInput onChange={handleChange} type="number" 
                                    name={inputKey} min={min} max={max}
                                    value={tempFormState[inputKey] ?? 0}
                                />
                            );

                        default: 
                            return ( 
                                <TextInput 
                                    onChange={handleChange} 
                                    placeholder={placeHolder} 
                                    name={inputKey}  
                                    value={tempFormState[inputKey] ?? ''}
                                />
                            ); 
                    }
                })}
            <Button style={{flex: 1}} type="button" onClick={handleSubmit}> Add {currentInputDetails.propertyToCompare} </Button>
            </AddItemWrapper>
        </>
    );
}

const ItemsWrapper = Styled.div`
    margin: 5px 0 0;
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
`;

const AddItemWrapper = Styled.div`
    margin: 5px 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`;

export default DynamicAddItem;
