import React, {PureComponent} from 'react';
import R from 'ramda';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const mapStateToProps = (state) => ({plugins: state.customPlugins});

@connect(mapStateToProps)
export default class CustomPluginsExtension extends PureComponent {
    static propTypes = {
        plugins: PropTypes.arrayOf(PropTypes.shape({
            entry: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }))
    };

    render() {
        const {plugins} = this.props;
        return <div>
            {R.map((plugin) =>
                    <LinkContainer key={plugin.name} to={`/${plugin.name}`}>
                        <Button>
                            {plugin.name}
                        </Button>
                    </LinkContainer>
                , plugins)}
        </div>;
    }
}
