import React, {PureComponent} from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default class CustomLinks extends PureComponent {
    static propTypes = {
        plugins: PropTypes.arrayOf(PropTypes.shape({
            entry: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }))
    };

    render() {
        const {plugins} = this.props;
        return <div>
            {R.map(
                (plugin) =>
                    <LinkContainer key={plugin.name} to={`/${plugin.name}`}>
                        <Button>
                            {plugin.name}
                        </Button>
                    </LinkContainer>
                , plugins)}
        </div>;
    }
}
