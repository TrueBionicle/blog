import "./ModalError.scss";

const ModalError = () => {
  return (
    <div className="error">
      <div className="error__modal">
        <span className="error__modal__text">
          Something was wrong try again
        </span>
        <button
          className="error_btn"
          onClick={() => {
            document.location.reload();
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default ModalError;
