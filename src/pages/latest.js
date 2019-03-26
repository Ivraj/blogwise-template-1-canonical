import React from 'react'
import { graphql } from 'gatsby'

import PostListView from '../components/PostListView'
import Layout from '../components/Layout'
import '../templates/author/styles.sass'

const Latest = ({ data: { allBlogPost } }) => {
  let LatestContents = (
    <Layout>
      <div id="author-container">
        <h1 id="authorheader">Latest Posts</h1>
        <div>Sorry, no posts yet! Come back soon.</div>
      </div>
    </Layout>
  )
  if (allBlogPost !== null) {
    const { edges: posts } = allBlogPost
    LatestContents = (
      <Layout>
        <div id="author-container">
          <h1 id="authorheader">Latest Posts</h1>
          <PostListView posts={posts.map(p => p.node)} />
        </div>
      </Layout>
    )
  }
  return LatestContents
}
export default Latest

export const pageQuery = graphql`
  query LatestQuery {
    allBlogPost(
      sort: { order: DESC, fields: [publishDate] }
      filter: {
        id: { ne: "blogwise-post-3b8cba55-b05d-43fc-bfa6-a51c4aea3d61" }
      }
    ) {
      edges {
        node {
          id
          description
          excerpt
          slug
          title
          publishDate
          author {
            name
            slug
          }
          thumbnail: coverPhoto {
            childImageSharp {
              fluid(maxWidth: 153, maxHeight: 133) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
