import React, { Component } from 'react';
import './App.css';
import Spinner from './Spinner'
import Images from './Images'
import Buttons from './Buttons'

const axios = require('axios');
// const cors = require('cors')


class App extends Component {

    constructor(props) {
      super(props)
      this.state = {
        uploading: false,
        images: []
      }
    }


    onChange = e => {
      const files = Array.from(e.target.files)
      this.setState({ uploading: true })
  
      const formData = new FormData()
  
      files.forEach((file, i) => {
        console.log(file.height)
        formData.append(i, file)  // will be only one
      })
      formData.append('image_height', 28)
      formData.append('image_width', 28)
  
      // axios.post(
      //       'http://35.184.58.142:5000/results', 
      //       {
      //         image: formData,
      //         image_shape: 28
      //       },
      //       {
      //         headers: {'Content-Type': 'application/json'}
      //       }
      //     )
  
      fetch(`http://35.184.58.142:5000/results`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(images => {
        this.setState({ 
          uploading: false,
          images: ['http://35.184.58.142:5000/' + images['input_image'], 'http://35.184.58.142:5000/' + images['styled_image']]
        })
      })
    }
  

    // componentWillMount() {
    //   this.getData()
    // }

    // getData() {
    //   axios.post(
    //     'http://35.184.58.142:5000/results', 
    //     {
    //       image: 'data',
    //       image_shape: 28
    //     },
    //     {
    //       headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
    //     }
    //   )
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // }

    render() {
      const content = () => {
        switch(true) {
          case this.state.uploading:
            return <Spinner />
          case this.state.images.length > 0:
            return <Images images={this.state.images} removeImage={this.removeImage} />
          default:
            return <Buttons onChange={this.onChange} />
        }
      }
  
      return (
        <div>
          <div className='buttons'>
            {content()}
          </div>
        </div>
      )
    }
  
}

// App.use(cors());

export default App;
