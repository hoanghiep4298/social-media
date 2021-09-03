import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Form } from 'semantic-ui-react';

function Register(props) {
  // const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const onChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  }

  const [addUser, { loading, data }] = useMutation(REGISTER_USER, {
    update(_, result) {
      props.history.push('/');
    },
    // onError(err) {
    //   setErrors(err.graphQLErrors[0].extensions.exception);
    // },
    variables: values
  })

  const onSubmit = (event) => {
    event.preventDefault();
    addUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label='Username'
          placeholder='Username'
          name='username'
          type='text'
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label='Email'
          placeholder='Email'
          name='email'
          type='email'
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          name='password'
          type='password'
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label='ConfirmPassword'
          placeholder='Confirm password'
          name='confirmPassword'
          type='password'
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type='submit' primary >
          Register
        </Button>
      </Form>

      {
        (data?.register?.success === false) && (
          <div className="ui error message">
            {data?.register?.message}
          </div>
        )
      }
    </div>
  )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      input: {
        username: $username,
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id email username createdAt token success message
    }
  }
`

export default Register;