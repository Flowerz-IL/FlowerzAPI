
import {addProvider, editProvider, removeProvider} from '../../redux/actions/providers.action';
import {useSelectorAsAnArray} from '../../utils/helper/customHooks.util';
import {DATA_TYPES} from '../../components/Table/StripedDataTable.component';
import {INPUT_TYPES} from '../../components/Form/FormInput.component';
import AddEditTable from '../../layouts/AddEditTable.layout';

function ProvidersPage() {

    const [providersObject, providersArray] = useSelectorAsAnArray(({ProvidersReducer}) => ProvidersReducer.providers); 

    return (
        <AddEditTable 
            dataAsObject={providersObject}
            dataAsArray={providersArray}
            dispatchActions={dispatchActions}
            dataType={providerDataType}
            inputType={providerInputsType}
            dataName='Provider'
        />
    );
}

const dispatchActions = {
    add:addProvider,
    edit:editProvider,
    delete:removeProvider
};

const providerDataType = {
    _id:DATA_TYPES.TEXT,
    userId:DATA_TYPES.TEXT,
    businessName:DATA_TYPES.TEXT,
    businessWebsite:DATA_TYPES.TEXT
};

const providerInputsType = {
    userId: { type:INPUT_TYPES.SELECT, data: 'users', toDisplay:['userFirstName', 'userLastName', '_id']},
    businessName: { type:INPUT_TYPES.TEXT },
    businessWebsite: { type:INPUT_TYPES.TEXT },
};

export default ProvidersPage;