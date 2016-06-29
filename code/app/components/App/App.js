import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';
import { getCountriesWithName } from 'utils/fetcher';
import SearchBox from '../SearchBox';
import logo from 'images/logo.svg';
import ResultList from '../ResultList';
import { tabletWidth, mobileWidth } from 'utils/constants';
import debounce from 'lodash/debounce';

const autocompleteLimit = 5;

class App extends Component {
    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
        this.addCountry = this.addCountry.bind(this);
        this.removeCountry = this.removeCountry.bind(this);
        this.setDevice = debounce(this.setDevice.bind(this), 50);

        this.state = {
            countries: [],
            savedCountries: [],
            device: {
                isMobile: false,
                isTablet: false,
                isDesktop: false
            }
        }
    }

    componentDidMount() {
        this.setDevice();
        window.addEventListener('resize', this.setDevice);
    }

    setDevice() {
        const { isMobile, isTablet, isDesktop } = this.state;
        const width = window.outerWidth;

        if (width <= mobileWidth) {
            if (!isMobile) {
                this.setState({
                    device: {
                        isMobile: true,
                        isTablet: false,
                        isDesktop: false
                    }
                });
            }
        }
        else if (width <= tabletWidth) {
            if (!isTablet) {
                this.setState({
                    device: {
                        isMobile: false,
                        isTablet: true,
                        isDesktop: false
                    }
                });
            }
        }
        else {
            if (!isDesktop) {
                this.setState({
                    device: {
                        isMobile: false,
                        isTablet: false,
                        isDesktop: true
                    }
                });
            }
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
        const timeNow = Date.now();

        const newCountry = {
            id: country.alpha3Code + timeNow,
            name: country.name,
            time: timeNow
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
        const { countries, savedCountries, device } = this.state;

        return (
            <div styleName="root">
                <header>
                    <img src={ logo } />
                </header>
                <SearchBox
                    list={ countries.slice(0, autocompleteLimit) }
                    onChange={ this.search }
                    onItemSelect={ this.addCountry }
                    device={ device }
                />
                <ResultList
                    list={ savedCountries }
                    remove={ this.removeCountry }
                    device={ device }
                />
            </div>
        );
    }
}

export default CSSModules(App, styles);