import React, { Component } from 'react';
import axios, { post } from 'axios';

class FileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {file: null};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onChange(e) {
   this.setState({file:e.target.files[0]})
 }

 fileUpload(file){
   const url = '/archivo';
   const formData = new FormData();
   formData.append('file',file)
   const config = {
       headers: {
           'content-type': 'multipart/form-data'
       }
   }
   return  post(url, formData,config)
}

  handleChange(event) {
   this.setState({file:event.target.files[0]});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.file);
    event.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Archivo:
          <input type="file" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default FileForm;
