import React from 'react';
import { connectModels } from 'react-sails';

const MAX_FILTER_COUNT = 10;

class StationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    }
  }

  _onChange(e) {
    const keyword = e.target.value;
    const found = 0;
    const allStations = this.props.models.Station.get();

    // let's get the weightages first
    const weightages = allStations.map( (station) => (
      {
        station: station,
        weight: (station.name.startsWith(keyword) ? 100 : 0) +
                (station.identifier.startsWith(keyword) ? 100 : 0) +
                (station.description.indexOf(keyword) >= 0 ? 50 : 0)
      }
    ));

    // Sort by weight
    weightages.sort( (a, b) => a.weight - b.weight);

    // Return the top results only, sort by name and map to station
    this.setState({
      options: weightages.slice(0, MAX_FILTER_COUNT).sort(
        (a, b) => a.station.name < b.station.name ? -1 : (a.station.name > b.station.name ? 1 : 0)
      ).map(item => item.station)
    })
  }

  _renderItem(station) {
    return (
      <a className="item" href={"/app/station/" + station.id}>
        {station.name + " (" + station.identifier +  ")"}
      </a>
    );
  }

  render() {
    const { options } = this.state;
    return (
      <div className="ui category search item">
        <div className="ui transparent icon input">
          <input className="prompt" type="text" placeholder="Search station..." />
          <i className="search link icon" />
        </div>
        <div className="results"></div>
      </div>
    );

    return (
      <div className="ui secondary menu">
        <div className="ui category search item">
          <div className="ui transparent icon input">
            <input className="prompt" type="text" placeholder="Search for station by name, identifier or keywords" />
            <i className="search link icon" />
          </div>
          <div className="results">
            <div className="ui fluid vertical menu">
              {options.map(this._renderItem.bind(this))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connectModels(StationSearch, ["Station"]);
