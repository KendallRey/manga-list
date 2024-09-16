import Swal, { SweetAlertOptions } from "sweetalert2";

export const CSwal = async (props: SweetAlertOptions) => {
  const { showCancelButton, showConfirmButton, reverseButtons, confirmButtonText, showCloseButton, ...cleanProps } =
    props;

  const swal = await Swal.fire({
    title: "Confirmation Needed",
    showCancelButton: showCancelButton || true,
    showConfirmButton: showConfirmButton || true,
    reverseButtons: reverseButtons || true,
    confirmButtonText: confirmButtonText || "Save",
    showCloseButton: true,
    focusConfirm: false,
    ...cleanProps,
  });

  return swal;
};
