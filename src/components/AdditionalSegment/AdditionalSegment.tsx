import { Disclosure, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

interface AdditionalSegmentProps {
  text: string,
  durationClass: string
};

const AdditionalSegment: React.FC<AdditionalSegmentProps> = ({
  text,
  durationClass,
  children
}) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div
          className='relative w-full'
        >
          <Disclosure.Button
            className='flex justify-between items-center w-full px-4 py-3 bg-blue-500 text-white rounded-lg'
          >
            <div>{text}</div>
            <div
              className='h-5 w-5'
            >
              <ChevronRightIcon
                className={classNames(
                  `transition ${durationClass}`,
                  { 'transform rotate-90': open }
                )}
              />
            </div>
          </Disclosure.Button>

          <Transition
            enter={`transition ${durationClass} ease-out`}
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave={`transition ${durationClass} ease-out`}
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel
              className='px-4 py-3'
            >
              {children}
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
};

export default AdditionalSegment;
