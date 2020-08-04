import ListOfPosts from "./nested-query-for-list-of-posts";

export default ListOfPosts;

// import React from "react";
// import { useStaticQuery, graphql, Link, getModule } from "gatsby";

// const ListOfPosts = () => {
//   const data = useStaticQuery(graphql`
//     {
//       site {
//         siteMetadata {
//           foo
//         }
//       }
//       allContent(filter: { type: { eq: "post" } }) {
//         nodes {
//           slug
//           title
//           b: title
//           elements
//         }
//       }
//     }
//   `);
//   return (
//     <ul>
//       list here blah
//       {data.allContent.nodes.map((node) => {
//         return (
//           <li key={node.slug}>
//             <Link to={node.slug}>{node.title}</Link>
//             {node.elements &&
//               node.elements.map((element) => {
//                 const pre = <pre>{JSON.stringify(element, null, 2)}</pre>;
//                 const Component = getModule(element.component);
//                 if (!Component) {
//                   return <span>loading...</span>;
//                 }

//                 return (
//                   <>
//                     <Component {...element.options} />
//                     {pre}
//                   </>
//                 );
//               })}
//           </li>
//         );
//       })}
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </ul>
//   );
// };

// export default ListOfPosts;
