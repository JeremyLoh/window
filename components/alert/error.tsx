import Swal from "sweetalert2"

export const errorToast: typeof Swal = Swal.mixin({
  icon: "info",
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  width: "42em",
})
