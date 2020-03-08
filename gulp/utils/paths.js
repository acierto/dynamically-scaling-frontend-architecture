// eslint-disable-next-line import/no-nodejs-modules
import path from 'path';

// eslint-disable-next-line no-undef
const projectDir = path.resolve(__dirname, '..', '..');

const srcDir = path.resolve(projectDir, 'src');
const appSrcDir = path.resolve(srcDir, 'app');
const modulesSrcDir = path.resolve(srcDir, 'modules');

const distDir = path.resolve(projectDir, 'dist');
const modulesDistDir = path.resolve(projectDir, 'modules');

export default {
    appSrcDir,
    distDir,
    modulesDistDir,
    modulesSrcDir,
    nodeModulesDir: `${projectDir}/node_modules`,
    projectDir,
    srcDir,
    testDir: `${projectDir}/test`
};
