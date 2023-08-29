import Swal from "sweetalert2";

const Mixin = ({ title, color, icon, timer, position, toast }) => {
    const Toast = Swal.mixin ({
        toast: toast,
        position: position,
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
        didOpen: toast => {
          toast.addEventListener ('mouseenter', Swal.stopTimer);
          toast.addEventListener ('mouseleave', Swal.resumeTimer);
        },
      });
  
      Toast.fire ({
        color: color,
        icon: icon,
        title: title,
      })
}

const response = ( position, icon, title, text, color, timer ) => {
    Swal.fire({
        position: position,
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: false,
        timer: timer,
        color: color
      })
}

export { Mixin, response}