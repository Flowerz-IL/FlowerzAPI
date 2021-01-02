
import Styled from 'styled-components';
import Colors from '../../utils/constants/colors.constant';
import Fonts from '../../utils/constants/fonts.constant';
import {Delete} from 'styled-icons/material';
import {ClipboardPencil} from 'styled-icons/foundation';

export const StripedDataTableWrapper = Styled.table`
    width: 100%;
    border-spacing: 0;
    text-align: center;
    
    & tr {
        text-transform: capitalize;
        font-size: 1.2rem;
        color: ${Colors.primaryColor};
    }
    
    & td, & th {
        padding: 0.8rem;
    }
`;

export const TableHead = Styled.thead`
    & tr {
        color: ${Colors.thirdColor};
        background-color: ${Colors.primaryColor};
        font-family: ${Fonts.serif}, serif;
        font-size: 1.3rem;
        letter-spacing: 1px;
    }
`;

export const TableBody = Styled.tbody`
    & tr:nth-child(even) {
        background-color: ${Colors.thirdColor}${Colors.opacity40};
    }

    & tr:hover {
        background-color: ${Colors.thirdColor}${Colors.opacity30};
    }
`;

export const Image = Styled.img`
    width: 5rem;
    height 5rem;
`;

export const ColorDisplay = Styled.div`
    display: inline-block;
    width: 2rem;
    height: 2rem;
    box-shadow: 0 0 5px 2px ${Colors.primaryColor}${Colors.opacity20};
    border-radius: 1rem;
    background-color: ${props => props.colorToDisplay ?? Colors.primaryColor};
`;

export const DeleteIcon = Styled(Delete)`
    width: 2rem;
    color: red;
    cursor: pointer;
    transform: all 6.5s;

    &:hover {
        transform: rotate(10deg);
    }
`;

export const EditIcon = Styled(ClipboardPencil)`
    width: 2rem;
    color: black;
    cursor: pointer;
    transform: all 6.5s;

    &:hover {
        transform: rotate(10deg);
    }
`;

