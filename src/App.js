import { func } from 'prop-types';
import React from 'react';
class App extends React.Component {
  state = {
    isLoading: true,
    printers: [],
    error: null
  };
  sortChange() {
    let sortPrice = '', sortProducent = '', sortType = '';
    console.log('sort');
    // if (input.id == "Price") {
    //   sortPrice = input.value;
    // }
    // else if (input.id == "Producent") {
    //   sortProducent = input.value;
    // }
    // else if (input.id == "Type") {
    //   sortType = input.value;
    // }//        url: 'http://localhost:3000/json/sortby=?Price=' + sortPrice + '&Producent=' + sortProducent + '&Type=' + sortType,

    // this.setState({
    //   loading: true
    // }, () => {
    //   fetch('http://localhost:3000/json/sortby=?Price=' + sortPrice + '&Producent=' + sortProducent + '&Type=' + sortType).then(res => res.json()).then(result => this.setState({
    //     loading: false,
    //     printers: result
    //   })).catch(console.log);
    // });
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
  // getFetchproducents() {
  //   this.setState({
  //     loading: true
  //   }, () => {
  //     fetch("http://localhost:3001/json/producents").then(res => res.json()).then(result => this.setState({
  //       loading: false,
  //       producents: result
  //     })).catch(console.log);
  //   });
  // }

  componentDidMount() {
    this.getFetchprinters();
  }
  render() {
    const {
      printers,
      producents,
      types,
      error
    } = this.state;
    return (
      <React.Fragment>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" />
        <h1>All Printers</h1>
        <div className="row row-cols-5">
          <div>
            <h1>Sort by:</h1>
          </div>
          <div>
            <span>Price</span>
            <select defaultValue="Select" onChange={this.sortChange()} id="Price" className="form-select">
              <option value="ASC">ASC</option>
              <option value="DESC">DESC</option>
            </select>
          </div>
          <div>
            <span>Producent</span>
            <select defaultValue="Select" onChange={this.sortChange()} id="Producent" className="form-select">
              <option value="">None</option>
            </select>
          </div>
          <div>
            <span>Type</span>
            <select defaultValue="Select" onChange={this.sortChange()} id="Type" className="form-select">
              {
                error ? <p> {error.message} </p> : null}  {
                printers.map(type => {
                  const { Type } = type;
                  return (
                    <option key={Type}>{Type}</option>
                  );
                })
              }
            </select>
          </div>
        </div>
        {
          error ? <p> {error.message} </p> : null}  {
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