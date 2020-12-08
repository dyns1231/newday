const path = require('path');
module.exports = {
    mode:"production",
    entry:{
        index:'./src/index.js',
        area:'./src/area.js',
        renders:"./src/renders.js"
    },
    output:{
        path:path.resolve(__dirname,'../dist/'),
        filename:'[name].[hash].js'
    }
}