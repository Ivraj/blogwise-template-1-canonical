import React from 'react'
import Link from 'gatsby-link'
import { StaticQuery, graphql } from 'gatsby'
import Time from '../Time'
import './styles.sass'
import styles from './LatestPosts.module.sass'

const LatestPosts = () => (
  <StaticQuery
    // Figure out how to insert schema post id with variable.
    query={graphql`
      query LatestPostsQuery {
        allBlogPost(
          sort: { fields: [publishDate], order: DESC }
          limit: 3
          filter: {
            id: { ne: "blogwise-post-bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb" }
          }
        ) {
          edges {
            node {
              publishDate
              slug
              title
              author {
                name
              }
            }
          }
        }
      }
    `}
    render={({ allBlogPost }) => (
      <div className={styles.LatestPost}>
        <div className={styles.LatestPost__title}>Latest Posts</div>
        {(allBlogPost ? allBlogPost.edges : []).map(({ node }, i) => {
          const { title, publishDate, slug, author } = node
          return (
            <div className={styles.Post} key={slug}>
              <span className={styles.Post__numberText}>{`${i + 1}`}</span>
              <div className={styles.Post__content}>
                <Link className={styles.Post__link} to={slug}>
                  {title}
                </Link>
                <div className={styles.Post__info}>
                  <div className={styles.Post__info__author}>{author.name}</div>
                  <Time date={publishDate} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )}
  />
)

export default LatestPosts
