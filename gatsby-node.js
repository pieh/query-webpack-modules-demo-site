const JSON5 = require(`json5`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
  getNode,
}) => {
  if (node.internal.mediaType !== `application/json5`) {
    return
  }

  const content = await loadNodeContent(node)
  const parsed = JSON5.parse(content)

  const slug = createFilePath({ node, getNode })

  actions.createNode({
    ...parsed,
    slug,
    id: createNodeId(`${node.id} < custom`),
    parent: node.id,
    internal: {
      type: `Content`,
      contentDigest: createContentDigest(parsed),
    },
  })
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes([
    schema.buildObjectType({
      name: `Content`,
      interfaces: [`Node`],
      fields: {
        slug: `String`,
        title: `String`,
        elements: {
          type: `[JSON]`,
          resolve: (source, args, context) => {
            const elements = source.elements || []

            return elements.map(element => {
              const moduleID = context.addModuleDependency({
                source: require.resolve(
                  `./src/components/page-builder/${element.component}`
                ),
              })

              return {
                ...element,
                component: moduleID,
              }
            })
          },
        },
      },
    }),
  ])
}

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    {
      allContent {
        nodes {
          id
          slug
        }
      }
    }
  `)

  data.allContent.nodes.forEach(node => {
    actions.createPage({
      path: node.slug,
      component: require.resolve(`./src/templates/page`),
      context: {
        id: node.id,
      },
    })
  })
}
