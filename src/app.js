import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <DocumentTitle title="Sample app">
        <div>
          { this.props.children }
        </div>
      </DocumentTitle>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App;