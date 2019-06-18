import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import AliceCarousel from "react-alice-carousel"
import Markdown from "react-markdown"
import GraphImg from "graphcms-image"
import { BrandButton, DefaultButton } from "pivotal-ui/react/buttons"
import { Dropdown } from "pivotal-ui/react/dropdowns"
import { Grid, FlexCol } from "pivotal-ui/react/flex-grids"
import { Input } from "pivotal-ui/react/inputs"
import { InlineList, ListItem } from "pivotal-ui/react/lists"
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa"

import "react-alice-carousel/lib/alice-carousel.css"

import CenteredContent from "../components/centered-content"
import Layout from "../components/layout"
import SEO from "../components/seo"
import useCart from "../reducers/cart"

import "./product.css";

const ProductPage = ({ pageContext: { product } }) => {
  const { allEtsyReviews: { nodes: allEtsyReviews } } = useStaticQuery(graphql`
    query EtsyReviews {
      allEtsyReviews {
        nodes {
          feedback_id
          message
          value
          creation_tsz
          image_url_155x125
        }
      }
    }
  `)

  const etsyReviews = React.useMemo(() => allEtsyReviews.filter(r => !!r.message && !!r.message.trim()), [allEtsyReviews])

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
        <CenteredContent>
          <Grid className="Product--grid">
            <FlexCol breakpoint="md" col={14}>
              <div>
                <div className="Product--carousel">
                  {carouselItems.length > 0 && (
                    <AliceCarousel items={carouselItems} />
                  )}
                </div>

                <div>
                  {etsyReviews.map(({ feedback_id, message, value }) => (
                    <div className="Product--review" key={feedback_id}>
                      <img className="Product--review-image" alt="User" src="https://www.etsy.com/images/avatars/default_avatar_75x75.png" />
                      <div>
                        <h2>Etsy User {value > 0.5 ? <FaThumbsUp /> : <FaThumbsDown />}</h2>
                        <p>{message && message.trim()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FlexCol>

            <FlexCol>
              <div>
                <br />
                <h2>{title}</h2>
                <h2 className="Product--price-contact">${price} <span /> <DefaultButton alt small>Contact</DefaultButton></h2>

                <br />

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

                <div className="Product--add-to-cart">
                  <Input type="number" label="Quantity" value={1} />
                  <label>Quantity</label>
                  <BrandButton onClick={addToCart(1)}>Add to cart</BrandButton>
                </div>

                <hr />

                <h2>Details</h2>
                <Markdown source={description} />

                {categories && categories.length > 0 && (
                  <>
                    <hr />
                    <h2>Categories</h2>
                    <InlineList>
                      {categories.map((category, i) => (
                        <ListItem key={category.id}>{category.name}</ListItem>
                      ))}
                    </InlineList>
                    <hr />
                  </>
                )}
              </div>
            </FlexCol>
          </Grid>
        </CenteredContent>
      </Layout>
    )
  }, [carouselItems, product])
}

export default ProductPage
