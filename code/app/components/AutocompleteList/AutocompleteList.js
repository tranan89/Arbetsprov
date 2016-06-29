import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './AutocompleteList.css';
import { TransitionMotion, spring, presets } from 'react-motion';

class AutocompleteList extends Component {
    constructor(props) {
        super(props);

        this.getDefaultStyles = this.getDefaultStyles.bind(this);
        this.getStyles = this.getStyles.bind(this);
        this.getList = this.getList.bind(this);
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
                key: item.alpha3Code,
                style: {
                    height: 0,
                    opacity: 1
                }
            }
        });
    }

    getStyles() {
        const { device } = this.props;

        let height = 52;

        if (device.isTablet) {
            height = 48;
        }
        if (device.isMobile) {
            height = 46;
        }

        return this.props.list.map((item, i) => {
            return {
                data: item,
                key: item.alpha3Code,
                style: {
                    height: spring(height, presets.gentle),
                    opacity: spring(1, presets.gentle)
                }
            };
        });
    }

    getList(animationStyles) {
        const { activeIndex, onClick } = this.props;

        const items = animationStyles.map(({ style, key, data }, index) => {
            const className = index === activeIndex ? 'active-item' : '';

            return (
                <li
                    style={ style }
                    key={ key }
                    className={ styles[className] }
                    onClick={ () => onClick(index) }
                >
                    { data.name }
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

AutocompleteList.PropTypes = {
    list: PropTypes.array,
    activeIndex: PropTypes.number,
    onClick: PropTypes.function
};

export default CSSModules(AutocompleteList, styles);