const createItem = (key, globalName) => ({
    [key]: {
        amd: key,
        commonjs: key,
        commonjs2: key,
        root: globalName
    }
});

export const externals = {
    ...createItem('react', 'React'),
    ...createItem('react-dom', 'ReactDOM')
};
