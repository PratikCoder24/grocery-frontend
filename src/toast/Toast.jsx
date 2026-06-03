import React from 'react';

import {
    ToastContainer,
    toast
} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const successToast = (msg) => {
    toast.success(msg);
};

export const errorToast = (msg) => {
    toast.error(msg);
};

export const infoToast = (msg) => {
    toast.info(msg);
};

export const deleteToast = (message, onConfirm) => {

    toast.info(
        ({ closeToast }) => (

            <div className="flex flex-col gap-4">

                <p className="text-sm">
                    {message}
                </p>

                <div className="flex justify-end gap-2">

                    <button
                        onClick={() => {
                            onConfirm();
                            closeToast();
                        }}
                        className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-3
                            py-1
                            rounded-md
                            text-sm
                        "
                    >
                        Delete
                    </button>

                    <button
                        onClick={closeToast}
                        className="
                            bg-gray-600
                            hover:bg-gray-700
                            text-white
                            px-3
                            py-1
                            rounded-md
                            text-sm
                        "
                    >
                        Cancel
                    </button>

                </div>

            </div>
        ),
        {
            autoClose: false,
            closeOnClick: false,
        }
    );
};

const Toast = () => {

    return (

        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
        />

    );
};

export default Toast;