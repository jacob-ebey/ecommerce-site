import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";

export const client = new ApolloClient({
  uri: "https://api-uswest.graphcms.com/v1/cjwyin5qs125701iafarjb7g2/master",
  fetch
})
