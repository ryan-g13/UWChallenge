import React, {Component} from 'react';

/*
This component is designed to render a loading screen until the data has been fetched from the server - it will do this via the componentDidMount functionality - once the data is present it will have component state of the data from the api. 
*/
export class GHFetch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false,
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000/').then(response => {
      if(!response.ok) {
        throw new Error('Api call failed to fetch');
      }
      console.log(response);
      return response;
    }).then(data => data.json())
    .then(data => {
      // console.log(data);
      this.setState({
        ghResponse: [...data],
      })
    }, () => {
        this.setState({
          requestFailed: true,
        })
    })
  }

  render() {
    if(this.state.requestFailed) return <p>Failed Request</p>
    if(!this.state.ghResponse) return <p>Loading API data </p>

    return(
      <div>
        <p>Loading</p>
      <img alt="avatar" src={this.state.ghResponse[0].avatarurl}/>
      <p>{this.state.ghResponse[0].username}</p>
      </div>
    )
  }
}