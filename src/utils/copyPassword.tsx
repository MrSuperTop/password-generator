import toast from 'react-hot-toast';

export const copyPassword = (
  password: string
) => {
  toast.promise(
    navigator.clipboard.writeText(password),
    {
      loading: 'Coping...',
      success: <b>Copied</b>,
      error: <b>Wasn&apos;t able to copy</b>,
    }
  );
};
