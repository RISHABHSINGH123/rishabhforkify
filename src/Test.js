import React,{Component} from 'react';

class Test extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <p>Welcome</p>
        <p>
          {
            this.props.name
          }
        </p>
        test component here

      </div>
    );
  }
}

export default Test