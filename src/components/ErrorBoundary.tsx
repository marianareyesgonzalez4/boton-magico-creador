import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  // Update state so the next render will show the fallback UI.
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  // You can also log the error to an error reporting service
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // Example: logErrorToMyService(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', border: '1px solid #ff0000', margin: '20px' }}>
          <h2>Oops! Something went wrong.</h2>
          <p>{this.props.fallbackMessage || "We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists."}</p>
          {/* You could add a button to try reloading the component or app */}
          {/* <button onClick={() => window.location.reload()}>Refresh Page</button> */}
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
