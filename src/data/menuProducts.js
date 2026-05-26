import image1 from "../assets/menu/avocadoSandwich.png";
import image2 from "../assets/menu/non-veg-thali.png";
import image3 from "../assets/menu/veg-thali.png";
import image4 from "../assets/menu/paneer.png";

export const CATEGORIES = [
  "All Dishes",
  "Veg",
  "Non Veg",
  "Desert"
];

export const MENU_PRODUCTS = [
  {
    itemNo: "401", title: "Mutton Gravy", price: "160", isVeg: false, image: image1,
    specialInstructionGroups: [
      { key: "spiceLevel", title: "Spice Level", selectionType: "single", options: ["Mild", "Medium", "Heavy"] },
      { key: "ingredients", title: "Ingredients", selectionType: "multiple", options: ["No Onion", "No Garlic"] }
    ]
  },
  {
    itemNo: "403", title: "Chicken Biriyani", price: "180", isVeg: false, image: image2,
    specialInstructionGroups: [
      { key: "spiceLevel", title: "Spice Level", selectionType: "single", options: ["Mild", "Medium", "Heavy"] },
      { key: "ingredients", title: "Ingredients", selectionType: "multiple", options: ["No Onion", "No Garlic"] },
      { key: "preparations", title: "Preparations", selectionType: "multiple", options: ["Extra gravy", "Well Fry"] }
    ]
  },
  { itemNo: "402", title: "Non veg thali", price: "120", isVeg: false, image: image2 },
  { itemNo: "203", title: "Veg Thali", price: "160", isVeg: true, image: image3 },
  { itemNo: "204", title: "Panner Gravy", price: "160", isVeg: true, image: image4 },
  {
    itemNo: "205", title: "Fresh Juice", price: "80", isVeg: true, image: image4,
    specialInstructionGroups: [
      { key: "sugarLevels", title: "Sugar Levels", selectionType: "single", options: ["No Sugar", "Less Sugar", "Normal Sugar"] },
      { key: "temperature", title: "Temperature", selectionType: "single", options: ["Cold", "Normal"] },
      { key: "extras", title: "Extras", selectionType: "multiple", options: ["Extra Ice", "No Ice"] }
    ]
  },
  {
    itemNo: "206", title: "Margherita Pizza", price: "250", isVeg: true, image: image3,
    specialInstructionGroups: [
      { key: "toppings", title: "Toppings", selectionType: "multiple", options: ["Extra Cheese", "No Onion", "Olives"] },
      { key: "crust", title: "Crust", selectionType: "single", options: ["Thin Crust", "Cheese Burst"] },
      { key: "spiceLevels", title: "Spice Levels", selectionType: "single", options: ["Mild", "Medium", "Spicy"] }
    ]
  },
  { itemNo: "999", title: "Test Item (1 Rupee)", price: "1", isVeg: true, image: image4 }
];
