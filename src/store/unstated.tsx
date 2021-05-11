import React from 'react';

// eslint-disable-next-line symbol-description
const EMPTY: unique symbol = Symbol();

export interface ContainerProviderProps<State> {
  initialState?: State;
  children: React.ReactNode;
}

export interface Container<Value, State> {
  Provider: React.ComponentType<ContainerProviderProps<State>>;
  useContainer: () => Value;
}

export function createContainer<Value, State>(
  useHook: (initialState?: State) => Value
): Container<Value, State> {
  const Context = React.createContext<Value | typeof EMPTY>(EMPTY);

  function Provider(props: ContainerProviderProps<State>) {
    const value = useHook(props.initialState);
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function useContainer(): Value {
    const value = React.useContext(Context);
    if (value === EMPTY) {
      throw new Error('Component must be wrapped with <Container.Provider>');
    }
    return value;
  }

  return { Provider, useContainer };
}

export function useContainer<Value, State>(
  container: Container<Value, State>
): Value {
  return container.useContainer();
}
