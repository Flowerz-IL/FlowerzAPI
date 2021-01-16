
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

export const AdminRoute = ({children, ...rest}) => {
    const currentUserRole = useSelector(({AuthReducer}) => AuthReducer.userRole);

    if(currentUserRole !== 'ADMIN') return <Redirect to='/'/>

    return (
        <Route {...rest}>
            {children}
        </Route>
    );
};

export const ProviderRoute = ({children, ...rest}) => {
    const currentUserRole = useSelector(({AuthReducer}) => AuthReducer.userRole);

    if(currentUserRole !== 'ADMIN' && currentUserRole !== 'PROVIDER') return <Redirect to='/'/>

    return (
        <Route {...rest}>
            {children}
        </Route>
    );
};