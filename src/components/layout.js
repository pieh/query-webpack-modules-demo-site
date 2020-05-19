import React from "react"
import { Link } from "gatsby"

const Layout = ({ children }) => (
  <div>
    <h1>
      <Link to="/">Module deps page builder demo</Link>
    </h1>
    <main>{children}</main>
  </div>
)

export default Layout
