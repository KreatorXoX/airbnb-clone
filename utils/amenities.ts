export type Amenitiy = {
  id: string;
  label: string;
  type: "basic" | "standout" | "safety";
  iconUrl: string;
};
export const amenities: Amenitiy[] = [
  {
    id: "101",
    label: "Air conditioning",
    type: "basic",
    iconUrl: "/images/amenities/Airconditioner.svg",
  },
  {
    id: "102",
    label: "Barbecue grill",
    type: "standout",
    iconUrl: "/images/amenities/Barbecue.svg",
  },
  {
    id: "103",
    label: "Beach access",
    type: "standout",
    iconUrl: "/images/amenities/Beach.svg",
  },
  {
    id: "104",
    label: "Carbon monoxide alarm",
    type: "safety",
    iconUrl: "/images/amenities/CarbonAlarm.svg",
  },
  {
    id: "105",
    label: "Exercise equipment",
    type: "standout",
    iconUrl: "/images/amenities/Exercise.svg",
  },
  {
    id: "106",
    label: "Fire exinguisher",
    type: "safety",
    iconUrl: "/images/amenities/FireExtinguisher.svg",
  },
  {
    id: "107",
    label: "Indoor fireplace",
    type: "standout",
    iconUrl: "/images/amenities/Fireplace.svg",
  },
  {
    id: "108",
    label: "Fire pit",
    type: "standout",
    iconUrl: "/images/amenities/Firepit.svg",
  },
  {
    id: "109",
    label: "First aid kit",
    type: "safety",
    iconUrl: "/images/amenities/FirstAidKit.svg",
  },
  {
    id: "110",
    label: "Free parking on premises",
    type: "basic",
    iconUrl: "/images/amenities/Freeparking.svg",
  },
  {
    id: "111",
    label: "Hot tub",
    type: "standout",
    iconUrl: "/images/amenities/Hottub.svg",
  },
  {
    id: "112",
    label: "Kitchen",
    type: "basic",
    iconUrl: "/images/amenities/Kitchen.svg",
  },
  {
    id: "113",
    label: "Lake access",
    type: "standout",
    iconUrl: "/images/amenities/Lake.svg",
  },
  {
    id: "114",
    label: "Outdoor dining area",
    type: "standout",
    iconUrl: "/images/amenities/Outdoordining.svg",
  },
  {
    id: "115",
    label: "Outdoor shower",
    type: "standout",
    iconUrl: "/images/amenities/OutdoorShower.svg",
  },
  {
    id: "116",
    label: "Paid parking on premises",
    type: "basic",
    iconUrl: "/images/amenities/Paidparking.svg",
  },
  {
    id: "117",
    label: "Piano",
    type: "standout",
    iconUrl: "/images/amenities/Piano.svg",
  },
  {
    id: "118",
    label: "Pool",
    type: "standout",
    iconUrl: "/images/amenities/Pool.svg",
  },
  {
    id: "119",
    label: "Pool table",
    type: "standout",
    iconUrl: "/images/amenities/Pooltable.svg",
  },
  {
    id: "120",
    label: "Smoke alarm",
    type: "safety",
    iconUrl: "/images/amenities/SmokeAlarm.svg",
  },
  {
    id: "121",
    label: "Tv",
    type: "basic",
    iconUrl: "/images/amenities/Tv.svg",
  },
  {
    id: "122",
    label: "Washer",
    type: "basic",
    iconUrl: "/images/amenities/Washer.svg",
  },
  {
    id: "123",
    label: "Wifi",
    type: "basic",
    iconUrl: "/images/amenities/Wifi.svg",
  },
  {
    id: "124",
    label: "Dedicated workspace",
    type: "basic",
    iconUrl: "/images/amenities/Workspace.svg",
  },
];
