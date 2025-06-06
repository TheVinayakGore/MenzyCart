import React, { useEffect, useState } from "react";

const LoadingBar: React.FC<{ loading: boolean }> = ({ loading }) => {
  const [visible, setVisible] = useState(loading);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisible(loading);
    }, 300);

    return () => clearTimeout(timeoutId); 
  }, [loading]);

  if (!visible) return null;

  return (
    <div className="loading-bar fixed top-0">
      <div className="loading-bar-inner" />
    </div>
  );
};

export default LoadingBar;
