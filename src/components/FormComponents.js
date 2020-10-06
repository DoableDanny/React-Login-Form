import React, { useState } from 'react';

const Label = props => <label {...props} />;

const Input = props => <input {...props} />;

const PasswordInput = ({ type = 'password', ...props }) => (
  <Input {...{ type, ...props }} />
);

const SubmitButton = ({ type = 'submit', ...props }) => (
  <button {...{ type, ...props }} />
);

const LoginForm = props => <form {...props} />;

// Optimization: both inputs contain a label
const FormInput = ({ name, id = `${name}-id`, title, ...props }) => (
  <>
    <Label htmlFor={id}>{title}</Label>
    <Input {...{ name, id, ...props }} />
  </>
);

const FormPasswordInput = ({ name, id = `${name}-id`, title, ...props }) => (
  <>
    <Label htmlFor={id}>{title}</Label>
    <Input {...{ name, id, ...props }} />
  </>
);

// The complete form. State added here as it is the lowest common parent. App is the next one up.
export default function LoginContainer() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async event => {
    event.preventDefault();
    const response = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });
    // Here we could check response.status to login or show error
  };

  return (
    <LoginForm>
      <FormInput
        name='username'
        title='Username'
        onChange={event => setUsername(event.currentTarget.value)}
        value={username}
      />
      <FormPasswordInput
        name='password'
        title='Password'
        onChange={event => setPassword(event.currentTarget.value)}
        value={password}
      />
      <SubmitButton onClick={event => login(event)}>Login</SubmitButton>
    </LoginForm>
  );
}
