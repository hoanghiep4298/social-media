import React, { useState } from 'react'
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function DeleteButton({ postId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId },
    update(proxy, result) {
      setConfirmOpen(false);
      console.log(' ->>', result);

      if (result.data.Post.deletePost.success === true) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        });
        console.log('posts before >>', data);

        data.getPosts = data.getPosts.filter((item) => item.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
        console.log('posts updated >>', data);
      }
    }
  })

  return (
      <>
      <Button as='div' color='linkedin' floated='right'
        onClick={() => setConfirmOpen(true)}
      >
          <Icon name='trash' style={{margin: 0}}/>
        </Button>
        <Confirm 
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={deletePost}
        />
      </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    Post {
      deletePost(postId: $postId){
        success
        message
      }
    }
  }
`
export default DeleteButton;