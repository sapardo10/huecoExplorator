import React, { Component } from 'react';



class List extends Component {

  state = {
    response: '',
  };

  componentDidMount() {
    this.callApi()
    .then(res => this.setState({ response: res.express }))
    .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/archivos');
    const body = await response.json();
    alert(body);
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return <h1>Hello, {this.state.response}</h1>;
  }
}
export default List;
