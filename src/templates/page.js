import React from "react"
import Markdown from "react-markdown"
import { Grid, FlexCol } from "pivotal-ui/react/flex-grids"

import CenteredContent from "../components/centered-content"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "./page.css";

const PageTemplate = ({ pageContext: { page: { pageName, heroContent, pageContent } } }) => {
  return (
    <Layout>
      <SEO title={pageName} />

      {heroContent && (
        <div className="Page--hero">
          <Markdown source={heroContent} />
        </div>
      )}

      {pageContent && (
        <Grid>
          <FlexCol>
            <CenteredContent>
              <br />
              <Markdown source={pageContent} />
            </CenteredContent>
          </FlexCol>
        </Grid>
      )}
    </Layout>
  )
}

export default PageTemplate
