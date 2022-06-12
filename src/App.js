import React from 'react';
class App extends React.Component {
  state = {
    isLoading: true,
    printers: [],
    error: null
  };
  sortChange(input) {
    let sortPrice = '', sortProducent = '', sortType = '';

    if (input.id == "Price") {
      sortPrice = input.value;
    }
    else if (input.id == "Producent") {
      sortProducent = input.value;
    }
    else if (input.id == "Type") {
      sortType = input.value;
    }//        url: 'http://localhost:3000/json/sortby=?Price=' + sortPrice + '&Producent=' + sortProducent + '&Type=' + sortType,

  }
  getFetchprinters() {
    this.setState({
      loading: true
    }, () => {
      fetch("http://localhost:3001/json").then(res => res.json()).then(result => this.setState({
        loading: false,
        printers: result
      })).catch(console.log);
    });
  }
  componentDidMount() {
    this.getFetchprinters();
  }
  render() {
    const {
      printers,
      error
    } = this.state;
    return (
      <React.Fragment>
        <h1>All Printers</h1>
        {
          error ? <p> {error.message} < /p> : null}  {
            printers.map(printer => {
              const {
                ID,
                Producent,
                Model,
                Type,
                Price,
                Image
              } = printer;
              return (
                <div id={ID} key={ID}>
                  <img alt={Model} src={Image} />
                  <p>Name: {Model}</p>
                  <p>Productent: {Producent}</p>
                  <p>Type: {Type}</p>
                  <p>Price: {Price}</p>
                  <hr />
                </div>
              );
            })
          }
          </React.Fragment> 
    );
  }
}
        export default App;