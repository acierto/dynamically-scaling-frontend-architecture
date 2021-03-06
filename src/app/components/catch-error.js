import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class CatchError extends PureComponent {
    static propTypes = {children: PropTypes.element};

    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    componentDidCatch() {
        this.setState({hasError: true});
    }

    render() {
        if (this.state.hasError) {
            return <h1>Module has not been loaded successfully due to found errors</h1>;
        }
        return this.props.children;
    }
}
