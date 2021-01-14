
import {addUser, editUser, removeUser} from '../../redux/actions/users.action';
import {useSelectorAsAnArray} from '../../utils/helper/customHooks.util';
import {DATA_TYPES} from '../../components/Table/StripedDataTable.component';
import {INPUT_TYPES} from '../../components/Form/FormInput.component';
import AddEditTable from '../../layouts/AddEditTable.layout';
import UserForm from '../../components/Form/UserForm.component';

function UsersPage() {

    const [usersObject, usersArray] = useSelectorAsAnArray(({UsersReducer}) => UsersReducer.users); 

    return (
        <AddEditTable 
            dataAsObject={usersObject}
            dataAsArray={usersArray}
            dispatchActions={dispatchActions}
            dataType={userDataType}
            inputType={userInputsType}
            dataName='User'
            FormToUse={UserForm}
        />
    );
}

const dispatchActions = {
    add:addUser,
    edit:editUser,
    delete:removeUser
};

const userDataType = {
    _id:DATA_TYPES.TEXT,
    userEmail:DATA_TYPES.TEXT,
    userRole:DATA_TYPES.TEXT,
    userFirstName:DATA_TYPES.TEXT,
    userLastName:DATA_TYPES.TEXT,
    userPhoneNumber:DATA_TYPES.TEXT,
    providerId: DATA_TYPES.TEXT,
    userAddresses:[{}],
    userOrders:[{}]
};

const userInputsType = {
    userEmail:INPUT_TYPES.TEXT,
    userFirstName:INPUT_TYPES.TEXT,
    userLastName:INPUT_TYPES.TEXT,
    userPhoneNumber:INPUT_TYPES.PHONE_NUMBER,
};

export default UsersPage;