import React,{Component} from 'react';
class Footer extends Component{
constructor(){
    super()
    
}
render(){
    return(
        <div id="footer">
            <h3 id="footerTitle">Forkify</h3>
            <p></p>
            <p id="privacy">Privacy Policy</p>
            <button class="btn btn-link">Site map</button>
            <div id="iconImage">
                <img class="icon" src = {require('./images/facebook.png')}/>
                <img class="icon" src = {require('./images/twitter.png')}/>
                <img class="icon" src = {require('./images/linkedIn.png')}/>
            </div>
        </div>
    )
}

}
export default Footer;