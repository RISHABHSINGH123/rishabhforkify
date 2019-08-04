import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import Test from './Test.js';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';
import Signup from "./Signup";
import Login from "./Login";
import Favlist from './Favlist';

ReactDOM.render(<App />, document.getElementById('root'));
  // ReactDOM.render(<Signup />, document.getElementById('testing'));
  var i=0;
  var j=0;
  var k=0;
  document.addEventListener("click",(e)=>{
    //alert(e.target.textContent);
  if(e.target.id == "login"){
    document.getElementById('transparentBack').style.display="block";
    document.getElementById('form').style.display="block";
    ReactDOM.render(<Login/>,document.getElementById('form'));
  }
  else if(e.target.id == "aSignUp"){
    document.getElementById("signupDiv").style.display="none";
    // ReactDOM.unmountComponentAtNode(document.getElementById("form"));
    ReactDOM.render(<Login/>,document.getElementById('form'));
  }
  else if(e.target.id == "nSignUp"){
    document.getElementById("loginDiv").style.display="none";
    ReactDOM.render(<Signup/>,document.getElementById('form'));
  }
  else if(e.target.id=="heart")
  {
    // ReactDOM.unmountComponentAtNode(document.getElementById('testing'));
    if(i==0){
      document.getElementById('middle').style.gridTemplateColumns = "30% 40% 30%";
      document.getElementById('shopping').style.display = "block";
      i++;
    }
    else if(i==1){
      document.getElementById('middle').style.gridTemplateColumns = "30% 70%";
      document.getElementById('shopping').style.display = "none";
      i--;
    }
  }
  else if(e.target.id == "ulogin"){
    var uname = document.getElementById("uname").value;
    var upass = document.getElementById("upass").value;
    
    axios.post('http://localhost:8080/http://localhost:5000/login',({'userName':uname,'userPass':upass}))
    .then((result)=>{
      

      if(result.data.token=='invalid'){
        alert("you have to signup first");
      }
      else{
        localStorage.setItem('token',result.data.token);
        localStorage.setItem('userName',uname)
        window.location.reload();
      }
      
      
    })
    .catch()
  }
  else if(e.target.id == "signUpButton"){

    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var uname = document.getElementById("uname").value;
    var upass = document.getElementById("upass").value;
    var uCpass = document.getElementById("uCpass").value;


    if(fname=="" || lname=="" || uname=="" || upass=="" || uCpass==""){
      alert("fields cannot be empty");
      window.location.reload();
    }


                
    else if(uname.length < 6){
      alert("Username should be of atleast 6 characters");
    }

    
    
    else if(upass.length < 6){
        alert("Password should be of atleast 6 characters");
    }
    
    else if(uCpass != upass){
        alert("Password does not match");
    }             
               
    
    else{

      axios.post('http://localhost:8080/http://localhost:5000/signup',({'firstName':fname,'lastName':lname,
      'userName':uname,'userPass':upass,'userConfirmPass':uCpass}))
      .then((result)=>{
        console.log(result)
        if(result.data.status == 'already'){
          alert('This username already exists');
          window.location.reload();
        }
        else if(result.data.status == "loginNow"){
          alert("Signup succesfull. \n Now login using your credentials");
          window.location.reload();
        }
        
        
        
      })
      .catch()





    // axios.post('http://localhost:8080/http://localhost:5000/login',({'userName':uname,'userPass':upass}))
    // .then((result)=>{
      

    //   if(result.data.token=='invalid'){
    //     alert("you are not authentic");
    //   }
    //   else{
    //     localStorage.setItem('token',result.data.token);
    //     localStorage.setItem('userName',uname)
    //     window.location.reload();
    //   }
      
      
    // })
    // .catch()
    }

    // var fname = document.getElementById("fname").value;
    // var lname = document.getElementById("lname").value;
    // var uname = document.getElementById("uname").value;
    // var upass = document.getElementById("upass").value;
    // var uCpass = document.getElementById("uCpass").value;

    // axios.post('http://localhost:8080/http://localhost:5000/signup',({'firstName':fname,'lastName':lname,
    // 'userName':uname,'userPass':upass,'userConfirmPass':uCpass}))
    // .then((result)=>{
      
    //   if(result.data.status == 'success'){
    //     alert('Sign up Successful');
    //   }
      
      
      
    // })
    // .catch()

  }


  else if(e.target.className == "items"){
    document.getElementById("favButtonDiv").style.display="block";
  }
  else if(e.target.id == "userButton"){
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.reload();
  }
  // else if(e.target.id == "favButton"){
  //   document.getElementById("favButton").style.backgroundColor = "green";
  // }









  // Phone Javascript //

  else if(e.target.id=="menu")
  {
    // ReactDOM.unmountComponentAtNode(document.getElementById('testing'));
    if(j==0){
      document.getElementById('menuBar').style.display = "grid";
      j++;
    }
    else if(j==1){
      document.getElementById('menuBar').style.display = "none";
      j--;
    }
  }
  else if(e.target.id=="loginPhoneButton"){
    document.getElementById('menuBar').style.display = "none";
    j--;
    document.getElementById('form').style.display = "block";
    ReactDOM.render(<Login/>,document.getElementById('form'));
  }
  else if(e.target.id=="recipeDisplay")
  {
    document.getElementById("listcontainer").style.display = "block";
    document.getElementById("recipeimg").style.display = "block";
    document.getElementById("middle").style.gridTemplateColumns = "100% 0%";
    document.getElementById('menuBar').style.display = "none";
  }
  else if(e.target.id=="listCloseButton")
  {
    document.getElementById("listcontainer").style.display = "none";
    document.getElementById("show").style.display = "block";
  }
  else if(e.target.id == "heart2")
  {
    if(j==0){
      document.getElementById("form").style.display = "block";
      ReactDOM.render(<Favlist/>,document.getElementById('form'));
      document.getElementById("shopping").style.display = "block";
      document.getElementById("shopping").style.height = "65vh";
      j++;
    }
    else if(j==1){
      document.getElementById("form").style.display = "none";
      j--;
    }
    // document.getElementById("form").style.display = "block";
    // ReactDOM.render(<Favlist/>,document.getElementById('form'));
    // document.getElementById("shopping").style.display = "block";
    // document.getElementById("shopping").style.height = "100vh";
  }
  else if(e.target.className=='recipesIdentity' && window.outerWidth<450)
  {
    document.getElementById("listcontainer").style.display = "none";
    document.getElementById("show").style.display = "block";
    //document.getElementById("listcontainer").style.display = "block";
  }
  else if(e.target.id=='midCloseButton')
  {
    document.getElementById("listcontainer").style.display = "block";
    document.getElementById("show").style.display = "none";
    //document.getElementById("listcontainer").style.display = "block";
  }
  else if(e.target.id == "slider")
  {

  }
else if(e.target.id=="new"){
  alert("asfasdfs")
}



  // else if(e.target.id == "heart2")
  // {
  //   //document.getElementById('menuBar').style.display = "none";
  //   if(k==0){
  //     document.getElementById("recipeimg").style.display = "none";
  //     document.getElementById("middle").style.gridTemplateColumns = "0% 0% 100%";
  //     k++;
  //   }
  //   else if(k==1){
  //     document.getElementById("middle").style.gridTemplateColumns = "25% 75% 0%";
  //     k--;
  //   }














  // else if(e.target.id=="transparentBack"){
  //   document.getElementById('transparentBack').style.display="none";
  //   document.getElementById('form').style.display="none";

  // }
  


})


// axios.post("https://www.food2fork.com/api/search?key=67fb154cd019bdf06d79c65dd6217b27")
// .then((res)=>{
//   console.log(res)
// for(var i=0;;i++){
//   if(res.data.recipes[i].title==undefined){
//     break;
//   }
//   document.getElementById('check').insertAdjacentHTML('beforeend',`
// <p>Recipe name =${JSON.stringify( res.data.recipes[i].title)}</p>
//
//   `)
// }
// })
// .catch(()=>{
// alert("error occured")
// })
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
