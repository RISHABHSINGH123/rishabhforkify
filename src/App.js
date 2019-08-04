import React,{Component} from 'react';
import './App.css';
import Test from './Test';
import Header from './Header';
import Recipes from './Recipes';
import Show from './Show';
import Favlist from './Favlist';
import Footer from './Footer';

class App extends Component {
constructor(props){
  super(props)
  this.test="issac";
  this.myFun = ()=>{
    return "issac";
  }
}  
  render() {
    return (
      <div id="appcontainer">
        <Header test={this.myFun} test2={this.test}/>
        <div id="middle">
          <Recipes/>
          <Show />
          <Favlist/>
        </div>
        <Footer/> 
      </div>
    );
  }
}

export default App;
