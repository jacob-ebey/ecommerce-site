import React from "react"
import { graphql, Link } from "gatsby"
import GraphImg from "graphcms-image"
import { Grid, FlexCol } from "pivotal-ui/react/flex-grids"

import CenteredContent from "../components/centered-content"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "./shop.css"

export const GATSBY_QUERY = graphql`
  query ProductsQuery {
    store {
      products(first: 10) {
        inventoryID
        title
        price
        overview
        categories {
          name
        }
        images(first: 1) {
          handle
          width
          height
        }
      }
    }
  }
`

const IndexPage = ({ data: { store: { products } } }) => {
  return (
    <Layout>
      <SEO title="Home" />

      <Grid>
        <FlexCol>
          <CenteredContent>
            {products.map(({ inventoryID, title, price, overview, images }) => (
              <div className="Shop--product" key={inventoryID}>
                {images && images.length > 0 && <GraphImg className="Shop--product-image" alt={images[0].fileName} image={images[0]} />}
                <div>
                  <h2>
                    <Link to={`/product/${inventoryID}`}>{title}</Link>
                    &nbsp;&#8211;&nbsp;
                    <small>${price}</small>
                  </h2>
                  <p>{overview}</p>
                </div>
              </div>
            ))}
          </CenteredContent>
        </FlexCol>
      </Grid>
    </Layout>
  )
}

export default IndexPage
