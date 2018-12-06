import React, {Component} from 'react';

/*
This component is designed to render a loading screen until the data has been fetched from the server - it will do this via the componentDidMount functionality - once the data is present it will have component state of the data from the api. 
*/
export class GHFetch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false,
      fetched: false,
    }
  }


  // When the component mounts calls server @ port 4000 will only call once to fill images array. 
  componentDidMount() {
    if(this.state.fetched === false) {
    fetch('http://localhost:4000/').then(response => {
      if(!response.ok) {
        throw new Error('Api call failed to fetch');
      }
      console.log(response);
      return response;
    }).then(data => data.json())
    .then(data => {
      this.setState({
        ghResponse: [...data],
        fetched: true,
      })
    }, () => {
        this.setState({
          requestFailed: true,
        })
      })
    }
  }

  render() {
    // Displays error handle message or loading message depending on state of api retrieval
    if(this.state.requestFailed) return <p>Failed Request</p>
    if(!this.state.ghResponse) return <p>Loading API data </p>

    let imageArr = [];

    this.state.ghResponse.forEach((item,index) => {
      if(!imageArr.includes(item.avatarurl)) {
      imageArr.push(<ImageItem imageUrl={item.avatarurl} key={index} />)
      }
    })

    return (
      <div className="imageblock">
        {imageArr}
      </div>
    )
  }
}

// Image component could to display individual images also needs hover functionality implemented. 
class ImageItem extends React.Component {
  render() {

    // Hover functionality 
    // onMouseEnter() {
      // make a fetch call based on whether the username of the image is an 'A' or 'a'
      // display first 5 followers as a modal list
      // disallow other mouse enter events until the close of this modal
    // }

    // onMouseExit() {
      // remove modal from view
      // re-allow mouse enter events for other images
    // }

    return (
      <div>
        <img src={this.props.imageUrl} alt="avatars" 
        // onMouseEnter={this.displayFollowers}
        // onMouseLeave={this.hideFollowers}
        />
      </div>
    )
  }
}