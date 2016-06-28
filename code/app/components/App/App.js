import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';
import { getCountriesWithName } from 'utils/fetcher';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: []
        }
    }

    componentWillMount() {

    }

    search(text) {
        getCountriesWithName(text)
            .then((countries) => {
                console.info('countries', countries);
            })
            .catch((error) => {
                console.warn(error);
            })
    }

    render() {
        return (
            <div styleName="test">
                <h3>Test</h3>
            </div>
        );
    }
}

export default CSSModules(App, styles);