import {useState, useEffect} from 'react';

const cachedScripts: string[] = [];
type TEmptyFn = () => void;

export const useScript = (src: string): number => {
  // -1 - error
  //  0 - start loading
  //  1 - loaded
  const [status, setStatus] = useState(0);

  useEffect((): TEmptyFn | undefined => {
    if (cachedScripts.includes(src)) {
      setStatus(1);
      return;
    }

    cachedScripts.push(src);

    // Create script
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    // Script event listener callbacks for load and error
    const onScriptLoad = (): void => setStatus(1);

    const onScriptError = (): void => {
      // Remove from cachedScripts we can try loading again
      const index = cachedScripts.indexOf(src);
      if (index >= 0) {
        cachedScripts.splice(index, 1);
      }
      script.remove();

      setStatus(-1);
    };

    script.addEventListener('load', onScriptLoad);
    script.addEventListener('error', onScriptError);

    // Add script to document body
    document.body.appendChild(script);

    // Remove event listeners on cleanup
    return (): void => {
      script.removeEventListener('load', onScriptLoad);
      script.removeEventListener('error', onScriptError);
    };
    // Only re-run effect if script src changes
  }, [src]);

  return status;
};
