import { useMutation } from '@apollo/react-hooks';
import { useContext } from 'react';
import gql from 'graphql-tag';
import { Button, Form, Header } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import { AuthContext } from '../context/auth';
 
function Login(props) {
  const context = useContext(AuthContext);
  const { onChange, onSubmit, values } = useForm(loginCallBack, {
    username: '',
    password: '',
  });
  
  const [loginUser, { loading, data }] = useMutation(LOGIN_USER, {
    update(_, result) {
      console.log('login >>>', result.data.login);
      if (result.data?.login?.success) {
        context.login(result.data.login);
        props.history.push('/');
      }
    },
    // onError(err) {
    // },
    variables: values
  })

  function loginCallBack() {
    loginUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
      <Header as='h1' textAlign='center'>
        Login
      </Header>
        <Form.Input
          label='Username'
          placeholder='Username'
          name='username'
          type='text'
          value={values.username}
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
        <Button type='submit' primary fluid size='large' >
          Login
        </Button>
      </Form>

      {
        (data?.login?.success === false) && (
          <div className="ui error message">
            {data?.login?.message}
          </div>
        )
      }
    </div>
  )
}

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
      input: {
        username: $username,
        password: $password
      }
    ) {
      id email username createdAt token success message
    }
  }
`

export default Login;