import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';
import { getCountriesWithName } from 'utils/fetcher';
import SearchBox from '../SearchBox';
import logo from 'images/logo.svg';
import ResultList from '../ResultList';

class App extends Component {
    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
        this.addCountry = this.addCountry.bind(this);
        this.removeCountry = this.removeCountry.bind(this);

        this.state = {
            countries: [],
            savedCountries: []
        }
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

    addCountry(country) {
        const { savedCountries } = this.state;
        const newCountry = {
            id: country.alpha3Code,
            name: country.name,
            time: Date.now()
        };

        this.setState({
            savedCountries: savedCountries.concat(newCountry)
        })
    }

    removeCountry(removeCountry) {
        const { savedCountries } = this.state;

        const countries = savedCountries.filter((country) => {
            return country.id !== removeCountry.id;
        });

        this.setState({
            savedCountries: countries
        })
    }

    render() {
        const { countries, savedCountries } = this.state;

        return (
            <div styleName="root">
                <header>
                    <img src={ logo } />
                </header>
                <SearchBox
                    list={ countries }
                    onChange={ this.search }
                    onItemSelect={ this.addCountry }
                />
                <ResultList
                    list={ savedCountries }
                    remove={ this.removeCountry }
                />
            </div>
        );
    }
}

export default CSSModules(App, styles);