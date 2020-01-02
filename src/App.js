import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      accountName: 'twjsanderson'
    };
  }
  
  componentDidMount() {
    fetch(`https://www.instagram.com/${this.state.accountName}/?__a=1`)
    .then(results => {
      return results.json();
    }).then(data => {
      let pictures = data.graphql.user.edge_owner_to_timeline_media.edges;
      this.setState({ pictures: pictures });
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h1>Instagram Test</h1>
        <hr />
        { 
          this.state.pictures.map(picture => {
            let pictureDetail = picture.node;
            return (
              <div style={{ marginBottom: '5em' }} key={pictureDetail.id}>
                <div className='center'>
                  <img
                    src={ pictureDetail.thumbnail_src } 
                    alt={ pictureDetail.accessibility_caption }
                  />
                </div>
                <p style={{ marginRight: 'auto', marginLeft: 'auto',  width: 600 }}>
                  { pictureDetail.edge_media_to_caption.edges[0].node.text }
                </p>
                <hr style={{ marginRight: 'auto', marginLeft: 'auto',  width: 600 }} />
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default App;


