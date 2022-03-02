import { useFormikContext } from 'formik';
import { useLayoutEffect, useState } from 'react';
import { localThemeKey } from 'src/pages';
import { FormValues } from 'src/types/formValues';

type themeVariants = 'light' | 'dark';
const useTheme = (
  defaultTheme: themeVariants
) => {
  const { values: { persistState } } = useFormikContext<FormValues>();
  const [theme, setTheme] = useState<themeVariants>(defaultTheme);

  useLayoutEffect(() => {
    const readValue = localStorage.getItem(localThemeKey) as themeVariants;

    if (!readValue) return;

    if (readValue === 'dark') {
      document.querySelector('body')?.classList.add('dark');
    }

    setTheme(readValue);
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const newValue = prev === 'light' ? 'dark' : 'light';

      if (persistState) {
        localStorage.setItem(localThemeKey, newValue);
      }

      return newValue;
    });

    document.querySelector('body')?.classList.toggle('dark');
  };

  const set = (newValue: themeVariants) => {
    const classList = document.querySelector('body')?.classList;
    setTheme(defaultTheme);

    if (newValue === 'dark') {
      classList?.add('dark');
    } else {
      classList?.remove('dark');
    }
  };

  return {
    theme,
    toggle,
    set
  };
};

export default useTheme;
