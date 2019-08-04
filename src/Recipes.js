import React,{Component} from 'react';
import axios from 'axios';
class Recipe extends Component
{
  constructor()
  {
    super()
    this.prev=()=>{

      if(this.state.j>1)
      {
        this.setState({j:this.state.j-10})
        this.populate();
      }
    }
    this.next=()=>{


      if(this.val-this.state.j>=1)
      {
        this.setState({j:this.state.j+10})
        this.populate()
      }
    }
    this.state={
      j:1

    }
  
    this.val=0;
    this.populate=()=>
    {
      document.getElementById('itemlist').innerHTML="";
      document.getElementById('itemlist').innerHTML = `<img src="${require('./images/loading.gif')}"/>`

      if(localStorage.getItem('content')==undefined){
        axios.post("https://www.food2fork.com/api/search?key=ac278a3b0071bdc1960e7c7ed8e95a2a")
        .then((result)=>{

          console.log(result);

          localStorage.setItem('content',JSON.stringify(result));
          this.val = JSON.stringify(Object.keys(result.data.recipes).length);


          if(result.data.recipes[this.state.j-1]!=undefined){
          document.getElementById('itemlist').innerHTML="";

          }
          else {
            return ; // Gets out of function
          }
  
          for(var i=this.state.j-1;i<this.state.j+9;i++)
          {
            if(result.data.recipes[i]==undefined)
              break;
            else{
              document.getElementById("itemlist").insertAdjacentHTML("beforeend",`
              <li class="items">
                <img id="recipeimg" src="${result.data.recipes[i].image_url}"/>
                <p>${result.data.recipes[i].title}</p>
              </li>

              `);
            }
          }
          document.getElementById("itemlist").insertAdjacentHTML('beforeend',`
            <div id="nav">
              <p id="prev"> <<< prev</p>
              <p id="next">next >>> </p>
            </div>
    `     )

        })

        .catch((error)=>{
          alert("something has went wrong");
        })
      }
      else{
        var result = JSON.parse( localStorage.getItem('content'));
        this.val = JSON.stringify(Object.keys(result.data.recipes).length);


        if(result.data.recipes[this.state.j-1]!=undefined){
          document.getElementById('itemlist').innerHTML="";
  

        }
        else {
          return ;
        }

        for(var i=this.state.j-1;i<this.state.j+9;i++)
        {
          if(result.data.recipes[i]==undefined)
          break;
          else{
              
            document.getElementById("itemlist").insertAdjacentHTML("beforeend",`
          <li class="items">
            <img id="recipeimg" src="${result.data.recipes[i].image_url}"/>
            <p class="recipesIdentity">${result.data.recipes[i].title}</p>
          </li>

            `);
          }
        }
        document.getElementById("itemlist").insertAdjacentHTML('beforeend',`
          <div id="nav">
          <button id="prev" class="btn btn-primary">Prev</button>
          <button id="next" class="btn btn-primary">Next</button>
          </div>
        `)


      }
    }

    

    document.addEventListener("click",(e)=>{
      if(e.target.id=="next")
      {
        this.next();

      }
      else if (e.target.id=="prev")
      {
        this.prev();
      }

    })

  }
  componentDidMount(){
    this.populate();
  }
  render(){

    return(
      <div id="listcontainer">
        <div id="listCloseDiv">
          <button type="submit" class="btn btn-light" id="listCloseButton">X</button>
        </div>
        <p></p>
      <ul id="itemlist">





      </ul>


      </div>
    );
  }

}

export default Recipe;