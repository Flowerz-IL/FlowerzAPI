
import {addProvider, editProvider, removeProvider} from '../../redux/actions/providers.action';
import {useSelectorAsAnArray} from '../../utils/helper/customHooks.util';
import {DATA_TYPES} from '../../components/Table/StripedDataTable.component';
import {INPUT_TYPES} from '../../components/Form/FormInput.component';
import AddEditTable from '../../layouts/AddEditTable.layout';
import ProviderForm from '../../components/Form/ProviderForm.component';

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
            FormToUse={ProviderForm}
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
    businessName: INPUT_TYPES.TEXT,
    businessWebsite: INPUT_TYPES.TEXT
};

export default ProvidersPage;