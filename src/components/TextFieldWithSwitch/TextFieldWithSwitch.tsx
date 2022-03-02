import Switch from '@components/ui/Switch/Switch';
import TextField from '@components/ui/TextField/TextField';
import { useField } from 'formik';
import { ChangeEventHandler, useState } from 'react';

interface TextFieldWithSwitchProps {
  label: string,
  switchName: string,
  textFieldName: string
};

const TextFieldWithSwitch: React.VFC<TextFieldWithSwitchProps> = ({
  label,
  switchName,
  textFieldName
}) => {
  const [_, __, { setValue }] = useField<boolean>(switchName);
  const [prevValue, setPrevValue] = useState('');

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.value !== '' && prevValue === '') {
      setValue(true);
    }

    setPrevValue(event.target.value);
  };

  return (
    <div
      className='flex flex-col space-y-2'
    >
      <Switch
        label={label}
        name={switchName}
      />
      <TextField
        name={textFieldName}
        onChange={changeHandler}
      />
    </div>
  );
};

export default TextFieldWithSwitch;
