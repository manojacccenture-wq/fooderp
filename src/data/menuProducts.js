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
  { itemNo: "401", title: "Mutton Gravy", price: "160", isVeg: false, image: image1 },
  { itemNo: "403", title: "Chicken Biriyani", price: "180", isVeg: false, image: image2 },
  { itemNo: "402", title: "Non veg thali", price: "120", isVeg: false, image: image2 },
  { itemNo: "203", title: "Veg Thali", price: "160", isVeg: true, image: image3 },
  { itemNo: "204", title: "Panner Gravy", price: "160", isVeg: true, image: image4 },
];
