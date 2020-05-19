import React from "react"

const Heading = ({ level, text }) => (
  <p dangerouslySetInnerHTML={{ __html: text }} />
)

export default Heading
