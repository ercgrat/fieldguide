import React, { useEffect, useRef, useState } from 'react';
import { createStyles, Footer as MantineFooter } from '@mantine/core';
import ReactDOM from 'react-dom';

const FOOTER_ID = 'field-guide-footer-root';

type Props = {
  children?: React.ReactNode;
};
export const FooterPortal: React.FC<Props> = ({ children }) => {
  const footerRef = useRef(document.getElementById(FOOTER_ID));
  return footerRef.current ? ReactDOM.createPortal(children, footerRef.current) : null;
};

const useStyles = createStyles(() => ({
  inner: {
    height: 'fit-content'
  }
}));

const Footer: React.FC = () => {
  const { classes } = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const observer = new MutationObserver(entries => {
      entries.forEach(entry => {
        setHeight((entry.target as HTMLElement).scrollHeight);
      });
    });

    const footer = ref.current;
    if (footer) {
      observer.observe(footer, {
        childList: true,
        subtree: true
      });
      return () => {
        observer.disconnect();
      };
    }
  });

  return (
    <MantineFooter height={height} ref={ref}>
      <div className={classes.inner} id={FOOTER_ID}>
        {null}
      </div>
    </MantineFooter>
  );
};

export default React.memo(Footer);
