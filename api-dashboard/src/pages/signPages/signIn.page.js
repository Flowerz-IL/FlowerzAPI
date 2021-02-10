
import {useState} from 'react';
import Styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {signIn} from '../../redux/actions/auth.action';
import {CenteredWithFlex, Headline1, Button} from '../../utils/constants/globalStyle.constant';
import Loader from '../../components/Loader/Loader.component';
import Colors from '../../utils/constants/colors.constant';
import Logo from '../../components/Logo/Logo.component';

function SingInPage(){

    const dispatch = useDispatch();
    const [formState, setFormState] = useState({userEmail:'', userPassword:''});
    const [errorState, setErrorState] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = ({target}) => {
        const {name, value} = target;
        setFormState(prev => ({...prev, [name]: value}));
        setErrorState(prev => handleErrorChange(prev, name, value));
    }

    const handleSubmit = async event => {
        event.preventDefault();
        await setIsSubmitting(true);
        
        if(Object.keys(errorState).length >= 1) {
            alert('fix the form before submitting');
            setIsSubmitting(false);
            return;
        }        

        try{
            await dispatch(signIn(formState));
        } catch (error) { alert(error.message); }
        
        setIsSubmitting(false); 
    }; 

    return (
        <SignInPageWrapper>
            <SignInBox>
                <Headline1 color={Colors.forthColor}> Sign In </Headline1>
                <Form onSubmit={handleSubmit}>
                    <Input 
                        type='email' 
                        placeholder='Email' 
                        name='userEmail'
                        onChange={handleChange} 
                        value={formState.userEmail} 
                        required
                    />
                    <ErrorMessage>{errorState.userEmail ?? ''}</ErrorMessage>
                    <Input 
                        type='password' 
                        placeholder='Password' 
                        name='userPassword' 
                        onChange={handleChange} 
                        value={formState.userPassword} 
                        required
                    />
                    <ErrorMessage>{errorState.userPassword ?? ''}</ErrorMessage>
                    {!isSubmitting ? 
                        <Button 
                            backgroundColor={Colors.thirdColor} 
                            textColor={Colors.primaryColor}
                            style={{marginTop: '1rem'}}
                        >
                            Submit 
                        </Button> : <Loader />
                    }
                </Form>
                <Logo />
                <Link style={{color:'white'}} to="/sign-Up"> don't have an account signUp </Link>
            </SignInBox>
        </SignInPageWrapper>
    );
}

const handleErrorChange = (previousState, inputName, value) => {
    switch(inputName){
        case 'userEmail':
            {
                const expression = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                const regex = new RegExp(expression);
                if(!value.match(regex))
                    return {...previousState, userEmail: 'please insert a valid email address'}
                else {
                    let newErrorState = {...previousState};
                    delete newErrorState.userEmail;
                    return newErrorState;
                }
            }

        default: 
            {
                const valueLen = value.length;
                if(valueLen > 40 || valueLen < 4) 
                    return {...previousState, [inputName]: `Text must be with the minimum of 4 characters and the maximum of 40` };
                else {
                    let newErrorState = {...previousState};
                    delete newErrorState[inputName];
                    return newErrorState;
                };
            }
    }
};

const SignInPageWrapper = Styled(CenteredWithFlex)`
    height: 100vh;
    background-color: ${Colors.thirdColor};
`;

const SignInBox = Styled(CenteredWithFlex)`
    flex-direction: column;
    color: ${Colors.thirdColor};
    width: 25vw;
    height: 45vh;
    background-color: ${Colors.primaryColor};
    box-shadow: 0 10px 20px 10px ${Colors.forthColor}${Colors.opacity20};

    @media screen and (max-width: 800px) {
        width: 90vw;
        height: 50vh;
    }
`;

const ErrorMessage = Styled.label`
    color: red;
`;

const Form = Styled.form`
    display:flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem;
    width: 70%;
`;

const Input = Styled.input`
    color: ${Colors.thirdColor};
    width: 100%;
    padding: 0.5rem;
    margin: 1rem 0;
    font-family: inherit;
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 1px solid ${Colors.thirdColor};
`;

export default SingInPage;