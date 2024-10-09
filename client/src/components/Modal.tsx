import { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import MultiSelect from './MultiSelect';

export default function Modal() {
  const [open, setOpen] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleMultiSelectChange = (selected: string[]) => {
    setSelectedOptions(selected);
  };

  const setPreferenceHandler = () => {
    // Retrieve the current userClicks from localStorage
    const storedClicks = localStorage.getItem('userClicks');

    // Parse the stored array or initialize an empty array if it doesn't exist
    const userClicks = storedClicks ? JSON.parse(storedClicks) : [];

    // Merge the selectedOptions array into the userClicks array
    const updatedUserClicks = [...userClicks, ...selectedOptions];

    // Store the updated array back into localStorage
    localStorage.setItem('userClicks', JSON.stringify(updatedUserClicks));

    // Store the selected options in localStorage
    localStorage.setItem(
      'newsFeedPreferences',
      JSON.stringify(selectedOptions)
    );

    // Close the modal
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-10">
              <div className="">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h1"
                    className="font-semibold leading-6 text-gray-900 text-center text-2xl tracking-tight"
                  >
                    Make the newsfeed,{' '}
                    <span className="text-blue-600 font-extrabold">
                      your feed
                    </span>
                  </DialogTitle>
                  <p className="text-center mb-4 mt-2 text-gray-500 text-sm">
                    Supercharge your feed with articles you'll love reading !
                  </p>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500">
                      {/* Group */}
                      <div className="">
                        <MultiSelect
                          options={[
                            { label: 'Top Stories', value: 'top stories' },
                            { label: 'Sports', value: 'sports' },
                            { label: 'World', value: 'world' },
                            { label: 'Technology', value: 'technology' },
                            { label: 'Health', value: 'health' },
                            { label: 'Science', value: 'science' },
                            { label: 'Entertainment', value: 'entertainment' },
                            { label: 'Business', value: 'business' },
                          ]}
                          selectedValues={selectedOptions}
                          onChange={handleMultiSelectChange}
                        />
                        {/* <p className="mt-4">
                          Current Selection: {selectedOptions.join(', ')}
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={setPreferenceHandler}
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
              >
                Set your preferences
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
