const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            [
                                path.join(
                                    __dirname,
                                    'src/plugins/treeSharkingPlugin.js'
                                ),
                                {
                                    library: 'lodash'
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    plugins: []
}
