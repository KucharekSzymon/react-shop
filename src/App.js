import React from 'react';
class App extends React.Component {
  state = {
    isLoading: true,
    users: [],
    error: null
  };
  getFetchUsers() {
    this.setState({
      loading: true
    }, () => {
      fetch("http://localhost:3001/json").then(res => res.json()).then(result => this.setState({
        loading: false,
        users: result
      })).catch(console.log);
    });
  }
  componentDidMount() {
    this.getFetchUsers();
  }
  render() {
    const {
      users,
      error
    } = this.state;
    return (
      <React.Fragment>
        <h1>All Printers</h1>
        {
          error ? <p>
            {
              error.message
            } < /p> : null}  {
              users.map(user => {
                const {
                  ID,
                  Producent,
                  Model,
                  Type,
                  Desc,
                  Price,
                  Image
                } = user;
                return (
                  <div id={ID} key={ID}>
                    <img src={Image}/>
                    <p>Name: {Model}</p>
                    <p>Productent: {Producent}</p>
                    <p>Type: {Type}</p>
                    <p>Price: {Price}</p>
                    <hr />
                  </div>
                );
              })
            } < /React.Fragment> );
          }
      }
            export default App;