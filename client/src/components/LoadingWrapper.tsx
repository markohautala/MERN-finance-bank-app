import React, { useState, useEffect, ReactNode } from 'react';
import spinner from '@/assets/spinner.gif'; // Importing the spinner GIF for the loading animation

interface LoadingWrapperProps {
  children: ReactNode; // The child components to render after loading is complete
  fetchData: () => Promise<unknown>; // Function to fetch data
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children, fetchData }) => {
  const [isLoading, setIsLoading] = useState(true); // State to control loading status

  useEffect(() => {
    // Fetch data and set loading to false once data is retrieved
    const loadData = async () => {
      try {
        await fetchData(); // Fetch the data
        setIsLoading(false); // Set loading to false after data is retrieved
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Optionally handle errors by setting loading to false
      }
    };

    loadData(); // Call the function to load data
  }, [fetchData]); // Run effect when fetchData changes

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
