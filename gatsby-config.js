const path = require(`path`)

module.exports = {
  siteMetadata: {
    foo: process.env.FOO || 1
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'content',
        path: path.resolve(`./content`)
      }
    }
  ]
}