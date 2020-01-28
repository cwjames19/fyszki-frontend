import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Loader from '../../_utilities/Loader/Loader';
import FormInput from '../../_utilities/Input/Input';
import './FormModal.css';

ReactModal.setAppElement(document.querySelector('#root'));

const defaultState = {
  userName: '',
  userSurname: '',
  userDescription: '',
  userSiteUrl: '',
  errorMessage: '',
  loading: false,
};

// const saveData = function (userName, userSurname, userDescription) {
// axios.post('/user/save-data', {
//   baseURL,
//   data: {
//     user_name: userName,
//     user_surname: userSurname,
//     user_description: userDescription,
//   },
// });
// };

// const saveUrl = function (userSiteUrl) {
//   axios.post('user/save-url', {
//     baseURL,
//     data: { user_site_url: userSiteUrl },
//   });
// };


class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };

    this.handleClose = this.handleClose.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setError = this.setError.bind(this);
    this.placeholder = this.placeholder.bind(this);
  }

  componentDidMount() {
    window.setTimeout(() => {
      const overlay = document.getElementsByClassName('form-modal__overlay')[0];
      overlay.addEventListener('click', (event) => {
        if (event.target.classList.contains('form-modal__overlay')) {
          this.handleClose();
        }
      });
    }, 10);
  }

  setError(errorMessage) {
    this.setState({ errorMessage, loading: false });
  }

  handleClose() {
    this.props.hideForm();
  }

  handleFieldChange({ name, value }) {
    this.setState({
      [name]: value,
      errorMessage: '',
    });
  }

  // handleSubmit() {
  //   const {
  //     userName, userSurname, userDescription, userSiteUrl,
  //   } = this.state;

  //   if (baseURL) {
  //     this.setState({ loading: true });
  //     axios.all([saveData(userName, userSurname, userDescription), saveUrl(userSiteUrl)])
  //       .then(axios.spread((dataResponse, urlResponse) => {
  //         if (!dataResponse || !urlResponse) {
  //           this.setError('Did not receive a response from one or more requests');
  //         } else if (dataResponse.status == '200' && urlResponse.status == '200') { // eslint-disable-line eqeqeq
  //           this.props.getUserData();
  //           this.handleClose();
  //         } else {
  //           const badStatus = [dataResponse.status, urlResponse.status].find(s => s != '200'); // eslint-disable-line eqeqeq
  //           this.setError(`Status was ${badStatus}`);
  //         }
  //       }))
  //       .catch(({ status, message }) => {
  //         this.setError(`Error status: ${status}. ${message}.`);
  //       });
  //   } else {
  //     this.setError('No baseURL has been set');
  //   }
  // }

  placeholder() { // eslint-disable-line
    console.log('placeholder function');
  }

  render() {
    const { showingForm } = this.props;
    const { errorMessage, loading } = this.state;

    return (
      <ReactModal
        isOpen={showingForm}
        className="form-modal__container"
        overlayClassName="form-modal__overlay"
        closeTimeoutMS={200}
      >
        <React.Fragment>
          <div
            className="form-modal__close"
            onClick={this.handleClose}
            role="button"
            onKeyPress={this.handleClose}
            tabIndex={0}
          >
            <div />
          </div>
          <FormInput
            onChange={this.handleFieldChange}
            label="Name"
            name="userName"
          />
          <FormInput
            onChange={this.handleFieldChange}
            label="Surname"
            name="userSurname"
          />
          <FormInput
            onChange={this.handleFieldChange}
            label="Description"
            name="userDescription"
          />
          <FormInput
            onChange={this.handleFieldChange}
            label="URL to page"
            name="userSiteUrl"
          />
          <button className="form-modal__submit" onClick={this.handleSubmit}>
            {loading ?
              <Loader />
              :
              'Save'
            }
          </button>
          {errorMessage && <span className="form-modal__error">{errorMessage}</span>}
        </React.Fragment>
      </ReactModal>
    );
  }
}


FormModal.propTypes = {
  showingForm: PropTypes.bool,
  hideForm: PropTypes.func.isRequired,
};

FormModal.defaultProps = {
  showingForm: false,
};

export default FormModal;
