
import { AppWrapper } from './App.style';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import DashboardLayout from './layouts/dashboard.layout';
import SignIn from './pages/signPages/signIn.page';
import SignUp from './pages/signPages/signUp.page';
import ReduxThunk from 'redux-thunk';
import FlowersReducer from './redux/reducers/flowers.reducer';
import UsersReducer from './redux/reducers/users.reducer';
import FlowerBouquetsReducer from './redux/reducers/flowerBouquets.reducer';
import ProvidersReducer from './redux/reducers/providers.reducer';
import OrdersReducer from './redux/reducers/orders.reducer';

// Store 
const rootReducer = combineReducers({FlowersReducer, UsersReducer, FlowerBouquetsReducer, ProvidersReducer, OrdersReducer});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function AppRoutes() {
  return (
    <Switch>
      <Route path='/' exact>
        <SignIn />
      </Route>
      <Route path='/sign-up' exact>
        <SignUp />
      </Route>
      <Route path='/dashboard' exact>
        <DashboardLayout />
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
