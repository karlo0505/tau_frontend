import * as yup from "yup";

export const dLicenseSchema = yup.object().shape({
  dLicenseExp: yup.string().required("Driver's license expiration date is required"),
});


export const mpPermitSchema = yup.object().shape({
  mpPermitExp: yup.string().required("Mayor's permit expiration date is required"),
});

export const crRegisterSchema = yup.object().shape({
  crRegisterExp: yup.string().required("Vehicle certificate of registration expiration date is required"),
});


export const orRecieptSchema = yup.object().shape({
  orRecieptExp: yup.string().required("Vehicle offcial reciept expiration date is required"),
});

export const studentIdSchema = yup.object().shape({
  studentIdExp: yup.string().required("Student ID expiration date is required"),
});


export const employeeIdSchema = yup.object().shape({
  employeeIdExp: yup.string().required("Employee ID expiration date is required"),
});
