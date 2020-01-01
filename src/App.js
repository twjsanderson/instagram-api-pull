import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      accountName: 'Tom'
    };
  }
  componentDidMount() {
    fetch('https://www.instagram.com/naughtyflorals/?__a=1')
    .then(results => {
      return results.json();
    }).then(data => {
      let pictures = data.graphql.user.edge_owner_to_timeline_media.edges.map(result => {
        let resultDetail = result.node;
        return (
          <div key={resultDetail.id}>
            <img
              src={resultDetail.thumbnail_src} 
              alt={resultDetail.accessibility_caption}
            />
          </div>
        )
      })
      this.setState({ pictures: pictures });
    })
  }

  render() {
    return (
      <div>
        <h1>Instagram Test</h1>
        
          { this.state.pictures }
      </div>
    );
  }
}

export default App;
