import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ResultList.css';
import CrossIcon from '../CrossIcon';
import { getFormattedTime } from 'utils/time';
import findIndex from 'lodash/findIndex';

class ResultList extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            activeIndex: -1
        }
    }

    onClick(clickedItem) {
        const { list } = this.props;
        const { activeIndex } = this.state;

        const index = findIndex(list, item => item.id === clickedItem.id);

        this.setState({
            activeIndex: activeIndex === index ? -1 : index
        });
    }

    render() {
        const { list, remove } = this.props;
        const { activeIndex } = this.state;

        const listItems = list.map((item, index) => {
            const itemClass = index === activeIndex ? 'item-active' : 'item-inactive';

            return (
                <li
                    styleName={ itemClass }
                    onClick={ () => this.onClick(item) }
                    key={ item.name }
                >
                    <div styleName="item-content">
                        <p>{ item.name }</p>
                        <p styleName="time">{ getFormattedTime(item.time) }</p>
                        <div
                            styleName="remove-item"
                            onClick={ () => remove(item) }
                        >
                            <CrossIcon />
                        </div>
                    </div>
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

ResultList.PropTypes = {
    list: PropTypes.array,
    remove: PropTypes.function
};

export default CSSModules(ResultList, styles);