import React from "react"
import Layout from "../components/layout"

import { graphql, getModule } from "gatsby"

const PageTemplate = ({ data }) => (
  <Layout>
    <h2>{data.content.title}</h2>
    {data.content.elements.map(element => {
      const Component = getModule(element.component)
      return <Component {...element.options} />
    })}
  </Layout>
)

export default PageTemplate

export const pq = graphql`
  query($id: String!) {
    content(id: { eq: $id }) {
      title
      elements
    }
    watWat {
      b: foo
    }
  }
`
