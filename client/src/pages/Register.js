import { useMutation } from '@apollo/react-hooks';
import { useContext } from 'react';
import gql from 'graphql-tag';
import { Button, Form, Header } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import { AuthContext } from '../context/auth';

function Register(props) {
  // const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [addUser, { loading, data }] = useMutation(REGISTER_USER, {
    update(_, result) {
      if (result.data?.register?.success) {
        context.login(result.data.register);
        props.history.push('/');
      }
    },
    // onError(err) {
    //   setErrors(err.graphQLErrors[0].extensions.exception);
    // },
    variables: values
  })

  function registerUser() {
    addUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <Header as='h1' textAlign='center'>
          Register
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
        <Button type='submit' primary fluid size='large' >
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