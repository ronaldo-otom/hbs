import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import EmployeeListComponent from './components/employees/employeeList/employeeListComponent';
import NavigationDrawer from './components/design/navigation';

function App() {
  return (
    <Router>
      <Switch>
        <NavigationDrawer />
        <Route exact path="/" component={EmployeeListComponent} />
      </Switch>
    </Router>
  );
}

export default App;
