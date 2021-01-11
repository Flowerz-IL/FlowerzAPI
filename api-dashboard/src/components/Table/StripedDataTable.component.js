
import {useState, useRef} from 'react';
import uniqid from 'uniqid';
import {Image, ColorDisplay, StripedDataTableWrapper, TableBody, TableHead} from './StripedDataTable.style';
import {Button, PopUp, PopUpWrapper, Link, DeleteIcon, EditIcon} from '../../utils/constants/globalStyle.constant';
import Colors from '../../utils/constants/colors.constant';
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

    const DataKeys = useRef(Object.keys(dataType)).current;
    const [isPopUpOn, setIsPopUpOn] = useState(false);
    const [popUpContent, setPopUpContent] = useState({});
    
    const handleOpen = () => {setIsPopUpOn(true);};
    const handleClose = () => {setIsPopUpOn(false);};
    const handleLinkClick = item => { setPopUpContent(item); handleOpen(); };

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
                        {DataKeys.map( dataKey => {
                            const item = dataItem[dataKey];
                            const type = dataType[dataKey];

                            if(Array.isArray(type))
                                return ( 
                                    <td key={uniqid()}>
                                        {item.map((i,index) => {
                                            if(type[0] === DATA_TYPES.COLOR)
                                                return <ColorDisplay colorToDisplay={i}/>;
                                            if(typeof type[0] === 'object')
                                                return (
                                                    <Link key={uniqid()} onClick={() => handleLinkClick(i)}>
                                                        {`${dataKey}${index + 1},`}
                                                    </Link>
                                                );
                                            return <p>{i}</p>;
                                        })}
                                    </td> 
                                );
                            
                            if(typeof type === 'object')
                                return (
                                    <td key={uniqid()}>
                                            <Link onClick={() => handleLinkClick(item)}>{dataKey}</Link>
                                    </td> 
                                );
                            

                            switch(type) {
                                case DATA_TYPES.IMAGE:
                                    return ( <td key={uniqid()}> <Image src={item} /> </td> );
                                
                                case DATA_TYPES.COLOR:
                                    return ( <td key={uniqid()}> <ColorDisplay colorToDisplay={item}/> </td> );
                                
                                default:
                                    return ( <td key={uniqid()}> {formatText(item)} </td> );
                            }      
                        })}
                        { onDelete && onEdit && (
                            <td key={uniqid()}>
                                <span onClick={() => onDelete(dataItem._id)}> <DeleteIcon /> </span>
                                <span onClick={() => onEdit(dataItem._id)}> <EditIcon /> </span>
                            </td>
                        )}  
                    </tr>
                )}
            </TableBody>
            <PopUpWrapper display={isPopUpOn}>
                <PopUp display={isPopUpOn}> 
                    <div>
                        {Object.keys(popUpContent).map( key => 
                            <p><b>{key}:</b> {JSON.stringify(popUpContent[key])}</p>
                        )}
                    </div>
                    <Button backgroundColor={Colors.thirdColor} textColor={Colors.primaryColor} onClick={handleClose}>close</Button>
                </PopUp>
            </PopUpWrapper>
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
    COLOR: 'COLOR',
};