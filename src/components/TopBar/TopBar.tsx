import Button from '@components/ui/Button/Button';
import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { useFormikContext } from 'formik';
import { omit } from 'lodash-es';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import useTheme from 'src/hooks/useTheme';
import { localDataKey, localThemeKey } from 'src/pages';
import { FormValues } from 'src/types/formValues';

interface TopBarProps {};

const defaultTheme = 'light';

const TopBar: React.VFC<TopBarProps> = () => {
  const { values, setValues, resetForm, initialValues } = useFormikContext<FormValues>();
  const { toggle, theme, set } = useTheme(defaultTheme);

  // * Code that's responsible for the data being persisted in the localStorage
  useEffect(() => {
    const unloadHandler = () => {
      if (!values.persistState) return;

      localStorage.setItem(
        localDataKey,
        JSON.stringify(omit(values, 'password'))
      );
  
      return null;
    };

    window.addEventListener('beforeunload', unloadHandler);
  
    return () => {
      window.removeEventListener('beforeunload', unloadHandler);
    };
  }, [values]);

  useEffect(() => {
    const loadedData = localStorage.getItem(localDataKey);
  
    if (loadedData) {
      const parsedData: FormValues = JSON.parse(loadedData);
      if (!parsedData.persistState) return;

      setValues({
        ...parsedData,
        password: ' '
      });
    }
  }, [setValues]);

  const clearSettings = () => {
    set(defaultTheme);

    localStorage.removeItem(localDataKey);
    localStorage.removeItem(localThemeKey);

    resetForm({
      values: {
        ...initialValues,
        password: values.password
      }
    });

    toast.success('Settings cleared and form values reset');
  };

  return (
    <div
      className='fixed left-4 bottom-4 md:top-4 md:bottom-[90%] h-auto w-auto flex items-start'
    >
      <Button
        className='rounded-r-none border-r-0'
        onClick={clearSettings}
        variant='light'
      >
        Clear settings and reset
      </Button>
      <Button
        className='px-3 py-3  rounded-l-none'
        onClick={toggle}
        variant='light'
      >
        {theme === 'light' ? (
          <MoonIcon
            className='w-5 h-5'
          />
        ) : (
          <SunIcon
            className='w-5 h-5'
          />
        )}
      </Button>
    </div>
  );
};

export default TopBar;
