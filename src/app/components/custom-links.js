import React, {PureComponent} from 'react';
import R from 'ramda';
import {Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import {pluginsType} from '../types/plugins-type';

export default class CustomLinks extends PureComponent {
    static propTypes = {
        plugins: pluginsType,
        restrictedPluginNames: PropTypes.arrayOf(PropTypes.string)
    };

    render() {
        const {plugins} = this.props;
        return <div>
            {R.map(
                (plugin) =>
                    !R.contains(plugin.name, this.props.restrictedPluginNames) ?
                        <LinkContainer key={plugin.name} to={`/${plugin.name}`}>
                            <Button variant="dark">
                                {plugin.options.tab.title}
                            </Button>
                        </LinkContainer> : undefined
                , plugins)}
        </div>;
    }
}
