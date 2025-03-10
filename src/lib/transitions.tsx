
import { Transition } from 'react-transition-group';

export const pageTransitionDuration = 300;

export const pageTransitionStyles = {
  entering: { opacity: 0, transform: 'scale(0.98)' },
  entered: { opacity: 1, transform: 'scale(1)' },
  exiting: { opacity: 0, transform: 'scale(0.98)' },
  exited: { opacity: 0, transform: 'scale(0.98)' },
};

export const defaultTransitionStyle = {
  transition: `opacity ${pageTransitionDuration}ms ease-in-out, transform ${pageTransitionDuration}ms ease-in-out`,
  opacity: 0,
};

export interface TransitionProps {
  in: boolean;
  children: React.ReactNode;
  onExited?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const PageTransition: React.FC<TransitionProps> = ({
  in: inProp,
  children,
  onExited,
  className = '',
  style = {},
}) => {
  return (
    <Transition in={inProp} timeout={pageTransitionDuration} onExited={onExited} unmountOnExit>
      {(state) => (
        <div
          style={{
            ...defaultTransitionStyle,
            ...pageTransitionStyles[state as keyof typeof pageTransitionStyles],
            ...style,
          }}
          className={`w-full ${className}`}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};
