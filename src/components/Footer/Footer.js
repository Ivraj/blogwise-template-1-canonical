import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './Footer.module.sass'

const Footer = () => (
  <StaticQuery
    query={graphql`
      query Footer {
        blogData {
          name
          mainSiteUrl
          sidebar {
            childImageSharp {
              fixed(height: 35) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    `}
    render={({ blogData: { name, mainSiteUrl, sidebar } }) => (
      <div className={styles.Footer}>
        <div className={styles.Footer__container}>
          <div className={styles.Footer__links}>
            <Link to="/about" className={styles.Footer__links__link}>
              ABOUT
            </Link>
            <Link to="/search" className={styles.Footer__links__link}>
              SEARCH
            </Link>
            <a
              href={mainSiteUrl}
              className={styles.Footer__links__link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit {name}
            </a>
          </div>
          <div className={styles.Footer__poweredBy}>
            <a
              href="https://www.blogwise.co?rel=blog"
              target="_blank"
              rel="noopener noreferrer"
            >
              powered by blogwise
            </a>
            <Img alt={`${name} logo`} fixed={sidebar.childImageSharp.fixed} />
          </div>
        </div>
      </div>
    )}
  />
)

export default Footer
