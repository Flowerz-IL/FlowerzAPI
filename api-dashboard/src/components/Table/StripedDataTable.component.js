
import uniqid from 'uniqid';
import {Image, DeleteIcon, EditIcon, ColorDisplay, StripedDataTableWrapper, TableBody, TableHead} from './StripedDataTable.style';
import Loader from '../Loader/Loader.component';

/**
 * Display data in a table format
 * 
 * @props dataToPresent (object)
 * @props dataType -> object filled with the exported DATA_TYPES (object)
 * @props onDelete -> on item delete (function)
 * @props onEdit -> on item edit (function)
 */
function StripedDataTable({ dataToPresent, dataType, onDelete, onEdit }) {

    const DataKeys = Object.keys(dataType);
    
    if(!dataToPresent || !dataType) return ( <Loader /> );

    return (
        <StripedDataTableWrapper>
            <TableHead>
                <tr>
                    {DataKeys.map( key => <th key={uniqid()}> {formatHeadline(key)} </th>)}
                    { onDelete && onEdit && <th> Actions </th> }
                </tr>
            </TableHead>
            <TableBody>
                {dataToPresent.map( dataItem => 
                    <tr key={uniqid()}>
                        {DataKeys.map( key => {
                            const item = dataItem[key];
                            switch(dataType[key]) {
                                case DATA_TYPES.IMAGE:
                                    return ( <td key={uniqid()}> <Image src={item} /> </td> );
                                
                                case DATA_TYPES.OBJECT:
                                    return ( <td key={uniqid()}><pre>{JSON.stringify(item, null, 2)}</pre></td> );

                                case DATA_TYPES.COLOR:
                                    return ( <td key={uniqid()}> <ColorDisplay colorToDisplay={item}/> </td> );
                                
                                default:
                                    return ( <td key={uniqid()}> {formatText(item)} </td> );
                            }      
                        })}
                        { onDelete && onEdit && (
                            <td>
                                <span onClick={() => onDelete(dataItem._id)}> <DeleteIcon /> </span>
                                <span onClick={() => onEdit(dataItem._id)}> <EditIcon /> </span>
                            </td>
                        )}  
                    </tr>
                )}
            </TableBody>
        </StripedDataTableWrapper>
    );
}

const formatHeadline = string => typeof string !== 'string' ? string : string
        .split('')
        .map(char => (char >= 'A' && char <= 'Z') ? ` ${char}`: (char >= 'a' && char <= 'z') ? char : '')
        .join('');

const formatText = string => typeof string === 'string' ? string.toLowerCase() : string;

export default StripedDataTable;
export const DATA_TYPES = {
    IMAGE: 'IMAGE',
    TEXT: 'TEXT',
    OBJECT: 'OBJECT',
    COLOR: 'COLOR',
};