import React, { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ src, keyClose, close }) => {
  useEffect(() => {
    document.addEventListener('keydown', keyClose);
    return () => {
      document.removeEventListener('keydown', keyClose);
    };
  }, [keyClose]);

  return (
    <div className={css.overlay} onClick={close}>
      <div className={css.modal}>
        <img src={src} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  keyClose: PropTypes.func.isRequired,
};
export default Modal;
