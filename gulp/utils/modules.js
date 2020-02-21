import R from 'ramda';
import modulesMetadataJson from '../../modules/modules-metadata.json';

export const moduleNames = R.map(R.prop('name'), modulesMetadataJson.modules);
