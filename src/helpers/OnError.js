import selectn from 'selectn';

export const onError = function ({ err, propertyName }) {
  console.log('this: ', this);
  let errorMessage = err.message || 'An unknown error occurred';
  if (err.graphQLErrors && err.graphQLErrors.length) {
    errorMessage = err.graphQLErrors[0].message;
  } else if (err.networkError) {
    const descriptiveErrors = selectn('networkError.result.errors', err);
    if (Array.isArray(descriptiveErrors) && descriptiveErrors.length) {
      errorMessage = descriptiveErrors[0].message; // eslint-disable-line prefer-destructuring
    } else {
      errorMessage = err.networkError.message;
    }
  }
  this.setState({
    [propertyName]: errorMessage,
  });
};
