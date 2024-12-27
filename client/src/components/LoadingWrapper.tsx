import React, { useState, useEffect, ReactNode } from 'react';
import spinner from '@/assets/spinner.gif'; // Importing the spinner GIF for the loading animation

interface LoadingWrapperProps {
  children: ReactNode; // The child components to render after loading is complete
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // State to control loading status

  // useEffect to simulate a loading delay (1 second in this case)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // Sets loading to false after 1 second
    return () => clearTimeout(timer); // Cleanup function to clear the timer when the component is unmounted
  }, []); // Empty dependency array means this runs only once when the component mounts

  return isLoading ? (
    // When still loading, show the spinner in the center of the screen
    <div style={{
      display: 'flex',
      justifyContent: 'center', // Centers the spinner horizontally
      alignItems: 'center', // Centers the spinner vertically
      height: '100%', // Full height of the parent container
      width: '100%', // Full width of the parent container
    }}>
      <img src={spinner} alt="Loading..." width="60" /> {/* The loading spinner */}
    </div>
  ) : (
    // Once loading is complete, render the child components
    <>{children}</>
  );
};

export default LoadingWrapper;
