
import { AppWrapper } from './App.style';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Provider, useSelector} from 'react-redux';
import DashboardLayout from './layouts/dashboard.layout';
import SignIn from './pages/signPages/signIn.page';
import SignUp from './pages/signPages/signUp.page';
import ReduxThunk from 'redux-thunk';
import FlowersReducer from './redux/reducers/flowers.reducer';
import UsersReducer from './redux/reducers/users.reducer';
import FlowerBouquetsReducer from './redux/reducers/flowerBouquets.reducer';
import ProvidersReducer from './redux/reducers/providers.reducer';
import OrdersReducer from './redux/reducers/orders.reducer';
import AuthReducer from './redux/reducers/auth.reducer';

// Store 
const rootReducer = combineReducers({AuthReducer, FlowersReducer, UsersReducer, FlowerBouquetsReducer,
  ProvidersReducer, OrdersReducer});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function AppRoutes() {
  const currentUserRole = useSelector(({AuthReducer}) => AuthReducer.userRole);

  return (
    <Switch>
      <Route path='/' exact>
        {!currentUserRole ? <SignIn /> : <DashboardLayout />}
      </Route>
      <Route path='/sign-up' exact>
        {!currentUserRole ? <SignUp /> : <DashboardLayout />}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Router>
          <AppRoutes />
        </Router>
      </AppWrapper>
    </Provider>
  );
}

export default App;
