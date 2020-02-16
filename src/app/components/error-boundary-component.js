import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends PureComponent {
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
            return <h1>Plugin has not been loaded successfully due to found errors</h1>;
        }
        return this.props.children;
    }
}
