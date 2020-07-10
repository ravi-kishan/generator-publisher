const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const entry = {
    <%for(entry in entries) { %>"<%= entries[entry] %>": "./src/<%= entries[entry] %>.ts",
    <% } %>};
const output = {
    filename: '[name].output.js',
    path: path.resolve(__dirname, "precompute"),
};


module.exports = {
    entry: entry,
    output: output,
    mode: "production",
    module: {
        rules: [{
            test: /\.(ts)$/,
            exclude: /node_modules/,
            use: { 
                loader:'babel-loader',
            }
        }]
    },
    resolve: {
        extensions: [".ts",".js"],
      
    },
      optimization: {
        runtimeChunk: 'single',
        chunkIds: "named", // To keep filename consistent between different modes (for example building only)
        splitChunks: {
            maxInitialRequests: Infinity,
            chunks: 'all',
            minSize: 0,
            minChunks:1,
            
            cacheGroups: {
                lazy: {
                    automaticNameDelimiter: '/',
                    chunks: 'async',
                    priority:30,
                },
                vendor: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    priority:-20,
                },
                common: {
                    chunks: 'all',
                    priority:-100,
                },
            },
        },
       
     },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: "disabled",
                openAnalyzer: false,
                generateStatsFile: true
        }),
    ]
}







