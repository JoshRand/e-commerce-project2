import { render } from "@testing-library/react";
import React from "react";
const testExpression = <h1> WASSUP JEEVES! </h1>;
const name = 'markie';
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jeeves1: 'marko ',
      jeeves2: 'Mr ANDERSON',
      name1: props.jeeves1,
      name2: props.jeeves2,
      condition: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange()
  {
    this.setState({
       condition:!this.state.condition,
    });
  }
  render() {
    if(this.state.condition)
    {
        this.state.jeeves1=this.state.name1;
        this.state.jeeves2=this.state.name2; 
    }
    else
    {
        this.state.jeeves1='marko ';
        this.state.jeeves2='Mr ANDERSON'; 
    }

    return (
        <div>
            <br></br>
            <a></a>{this.state.jeeves1}
            <br></br>
            {this.state.jeeves2}
            {testExpression}  
            <button style={{width:'50%',height:'50%'}} onClick={()=>this.handleChange()}>HI</button>
        </div>
        
        
        );
  }
}
export default Test;
