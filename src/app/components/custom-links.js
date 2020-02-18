import React, {PureComponent} from 'react';
import R from 'ramda';
import {Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {pluginsType} from '../types/plugins-type';

export default class CustomLinks extends PureComponent {
    static propTypes = {plugins: pluginsType};

    render() {
        const {plugins} = this.props;
        return <div>
            {R.map(
                (plugin) =>
                    <LinkContainer key={plugin.name} to={`/${plugin.name}`}>
                        <Button variant="dark">
                            {plugin.options.tab.title}
                        </Button>
                    </LinkContainer>
                , plugins)}
        </div>;
    }
}
