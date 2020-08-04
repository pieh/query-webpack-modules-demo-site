import React from "react";
import { useStaticQuery, graphql, Link, getModule } from "gatsby";

const ListOfPosts = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          foo
        }
      }
      allContent(filter: { type: { eq: "post" } }) {
        nodes {
          slug
          title
          b: title
          elements
        }
      }
    }
  `);
  return (
    <div style={{ border: "1px solid gray" }}>
      <pre>List-of-posts Component</pre>
      <ul>
        {data.allContent.nodes.map((node) => {
          return (
            <li key={node.slug}>
              <Link to={node.slug}>{node.title}</Link>
              {node.elements &&
                node.elements.map((element) => {
                  const pre = <pre>{JSON.stringify(element, null, 2)}</pre>;
                  const Component = getModule(element.component);
                  // if (!Component) {
                  //   return <span>loading...</span>;
                  // }

                  return <Component {...element.options} />;
                })}
            </li>
          );
        })}
      </ul>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ListOfPosts;
