import React from "react"
import AliceCarousel from "react-alice-carousel"
import Markdown from "react-markdown"
import GraphImg from "graphcms-image"
import { BrandButton } from "pivotal-ui/react/buttons"
import { Grid, FlexCol } from "pivotal-ui/react/flex-grids"
import { Dropdown } from "pivotal-ui/react/dropdowns"

import "react-alice-carousel/lib/alice-carousel.css"

import CenteredContent from "../components/centered-content"
import Layout from "../components/layout"
import SEO from "../components/seo"
import useCart from "../reducers/cart"

import "./product.css";

const ProductPage = ({ pageContext: { product } }) => {
  const carouselItems = React.useMemo(() => product.images.map((image) => (
    <GraphImg key={image.handle} alt={image.fileName} image={image} />
  )), [product.images])

  const [, { push }] = useCart(_ => null)

  const addToCart = React.useCallback((quantity) => () => {
    const { inventoryID, title, price } = product

    push(...Array(quantity).fill(undefined).map(() => ({ inventoryID, title, price })))
  }, [product, push])

  return React.useMemo(() => {
    const { categories, description, title, price, productOptions } = product

    return (
      <Layout>
        <SEO title={title} />
        <Grid>
          <FlexCol col={24}>
            <div>
              <hr style={{ marginTop: 0 }} />
              <h1>{title}&nbsp;&nbsp;<small><strong>${price}</strong></small></h1>
              <hr />
            </div>
          </FlexCol>
          <FlexCol breakpoint="sm">
            <div className="Product--carousel">
              {carouselItems.length > 0 && (
                <AliceCarousel items={carouselItems} />
              )}
            </div>
          </FlexCol>
          <FlexCol>
            <div>
              {categories && categories.length > 0 && (
                <h2>Categories {categories.map((category, i) => (
                  <small key={category.id}>{i > 0 && ", "}{category.name}</small>
                ))}</h2>
              )}
              <Markdown source={description} />
            </div>
          </FlexCol>
          <FlexCol col={24}>
            <hr />
            <CenteredContent>
              {productOptions && productOptions.map((option, i) => {
                switch (option.type) {
                  case "Select":
                    return (
                      <React.Fragment key={option.id}>
                        <Dropdown title={option.label}>
                          {option.configuration.map(option => (
                            <div className="Dropdown--item" key={option.key} value={option.key}>{option.label}</div>
                          ))}
                        </Dropdown>
                        <br />
                      </React.Fragment>
                    )
                  default:
                    return null
                }
              })}

              <BrandButton onClick={addToCart(1)}>Add to cart</BrandButton>
            </CenteredContent>
          </FlexCol>
        </Grid>
      </Layout>
    )
  }, [carouselItems, product])
}

export default ProductPage
