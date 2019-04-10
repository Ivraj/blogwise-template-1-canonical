import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Time from '../Time'
import './styles.sass'

const NewPostListView = ({ posts }) => (
  <div id="posts-container">
    {posts.map(post => {
      const {
        title,
        description,
        slug,
        publishDate,
        thumbnail,
        author,
        excerpt,
      } = post.node
      const { name, slug: authorSlug } = author
      const thumbExists = Boolean(thumbnail)
      return (
        <div className="post" key={slug}>
          <div className="article" style={thumbExists ? {} : { width: '100%' }}>
            {thumbExists && (
              <Link to={slug}>
                {/* <Img
                  alt={title}
                  className="articleimage desktop"
                  fluid={thumbnail.childImageSharp.fluid}
                /> */}
              </Link>
            )}
            <div className="articletop">
              <Link style={{ textDecoration: 'none' }} to={slug}>
                <div className="mobile-articletop">
                  <div className="articlelink">{title}</div>
                  {/* {thumbExists && (
                    // <Img
                    //   alt={title}
                    //   className="articleimage mobile"
                    //   fluid={thumbnail.childImageSharp.fluid}
                    // />
                  )} */}
                </div>
                <p className="articlepreview">{excerpt || description}</p>
              </Link>
              <div className="author-container">
                <Link style={{ textDecoration: 'none' }} to={authorSlug}>
                  <div className="authorname">{name}</div>
                </Link>
                <Time date={publishDate} size="med" />
              </div>
            </div>
          </div>
        </div>
      )
    })}
  </div>
)

export default NewPostListView
