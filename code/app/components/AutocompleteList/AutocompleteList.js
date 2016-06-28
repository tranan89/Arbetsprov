import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './SearchAutocomplete.css';

class AutocompleteList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { list } = this.props;

        const listItems = list.map((item) => {
            return (
                <li>{ item.name }</li>
            );
        });

        return (
            <div styleName="box">
                <ul>
                    { listItems }
                </ul>
            </div>
        );
    }
}

AutocompleteList.PropTypes = {
    list: PropTypes.array
};

export default CSSModules(AutocompleteList, styles);