
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  // Fix: Making children optional to resolve "Property 'children' is missing" errors in consumer files like index.tsx
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// Fix: Explicitly using Component from the react import to ensure 'props' and 'state' are correctly inherited and typed
export class ErrorBoundary extends Component<Props, State> {
  // Fix: Using class property initialization for 'state' to ensure 'this.state' is recognized
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render(): ReactNode {
    // Fix: Using this.state and this.props which are now properly inherited from the base Component class
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#fff', color: '#000', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#d32f2f' }}>Algo deu errado na renderização.</h1>
          <p><strong>Erro:</strong> {this.state.error?.message}</p>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', overflow: 'auto', borderRadius: '4px' }}>
            {this.state.error?.stack}
          </pre>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Recarregar Aplicação
          </button>
        </div>
      );
    }

    // Fix: Accessing this.props.children which is provided by the Component base class
    return this.props.children;
  }
}
