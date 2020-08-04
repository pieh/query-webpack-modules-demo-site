import React from "react";

const Paragraph = ({ level, text }) => (
  <div style={{ border: "1px solid gray" }}>
    <pre>Paragraph Component</pre>
    <p dangerouslySetInnerHTML={{ __html: text }} />
  </div>
);

export default Paragraph;
