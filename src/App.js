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
      let pictures = data.graphql.user.edge_owner_to_timeline_media.edges;
      this.setState({ pictures: pictures });
    }).catch(error => {
      console.log(error)
    });
  }

  render() {
    return (
      <div>
        <h1>Instagram Test</h1>
        { 
          this.state.pictures.map(picture => {
            let pictureDetail = picture.node;
            return <div key={pictureDetail.id}>
              <img
                src={pictureDetail.thumbnail_src} 
                alt={pictureDetail.accessibility_caption}
              />
            </div>
          })
        }
      </div>
    );
  }
}

export default App;
