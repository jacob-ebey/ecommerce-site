module.exports = {
  siteMetadata: {
    title: `Westmeer Creations`,
    description: `Creating practical products for every day use.`,
    author: `GrowHub`,
  },
  plugins: [
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "Store",
        // This is the field under which it's accessible
        fieldName: "store",
        // URL to query from
        url: "https://api-uswest.graphcms.com/v1/cjwyin5qs125701iafarjb7g2/master",
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        auth: false,
        name: "etsyReviews",
        payloadKey: "results",
        url: `https://openapi.etsy.com/v2/users/WestKoastKreations/feedback/as-subject`,
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          api_key: process.env.ETSY_API_KEY
        },
        data: {}
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
