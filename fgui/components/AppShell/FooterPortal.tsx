import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { FOOTER_ID } from '.';

type Props = {
  children?: React.ReactNode;
};
const FooterPortal: React.FC<Props> = ({ children }) => {
  const footerRef = useRef(document.getElementById(FOOTER_ID));
  return footerRef.current ? ReactDOM.createPortal(children, footerRef.current) : null;
};

export default FooterPortal;
