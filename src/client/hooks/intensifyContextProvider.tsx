import 'reflect-metadata';
import { Container, interfaces } from 'inversify';
import React, { useContext } from 'react';

const InversityContext = React.createContext<{ container: Container | null }>({
    container: null
});

type Props = {
    container: Container;
    children: React.ReactNode;
}

export const InversityContextProvider: React.FC<Props> = ({ container, children }) => (
    <InversityContext.Provider
        value={{ container, }}
    >
        {children}
    </InversityContext.Provider>
);

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
    const { container } = useContext(InversityContext);

    if (!container) {
        throw new Error();
    }

    return container.get<T>(identifier);
}