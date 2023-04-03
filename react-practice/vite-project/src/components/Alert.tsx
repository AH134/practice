import { ReactNode } from "react";

interface AlertProps {
  children: ReactNode; // ReactNode pass html content
  onClose: () => void;
}

const Alert = ({ children, onClose  }: AlertProps) => {
  return (
    <div className="alert alert-primary alert-dismissable">
        {children}
        <button type="button" className="btn-close" onClick={onClose} data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
};

export default Alert;
