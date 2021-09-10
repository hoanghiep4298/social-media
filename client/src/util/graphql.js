import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`{
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

