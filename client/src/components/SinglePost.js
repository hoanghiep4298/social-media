import React, { useContext } from 'react'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Image, Card, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  console.log('single post >>>', props);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY, {
    variables: { id: postId }
  });

  console.log('data>> ', data);
  let postMarkup;
  if (!data?.getPost) {
    postMarkup = <p>Loading ...</p>
  } else {
    console.log('data>> ', data);
    const { id, username, createdAt, body, likes, likeCount, commentCount } = data.getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
              size='small'
              floated='right'
            />
          </Grid.Column>

          

          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            
            <Card.Content extra>
              <LikeButton user={user} post={{ id, likeCount, likes }} />
              <Button
                as='div'
                labelPosition='right'
                onClick={() => console.log('comment on post')}
              >
                <Button basic color='blue'>
                  <Icon name='comments'/>
                </Button>
                <Label basic color='blue' pointing='left'>
                  {commentCount}
                </Label>

              </Button>
              { user && user.username === username && <DeleteButton postId={ id } /> }
            </Card.Content>
          </Card>
        </Grid.Row>
      </Grid>
    )
  }
  return postMarkup;
}

const FETCH_POSTS_QUERY = gql`
  query getPost($id: ID!) {
    getPost(id: $id) {
      id
      username
      body
      comments {
        username
        body
        createdAt
      }
      likes {
        username
      }
      likeCount
      commentCount
      success
      message
    }
  }
`
export default SinglePost;