import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql'

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, { body: '' });

  const [ createPost, { error } ] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      data.getPosts = [result.data.Post.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = '';
    }
  });

  function createPostCallback() {
    console.log('values >>', values)
    createPost();
  };
  
  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a Post:</h2>
      <Form.Field>
        <Form.Input
          placeholder='What do you think?'
          name='body'
          onChange={onChange}
          value={values.body}
        />
        <Button type='submit' color='blue' >Submit</Button>
      </Form.Field>
    </Form>
  )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    Post {
      createPost(input: {
        body: $body
      }) {
        id body createdAt username
        likes{
          id username createdAt
        }
        likeCount
        comments{
          id username createdAt
        }
        commentCount
      }
    }
  }
`

export default PostForm;


