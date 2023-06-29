import Swal from "sweetalert2"

export function getSuccessToast(title: string, message: string): typeof Swal {
  return Swal.mixin({
    icon: "success",
    titleText: title,
    text: message,
    toast: true,
    position: "top",
    showConfirmButton: true,
    confirmButtonText: "Ok",
    width: "42em",
  })
}