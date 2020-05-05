import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],

  //here we set the showGraph property to boolean and we make sure the property showGraph is required whenever the object of class IState is passed

  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],

      //here we set the initial state of the App to not show the graph 
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */


   //this ensures that the graph renders when renderGraph() method is called and showGraph is true
  renderGraph() {
    if(this.state.showGraph){
      return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    let x = 0;
    // define a fixed time delay using setInterval method
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        // Update the state by creating a new array of data that consists of previous data in the state and the new data from server

        // Update the state using setState to create a pending state transition instead of mutating this.state directly
        this.setState({

        // Here we are Creating a new array of data that consists of previous data in the state and the new data from server
        data: serverResponds,

        //Updating the showGraph state so as to render the graph
        showGraph: true,
        });
      });
    x++;
    if(x>1000){
    // cancelling the previously established repeating action set be setInterval call
    clearInterval(interval);
    }
   }, 100); 
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.

            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
