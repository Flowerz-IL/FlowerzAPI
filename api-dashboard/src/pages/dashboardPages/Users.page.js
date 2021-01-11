
import {addUser, editUser, removeUser} from '../../redux/actions/users.action';
import {useSelectorAsAnArray} from '../../utils/helper/customHooks.util';
import {DATA_TYPES} from '../../components/Table/StripedDataTable.component';
import {INPUT_TYPES} from '../../components/Form/FormInput.component';
import AddEditTable from '../../layouts/AddEditTable.layout';

function UsersPage() {

    const [usersObject, usersArray] = useSelectorAsAnArray(({UsersReducer}) => UsersReducer.users); 

    return (
        <AddEditTable 
            dataAsObject={usersObject}
            dataAsArray={usersArray}
            dispatchActions={dispatchActions}
            dataType={flowerDataType}
            inputType={flowerInputsType}
            dataName='User'
        />
    );
}

const dispatchActions = {
    add:addUser,
    edit:editUser,
    delete:removeUser
};

const flowerDataType = {
    _id:DATA_TYPES.TEXT,
    emailAddress:DATA_TYPES.TEXT,
    userRole:DATA_TYPES.TEXT,
    firstName:DATA_TYPES.TEXT,
    surName:DATA_TYPES.TEXT,
    phoneNumber:DATA_TYPES.TEXT,
    addresses:[{}],
    cart:[{}]
};

const flowerInputsType = {
    emailAddress:INPUT_TYPES.TEXT,
    userRole:INPUT_TYPES.TEXT,
    firstName:INPUT_TYPES.TEXT,
    surName:INPUT_TYPES.TEXT,
    phoneNumber:INPUT_TYPES.TEXT,
};

export default UsersPage;