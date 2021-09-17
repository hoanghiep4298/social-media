import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth'
import gql from 'graphql-tag';
import LikeButton from './LikeButton';

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
  const { user } = useContext(AuthContext);

  // const [deletePost, { error }] = useMutation(DELETE_POST_MUTATION, {
  //   variables: { id }
  // });

  return (
    <Card style={{width: '100%'}}>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }}/>
        
        <Button labelPosition='right' as={Link} to={`/post/${id}`}>
          <Button basic color='blue'>
            <Icon name='comment' />
          </Button>
          <Label basic color='blue' pointing='left'>
            {commentCount}
          </Label>
        </Button>

        {
          user && user.username === username && (
            <Button as='div' color='linkedin' floated='right'>
              <Icon name='trash' style={{margin: 0}}/>
            </Button>
          )
        }
      </Card.Content>
    </Card>
  )
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($id: ID!) {
    Post {
      deletePost(id: $id){
        success
        message
      }
    }
  }
`

export default PostCard;