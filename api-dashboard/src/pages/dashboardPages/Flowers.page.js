
import {addFlower, editFlower, removeFlower} from '../../redux/actions/flowers.action';
import {useSelectorAsAnArray} from '../../utils/helper/customHooks.util';
import {DATA_TYPES} from '../../components/Table/StripedDataTable.component';
import {INPUT_TYPES} from '../../components/Form/FormInput.component';
import AddEditTable from '../../layouts/AddEditTable.layout';

function FlowersPage() {

    const [flowersObject, flowersArray] = useSelectorAsAnArray(({FlowersReducer}) => FlowersReducer.flowers);
    
    return (
        <AddEditTable 
            dataAsObject={flowersObject}
            dataAsArray={flowersArray}
            dispatchActions={dispatchActions}
            dataType={flowerDataType}
            inputType={flowerInputsType}
            dataName='Flower'
        />
    );
}

const dispatchActions = {
    add:addFlower,
    edit:editFlower,
    delete:removeFlower
};

const flowerDataType = {
    _id: DATA_TYPES.TEXT,
    flowerImageUrl: DATA_TYPES.IMAGE,
    flowerName: DATA_TYPES.TEXT,
    flowerDescription: DATA_TYPES.TEXT,
    flowerColor: DATA_TYPES.COLOR,
};

const flowerInputsType = {
    flowerName: INPUT_TYPES.TEXT,
    flowerColor: INPUT_TYPES.TEXT,
    flowerDescription: INPUT_TYPES.LONG_TEXT,
    flowerImageUrl: INPUT_TYPES.IMAGE,
};

export default FlowersPage;