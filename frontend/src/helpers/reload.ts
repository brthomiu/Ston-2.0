import { useEffect } from 'react';

// toggleReload
// Takes the reload state parameters and toggles the boolean to trigger a component rerender
export const toggleReload = (
  reload: boolean,
  setReload: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!reload) {
    setReload(true);
  } else {
    setReload(false);
  }
};

// useReload
// Hook to re-render component
export const useReload = (reload: boolean) => {
  // useEffect hook to re-render components when triggered by the reload boolean being toggled
  useEffect(() => {}, [reload]);
};
