import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './SearchBox.css';
import AutocompleteList from '../AutocompleteList';
import debounce from 'lodash/debounce';
import searchIcon from 'images/search.svg';

class SearchBox extends Component {
    constructor(props) {
        super(props);

        this.onChange = debounce(this.onChange.bind(this), 100);
    }

    onChange(value) {
        this.props.onChange(value);
    }

    render() {
        const { list } = this.props;

        return (
            <div styleName="root">
                <div styleName="icon-wrap">
                    <img src={ searchIcon } />
                </div>
                <input
                    type="text"
                    placeholder="Search for countries..."
                    onChange={ (e) => this.onChange(e.target.value) }
                />
                <AutocompleteList
                    list={ list }
                />
            </div>
        );
    }
}

SearchBox.PropTypes = {
    list: PropTypes.array,
    onChange: PropTypes.function
};

export default CSSModules(SearchBox, styles);