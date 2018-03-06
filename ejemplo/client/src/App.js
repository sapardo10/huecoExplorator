import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NameForm from './register.js';
import FileForm from './upload.js';
import List from './show-files.js';

class App extends Component {
  state = {
    response: '',
  };

  componentDidMount() {
    this.callApi()
    .then(res => this.setState({ response: res.express }))
    .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };



  render() {
    return (
      <div className="App">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="h3 mb-3 font-weight-normal">Bienvenido a huecoExplorator</h1>

          </header>
            <br/>  <br/>  <br/>
          <div className="container">
          <NameForm/>
          <br/>
          <FileForm/>
          <br/>
          <List/>
          <p className="App-intro">
            {this.state.response}
          </p>
        </div>
      </div>
    );
  }
}



export default App;
