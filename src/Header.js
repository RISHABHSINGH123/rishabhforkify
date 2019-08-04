import React,{Component} from 'react';
import Axios from 'axios';
var Push = require('push.js');



class Header extends Component{
  constructor(props){
    super(props)

    this.menuLogin = ()=>{
      alert("asfsad")
    }


this.verifyToken = ()=>{








  if(localStorage.getItem('token')!=undefined){


    Axios.post('http://localhost:8080/http://localhost:5000/verifyToken',{'token':localStorage.getItem('token')})
.then((result)=>{
console.log(result)
if(result.data.status=='valid'){


if(window.outerWidth<450){

  document.getElementById('loginPhoneButton').insertAdjacentHTML('afterend',`
  <button class="btn btn-primary" id="new" style="color:white">welcome, ${localStorage.getItem('userName')}
  `)
document.getElementById('loginPhoneButton').style.display="none";





}
else{
  
  document.getElementById('login').insertAdjacentHTML('afterend',`
  <button class="btn btn-primary" style="color:white" id="userButton">Welcome ${localStorage.getItem('userName')}</button>
  `)
document.getElementById('login').style.display="none";





}


}
else{

localStorage.removeItem('token')
localStorage.removeItem('userName');
alert('your session has expired')

// window.location.reload();

}

})
.catch()



  }









}

  }
  
  render(){
    


    Push.create("forkify",{body:'Welcome to forkify',timeout:4000,icon:require('./images/heart.png')});





        return(



      <div id="header">
        <img id="menu" src = {require('./images/menu.png')}/>
        <p id="headertitle">forkify {/*this.props.test2*/}</p>
        <input type="text" id="searchbar" placeholder="Search here"/>
        <button className="btn btn-primary" type="button" id="searchButton">Search</button>
        
        <button  className="btn btn-success" type="button" id="login">Login</button>
        <img id="heart" src = {require('./images/heart.png')}/>
        <img id="heart2" src = {require('./images/heart.png')}/>
      </div>


        );
  


}

componentDidMount(){

  this.verifyToken();
}


}

export default Header;