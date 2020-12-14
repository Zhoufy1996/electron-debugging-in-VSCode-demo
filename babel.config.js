/** @format */

const babelConfig = (api) => {
    api.cache(true);
    // 先插件后预设

    // 从后往前
    const presets = ['@babel/preset-react'];

    // 从前往后
    const plugins = [];
    return {
        presets,
        plugins,
    };
};

module.exports = babelConfig;
