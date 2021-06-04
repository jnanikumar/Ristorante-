import React,{Component}  from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './components/maincomponent'
import {BrowserRouter} from 'react-router-dom';
// function App()
// import {DISHES} from './shared/dishes'


// import {Provider} from 'react-redux';
import { Provider } from 'react-redux';
import {ConfigureStore} from './redux/configStore'

const store=ConfigureStore();
class App extends Component 
{
  
  
  render(){
    
    return (
    <Provider store={store}>
      <BrowserRouter>
      <div className='App'>
        <Main  />
      </div>
      </BrowserRouter>
    </Provider>
    
  );
}
}

export default App;
