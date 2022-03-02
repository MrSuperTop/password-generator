import classNames from 'classnames';
import { HTMLProps } from 'react';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset',
  variant?: 'blue' | 'yellow' | 'light'
};

const variantClasses = {
  blue: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
  yellow: 'bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 dark:focus:ring-yellow-900 text-gray-900',
  light: 'text-gray-900 border bg-white border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800'
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'blue',
  ...props
}) => {
  return (
    <button
      className={classNames(
        className,
        variantClasses[variant],
        'focus:ring focus:ring-offset-2 transition font-medium rounded-lg text-sm px-5 py-2.5 text-center w-auto'
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
