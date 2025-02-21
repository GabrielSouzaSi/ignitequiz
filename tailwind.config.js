import { colors } from "./src/styles/colors"

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        extend: {
            colors,
            fontFamily: {
              regular: "Roboto_400Regular",
              bold: "Roboto_700Bold",
            },
          },
      },
    },
    plugins: [],
  }