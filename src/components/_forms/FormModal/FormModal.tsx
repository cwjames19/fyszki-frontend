import React from 'react';
import ReactModal from 'react-modal';
import Loader from '../../_utilities/Loader/Loader';
import FormInput from '../../_utilities/Input/Input';
import './FormModal.css';

type FormModalProps = {
  showingForm: boolean;
  hideForm: Function;
}
type FormModalState = {
  userName: string;
  userSurname: string;
  userDescription: string;
  userSiteUrl: string;
  errorMessage: string;
  loading: boolean;
}

const defaultState = {
  userName: '',
  userSurname: '',
  userDescription: '',
  userSiteUrl: '',
  errorMessage: '',
  loading: false,
};


class FormModal extends React.Component<FormModalProps, FormModalState> {
  static defaultProps = {
    showingForm: false,
  }

  constructor(props: FormModalProps) {
    super(props);
    this.state = { ...defaultState };

    this.handleClose = this.handleClose.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setError = this.setError.bind(this);
  }

  componentDidMount() {
    ReactModal.setAppElement('#root');

    window.setTimeout(() => {
      const overlay = document.getElementsByClassName('form-modal__overlay')[0];
      overlay.addEventListener('click', (event: Event) => {
        if ((event.target as HTMLDivElement).classList.contains('form-modal__overlay')) {
          this.handleClose();
        }
      });
    }, 10);
  }

  handleClose() {
    this.props.hideForm();
  }

  handleFieldChange({name, value}: {name: keyof FormModalState, value: string}): void {
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
      errorMessage: '',
    }));
  }

  handleSubmit() {
    console.log('submit'); 
  }

  setError(errorMessage: string) {
    this.setState({
      errorMessage,
      loading: false,
    });
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
            ASDF;LKJ
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

export default FormModal;
