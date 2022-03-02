import { ClipboardIcon } from '@heroicons/react/outline';
import { MouseEventHandler, MutableRefObject } from 'react';
import { copyPassword } from 'src/utils/copyPassword';

interface CopyButtonProps {
  inputRef: MutableRefObject<HTMLInputElement | null>
};

const CopyButton: React.VFC<CopyButtonProps> = ({
  inputRef
}) => {
  const clickHandler: MouseEventHandler<HTMLButtonElement> = async () => {
    if (!inputRef.current) return;

    copyPassword(inputRef.current.value);
  };

  return (
    <button
      onClick={clickHandler}
      className="flex absolute inset-y-0 right-0 items-center my-1 mr-3 p-1.5 cursor-pointer rounded-lg focus:ring transition"
      type='button'
    >
      <ClipboardIcon
        className='w-5 h-5 text-gray-500 dark:text-gray-400'
      />
    </button>
  );
};

export default CopyButton;
