import { useField } from 'formik';
import { ChangeEventHandler, HTMLProps } from 'react';

interface SliderProps extends HTMLProps<HTMLInputElement> {
  name: string,
  label?: string
};

const Slider: React.VFC<SliderProps> = ({
  name,
  label,
  ...props
}) => {
  const [{ value }, _, { setValue }] = useField<number>(name);

  const inputHandler: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setValue(parseInt(event.target.value));
  };

  return (
    <div
      className='flex items-center'
    >
      <input
        {...props}
        onChange={inputHandler}
        value={value}
        className='transition cursor-pointer w-full'
        type="range"
      />
      {label && <span
        className='ml-2'
      >{label}</span>}
    </div>
  );
};

export default Slider;
