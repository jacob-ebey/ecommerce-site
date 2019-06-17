/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const res = await graphql(`
    query AllProductsQuery {
      store {
        pages {
          pageName
          heroContent
          pageContent
          url
        }
        products {
          inventoryID
          title
          price
          description
          productOptions {
            id
            label
            type
            configuration
          }
          categories {
            id
            name
          }
          images {
            fileName
            handle
            width
            height
          }
        }
      }
    }
  `)

  if (res.errors) {
    throw res.errors
  }

  const { pages, products } = res.data.store

  const pageTemplate = path.resolve("src/templates/page.js")

  pages.forEach(page => {
    createPage({
      path: page.url,
      component: pageTemplate,
      context: {
        page
      }
    })
  })
  
  const productTemplate = path.resolve("src/templates/product.js")
  products.forEach(product => {
    createPage({
      path: `product/${product.inventoryID}`,
      component: productTemplate,
      context: {
        product
      }
    })
  })
}