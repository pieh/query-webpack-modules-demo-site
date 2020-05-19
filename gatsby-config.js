const path = require(`path`)

module.exports = {
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