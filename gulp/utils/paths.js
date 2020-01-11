import path from 'path';

const projectDir = path.resolve(__dirname, '..', '..');
const distDir = path.resolve(projectDir, 'dist');
const srcDir = path.resolve(projectDir, 'src/app');

export default {
    distDir,
    projectDir,
    srcDir
};
