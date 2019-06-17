import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery, Link } from "gatsby"
import { FaCartArrowDown } from "react-icons/fa"
import { BrandButton } from "pivotal-ui/react/buttons"

import useCart from "../reducers/cart"
import Cart from "./cart";

import "./header.css";

const Header = ({ siteTitle }) => {
  const { store: { pages } } = useStaticQuery(graphql`
    query Header {
      store {
        pages(where: { includeInHeader: true }) {
          id
          pageName
          url
        }
      }
    }
  `)

  const [cartOpen, setCartOpen] = React.useState(false)
  const [{ total }] = useCart(items => ({
    total: items.length
  }))
  const onCartHide = React.useCallback(() => setCartOpen(false), [setCartOpen])
  const onCartClicked = React.useCallback(() => setCartOpen(true), [setCartOpen])

  return React.useMemo(() => (
    <header className="Header">
      <div className="Header--wrapper">
        <div className="Header--wrapper-content">
          {siteTitle && (
            <h1 className="Header--title">
              {siteTitle}
            </h1>
          )}
          <div className="Header--icons">
            <BrandButton className="Header--icon-button" flat onClick={onCartClicked}>
              <span>({total})</span>&nbsp;<FaCartArrowDown />
            </BrandButton>
          </div>
        </div>

        <div className="Header--links">
          {pages.map(page => (
            <Link key={page.id} to={page.url}>{page.pageName}</Link>
          ))}
          <Link to="/shop">Shop</Link>
        </div>
      </div>
      <Cart show={cartOpen} onHide={onCartHide} />
    </header>
  ), [siteTitle, pages, total, cartOpen, onCartHide])
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
