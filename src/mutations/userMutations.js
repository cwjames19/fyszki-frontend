import gql from 'graphql-tag';

export const SIGN_UP_MUTATION = gql`
  mutation signUpMutation (
      $email: String!,
      $password: String!,
      $confirmPassword: String!
    ) {
    signUp (
      email: $email,
      password: $password,
      confirmPassword: $confirmPassword,
    ) {
      token
      username
    }
  }
`;

// export const TOKEN_AUTH_MUTATION = gql`
//   mutation tokenAuthMutation (
//     $email: String!,
//     $password: String!
//   ) {
//     tokenAuth(
//       email: $email,
//       password: $password
//     ) {
//       token
//       username
//     }
//   }
// `;

export const SIGN_IN_MUTATION = gql`
  mutation signInMutation (
      $email: String!,
      $password: String!,
    ) {
    signIn (
      email: $email,
      password: $password,
    ) {
      token
      username
    }
  }
`;
