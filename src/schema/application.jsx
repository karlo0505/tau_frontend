import * as yup from "yup";

export const applicationSchema = yup.object().shape({
    typeOfVehicle: yup.string().required("Please select your vehicle type"),
    applicationType: yup.string().required("Please select your application Type"),
    plateNumber: yup.string().required("Please enter your vehicle plate number"),
});