import React from "react"
import { Link } from "gatsby"
import gql from "graphql-tag"
import GraphImg from "graphcms-image"
import { Query } from "react-apollo"
import { DefaultButton, DangerButton, BrandButton } from "pivotal-ui/react/buttons"
import { Modal } from "pivotal-ui/react/modal"
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa"

import useCart from "../reducers/cart"

import "./cart.css"

const IMAGES_QUERY = gql`
  query ProductImages($inventoryIDs: [String!]) {
    products(where: {
      inventoryID_in: $inventoryIDs
    }) {
      inventoryID
      overview
      images(first: 1) {
        fileName
        handle
        width
        height
      }
    }
  }
`

const Cart = ({ show, onHide }) => {
  const [cart] = useCart(items => {
    const parsedItems = items.reduce((p, { inventoryID, title, price }) => {
      const foundIndex = p.findIndex(item => item.inventoryID === inventoryID)

      if (foundIndex >= 0) {
        p[foundIndex].quantity = p[foundIndex].quantity + 1
      } else {
        p.push({
          inventoryID,
          title,
          price,
          quantity: 1
        })
      }

      return p;
    }, [])

    const inventoryIDs = parsedItems.map(item => item.inventoryID)

    return ({
      total: items.reduce((p, c) => p + c.price, 0),
      inventoryIDs,
      items: parsedItems
    })
  })

  return React.useMemo(() => {
    const { items, inventoryIDs, total } = cart

    return (
      <Modal title="Cart" show={show} onHide={onHide} size="auto">
        <Query query={IMAGES_QUERY} variables={{ inventoryIDs }}>
          {({ data }) => {
            return <CartContent imageData={data} items={items} />
          }}
        </Query>

        <p>Total: ${total}</p>
        <BrandButton>Checkout</BrandButton>
      </Modal>
    )
  }, [show, onHide, cart])
}

const CartContent = ({ imageData, items }) => {
  const products = React.useMemo(() => items.map(item => {
    const product = imageData && imageData.products && imageData.products.find(p => p.inventoryID === item.inventoryID)

    return {
      ...item,
      overview: product && product.overview,
      image: product && product.images && product.images[0]
    }
  }), [imageData, items])

  return React.useMemo(() => (
    <div className="Cart">
      {products.map(({ inventoryID, title, price, overview, image, quantity }) => (
        <div className="Cart--product" key={inventoryID}>
          {image ? (
            <GraphImg className="Cart--product-image" alt={image.fileName} image={image} />
          ) : (
              <div className="Cart--product-image-placeholder">No Preview</div>
            )}
          <div className="Cart--content">
            <h2>
              <Link to={`/product/${inventoryID}`}>{title}</Link>
              &nbsp;&#8211;&nbsp;
              <small>${price}</small>
            </h2>
            <p>{overview}</p>
          </div>
          <div className="Cart--quantity-buttons">
            <DefaultButton iconOnly aria-label="Subtract"><FaMinus /></DefaultButton>
            <span>{quantity}</span>
            <DefaultButton iconOnly aria-label="Add"><FaPlus /></DefaultButton>
            <DangerButton iconOnly aria-label="Remove"><FaTrash /></DangerButton>
          </div>
        </div>
      ))}
    </div>
  ), [products])
}

export default Cart
