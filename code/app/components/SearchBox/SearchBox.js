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
        this.onKeyDown = this.onKeyDown.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);

        this.state = {
            activeItemIndex: -1,
            inputFocused: false
        }
    }

    componentDidMount() {
        this.inputNode = this.refs.input;
    }

    onChange(value) {
        if (!value.length) {
            this.setState({
                activeItemIndex: -1
            });
        }

        this.props.onChange(value);
    }

    onKeyDown(e) {
        switch(e.key) {
            case 'ArrowDown':
                this.incrementIndex();
                break;
            case 'ArrowUp':
                this.decrementIndex();
                break;
            case 'Escape':
                this.inputNode.blur();
                break;
            case 'Enter':
                this.onEnter();
                break;
        }
    }

    onBlur() {
        setTimeout(() => {
            this.setState({
                inputFocused: false
            });
        }, 150);
    }

    onFocus() {
        this.setState({
            inputFocused: true
        });
    }

    onEnter() {
        this.selectItem(this.state.activeItemIndex);
    }

    selectItem(index) {
        const { onItemSelect, list } = this.props;

        const activeItem = list[index];

        onItemSelect(activeItem);

        this.inputNode.blur();
        this.setActiveItemIndex(index);
    }

    incrementIndex() {
        const { list } = this.props;
        
        let newActiveItemIndex = this.state.activeItemIndex + 1;

        if (newActiveItemIndex >= list.length) {
            newActiveItemIndex = list.length - 1;
        }

        this.setActiveItemIndex(newActiveItemIndex);
    }

    decrementIndex() {
        let newActiveItemIndex = this.state.activeItemIndex - 1;

        if (newActiveItemIndex < -1) {
            newActiveItemIndex = -1;
        }

        this.setActiveItemIndex(newActiveItemIndex);
    }

    setActiveItemIndex(index) {
        this.setState({
            activeItemIndex: index
        });
    }

    getAutocomplete() {
        const { list } = this.props;
        const { activeItemIndex, inputFocused } = this.state;

        if (!list.length || !inputFocused) {
            return null;
        }

        return (
            <AutocompleteList
                list={ list.slice(0, 10) }
                activeIndex={ activeItemIndex }
                onClick={ this.selectItem }
            />
        );
    }

    render() {
        const autocompleteList = this.getAutocomplete();

        const rootClass = autocompleteList ? 'root-with-autocomplete' : 'root-without-autocomplete';

        return (
            <div
                styleName={ rootClass }
                onKeyDown={ this.onKeyDown }
            >
                <div styleName="icon-wrap">
                    <img src={ searchIcon } />
                </div>
                <input
                    type="text"
                    placeholder="Search for countries..."
                    ref="input"
                    autoFocus
                    onChange={ (e) => this.onChange(e.target.value) }
                    onFocus={ this.onFocus }
                    onBlur={ this.onBlur }
                />
                { autocompleteList }
            </div>
        );
    }
}

SearchBox.PropTypes = {
    list: PropTypes.array,
    onChange: PropTypes.function,
    onItemSelect: PropTypes.function
};

export default CSSModules(SearchBox, styles);