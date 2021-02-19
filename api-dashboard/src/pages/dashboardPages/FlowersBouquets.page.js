
import {addFlowerBouquet, editFlowerBouquet, removeFlowerBouquet} from '../../redux/actions/flowerBouquets.action';
import {useSelectorAsAnArray} from '../../utils/helper/customHooks.util';
import {DATA_TYPES} from '../../components/Table/StripedDataTable.component';
import {INPUT_TYPES} from '../../components/Form/FormInput.component';
import AddEditTable from '../../layouts/AddEditTable.layout';

function FlowerBouquetsPage() {
    const [flowerBouquetsObject, flowerBouquetsArray] = useSelectorAsAnArray(({FlowerBouquetsReducer}) => FlowerBouquetsReducer.flowerBouquets); 

    return (
        <AddEditTable 
            dataAsObject={flowerBouquetsObject}
            dataAsArray={flowerBouquetsArray}
            dispatchActions={dispatchActions}
            dataType={flowerDataType}
            inputType={flowerInputsType}
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
    bouquetName: { type:INPUT_TYPES.TEXT },
    bouquetPrice: { type:INPUT_TYPES.NUMBER, min: 0, max:1000},
    bouquetDescription: { type:INPUT_TYPES.LONG_TEXT },
    bouquetOccasionStyle: { type:INPUT_TYPES.TEXT },
    bouquetImageUrl: { type:INPUT_TYPES.IMAGE},
    bouquetSize: { type:INPUT_TYPES.SELECT, data: ['S', 'M', 'L', 'Xl', 'XXL']},
    bouquetFlowers: [{
        propertyToCompare: 'flowerId',
        mustBeFilled:['flowerId', 'flowerAmount'],
        inputs: {
            flowerId: { type: INPUT_TYPES.SELECT, data: 'flowers', toDisplay: ['flowerName', 'flowerColor', '_id']},
            flowerAmount: {type: INPUT_TYPES.NUMBER, min: 0, max:100}
        }
    }],
};

export default FlowerBouquetsPage;