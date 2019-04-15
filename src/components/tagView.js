import React from 'react'
import Pagination from './pagination'
import { InfiniteScroll } from './infiniteScroll.tsx'
import { FaCog } from 'react-icons/fa'
import theme from '../theme.yaml'
import NewPostListView from '../components/NewPostListView'
import PostList from '../components/PostList'

class TagView extends React.Component {
  constructor(props) {
    super(props)
    console.log('*** Constructing View ***')
    if (!props.globalState.items || !props.globalState.useInfiniteScroll) {
      props.globalState.updateState({
        slug: props.pageContext.slug,
        allItems: props.allPosts,
        numAllItems: props.allPosts.length,
        itemsToShow: props.pageContext.pagePosts
          .slice(0, 1)
          .map(post => post.node),
      })
    }
  }

  componentDidMount() {
    this.props.globalState.updateState({
      isLoading: false,
    })
  }

  render() {
    const g = this.props.globalState
    const { pageContext } = this.props

    const currentlyVisibleItems =
      g.itemsToShow || this.props.allPosts.slice(0, 1)
    console.log('CURRENTLY VISIBLE')
    console.log(currentlyVisibleItems)

    return (
      <div>
        <InfiniteScroll
          throttle={150}
          threshold={100}
          isLoading={g.isLoading}
          hasMore={g.hasMore()}
          onLoadMore={g.loadMore}
        >
          <NewPostListView posts={currentlyVisibleItems} />
        </InfiniteScroll>

        {/* Loading spinner. */}
        {g.isLoading && (
          <div className="spinner">
            <FaCog />
          </div>
        )}

        {/* Fallback to Pagination for non JS users. */}
        {/* {g.useInfiniteScroll && (
          <noscript>
            <style>{`.spinner { display: none !important; }`}</style>
            <Pagination paginationData={paginationData} />
            <h4>
              <center>Infinite Scroll does not work without JavaScript.</center>
            </h4>
          </noscript>
        )} */}
      </div>
    )
  }
}

export default TagView
