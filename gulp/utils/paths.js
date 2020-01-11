import path from 'path';

const projectDir = path.resolve(__dirname, '..', '..');

const srcDir = path.resolve(projectDir, 'src');
const appSrcDir = path.resolve(srcDir, 'app');
const pluginsSrcDir = path.resolve(srcDir, 'plugins');

const distDir = path.resolve(projectDir, 'dist');
const pluginsDistDir = path.resolve(projectDir, 'plugins');

export default {
    appSrcDir,
    distDir,
    pluginsDistDir,
    pluginsSrcDir,
    projectDir,
    srcDir
};
