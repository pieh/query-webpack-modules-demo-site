import React from "react"
import { graphql, getModule } from "gatsby"

const HomeTemplate = ({ data }) => (
  <>
    Hello
    <ul>
      {data.allContent.nodes.map(node => (
        <li key={node.slug}>
          <h2>{node.title}</h2>
          {node.elements.map(element => {
            const Component = getModule(element.component)
            return <Component {...element.options} />
          })}
        </li>
      ))}
    </ul>
  </>
)

export default HomeTemplate

export const pq = graphql`
  {
    allContent {
      nodes {
        slug
        title
        elements
      }
    }
  }
`
