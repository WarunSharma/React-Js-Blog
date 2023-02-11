import {useState, useEffect} from 'react';

// Defining custom hooks useWindowSize
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
      // Use IIFE
      function handleResize() {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
      }

      handleResize();

      // Added eventListener on resize event of window
      window.addEventListener("resize", handleResize);

      // Cleanup is used to avoid memory leak
      const cleanUp = () => {
        console.log("runs when dependency changes");
        window.removeEventListener("resize", handleResize);
      } 

      return cleanUp;
    }, [])
    
    return windowSize;
}

export default useWindowSize;