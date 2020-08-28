import React from 'react';
import './App.css';
import FadeInSection from './FadeSection';
import {ReactComponent as Logo} from './assets/restaurant-logo.svg'

class App extends React.Component{


  constructor(props) {
    super(props)

    this.state = {
      isLoaded: false
    }

  }

componentDidMount() {

  fetch("http://localhost:3001/foods").then(res => res.json())
  .then( (result) => {
         console.log(result)
         this.setState({
            foodList: result,
            isLoaded: true
         })
        }
         );
  
}



  render = () => {

    return (
      <div className="App">
        <header className="App-header"><Logo></Logo></header>
          <div className='vote-header'>Vote for your favorite food!</div>
          <div className='vote-sub'>Click on the below foods to add a vote.</div>
          <div className='flex-center'>
          {this.state.isLoaded && this.state.foodList && 

           this.state.foodList.map( (element) => 
              <FadeInSection id={element.id}>
              <div className='name' key={element.name}>{element.name}</div>
              <div className='price' key={element.price}>{`$${element.price}`}</div>
              <div className='food-picture'>
              <img src={`${element.picture}`} alt={element.name}></img>
              </div></FadeInSection>
           )

          }
        </div>
      </div>
    );

  }

}

export default App;
