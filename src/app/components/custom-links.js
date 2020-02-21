import React, {PureComponent} from 'react';
import R from 'ramda';
import {Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import {modulesType} from '../types/modules-type';

export default class CustomLinks extends PureComponent {
    static propTypes = {
        modules: modulesType,
        restrictedModuleNames: PropTypes.arrayOf(PropTypes.string)
    };

    render() {
        const {modules} = this.props;
        return <div>
            {R.map(
                (module) =>
                    !R.contains(module.name, this.props.restrictedModuleNames) ?
                        <LinkContainer key={module.name} to={`/${module.name}`}>
                            <Button variant="dark">
                                {module.options.tab.title}
                            </Button>
                        </LinkContainer> : undefined
                , modules)}
        </div>;
    }
}
