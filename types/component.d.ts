/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { ReactElement, ReactNode, ValidationMap, WeakValidationMap } from 'react';

declare global {
  namespace Relay {
    type PropsWithChildren<TProps> = TProps & { children: ReactNode };

    interface FCWithChildren<TProps = {}> {
      (props: PropsWithChildren<TProps>, context?: any): ReactElement<any, any> | null;
      propTypes?: WeakValidationMap<TProps>;
      contextTypes?: ValidationMap<any>;
      defaultProps?: Partial<TProps>;
      displayName?: string;
    }

    type PropsWithOptionalChildren<TProps> = TProps & { children?: ReactNode };

    interface FCWithOptionalChildren<TProps = {}> extends Omit<FCWithChildren, ''> {
      (props: PropsWithOptionalChildren<TProps>, context?: any): ReturnType<FCWithChildren>;
    }

    // Omit<FCWithChildren, ''> allows us to override the function defined on the first line of the FCWithChildren interface
    interface FC<TProps = {}> extends Omit<FCWithChildren, ''> {
      (props: TProps, context?: any): ReturnType<FCWithChildren>;
    }
  }
}
