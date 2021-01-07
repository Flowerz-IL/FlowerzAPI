
import {addFlower, editFlower, removeFlower} from '../../redux/actions/flowers.action';
import {useSelectorAsAnArray} from '../../utils/helper/customHooks.util';
import {DATA_TYPES} from '../../components/Table/StripedDataTable.component';
import {INPUT_TYPES} from '../../components/Form/DynamicForm.component';
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

export default FlowersPage;