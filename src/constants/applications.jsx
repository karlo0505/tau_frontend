export const choiceType = {
  publicvehicle: "Public utility driver",
  employee: "Employee",
  student: "Student",
  others: "Others",
};

export const vhTpe = {
  motorcycle: "Motorycyle",
  tricycle: "Tricycle",
  "4wheels": "4 or more wheeled vehicle",
};

export const vehicles = [
  { value: "all", name: "All Vehicles" },
  { value: "motorcycle", name: "Motorycyle" },
  { value: "tricycle", name: "Tricycle" },
  { value: "4wheels", name: "4 or more wheeled vehicle" },
];

export function getYears() {
  let yearsArray = [];

  // Loop from 2022 to 2035 (inclusive) and push each year into the array
  for (let year = 2022; year <= 2035; year++) {
    yearsArray.push(year);
  }
  return yearsArray;
}

export const months = [
  {
    id: 1,
    value: 0,
    name: "January",
  },
  {
    id: 2,
    value: 1,
    name: "Fabruary",
  },
  {
    id: 3,
    value: 2,
    name: "March",
  },
  {
    id: 4,
    value: 3,
    name: "April",
  },
  {
    id: 5,
    value: 4,
    name: "May",
  },
  {
    id: 6,
    value: 5,
    name: "June",
  },
  {
    id: 7,
    value: 6,
    name: "July",
  },
  {
    id: 8,
    value: 7,
    name: " August",
  },
  {
    id: 9,
    value: 8,
    name: "September",
  },
  {
    id: 10,
    value: 9,
    name: "October",
  },
  {
    id: 11,
    value: 10,
    name: "November",
  },
  {
    id: 12,
    value: 11,
    name: "January",
  },
];
