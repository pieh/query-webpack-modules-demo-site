import React from "react";
import { Link, graphql, useStaticQuery, getModule } from "gatsby";

const Layout = ({ children }) => {
  // const stuff = useStaticQuery(graphql`
  //   {
  //     content(type: { eq: "static-query" }) {
  //       title
  //       # elements
  //     }
  //   }
  // `);

  // console.log({ stuff });

  // const node = stuff.content;

  return (
    <div>
      <h1>
        <Link to="/">Module deps page builder demo</Link>
      </h1>
      <main>{children}</main>
      {/* <hr />
      <footer>
        <h6>{node.title}</h6>
      </footer> */}
    </div>
  );
};

export default Layout;
