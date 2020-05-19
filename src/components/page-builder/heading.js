import React from "react"

const Heading = ({ level, text }) => {
  const HeadingElement = `h${level}`

  return <HeadingElement>{text}</HeadingElement>
}

export default Heading
