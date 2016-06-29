import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './AutocompleteList.css';

class AutocompleteList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { list } = this.props;

        const listItems = list.map((item) => {
            return (
                <li key={ item.alpha3Code }>{ item.name }</li>
            );
        });

        return (
            <div styleName="root">
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