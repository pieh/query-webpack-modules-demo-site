import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

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
        }
      }
    }
  `)
  return (
    <ul>
      {data.allContent.nodes.map(node => (
        <li key={node.slug}>
          <Link to={node.slug}>{node.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default ListOfPosts
