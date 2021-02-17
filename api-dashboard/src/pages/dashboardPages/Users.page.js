
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
            dataType={userDataType}
            inputType={userInputsType}
            dataName='User'
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
    userPassword: { type:INPUT_TYPES.PASSWORD},
    userEmail:{ type:INPUT_TYPES.EMAIL },
    userFirstName:{ type:INPUT_TYPES.TEXT },
    userLastName:{ type:INPUT_TYPES.TEXT },
    userPhoneNumber:{ type:INPUT_TYPES.PHONE_NUMBER },
    userAddresses:[{
        propertyToCompare: 'name',
        mustBeFilled:['name', 'city', 'street', 'houseNumber'],
        inputs: {
            name: { type:INPUT_TYPES.TEXT },
            city: { type:INPUT_TYPES.TEXT },
            street: { type:INPUT_TYPES.TEXT },
            houseNumber: {type: INPUT_TYPES.NUMBER, min: 0, max:100},
            floorNumber: {type: INPUT_TYPES.NUMBER, min: 0, max:30},
            aptNumber: {type: INPUT_TYPES.NUMBER, min: 0, max:100}
        }
    }],
};

export default UsersPage;