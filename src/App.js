import './App.css';
import { Router, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import history from './utils/history';
import theme from './assets/styles/RootTheme';
import TransactionList from './containers/Transaction/TransactionList';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <MuiThemeProvider theme={theme}>
            <PrivateRoute path={"/"} component={TransactionList} />
          </MuiThemeProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
