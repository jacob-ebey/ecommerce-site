/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"

import "pivotal-ui/css/buttons"
import "pivotal-ui/css/colors"
import "pivotal-ui/css/flex-grids"
import "pivotal-ui/css/links"
import "pivotal-ui/css/typography"
import "pivotal-ui/css/theme-context"

import Header from "./header";
import Snipcart from "./snipcart"

import "./layout.css"

const Layout = ({ children }) => {
  const { site: { siteMetadata: { title }}} = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return React.useMemo(() => (
    <>
      <Header siteTitle={title} />
      <div className="Layout">
        <main className="Layout--main">{children}</main>
        <Snipcart apiKey="OTQ2MDM3ZWUtNDkzMC00ZTg3LTg0MTgtYzY4ODEwOGFiYmVjNjM2OTYzMzQwODQ0MjA5NjA0" />
      </div>
    </>
  ), [title, children])
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
