import React from 'react';
class App extends React.Component {
  state = {
    isLoading: true,
    printers: [],
    typess: [],
    producents: [],
    error: null
  };
  onChange = e => {
    let temp = []
    
    switch (e.currentTarget.id) {
      case "Price":
        if (e.currentTarget.value === "ASC") {
          this.setState({
            printers: this.state.printers.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price))
          });
        }
        else if (e.currentTarget.value === "DESC") {
          this.setState({
            printers: this.state.printers.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price))
          });
        }
        break;
      case "Type":
        for (let i = 0; i < this.state.printers.length; i++) {
          if(this.state.printers[i].Type === e.currentTarget.value)
            temp.push(this.state.printers[i])
        }
        this.setState({
          printers: temp
        })

        break;
        default:
          break;
    }


  }

  getFetchprinters() {
    this.setState({
      loading: true
    }, () => {
      fetch("http://localhost:3001/json/").then(res => res.json()).then(result => this.setState({
        loading: false,
        printers: result //.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price))x
      })).catch(console.log);
      fetch("http://localhost:3001/json/types").then(res => res.json()).then(result => this.setState({
        loading: false,
        typess: result
      })).catch(console.log);
      fetch("http://localhost:3001/json/producents").then(res => res.json()).then(result => this.setState({
        loading: false,
        producents: result
      })).catch(console.log);
    });
  }



  componentDidMount() {
    this.getFetchprinters();
  }
  render() {
    const {
      printers,
      typess,
      producents,
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
            <select onChange={this.onChange} defaultValue="Select" id="Price" className="form-select">
              <option value="ASC">ASC</option>
              <option value="DESC">DESC</option>
            </select>
          </div>
          <div>
            <span>Producent</span>
            <select onChange={this.onChange} defaultValue="Select" id="Producent" className="form-select">
              {
                error ? <p> {error.message} </p> : null}  {
                producents.map(typ => {
                  const { Producent } = typ;
                  return (
                    <option key={Producent}>{Producent}</option>
                  );
                })
              }            </select>
          </div>
          <div>
            <span>Type</span>
            <select onChange={this.onChange} defaultValue="Select" id="Type" className="form-select">
              {
                error ? <p> {error.message} </p> : null}  {
                typess.map(typ => {
                  const { Type } = typ;
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