import R from 'ramda';
import pluginsMetadataJson from '../../plugins/plugins-metadata.json';

export const pluginNames = R.map(R.prop('name'), pluginsMetadataJson.plugins);
