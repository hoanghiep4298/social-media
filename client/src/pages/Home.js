import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Image } from 'semantic-ui-react'
import PostCard from '../components/PostCard';

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = data?.getPosts ?? [];
  
  console.log(data, posts)
  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
          <h1>Recent Posts</h1>
      </Grid.Row>
        
        
      <Grid.Row>
        {loading ? (
          <h1>Loading post..</h1>
        ) : (
            posts && posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))
        )}
      </Grid.Row>
    </Grid>
  )
}

const FETCH_POSTS_QUERY = gql`{
  getPosts(filter: {}) {
    id body username likeCount commentCount createdAt
    likes {
      username
    }
    comments {
      username
    }
    createdAt
  }
}`

export default Home;