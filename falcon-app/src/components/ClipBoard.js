import React from 'react';
import Swal from 'sweetalert2';

const CopyToClipboardLink = ({ text, children }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      const Toast = Swal.mixin ({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: toast => {
          toast.addEventListener ('mouseenter', Swal.stopTimer);
          toast.addEventListener ('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire ({
        icon: 'success',
        title: "Link copied to ClipBoard",
      });
    } 
    catch (err) {
        const Toast = Swal.mixin ({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: toast => {
              toast.addEventListener ('mouseenter', Swal.stopTimer);
              toast.addEventListener ('mouseleave', Swal.resumeTimer);
            },
          });
  
          Toast.fire ({
            icon: 'failed',
            title: `Failed to copy link to clipboard`,
          })
    }
  };

  return (
    <a href onClick={handleCopy}>
      {children}
    </a>
  );
};

export default CopyToClipboardLink;
