import React from "react";
import Card from "./Card";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      city: "",
      clientCity: "",
      clientCityError: null,
      clientCityIsLoaded: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(`http://ip-api.com/json/`)
      .then(res => res.json())
      .then(({ city }) => {
        this.setState({
          clientCity: city,
          clientCityIsLoaded: true
        });
      })
      .catch(error => {
        this.setState({
          clientCityError: "Couldn't get your location",
          clientCityIsLoaded: true
        });
      });
  }

  handleClick() {
    this.setState({
      city: this.state.search
    });
  }

  render() {
    return (
      <div className="container search-wrapper">
        <div className="search z-depth-1">
          <div className="field">
            <label htmlFor="city">City:</label>
            <div className="d-flex p-relative">
              <input
                id="city"
                type="text"
                className="w-100 z-depth-2"
                placeholder="Search City"
                value={this.state.search}
                onChange={e =>
                  this.setState({
                    search: e.target.value
                  })
                }
              />
              <button
                className="p-absolute h-100 search-button c-pointer"
                id="search-button"
                onClick={this.handleClick}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        {this.state.city.length > 0 ? (
          <div>
            <p>
              Weather data for "
              <span className="markup">{this.state.city}</span>":
            </p>
            <Card city={this.state.city} />
          </div>
        ) : (
          ""
        )}
        <p>Weather in your city:</p>
        {this.state.clientCityIsLoaded ? (
          this.state.clientCityError ? (
            <div>{this.state.clientCityError}</div>
          ) : (
            <Card city={this.state.clientCity} />
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default Search;
