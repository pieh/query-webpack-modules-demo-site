const JSON5 = require(`json5`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.sourceNodes = ({ actions }) => {
  if (process.env.WAT) {
    actions.createNode({
      id: "wat",
      foo: "bar",
      internal: {
        type: "WatWat",
        contentDigest: "yikes",
      },
    });
  }
};

exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
  getNode,
}) => {
  if (node.internal.mediaType !== `application/json5`) {
    return;
  }

  const content = await loadNodeContent(node);
  const parsed = JSON5.parse(content);

  const slug = createFilePath({ node, getNode });

  actions.createNode({
    ...parsed,
    slug,
    id: createNodeId(`${node.id} < custom`),
    parent: node.id,
    internal: {
      type: `Content`,
      contentDigest: createContentDigest(parsed),
    },
  });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes(`
  type WatWat implements Node {
    foo: String
  }
  `);
  actions.createTypes([
    schema.buildObjectType({
      name: `Content`,
      interfaces: [`Node`],
      fields: {
        slug: `String`,
        title: `String`,
        contextStuff: `String`,
        elements: {
          type: `[JSON]`,
          resolve: async (source, args, context) => {
            const elements = (source.elements || []).map((element) => {
              const moduleID = context.pageModel.setModule({
                source: require.resolve(
                  `./src/components/page-builder/${element.component}`
                ),
              });

              return {
                ...element,
                component: moduleID,
              };
            });

            // add synthetic delay after adding module deps
            // await new Promise((resolve) => setTimeout(resolve, 10000));

            return elements;
          },
        },
      },
    }),
  ]);
};

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    {
      allContent {
        nodes {
          id
          createPage
          slug
          contextStuff
        }
      }
    }
  `);

  data.allContent.nodes.forEach((node) => {
    if (node.createPage === false) {
      return;
    }

    actions.createPage({
      path: node.slug,
      component: require.resolve(`./src/templates/page`),
      context: {
        id: node.id,
        contextStuff: node.contextStuff,
      },
    });
  });
};
