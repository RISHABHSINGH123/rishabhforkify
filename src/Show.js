import React,{Component} from 'react';
import axios from 'axios';
import { bigIntLiteral } from '@babel/types';

class Show extends Component{
  
  constructor(props){
    super(props)
    this.state={
        value:"name",
        getimg:false
    }

    this.fav=()=>{
      document.getElementById("list").innerHTML = "";
      var name = document.getElementById("recipeTitle").textContent;
      document.getElementById("listItem").insertAdjacentHTML('beforeend',
          ` <li class="alert alert-warning alert-dismissable">
              <button type="button" class="close" data-dismiss="alert">×</button>
              ${name}
            </li>
          `)
    }

    

    

    //this.showImage=()=>{
      // if(localStorage.getItem('content'!=undefined)){


      // }

      //   axios.post("https://www.food2fork.com/api/search?key=ac278a3b0071bdc1960e7c7ed8e95a2a")
      //   .then((res)=>{
           
      //       document.addEventListener("click",(e)=>{
      //         console.log(res)
      //             this.setState({value:e.target.textContent})
      //         if(this.state.getimg ){
      //             document.getElementById("first").innerHTML=""
      //         }
      //         for(var i=0;;i++){
      //             if(res.data.recipes[i]==undefined){
      //                 break;
      //             }
      //             else if(res.data.recipes[i].title==this.state.value){
      //               document.getElementById("first").insertAdjacentHTML("beforeend",`
                    
      //               <img id="recipeImg" src="${res.data.recipes[i].image_url}"/>`)
      //               this.setState({getimg:true})
                      
                            
      //             }
      //         }
      //       })

      //   })
      //   .catch((error)=>{
      //       alert("Something Went Wrong");
      //   })
            
    
    //}

    document.addEventListener('click',(e)=>{

      if(e.target.className=='recipesIdentity'){
        document.getElementById("welcome").style.display = "none";
        document.getElementById('first').innerHTML="";
        var recipeName = e.target.textContent;
        document.getElementById('recipeTitle').textContent = recipeName;
        document.getElementById("favButtonDiv").style.display="block";
        var contentJSON = JSON.parse(localStorage.getItem('content'));
        console.log(contentJSON.data.recipes[0].title)
        for(var i=0;;i++){
          if(contentJSON.data.recipes[i].title==recipeName){
            document.getElementById("first").insertAdjacentHTML("beforeend",`
                    
                       <img id="recipeImg" src="${contentJSON.data.recipes[i].image_url}"/>`);           
            
                       break;
          }
        }



        axios.post('http://localhost:8080/http://localhost:5000/sendData',{'recipeName':recipeName})
        .then((result)=>{
          
          document.getElementById('ing').innerHTML="";
          document.getElementById('prep').innerHTML="";
            document.getElementById('ing').insertAdjacentHTML('beforeend',`
            <h3>Ingredients :</h3>
            ${result.data.ingredients}
            `)

            document.getElementById('prep').insertAdjacentHTML('beforeend',`
            <h3>Recipe :</h3>
            ${result.data.preparation}
            `)
            
        })
        .catch()
      }
    })


}
// componentDidMount(){
//   this.showImage();
// }
  render(){
    return(
      <div id="show">
        <div id="midCloseDiv">
          <button type="submit" class="btn btn-light" id="midCloseButton">X</button>
        </div>
        <h1></h1>
        <h1 id='recipeTitle'></h1>
        <div id="first">
        </div>
        <div id="menuBar">
          <input type="text" id="search" className="menuItem" placeholder="Search here"/>
          <button id="loginPhoneButton" className="menuItem">Login </button>
          <button id="recipeDisplay" className="menuItem">Recipes</button>
        </div>
        <div id="welcome">
          <p></p>
          <h1>Welcome to forkify</h1>
          <button class="btn btn-danger" id="find">Find Recipes</button>
          <p></p>
        </div>
        <div id="second">
          <p id="ing"></p>
          <p id="prep"></p>
        </div>
        <div id="favButtonDiv">
          <button class="btn btn-primary" id="favButton" onClick={this.fav}>Add to Favourites</button>
        </div>
      </div>
    )
  }
}
export default Show;