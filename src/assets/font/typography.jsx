import PoppinsRegular from "../font/poppins/Poppins Regular 400.ttf";
const typography = {
  fontFamily: ["Poppins", "sans-serif"].join(","),
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
            font-family: "Poppins";
            src: local('Poppins'), local('Poppins-Regular'), url(${PoppinsRegular}) format('ttf');
            font-weight: 400;
            font-style: normal;
          }
        `,
    },
  },
};

export default typography;
