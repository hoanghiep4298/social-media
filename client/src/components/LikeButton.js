import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react'
import gql from 'graphql-tag';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import { useMutation } from '@apollo/react-hooks';

function LikeButton({post: {id, likeCount, likes}, user}) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true)
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost, { error }] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      console.log('info sau khi like >>', result.data.Post);
      const post = data.getPosts.find((element) => element.id === result.data.Post.likePost.id);
      post.likeCount = result.data.Post.likePost.likes.length;
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
    }
  });

  const likeButton = user ? (
    liked ? (
      <Button color='red'>
        <Icon name='heart' />
      </Button>
    ) : (
      <Button basic color='red'>
        <Icon name='heart' />
      </Button>
    )
  ) : (
    <Button as={Link} to='/login' basic color='red'>
      <Icon name='heart' />
    </Button>
    )
  
  return (
    <Button as='div' labelPosition='right' onClick={likePost}>
      {likeButton}    
      <Label as='a' basic color='red' pointing='left'>
        {likeCount}
      </Label>
    </Button>
  )
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    Post {
      likePost(postId: $postId) {
        id
        likes {
          id
          username
        }
        success
        message
      }
    }
  }
`
export default LikeButton;