
import uniqid from 'uniqid';
import {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import io from 'socket.io-client';
import * as MessengerStyle from './Messenger.style';
import {Headline1, Button} from '../../utils/constants/globalStyle.constant';
import Colors from '../../utils/constants/colors.constant';

const socket = io('http://localhost:8080/',{transports: ['websocket']});

function Messenger() {
    const {currentUserId, userName} = useSelector(({AuthReducer}) => AuthReducer);
    const [unOpenMessages, setUnOpenMessages] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const toggleMessenger = () => { setIsOpen(prev => !prev); };

    const handleNewMessage = newMessage => {
        setMessages(prev => [newMessage, ...prev]);
        setUnOpenMessages(prev => ++prev);
    };

    useEffect(() => {
        socket.on('chatMessage', handleNewMessage);

        return () => {
            socket.close();
        }
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        const toEmit = {sender: currentUserId, senderName:userName, message: newMessage}
        socket.emit('chatMessage', toEmit);
        setNewMessage('');
        setUnOpenMessages(prev => --prev);
    };

    return (
        <MessengerStyle.MessengerWrapper onClick={() => {setUnOpenMessages(0);}}>
            <MessengerStyle.MessengerHeader onClick={toggleMessenger}>
                <Headline1 color={Colors.thirdColor}>
                    Messenger {unOpenMessages >= 1 && <MessengerStyle.Notification>{unOpenMessages}</MessengerStyle.Notification>}
                </Headline1>
            </MessengerStyle.MessengerHeader>
            <MessengerStyle.MessengerBody toDisplay={isOpen}>
                <MessengerStyle.MessengerChat>
                    {messages.map( message => (
                        message.sender === currentUserId ?
                            <MessengerStyle.ThisMessages key={uniqid()}>
                                <p>{message.message}</p>
                                <p style={{color:'white', fontWeight:'bold', marginTop: '1rem'}}>{userName}</p>
                            </MessengerStyle.ThisMessages> :
                            <MessengerStyle.OtherMessages key={uniqid()}>
                                <p>{message.message}</p>
                                <p style={{color:'white', fontWeight:'bold', marginTop: '1rem'}}>{message.senderName}</p>
                            </MessengerStyle.OtherMessages>
                    ))}
                </MessengerStyle.MessengerChat>
                <MessengerStyle.MessengerInputWrapper onSubmit={handleSubmit} toDisplay={isOpen}>
                    <MessengerStyle.MessengerInput 
                        placeholder='Write Your Message'
                        onChange={({target}) => {setNewMessage(target.value);}}
                        value={newMessage}
                        required
                    />
                    <Button backgroundColor={Colors.thirdColor} textColor={Colors.primaryColor}> Send </Button>
                </MessengerStyle.MessengerInputWrapper>
            </MessengerStyle.MessengerBody>
        </MessengerStyle.MessengerWrapper>
    );
}

export default Messenger; 