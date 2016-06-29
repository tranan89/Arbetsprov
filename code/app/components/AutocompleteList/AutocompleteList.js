import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './AutocompleteList.css';

class AutocompleteList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { list, activeIndex, onClick } = this.props;

        const listItems = list.map((item, index) => {
            const className = index === activeIndex ? 'active-item' : '';

            return (
                <li
                    key={ item.alpha3Code }
                    styleName={ className }
                    onClick={ () => onClick(index) }
                >
                    { item.name }
                </li>
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
    list: PropTypes.array,
    activeIndex: PropTypes.number,
    onClick: PropTypes.function
};

export default CSSModules(AutocompleteList, styles);