"use client"

import Swal from "sweetalert2"

export function getWarningToast(title: string, message: string): typeof Swal {
  return Swal.mixin({
    icon: "warning",
    titleText: title,
    text: message,
    toast: true,
    position: "top",
    showConfirmButton: true,
    confirmButtonText: "Ok",
    timer: 3000,
    timerProgressBar: true,
    width: "42em",
  })
}
