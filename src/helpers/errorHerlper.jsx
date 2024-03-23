export const _ = {
  isEmpty: (object) => {
    const empty =
      Object.keys(object).length === 0 && object.constructor === Object;
    return empty;
  },
};

export const paymentHelper = (type, vehicle) => {
  switch (type) {
    case "student":
      if (vehicle === "motorcycle") {
        return 25;
      }
      if (vehicle === "tricycle") {
        return 50;
      }
      if (vehicle === "4wheels") {
        return 75;
      }

      break;
    case "employee":
      if (vehicle === "motorcycle") {
        return 50;
      }
      if (vehicle === "tricycle") {
        return 75;
      }
      if (vehicle === "4wheels") {
        return 100;
      }
      break;

    default:
      if (vehicle === "motorcycle") {
        return 75;
      }
      if (vehicle === "tricycle") {
        return 125;
      }
      if (vehicle === "4wheels") {
        return 150;
      }
  }
};
