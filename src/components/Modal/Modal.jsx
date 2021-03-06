import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { OverlayStyled, ModalStyled } from './Modal.styled';
import propTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static = {
    alt: propTypes.string.isRequired,
    onClose: propTypes.func.isRequired,
    src: propTypes.string.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <OverlayStyled onClick={this.handleBackDropClick}>
        <ModalStyled>
          <img src={src} alt={alt} />
        </ModalStyled>
      </OverlayStyled>,
      modalRoot,
    );
  }
}

export default Modal;

// Modal.propTypes = {
//   alt: propTypes.string.isRequired,
//   onClose: propTypes.func.isRequired,
//   src: propTypes.string.isRequired,
// };
