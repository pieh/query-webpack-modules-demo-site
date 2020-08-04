import React from "react";

const Heading = ({ level, text }) => {
  const HeadingElement = `h${level}`;

  return (
    <div style={{ border: "1px solid gray" }}>
      <pre>Heading Component</pre>
      <HeadingElement>watz{text}</HeadingElement>
    </div>
  );
};

export default Heading;
