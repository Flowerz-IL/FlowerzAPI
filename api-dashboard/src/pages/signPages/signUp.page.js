
import {useState} from 'react';
import Styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {signUp} from '../../redux/actions/auth.action';
import {useHistory} from 'react-router-dom';
import {CenteredWithFlex, Headline1, Button} from '../../utils/constants/globalStyle.constant';
import Loader from '../../components/Loader/Loader.component';
import Colors from '../../utils/constants/colors.constant';
import Logo from '../../components/Logo/Logo.component';

function SingUpPage(){

    const dispatch = useDispatch();
    const history = useHistory();
    const [formState, setFormState] = useState({userEmail:'', userPassword:'', userFirstName:'', userLastName:'',
        userPhoneNumber:'', businessName:'', businessWebsite:'', city:'', street:'', houseNumber:''});
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

        const newUser = {
            userEmail: formState.userEmail, userPassword: formState.userPassword, userFirstName: formState.userFirstName,
            userLastName: formState.userLastName, userAddresses:[{name:'Store', city:formState.city, street:formState.street,
            houseNumber: formState.houseNumber}], userPhoneNumber: formState.userPhoneNumber, businessName: formState.businessName,
            businessWebsite: formState.businessWebsite
        };
        try{
            await dispatch(signUp(newUser));
            history?.push('/');
        } catch (error) { alert(error.message); }
        
        setIsSubmitting(false); 
    }; 

    return (
        <SignInPageWrapper>
            <SignInBox>
                <Headline1 color={Colors.forthColor}> Sign Up </Headline1>
                <Form onSubmit={handleSubmit}>
                    <Box>
                        <Input 
                            type='email' 
                            placeholder='Email (xxx@xxx.xxx)' 
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
                        <Input 
                            type='text' 
                            placeholder='First name' 
                            name='userFirstName' 
                            onChange={handleChange} 
                            value={formState.userFirstName} 
                            required
                        />
                        <ErrorMessage>{errorState.userFirstName ?? ''}</ErrorMessage>
                        <Input 
                            type='text' 
                            placeholder='Last name' 
                            name='userLastName' 
                            onChange={handleChange} 
                            value={formState.userLastName} 
                            required
                        />
                        <ErrorMessage>{errorState.userLastName ?? ''}</ErrorMessage>
                        <Input 
                            type='tel' 
                            placeholder='Phone number (xxx-xxx-xxxx)' 
                            name='userPhoneNumber' 
                            onChange={handleChange} 
                            value={formState.userPhoneNumber} 
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            required
                        />
                        <ErrorMessage>{errorState.userPhoneNumber ?? ''}</ErrorMessage>
                    </Box>
                    <Box>                        
                        <Input 
                            type='text' 
                            placeholder='Store city location' 
                            name='city' 
                            onChange={handleChange} 
                            value={formState.city} 
                            required
                        />
                        <ErrorMessage>{errorState.city ?? ''}</ErrorMessage>
                        <Input 
                            type='text' 
                            placeholder='Store street name' 
                            name='street' 
                            onChange={handleChange} 
                            value={formState.street} 
                            required
                        />
                        <ErrorMessage>{errorState.street ?? ''}</ErrorMessage>
                        <Input 
                            type='number' 
                            placeholder='Store street number' 
                            name='houseNumber' 
                            onChange={handleChange} 
                            value={formState.houseNumber} 
                            required
                        />
                        <ErrorMessage>{errorState.houseNumber ?? ''}</ErrorMessage>
                        <Input 
                            type='text' 
                            placeholder='Business name' 
                            name='businessName' 
                            onChange={handleChange} 
                            value={formState.businessName} 
                            required
                        />
                        <ErrorMessage>{errorState.businessName ?? ''}</ErrorMessage>
                        <Input 
                            type='text' 
                            placeholder='Business website' 
                            name='businessWebsite' 
                            onChange={handleChange} 
                            value={formState.businessWebsite} 
                            required
                        />
                        <ErrorMessage>{errorState.businessWebsite ?? ''}</ErrorMessage>
                    </Box>
                    
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
                <Link style={{color:'white'}} to="/"> already have an account signIn </Link>
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

        case 'userPhoneNumber':
            {
                const expression = /\d{3}-\d{3}-\d{4}/;
                const regex = new RegExp(expression);
                if(!value.match(regex))
                    return {...previousState, userPhoneNumber: 'please insert a valid phone number'}
                else {
                    let newErrorState = {...previousState};
                    delete newErrorState.userPhoneNumber;
                    return newErrorState;
                }
            }

        case 'businessWebsite':
            {
                const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
                const regex = new RegExp(expression);
                if(!value.match(regex))
                    return {...previousState, businessWebsite: 'please insert a valid url'}
                else {
                    let newErrorState = {...previousState};
                    delete newErrorState.businessWebsite;
                    return newErrorState;
                }
            }
        
        case 'houseNumber':
            {
                if(isNaN(value))
                    return {...previousState, houseNumber: 'Must be a valid number'};
                else {
                    let newErrorState = {...previousState};
                    delete newErrorState.houseNumber;
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
    width: 35vw;
    height: 65vh;
    background-color: ${Colors.primaryColor};
    box-shadow: 0 10px 20px 10px ${Colors.forthColor}${Colors.opacity20};

    @media screen and (max-width: 800px) {
        width: 90vw;
        height: 70vh;
    }
`;

const ErrorMessage = Styled.label`
    color: red;
`;

const Form = Styled.form`
    display:flex;
    margin: 2rem;
    width: 90%;
    flex-wrap:wrap;
    justify-content: center;
`;

const Box = Styled(CenteredWithFlex)`
    flex-direction: column;
    justify-content: flex-start;
    width: 50%;
`;

const Input = Styled.input`
    color: ${Colors.thirdColor};
    width: 95%;
    padding: 0.5rem;
    margin: 1rem 0;
    font-family: inherit;
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 1px solid ${Colors.thirdColor};
`;

export default SingUpPage;