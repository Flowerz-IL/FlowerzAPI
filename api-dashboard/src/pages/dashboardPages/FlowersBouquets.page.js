
import {addFlowerBouquet, editFlowerBouquet, removeFlowerBouquet} from '../../redux/actions/flowerBouquets.action';
import {useSelectorAsAnArray} from '../../utils/helper/customHooks.util';
import {DATA_TYPES} from '../../components/Table/StripedDataTable.component';
import {INPUT_TYPES} from '../../components/Form/FormInput.component';
import AddEditTable from '../../layouts/AddEditTable.layout';
import FlowerBouquetForm from '../../components/Form/FlowerBouquetForm.component';

function FlowerBouquetsPage() {
    const [flowerBouquetsObject, flowerBouquetsArray] = useSelectorAsAnArray(({FlowerBouquetsReducer}) => FlowerBouquetsReducer.flowerBouquets); 
    
    return (
        <AddEditTable 
            dataAsObject={flowerBouquetsObject}
            dataAsArray={flowerBouquetsArray}
            dispatchActions={dispatchActions}
            dataType={flowerDataType}
            inputType={flowerInputsType}
            FormToUse={FlowerBouquetForm}
            dataName='Flower Bouquet'
        />
    );
}

const dispatchActions = {
    add:addFlowerBouquet,
    edit:editFlowerBouquet,
    delete:removeFlowerBouquet
};

const flowerDataType = {
    _id: DATA_TYPES.TEXT,
    bouquetImageUrl: DATA_TYPES.IMAGE,
    bouquetName: DATA_TYPES.TEXT,
    bouquetPrice: DATA_TYPES.TEXT,
    bouquetSize: DATA_TYPES.TEXT,
    bouquetDescription: DATA_TYPES.TEXT,
    bouquetOccasionStyle: DATA_TYPES.TEXT,
    bouquetFlowers: [{}],
    bouquetColors:[DATA_TYPES.COLOR]
};

const flowerInputsType = {
    bouquetName: INPUT_TYPES.TEXT,
    bouquetPrice: INPUT_TYPES.NUMBER,
    bouquetDescription: INPUT_TYPES.LONG_TEXT,
    bouquetOccasionStyle: INPUT_TYPES.TEXT,
    bouquetImageUrl: INPUT_TYPES.IMAGE,
};

export default FlowerBouquetsPage;