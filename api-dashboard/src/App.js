
import { AppWrapper } from './App.style';
import DashboardLayout from './layouts/dashboard.layout';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import FlowersReducer from './redux/reducers/flowers.reducer';
import UsersReducer from './redux/reducers/users.reducer';
import FlowerBouquetsReducer from './redux/reducers/flowerBouquets.reducer';

// Store 
const rootReducer = combineReducers({FlowersReducer, UsersReducer, FlowerBouquetsReducer});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {

  return (
    <Provider store={store}>
      <AppWrapper>
        <DashboardLayout />
      </AppWrapper>
    </Provider>
  );
}

export default App;
