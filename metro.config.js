const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("sql", "js", "ts", "tsx", "json");

module.exports = withNativeWind(config, { input: "./src/styles/global.css" });