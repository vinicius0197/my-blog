const path = require('path')

module.exports = {
  siteMetadata: {
    siteUrl: `https://tender-keller-01e436.netlify.com/`,
    description: 'My personal blog',
    title: 'Vinicius Costa'
  },
  plugins: [
    `gatsby-plugin-feed`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [{
          resolve: `gatsby-remark-vscode`,
          // All options are optional. Defaults shown here.
          options: {
            colorTheme: 'Dark+ (default dark)', // Read on for list of included themes. Also accepts object and function forms.
            wrapperClassName: '',   // Additional class put on 'pre' tag. Also accepts function to set the class dynamically.
            injectStyles: true,     // Injects (minimal) additional CSS for layout and scrolling
            extensions: [],         // Extensions to download from the marketplace to provide more languages and themes
            extensionDataDirectory: // Absolute path to the directory where extensions will be downloaded. Defaults to inside node_modules.
              path.resolve('extensions'),
            languageAliases: {},    // Map of custom/unknown language codes to standard/known language codes
            replaceColor: x => x,   // Function allowing replacement of a theme color with another. Useful for replacing hex colors with CSS variables.
            getLineClassName: ({    // Function allowing dynamic setting of additional class names on individual lines
              content,              //   - the string content of the line
              index,                //   - the zero-based index of the line within the code fence
              language,             //   - the language specified for the code fence
              codeFenceOptions      //   - any options set on the code fence alongside the language (more on this later)
            }) => '',
            logLevel: 'error'       // Set to 'warn' to debug if something looks wrong
          }
        }]
      }
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: "gatsby-plugin-categories",
      options: {
        templatePath: `${__dirname}/src/templates/category.js`,
      },
    },
  ],
}