import AdditionalSegment from '@components/AdditionalSegment/AdditionalSegment';
import CopyButton from '@components/CopyButton/CopyButton';
import TextFieldWithSwitch from '@components/TextFieldWithSwitch/TextFieldWithSwitch';
import TopBar from '@components/TopBar/TopBar';
import Button from '@components/ui/Button/Button';
import Slider from '@components/ui/Slider/Slider';
import Switch from '@components/ui/Switch/Switch';
import TextField from '@components/ui/TextField/TextField';
import { Form, Formik } from 'formik';
import type { NextPage } from 'next';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { FormValues } from 'src/types/formValues';
import { copyPassword } from 'src/utils/copyPassword';
import { generatePassword } from 'src/utils/generatePassword';

export const localDataKey = 'persistedFormData';
export const localThemeKey = 'persistedThemeState';

let initialValues: FormValues = {
  length: 32,
  password: '',
  lowercase: true,
  uppercase: true,
  specialSymbols: true,
  numbers: true,
  autoCopy: false,
  charsToExclude: '',
  customCharset: '',
  toUseCustomCharset: false,
  toExclude: false,
  persistState: true
};


const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, setFieldValue }) => {
        const password = generatePassword(values);
  
        if (password.length !== 0) {
          setFieldValue('password', password);
          toast.success('Generated your password');

          if (values.autoCopy) {
            copyPassword(password);
          }
        } else {
          toast.error('Settings are invalid and don\'t give any output');
        }

        setSubmitting(false);
      }}
    >
      {({ resetForm, values }) => (
        <>
          <TopBar />
          <div
            ref={containerRef}
            className='h-screen flex items-start pt-4 md:mt-0 md:items-center justify-center text-sm md:text-base dark:bg-gray-900'
          >
            <Form
              className='w-3/4 md:w-1/2 lg:1/3 flex space-y-4 flex-col justify-start'
            >
              <div
                className='flex flex-col justify-center space-y-3'
              >
                <div
                  className='font-medium text-xl dark:text-white transition'
                >Your password</div>
                <TextField
                  ref={inputRef}
                  className='pr-14'
                  name='password'
                >
                  <CopyButton
                    inputRef={inputRef}
                  />
                </TextField>
                <TextField
                  label='Length'
                  name='length'
                />
                <Slider
                  name='length'
                  min={0}
                  step={16}
                  max={256}
                ></Slider>
                <div
                  className='flex flex-col space-y-1'
                >
                  <Switch
                    label='Use uppercase letters'
                    name='uppercase'
                  />
                  <Switch
                    label='Use lowercase letters'
                    name='lowercase'
                  />
                  <Switch
                    label='Use special symbols'
                    name='specialSymbols'
                  />
                  <Switch
                    label='Use numbers'
                    name='numbers'
                  />
                </div>
                <AdditionalSegment
                  durationClass='duration-200'
                  text='Additional settings for the charset'
                >
                  <div
                    className='flex space-y-2 flex-col'
                  >
                    <TextFieldWithSwitch
                      label='Exclude characters from the charset'
                      switchName='toExclude'
                      textFieldName='charsToExclude'
                    />
                    <TextFieldWithSwitch
                      label='Use custom charset'
                      switchName='toUseCustomCharset'
                      textFieldName='customCharset'
                    />
                  </div>
                </AdditionalSegment>
                <Switch
                  label='Automatically copy your new password to the clipboard'
                  name='autoCopy'
                />
                <Switch
                  label='Persist settings and theme between sessions'
                  name='persistState'
                />
              </div>
              <div
                className='flex w-full justify-center space-x-2'
              >
                <Button
                  type='submit'
                >
                  Generate Password
                </Button>
                <Button
                  onClick={() => {
                    toast.success('Form values reset');
                    resetForm({
                      values: {
                        ...initialValues,
                        password: values.password
                      }
                    });
                  }}
                  variant='yellow'
                  type='button'
                >
                  Reset
                </Button>
              </div>
            </Form>
          </div>
        </>
      )}
    </Formik>
  );
};

export default Home;
