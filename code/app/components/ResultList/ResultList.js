import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ResultList.css';
import CrossIcon from '../CrossIcon';
import { getFormattedTime } from 'utils/time';
import findIndex from 'lodash/findIndex';
import { TransitionMotion, spring, presets } from 'react-motion';

class ResultList extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.getDefaultStyles = this.getDefaultStyles.bind(this);
        this.getStyles = this.getStyles.bind(this);
        this.getList = this.getList.bind(this);

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

    willEnter() {
        return {
            height: 0,
            opacity: 1
        };
    }

    willLeave() {
        return {
            height: spring(0),
            opacity: spring(0)
        };
    }

    getDefaultStyles() {
        return this.props.list.map(item => {
            return {
                data: item,
                key: item.id,
                style: {
                    height: 0,
                    opacity: 1
                }
            }
        });
    }

    getStyles() {
        const rootFontSize = getComputedStyle(document.documentElement)['font-size'];
        const height = 4.15385 * Number(rootFontSize.replace('px', ''));

        return this.props.list.map((item, i) => {
            return {
                data: item,
                key: item.id,
                style: {
                    height: spring(height, presets.gentle),
                    opacity: spring(1, presets.gentle)
                }
            };
        });
    }

    getList(animationStyles) {
        const { remove } = this.props;
        const { activeIndex } = this.state;

        const items = animationStyles.map(({ style, key, data }, index) => {
            const itemClass = index === activeIndex ? 'item-active' : 'item-inactive';

            return (
                <li
                    style={ style }
                    className={ styles[itemClass] }
                    onClick={ () => this.onClick(data) }
                    key={ key }
                >
                    <div className={ styles['item-content'] }>
                        <p>{ data.name }</p>
                        <p className={ styles['time'] }>
                            { getFormattedTime(data.time) }
                        </p>
                        <div
                            className={ styles['remove-item'] }
                            onClick={ () => remove(data) }
                        >
                            <CrossIcon />
                        </div>
                    </div>
                </li>
            );
        });

        return (
            <ul>
                { items }
            </ul>
        )
    }

    render() {
        return (
            <div styleName="root">
                <TransitionMotion
                    defaultStyles={ this.getDefaultStyles() }
                    styles={ this.getStyles() }
                    willLeave={ this.willLeave }
                    willEnter={ this.willEnter }
                >
                    { this.getList }
                </TransitionMotion>
            </div>
        );
    }
}

ResultList.PropTypes = {
    list: PropTypes.array,
    remove: PropTypes.function
};

export default CSSModules(ResultList, styles);