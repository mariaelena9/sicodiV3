const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button type="button" onClick={handleClose}
          style={{
            display: "flex", justifyContent: "center", alignItems: "center", width: "25px", height: "25px", borderRadius: "100%"
          }}>
          X
        </button>
        {children}
      </section>
    </div>
  );
};

export default Modal;