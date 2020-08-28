import React from "react";
import Layout from "../components/layout";

import { graphql, getModule } from "gatsby";

const PageTemplate = ({ data }) => (
  <Layout>
    <h2>{data.content.title}</h2>
    {data.content.elementsButWithFieldExtension.map((element) => {
      const pre = <pre>{JSON.stringify(element, null, 2)}</pre>;

      const Component = getModule(element.component);

      console.log({ Component, id: element.component });
      if (!Component) {
        return <span>loading...</span>;
      }

      return (
        <>
          <Component {...element.options} />
          {pre}
        </>
      );
    })}
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </Layout>
);

export default PageTemplate;

export const pq = graphql`
  query($id: String!) {
    content(id: { eq: $id }) {
      title
      elements
      elementsButWithFieldExtension
    }
    # sleep(timeout: 2500) {
    #   result
    # }
  }
`;
