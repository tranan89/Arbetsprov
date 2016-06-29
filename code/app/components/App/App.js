import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';
import { getCountriesWithName } from 'utils/fetcher';
import SearchBox from '../SearchBox';
import logo from 'images/logo.svg';

class App extends Component {
    constructor(props) {
        super(props);

        this.search = this.search.bind(this);

        this.state = {
            countries: []
        }
    }

    componentWillMount() {

    }

    search(text) {
        getCountriesWithName(text)
            .then((countries) => {
                this.setState({
                    countries: countries
                });
            })
            .catch((error) => {
                console.warn(error);

                this.setState({
                    countries: []
                });
            })
    }

    render() {
        const { countries } = this.state;

        return (
            <div styleName="root">
                <header>
                    <img src={ logo } />
                </header>
                <SearchBox
                    list={ countries }
                    onChange={ this.search }
                />
            </div>
        );
    }
}

export default CSSModules(App, styles);