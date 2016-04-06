import React from 'react';
import DataSourcePage from './DataSourcePage';
import DataLoggerPage from './DataLoggerPage';
import ProtocolPage from './ProtocolPage';

class DAQ extends React.Component {
  render() {
    return <div>DAQ - Display Raw Data Here</div>
  }
}

DAQ.path = "daq/";
DAQ.title = "Data Acquisition";
DAQ.indexTitle = "Raw Data";
DAQ.options = {
  "New": null,  // The menu header
  "Data Source": () => window.alert("New Data Source"),
  "Data Logger": () => window.alert("New Data Logger"),
  "Protocol": () => window.alert("New Protocol")
};    // This would be add data source, data logger, protocol
DAQ.childPages = [ DataSourcePage, DataLoggerPage, ProtocolPage ];

export default DAQ;
