import React, {Component} from 'react';
import Indicadores from './Indicadores';
import Navagacion from './Navagacion';

class App extends Component{
    
    render(){
        return(
            <div>
                <Navagacion/>
                <Indicadores/>
            </div>
        )
    }
}

export default App;