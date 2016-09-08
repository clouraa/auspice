import React from "react";
import { connect } from "react-redux";
import {
  populateMetadataStore,
  populateTreeStore,
  populateSequencesStore,
  populateFrequenciesStore
} from "../actions";
import ChooseVirus from "./controls/choose-virus";

import Radium from "radium";
import _ from "lodash";
// import {Link} from "react-router";
// import Awesome from "react-fontawesome";
import Flex from "./framework/flex";
import Header from "./framework/header";
import Controls from "./controls/controls";
import Tree from "./tree/tree";
import Footer from "./framework/footer";
import parseParams from "../util/parseParams";

@connect()
@Radium
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
      // sidebarDocked: true,
    };
  }
  static propTypes = {
    /* react */
    dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    /* component api */
    error: React.PropTypes.object,
    loading: React.PropTypes.bool,
    user: React.PropTypes.object,
    routes: React.PropTypes.array,
    // foo: React.PropTypes.string
  }
  static defaultProps = {
    // foo: "bar"

  }
  componentDidMount() {
    this.maybeFetchDataset()
  }
  componentDidUpdate() {
    this.maybeFetchDataset()
  }
  maybeFetchDataset() {
    const query = this.props.location.query;
    const config = parseParams(this.props.params.splat);
    if (config['incomplete']){
      //trigger route change to augmented complete path with default params
    }
    console.log(config);
    this.setState({'dataset':config['dataset'], 'item':config['item']});
    var tmp_levels = Object.keys(config['dataset']).map((d) => config['dataset'][d]);
    tmp_levels.sort((x,y) => x[0]>y[0]);
    const data_path = tmp_levels.map(function(d){return d[1];}).join('_');
    console.log('maybeFetchDataset:', config, data_path);
    if (config.valid){
      this.props.dispatch(populateMetadataStore(data_path));
      this.props.dispatch(populateTreeStore(data_path));
      this.props.dispatch(populateSequencesStore(data_path));
      this.props.dispatch(populateFrequenciesStore(data_path));
    }
  }
  render() {
    console.log('app', this.props)
    return (
      <div style={{
          margin: "0px 20px"
        }}>
        <Header/>
        <ChooseVirus {...this.props.location}/>
        <Flex
          style={{
            width: "100%"
          }}
          wrap="wrap"
          alignItems="flex-start"
          justifyContent="space-between">
          <Controls/>
          <Tree/>

        </Flex>
        <Footer/>
      </div>
    );
  }
}

export default App;
