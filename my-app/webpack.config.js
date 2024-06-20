const path = require('path');

module.exports = {
    entry: './src/index.js',  // Point d'entrée de ton application
    output: {
        filename: 'bundle.js',  // Nom du fichier de sortie
        path: path.resolve(__dirname, 'dist'),  // Dossier de sortie
    },
    module: {
        rules: [
            {
                test: /\.js$/,  // Tous les fichiers .js
                exclude: /node_modules/,  // Exclut node_modules
                use: {
                    loader: 'babel-loader',  // Utilise Babel pour transpiler
                },
            },
            {
                test: /\.css$/,  // Tous les fichiers .css
                use: ['style-loader', 'css-loader'],  // Utilise style-loader et css-loader
            },
            // Autres loaders peuvent être ajoutés ici
        ],
    },
    devServer: {
        static: path.join(__dirname, 'dist'),  // Notez le changement de `contentBase` à `static` pour Webpack 5
        compress: true,
        port: 3001,
        hot: true,  // Active le rechargement à chaud
        liveReload: true,  // Active le rechargement en direct
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    },

};
