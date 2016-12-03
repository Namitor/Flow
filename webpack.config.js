/**
 * Created by Zane Wang on 2016/12/2.
 */
module.exports = {
    entry: [
        './index.js'
    ],
    output: {
        path: '.',
        filename: 'index-webpack.js'
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/, //是一个正则，代表js或者jsx后缀的文件要使用下面的loader
                loader: "babel",
                query: {presets: ['es2015']}
            }
        ]
    }
};