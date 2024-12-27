import React, { useState, useEffect, ReactNode } from 'react';
import spinner from '@/assets/spinner.gif';

interface LoadingWrapperProps {
  children: ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // 1-second delay
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return isLoading ? (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    }}>
      <img src={spinner} alt="Loading..." width="60" />
    </div>
  ) : (
    <>{children}</>
  );
};

export default LoadingWrapper;
