import { Switch as HeadlessSwitch } from '@headlessui/react';
import { useField } from 'formik';

interface SwitchProps {
  name: string,
  label?: string
};

const Switch: React.VFC<SwitchProps> = ({
  name,
  label
}) => {
  const [{ value }, _, { setValue }] = useField<boolean>(name);

  return (
    <div
      className='flex items-center space-x-2'
    >
      <HeadlessSwitch
        checked={value}
        onChange={setValue}
        className={`${
          value ? 'bg-blue-600' : 'bg-gray-200'
        } transition relative inline-flex items-center h-6 rounded-full w-11`}
      >
        <span
          className={`${
            value ? 'translate-x-6' : 'translate-x-1'
          } transform transition inline-block w-4 h-4 bg-white dark:bg-gray-800 rounded-full`}
        />
      </HeadlessSwitch>
      {label && <span className='w-3/4 md:w-[90%] dark:text-white transition'>{label}</span>}
    </div>
  );
};

export default Switch;
