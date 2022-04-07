import React from "react";

import Stop from "./Stop";

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
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
        //this.props.removeStop(this.props.stop.id);
        return <p>Stop doesn't exist</p>
      }
  
      return this.props.children; 
    }
  }

export default ErrorBoundary;