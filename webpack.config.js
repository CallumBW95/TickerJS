const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
	entry: [path.resolve(__dirname, "src", "ticker.scss"), path.resolve(__dirname, "src", "ticker.js")],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "ticker.css"
		})
	],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "ticker.js"
	}
};
