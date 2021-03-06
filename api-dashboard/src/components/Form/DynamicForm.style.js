
import Styled from 'styled-components';
import {CenteredWithFlex} from '../../utils/constants/globalStyle.constant';

export const FormWrapper = Styled.form`
    padding: 1rem;
    text-align: center;
`;

export const SelectInput = Styled.select`
    padding: 0.5rem;
    flex: 4;
`;

export const AmountInput = Styled.input`
    padding: 0.5rem;
    width: 5vw;
    flex: 1;
`;

export const ErrorMessage = Styled.label`
    color: red;
    position: relative;
    bottom: 0;
`;

export const TextInput = Styled.input`
    padding: 0.5rem;
    margin: 0.5rem;
    width: 32vw;
`;

export const TextAreaInput = Styled.textarea`
    padding: 0.5rem;
    margin: 0.5rem;
    width: 32vw;
    resize: none;
    text-transform: capitalize
`;

export const ImageWrapper = Styled(CenteredWithFlex)`
    justify-content: flex-start;
    align-items: flex-end;
    margin: 0.5rem;
    margin-right: 0;
    gap: 1rem;

    & input {
        width: 28vw;
        margin: 0;
    }
`;

export const InputWrapper = Styled.div`
    position: relative;
`;

export const CharacterCount = Styled.div`
    position: absolute;
    bottom: 1.3rem;
    right: 2rem;
`;

export const Image = Styled.img`
    width: 5rem;
    height 5rem;
`;

export const ObjectsWrapper = Styled(CenteredWithFlex)`
    justify-content: flex-start;
    flex-wrap: wrap;
`;