import classNames from 'classnames';
import { useField } from 'formik';
import { ChangeEventHandler, forwardRef, HTMLProps, Ref } from 'react';

export const defaultTextFieldClasses = 'bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition';

type ExtendedInputProps = Omit<HTMLProps<HTMLInputElement>, 'ref'>;
export interface TextFieldProps extends ExtendedInputProps {
  name: string,
  label?: string,
  ref?: Ref<HTMLInputElement>
};

const TextField: React.FC<TextFieldProps> = forwardRef<HTMLInputElement, TextFieldProps>(({
  name,
  label,
  className,
  onChange,
  type,
  children,
  ...props
}, ref) => {
  const [field] = useField(name);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    field.onChange(event);

    if (!onChange) return;

    onChange(event);
  };

  return (
    <div
      className='relative'
    >
      {label && <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 transition"
      >
        {label}
      </label>}
      {children}
      <input
        {...field}
        {...props}
        type={type}
        id={name}
        onChange={changeHandler}
        className={classNames(
          defaultTextFieldClasses,
          className
        )}
        ref={ref}
      />
    </div>
  );
});

TextField.displayName = 'TextField';

export default TextField;
