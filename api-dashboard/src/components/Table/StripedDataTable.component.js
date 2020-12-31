
import Styled from 'styled-components';
import uniqid from 'uniqid';
import Colors from '../../utils/colors.constant';
import Fonts from '../../utils/fonts.constant';

const formatHeadline = string => {
    return string
        .split('')
        .map(char => (char >= 'A' && char <= 'Z') ? ` ${char}`: (char >= 'a' && char <= 'z') ? char : '')
        .join('');
};

function StripedDataTable({ dataToPresent }) {

    const DataKeys = Object.keys(dataToPresent[0]);

    return (
        <StripedDataTableWrapper>
            <TableHead>
                <tr>
                    {DataKeys.map( key => <th key={uniqid()}> {formatHeadline(key)} </th>)}
                </tr>
            </TableHead>
            <TableBody>
                {dataToPresent.map( dataItem => 
                    <tr key={uniqid()}>
                        {DataKeys.map( key => 
                            <td>
                                {dataItem[key]}
                            </td>
                        )}
                    </tr>
                )}
            </TableBody>
        </StripedDataTableWrapper>
    );
}

const StripedDataTableWrapper = Styled.table`
    width: 100%;
    border-spacing: 0;
    text-align: center;
    
    & td, & th {
        padding: 0.8rem;
    }
`;

const TableHead = Styled.thead`
    & tr {
        color: ${Colors.thirdColor};
        text-transform: capitalize;
        font-size: 1rem;
        background-color: ${Colors.primaryColor};
    }
`;

const TableBody = Styled.tbody`
    
    & tr {
        cursor: pointer;
    }

    & tr:nth-child(even) {
        background-color: ${Colors.thirdColor}${Colors.opacity40};
    }

    & tr:hover {
        background-color: ${Colors.thirdColor}${Colors.opacity30};
    }
`;

export default StripedDataTable;