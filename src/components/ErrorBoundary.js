import React, { Component } from 'react';
import ErrorPage from '../pages/ErrorPage';

// In React 16, error boundaries can only be class components
export default class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {

        if (this.state.hasError) {
            // render custom fallback UI
            return <ErrorPage />
        } else {
            return this.props.children;
        }
  }
}
