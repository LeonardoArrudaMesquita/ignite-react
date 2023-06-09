const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "eval-source-map" : "source-map", // Iguala o código do projeto com o código do Browser
  entry: path.resolve(__dirname, "src", "index.tsx"), // Arquivo inicial da aplicação
  output: {
    path: path.resolve(__dirname, "dist"), // Path da pasta de destino do Build
    filename: "bundle.js", // Nome do arquivo do Build
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Formatos que o Webpack irá ler
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"), // Conteúdo estático que será servido
    hot: true,    
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(), // Plugin que preserva o estado quando o Webpack dá refresh na aplicação
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }), // Plugin que adiciona o file de Build no <script> do HTML especificado.
  ].filter(Boolean),
  module: {
    rules: [
      // Processamento de cada extensão
      {
        test: /\.(j|t)sx$/, // Arquivos JSX ou TSX
        exclude: /node_modules/, // Exclusão do node_modules
        use: [
          {
            loader: "babel-loader", // Dep do babel para converter o JSX e criar o bundle
            options: {
                plugins: [
                    isDevelopment && require.resolve('react-refresh/babel'), // Integração do babel com o react-refresh
                ].filter(Boolean)
            }
          },
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          "style-loader", // Injeta CSS dentro do DOM
          "css-loader", // Converte @import e url() do CSS
          "sass-loader", // Compila SASS para CSS
        ],
      },
    ],
  },
};
