import image1 from '../assets/menu/veg-thali.png';
import image2 from '../assets/menu/non-veg-thali.png';
import image3 from '../assets/menu/paneer.png';
import image4 from '../assets/menu/avocadoSandwich.png';

export const CATEGORIES = [
  "All Dishes",
  "Alu",
  "Beverages",
  "Chopsuey",
  "Combo",
  "Dal",
  "Fried Rice",
  "Main Course",
  "South Indian",
  "Noodles",
  "Pan Fried",
  "Paneer",
  "Rice",
  "Raita",
  "Roti",
  "Soup",
  "Spl Chutney",
  "Starter",
  "Thali",
  "Veg",
  "Snacks",
  "EXTRA",
  "Consumable",
  "Product",
  "Snacks DBMS",
  "Namkeen Snacks"
];

export const MENU_PRODUCTS = [
  {
    itemNo: "100",
    title: "Alu Achari",
    price: "130",
    isVeg: true,
    image: image1,
    category: "Alu",
    specialInstructionGroups: []
  },
  {
    itemNo: "101",
    title: "Alu Do Pyaza",
    price: "110",
    isVeg: true,
    image: image1,
    category: "Alu",
    specialInstructionGroups: []
  },
  {
    itemNo: "102",
    title: "Alu Dum",
    price: "130",
    isVeg: true,
    image: image1,
    category: "Alu",
    specialInstructionGroups: []
  },
  {
    itemNo: "103",
    title: "Alu Gobi",
    price: "110",
    isVeg: true,
    image: image1,
    category: "Alu",
    specialInstructionGroups: []
  },
  {
    itemNo: "104",
    title: "Alu Matar",
    price: "130",
    isVeg: true,
    image: image1,
    category: "Alu",
    specialInstructionGroups: []
  },
  {
    itemNo: "700",
    title: "Butter Milk",
    price: "40",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "701",
    title: "Choice Of Ice Cream (2 Scoop)",
    price: "60",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "702",
    title: "Cold Coffee",
    price: "80",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "703",
    title: "Diet Coke",
    price: "30",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "704",
    title: "Fresh Lime Soda",
    price: "40",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "705",
    title: "Fresh Lime Water",
    price: "20",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "706",
    title: "Hot Coffe",
    price: "40",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "707",
    title: "Hot Gulab Jamun",
    price: "40",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "708",
    title: "Lassi",
    price: "60",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "709",
    title: "Masal Cold Drinks",
    price: "30",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "710",
    title: "Milk Shake Flavour",
    price: "80",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "711",
    title: "Rose Lassi",
    price: "70",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "712",
    title: "Soft Drinks",
    price: "20",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "713",
    title: "Tea",
    price: "20",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "714",
    title: "Tuti Frooti",
    price: "130",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "105",
    title: "Veg American Chopsuey",
    price: "180",
    isVeg: true,
    image: image1,
    category: "Chopsuey",
    specialInstructionGroups: []
  },
  {
    itemNo: "106",
    title: "Chilly Panner / Veg Manchurain",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Combo",
    specialInstructionGroups: []
  },
  {
    itemNo: "107",
    title: "Dal Butter Fry (Yellow)",
    price: "100",
    isVeg: true,
    image: image1,
    category: "Dal",
    specialInstructionGroups: []
  },
  {
    itemNo: "108",
    title: "Dal Fry (Yellow)",
    price: "80",
    isVeg: true,
    image: image1,
    category: "Dal",
    specialInstructionGroups: []
  },
  {
    itemNo: "109",
    title: "Dal Makhani",
    price: "130",
    isVeg: true,
    image: image1,
    category: "Dal",
    specialInstructionGroups: []
  },
  {
    itemNo: "110",
    title: "Dal Tadka (Black)",
    price: "120",
    isVeg: true,
    image: image1,
    category: "Dal",
    specialInstructionGroups: []
  },
  {
    itemNo: "111",
    title: "Rajma Masala",
    price: "130",
    isVeg: true,
    image: image1,
    category: "Dal",
    specialInstructionGroups: []
  },
  {
    itemNo: "112",
    title: "Annas Spl Fr",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Fried Rice",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        }
    ]
  },
  {
    itemNo: "113",
    title: "Cantonese Fried Rice",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Fried Rice",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        }
    ]
  },
  {
    itemNo: "114",
    title: "Chilly Garlic Fried Rice",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Fried Rice",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        }
    ]
  },
  {
    itemNo: "115",
    title: "Fried Rice",
    price: "140",
    isVeg: true,
    image: image1,
    category: "Fried Rice",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        }
    ]
  },
  {
    itemNo: "116",
    title: "Schezwan Fr",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Fried Rice",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        }
    ]
  },
  {
    itemNo: "117",
    title: "Singapore Fried Rice",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Fried Rice",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        }
    ]
  },
  {
    itemNo: "118",
    title: "Spring Friend Rice",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Fried Rice",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        }
    ]
  },
  {
    itemNo: "119",
    title: "Triple Schezwan Fried Rice",
    price: "180",
    isVeg: true,
    image: image1,
    category: "Fried Rice",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        }
    ]
  },
  {
    itemNo: "120",
    title: "Chilli Manchurian",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Main Course",
    specialInstructionGroups: []
  },
  {
    itemNo: "121",
    title: "Chilli Panner",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Main Course",
    specialInstructionGroups: []
  },
  {
    itemNo: "122",
    title: "Chilly Bmc",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Main Course",
    specialInstructionGroups: []
  },
  {
    itemNo: "123",
    title: "Ginger Bmc",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Main Course",
    specialInstructionGroups: []
  },
  {
    itemNo: "124",
    title: "Gobi Manchurian",
    price: "150",
    isVeg: true,
    image: image1,
    category: "Main Course",
    specialInstructionGroups: []
  },
  {
    itemNo: "125",
    title: "Hunan Bmc",
    price: "150",
    isVeg: true,
    image: image1,
    category: "Main Course",
    specialInstructionGroups: []
  },
  {
    itemNo: "126",
    title: "Schezuan Bmc",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Main Course",
    specialInstructionGroups: []
  },
  {
    itemNo: "127",
    title: "Veg Manchurian",
    price: "150",
    isVeg: true,
    image: image1,
    category: "Main Course",
    specialInstructionGroups: []
  },
  {
    itemNo: "128",
    title: "Veg Wanton",
    price: "80",
    isVeg: true,
    image: image1,
    category: "Main Course",
    specialInstructionGroups: []
  },
  {
    itemNo: "500",
    title: "Butter Masala Dosa",
    price: "90",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "501",
    title: "Butter Onion Masala Dosa",
    price: "100",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "502",
    title: "Cheese Masala Dosa",
    price: "100",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "503",
    title: "Diet Masala Dosa",
    price: "70",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "504",
    title: "G/B/C Masala Dosa",
    price: "230",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "505",
    title: "Ghee Butter Masala Dosa",
    price: "190",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "506",
    title: "Ghee Masala Dosa",
    price: "100",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "507",
    title: "Onion Masala Dosa",
    price: "80",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "508",
    title: "Plain Masala Dosa",
    price: "70",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "129",
    title: "Anna Spl Noodles",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Noodles",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        }
    ]
  },
  {
    itemNo: "130",
    title: "Schezwan Haka Noodles",
    price: "140",
    isVeg: true,
    image: image1,
    category: "Noodles",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        }
    ]
  },
  {
    itemNo: "131",
    title: "Veg Chilly Garlic Noodles",
    price: "150",
    isVeg: true,
    image: image1,
    category: "Noodles",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        }
    ]
  },
  {
    itemNo: "132",
    title: "Veg Noodles",
    price: "130",
    isVeg: true,
    image: image1,
    category: "Noodles",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        }
    ]
  },
  {
    itemNo: "133",
    title: "Veg Chinese",
    price: "180",
    isVeg: true,
    image: image1,
    category: "Pan Fried",
    specialInstructionGroups: []
  },
  {
    itemNo: "134",
    title: "Veg Chowmein",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Pan Fried",
    specialInstructionGroups: []
  },
  {
    itemNo: "135",
    title: "Veg Tangra Chowmein",
    price: "180",
    isVeg: true,
    image: image1,
    category: "Pan Fried",
    specialInstructionGroups: []
  },
  {
    itemNo: "136",
    title: "Kadai Paneer",
    price: "180",
    isVeg: true,
    image: image1,
    category: "Paneer",
    specialInstructionGroups: []
  },
  {
    itemNo: "137",
    title: "Malay Kofta",
    price: "180",
    isVeg: true,
    image: image1,
    category: "Paneer",
    specialInstructionGroups: []
  },
  {
    itemNo: "138",
    title: "Mushroom Masla",
    price: "180",
    isVeg: true,
    image: image1,
    category: "Paneer",
    specialInstructionGroups: []
  },
  {
    itemNo: "139",
    title: "Mushroom Sweet Corn",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Paneer",
    specialInstructionGroups: []
  },
  {
    itemNo: "140",
    title: "Matar Paneer",
    price: "170",
    isVeg: true,
    image: image1,
    category: "Paneer",
    specialInstructionGroups: []
  },
  {
    itemNo: "141",
    title: "Palak Corn",
    price: "150",
    isVeg: true,
    image: image1,
    category: "Paneer",
    specialInstructionGroups: []
  },
  {
    itemNo: "142",
    title: "Palak Paneer",
    price: "150",
    isVeg: true,
    image: image1,
    category: "Paneer",
    specialInstructionGroups: []
  },
  {
    itemNo: "143",
    title: "Paneer Bhujia",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Paneer",
    specialInstructionGroups: []
  },
  {
    itemNo: "144",
    title: "Paneer Butter Masala",
    price: "170",
    isVeg: true,
    image: image1,
    category: "Paneer",
    specialInstructionGroups: []
  },
  {
    itemNo: "145",
    title: "Paneer Lababdar",
    price: "170",
    isVeg: true,
    image: image1,
    category: "Paneer",
    specialInstructionGroups: []
  },
  {
    itemNo: "146",
    title: "Paneer Manchurian",
    price: "150",
    isVeg: true,
    image: image1,
    category: "Paneer",
    specialInstructionGroups: []
  },
  {
    itemNo: "147",
    title: "Paneer Mushroom Masala",
    price: "180",
    isVeg: true,
    image: image1,
    category: "Paneer",
    specialInstructionGroups: []
  },
  {
    itemNo: "148",
    title: "Paneer Tikka",
    price: "180",
    isVeg: true,
    image: image1,
    category: "Paneer",
    specialInstructionGroups: []
  },
  {
    itemNo: "149",
    title: "Sahee Paneer",
    price: "180",
    isVeg: true,
    image: image1,
    category: "Paneer",
    specialInstructionGroups: []
  },
  {
    itemNo: "150",
    title: "Jeera Rice",
    price: "100",
    isVeg: true,
    image: image1,
    category: "Rice",
    specialInstructionGroups: []
  },
  {
    itemNo: "151",
    title: "Onion Pulao",
    price: "110",
    isVeg: true,
    image: image1,
    category: "Rice",
    specialInstructionGroups: []
  },
  {
    itemNo: "152",
    title: "Paneer Pulao",
    price: "130",
    isVeg: true,
    image: image1,
    category: "Rice",
    specialInstructionGroups: []
  },
  {
    itemNo: "153",
    title: "Peas Pulao",
    price: "130",
    isVeg: true,
    image: image1,
    category: "Rice",
    specialInstructionGroups: []
  },
  {
    itemNo: "154",
    title: "Plain Rice",
    price: "80",
    isVeg: true,
    image: image1,
    category: "Rice",
    specialInstructionGroups: []
  },
  {
    itemNo: "155",
    title: "Veg Biryani",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Rice",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        }
    ]
  },
  {
    itemNo: "156",
    title: "Veg Pulao",
    price: "130",
    isVeg: true,
    image: image1,
    category: "Rice",
    specialInstructionGroups: []
  },
  {
    itemNo: "157",
    title: "Bundhi Raita",
    price: "40",
    isVeg: true,
    image: image1,
    category: "Raita",
    specialInstructionGroups: []
  },
  {
    itemNo: "158",
    title: "Mix Raita",
    price: "40",
    isVeg: true,
    image: image1,
    category: "Raita",
    specialInstructionGroups: []
  },
  {
    itemNo: "159",
    title: "Alu Paratha",
    price: "40",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "160",
    title: "Butter Roti",
    price: "15",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "161",
    title: "Garlic Butter Nan",
    price: "70",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "162",
    title: "Ghee Roti",
    price: "18",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "163",
    title: "Gobi Paratha",
    price: "40",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "164",
    title: "Lacha Paratha",
    price: "40",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "165",
    title: "Masala Kulcha",
    price: "50",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "166",
    title: "Nan Butter Roti",
    price: "40",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "167",
    title: "Nan Roti",
    price: "30",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "168",
    title: "Onion Paratha",
    price: "40",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "169",
    title: "Paneer Kulcha",
    price: "60",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "170",
    title: "Paneer Paratha",
    price: "50",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "171",
    title: "Peas Paratha",
    price: "40",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "172",
    title: "Plain Kulcha",
    price: "40",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "173",
    title: "Plain Partha",
    price: "20",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "174",
    title: "Tava Roti",
    price: "20",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "175",
    title: "Stubed Nan",
    price: "70",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "176",
    title: "Tandoor",
    price: "20",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "177",
    title: "Tandori Butter",
    price: "25",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "178",
    title: "Tandori Paratha",
    price: "50",
    isVeg: true,
    image: image1,
    category: "Roti",
    specialInstructionGroups: []
  },
  {
    itemNo: "509",
    title: "Butter Onion Sada Dosa",
    price: "90",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "510",
    title: "Butter Sada Dosa",
    price: "80",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "511",
    title: "Cheese Sada Dosa",
    price: "100",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "512",
    title: "Diet Sada Dosa",
    price: "60",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "513",
    title: "Ghee/B/C/S/Dosa",
    price: "210",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "514",
    title: "Ghee Butter Sada Dosa",
    price: "170",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "515",
    title: "Ghee Sada Dosa",
    price: "90",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "516",
    title: "Onion Sada Dosa",
    price: "70",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "517",
    title: "Plain Dosa",
    price: "60",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "518",
    title: "Dahi Vada",
    price: "60",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: []
  },
  {
    itemNo: "519",
    title: "Sambar Ghee Idli",
    price: "60",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "520",
    title: "Sambar Idli",
    price: "50",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "521",
    title: "Sambar Vada",
    price: "60",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: []
  },
  {
    itemNo: "522",
    title: "Vada",
    price: "50",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: []
  },
  {
    itemNo: "179",
    title: "Annas Special Soup",
    price: "90",
    isVeg: true,
    image: image1,
    category: "Soup",
    specialInstructionGroups: []
  },
  {
    itemNo: "180",
    title: "Veg Hot & Sour",
    price: "80",
    isVeg: true,
    image: image1,
    category: "Soup",
    specialInstructionGroups: []
  },
  {
    itemNo: "181",
    title: "Veg Sweet Corn",
    price: "80",
    isVeg: true,
    image: image1,
    category: "Soup",
    specialInstructionGroups: []
  },
  {
    itemNo: "182",
    title: "Veg Talumein",
    price: "80",
    isVeg: true,
    image: image1,
    category: "Soup",
    specialInstructionGroups: []
  },
  {
    itemNo: "183",
    title: "Veg Manchown",
    price: "80",
    isVeg: true,
    image: image1,
    category: "Soup",
    specialInstructionGroups: []
  },
  {
    itemNo: "523",
    title: "Curd Rice",
    price: "60",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: []
  },
  {
    itemNo: "524",
    title: "Lemon Rice",
    price: "60",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: []
  },
  {
    itemNo: "525",
    title: "Mango Rice",
    price: "60",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: []
  },
  {
    itemNo: "526",
    title: "Tomato Rice",
    price: "60",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: []
  },
  {
    itemNo: "184",
    title: "Coconut Chutney",
    price: "30",
    isVeg: true,
    image: image1,
    category: "Spl Chutney",
    specialInstructionGroups: []
  },
  {
    itemNo: "185",
    title: "Onion Chutney",
    price: "30",
    isVeg: true,
    image: image1,
    category: "Spl Chutney",
    specialInstructionGroups: []
  },
  {
    itemNo: "527",
    title: "Chinese Dosa",
    price: "130",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "528",
    title: "Ghee Gun Powder Dosa",
    price: "140",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "529",
    title: "Green Butter Dosa",
    price: "110",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "530",
    title: "Paneer Butter Dosa",
    price: "140",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "531",
    title: "Shezwan Dosa",
    price: "120",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "800",
    title: "Baby Corn Mushroom Papper Salt",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Starter",
    specialInstructionGroups: []
  },
  {
    itemNo: "801",
    title: "Crispy Chilly American Corn",
    price: "150",
    isVeg: true,
    image: image1,
    category: "Starter",
    specialInstructionGroups: []
  },
  {
    itemNo: "802",
    title: "Crispy Chilly Baby Corn",
    price: "140",
    isVeg: true,
    image: image1,
    category: "Starter",
    specialInstructionGroups: []
  },
  {
    itemNo: "803",
    title: "Crispy Chilly Chana",
    price: "140",
    isVeg: true,
    image: image1,
    category: "Starter",
    specialInstructionGroups: []
  },
  {
    itemNo: "804",
    title: "French Fries",
    price: "120",
    isVeg: true,
    image: image1,
    category: "Starter",
    specialInstructionGroups: []
  },
  {
    itemNo: "805",
    title: "Honey Chilly Potato",
    price: "150",
    isVeg: true,
    image: image1,
    category: "Starter",
    specialInstructionGroups: []
  },
  {
    itemNo: "532",
    title: "Idli",
    price: "40",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "533",
    title: "Idli Chilli",
    price: "120",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "534",
    title: "Idli Schezwan",
    price: "120",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "806",
    title: "Paneer65",
    price: "140",
    isVeg: true,
    image: image1,
    category: "Starter",
    specialInstructionGroups: []
  },
  {
    itemNo: "807",
    title: "Paneer Pokada",
    price: "220",
    isVeg: true,
    image: image1,
    category: "Starter",
    specialInstructionGroups: []
  },
  {
    itemNo: "186",
    title: "Normal Thali",
    price: "110",
    isVeg: true,
    image: image1,
    category: "Thali",
    specialInstructionGroups: []
  },
  {
    itemNo: "187",
    title: "South India Thali",
    price: "150",
    isVeg: true,
    image: image1,
    category: "Thali",
    specialInstructionGroups: []
  },
  {
    itemNo: "188",
    title: "Spl Thali",
    price: "150",
    isVeg: true,
    image: image1,
    category: "Thali",
    specialInstructionGroups: []
  },
  {
    itemNo: "535",
    title: "Mix Vegetables Uttapam",
    price: "90",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "536",
    title: "Onion Uttapam",
    price: "80",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "537",
    title: "Tomato Uttapam",
    price: "80",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "538",
    title: "Uttapam Pizza",
    price: "160",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "189",
    title: "Anna Spl Veg",
    price: "170",
    isVeg: true,
    image: image1,
    category: "Veg",
    specialInstructionGroups: []
  },
  {
    itemNo: "190",
    title: "Chana Masala",
    price: "120",
    isVeg: true,
    image: image1,
    category: "Veg",
    specialInstructionGroups: []
  },
  {
    itemNo: "191",
    title: "Green Peas Masala",
    price: "120",
    isVeg: true,
    image: image1,
    category: "Veg",
    specialInstructionGroups: []
  },
  {
    itemNo: "192",
    title: "Mixed Veg",
    price: "150",
    isVeg: true,
    image: image1,
    category: "Veg",
    specialInstructionGroups: []
  },
  {
    itemNo: "193",
    title: "Navratna Korma",
    price: "180",
    isVeg: true,
    image: image1,
    category: "Veg",
    specialInstructionGroups: []
  },
  {
    itemNo: "194",
    title: "Veg Do Pyaza",
    price: "120",
    isVeg: true,
    image: image1,
    category: "Veg",
    specialInstructionGroups: []
  },
  {
    itemNo: "195",
    title: "Veg Kofta",
    price: "160",
    isVeg: true,
    image: image1,
    category: "Veg",
    specialInstructionGroups: []
  },
  {
    itemNo: "196",
    title: "Veg Korma",
    price: "170",
    isVeg: true,
    image: image1,
    category: "Veg",
    specialInstructionGroups: []
  },
  {
    itemNo: "197",
    title: "Veg Zhal Fry",
    price: "130",
    isVeg: true,
    image: image1,
    category: "Veg",
    specialInstructionGroups: []
  },
  {
    itemNo: "539",
    title: "Wafer/O/M/Dosa",
    price: "160",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "540",
    title: "Wafer/B/O/M/Dosa",
    price: "190",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "541",
    title: "Wafer Masal Dosa",
    price: "100",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "542",
    title: "Wafer Sada Dosa",
    price: "90",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "808",
    title: "Uppma",
    price: "50",
    isVeg: true,
    image: image4,
    category: "Snacks",
    specialInstructionGroups: []
  },
  {
    itemNo: "809",
    title: "Sambar",
    price: "0",
    isVeg: true,
    image: image4,
    category: "Snacks",
    specialInstructionGroups: []
  },
  {
    itemNo: "810",
    title: "Chutney",
    price: "0",
    isVeg: true,
    image: image4,
    category: "Snacks",
    specialInstructionGroups: []
  },
  {
    itemNo: "811",
    title: "Batter",
    price: "0",
    isVeg: true,
    image: image4,
    category: "Snacks",
    specialInstructionGroups: []
  },
  {
    itemNo: "812",
    title: "Masala",
    price: "0",
    isVeg: true,
    image: image4,
    category: "Snacks",
    specialInstructionGroups: []
  },
  {
    itemNo: "715",
    title: "Mineral Water",
    price: "20",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "716",
    title: "Butter",
    price: "50",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "717",
    title: "Cheese",
    price: "125",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "198",
    title: "Butter",
    price: "20",
    isVeg: true,
    image: image1,
    category: "EXTRA",
    specialInstructionGroups: []
  },
  {
    itemNo: "199",
    title: "Cheese",
    price: "30",
    isVeg: true,
    image: image1,
    category: "EXTRA",
    specialInstructionGroups: []
  },
  {
    itemNo: "200",
    title: "Curry",
    price: "20",
    isVeg: true,
    image: image1,
    category: "EXTRA",
    specialInstructionGroups: []
  },
  {
    itemNo: "201",
    title: "Onion",
    price: "10",
    isVeg: true,
    image: image1,
    category: "EXTRA",
    specialInstructionGroups: []
  },
  {
    itemNo: "202",
    title: "Ghee",
    price: "30",
    isVeg: true,
    image: image1,
    category: "EXTRA",
    specialInstructionGroups: []
  },
  {
    itemNo: "543",
    title: "Idli 1 pc",
    price: "30",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "544",
    title: "Vada1 pc",
    price: "30",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: []
  },
  {
    itemNo: "718",
    title: "Mineral Water",
    price: "100",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "719",
    title: "Thunms UP( B 200 ml)",
    price: "20",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "720",
    title: "Sprite (B 200 ml)",
    price: "20",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "721",
    title: "Fanta (B 200 ml)",
    price: "20",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "722",
    title: "ThumsUp(P 250 ml)",
    price: "25",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "723",
    title: "Sprite( P)",
    price: "25",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "203",
    title: "Coconut",
    price: "25",
    isVeg: true,
    image: image1,
    category: "Consumable",
    specialInstructionGroups: []
  },
  {
    itemNo: "204",
    title: "GAS cylinder",
    price: "1600",
    isVeg: true,
    image: image1,
    category: "Consumable",
    specialInstructionGroups: []
  },
  {
    itemNo: "545",
    title: "UPMA (H)",
    price: "50",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: []
  },
  {
    itemNo: "724",
    title: "fROOTI",
    price: "15",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "725",
    title: "Cornetto Butter Scotch",
    price: "40",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "726",
    title: "Feast Cad Crackle",
    price: "70",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "727",
    title: "Cor Choco Brownee",
    price: "60",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "728",
    title: "Butter scotch Cor.",
    price: "40",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "729",
    title: "Cor. Oreo",
    price: "65",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "730",
    title: "Tutti Fruiti sundae",
    price: "40",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "731",
    title: "Choco Sandwich",
    price: "45",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "732",
    title: "Magnum Brownie",
    price: "80",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "733",
    title: "Double Chocolate",
    price: "35",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "734",
    title: "Magname Classic",
    price: "70",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "735",
    title: "Feast Chocolate",
    price: "40",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "205",
    title: "1/2 ext charges",
    price: "20",
    isVeg: true,
    image: image1,
    category: "EXTRA",
    specialInstructionGroups: []
  },
  {
    itemNo: "206",
    title: "papad",
    price: "20",
    isVeg: true,
    image: image1,
    category: "EXTRA",
    specialInstructionGroups: []
  },
  {
    itemNo: "546",
    title: "Masala Dosa",
    price: "50",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "207",
    title: "Corn",
    price: "10",
    isVeg: true,
    image: image1,
    category: "EXTRA",
    specialInstructionGroups: []
  },
  {
    itemNo: "736",
    title: "Choice of Scoop",
    price: "40",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "737",
    title: "Corn. Straw Vanilla",
    price: "35",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "738",
    title: "Corn. Choco Vanilla",
    price: "30",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "739",
    title: "Aamras stick",
    price: "40",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "740",
    title: "MALAI KULFI",
    price: "20",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "741",
    title: "FANTA (250 ml)",
    price: "25",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "742",
    title: "Coke (B 200 ml)",
    price: "20",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "743",
    title: "Gulab Jamun (1 pc)",
    price: "20",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "744",
    title: "Limca (B 200ml)",
    price: "20",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "745",
    title: "Filter Coffe",
    price: "50",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "746",
    title: "Filter Coffe 1/2",
    price: "25",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "747",
    title: "Coffee 1/2",
    price: "25",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "208",
    title: "Batter Dosa",
    price: "80",
    isVeg: true,
    image: image1,
    category: "Product",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "748",
    title: "Feast Chocolate",
    price: "40",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "813",
    title: "Momo",
    price: "20",
    isVeg: true,
    image: image4,
    category: "Snacks DBMS",
    specialInstructionGroups: []
  },
  {
    itemNo: "749",
    title: "Choco Bar",
    price: "20",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "750",
    title: "Nutty Roll",
    price: "40",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "814",
    title: "Murku",
    price: "80",
    isVeg: true,
    image: image4,
    category: "Namkeen Snacks",
    specialInstructionGroups: []
  },
  {
    itemNo: "815",
    title: "Lahori Jeera",
    price: "10",
    isVeg: true,
    image: image4,
    category: "Snacks DBMS",
    specialInstructionGroups: []
  },
  {
    itemNo: "816",
    title: "Mineral Water",
    price: "10",
    isVeg: true,
    image: image4,
    category: "Snacks DBMS",
    specialInstructionGroups: []
  },
  {
    itemNo: "209",
    title: "Paneer Masala",
    price: "240",
    isVeg: true,
    image: image1,
    category: "Paneer",
    specialInstructionGroups: []
  },
  {
    itemNo: "547",
    title: "Wafer/O/S/Dosa",
    price: "150",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "548",
    title: "Paneer B/O/M/Dosa",
    price: "240",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "549",
    title: "Paneer B/M/Dosa",
    price: "230",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "550",
    title: "Paneer/B/O/S/Dosa",
    price: "220",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "551",
    title: "Schezwan/O/S/Dosa",
    price: "190",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "552",
    title: "Schezwan/O/M/Dosa",
    price: "220",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "553",
    title: "Schezwan/M/Dosa",
    price: "210",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "554",
    title: "Diet/O/M/Dosa",
    price: "130",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "555",
    title: "Ghee/B/C/O/M/Dosa",
    price: "240",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "210",
    title: "Mushroom Chilli",
    price: "240",
    isVeg: true,
    image: image1,
    category: "Main Course",
    specialInstructionGroups: []
  },
  {
    itemNo: "556",
    title: "Sambar Rice",
    price: "100",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: []
  },
  {
    itemNo: "557",
    title: "Veg Rice",
    price: "100",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: []
  },
  {
    itemNo: "211",
    title: "Paneer DO Pyaza",
    price: "220",
    isVeg: true,
    image: image1,
    category: "Paneer",
    specialInstructionGroups: []
  },
  {
    itemNo: "751",
    title: "Dahi",
    price: "40",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "752",
    title: "Cor. Oreo",
    price: "65",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "753",
    title: "Double Chocolate",
    price: "35",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "817",
    title: "Baby Corn Pepper Salt",
    price: "180",
    isVeg: true,
    image: image1,
    category: "Starter",
    specialInstructionGroups: []
  },
  {
    itemNo: "818",
    title: "Mushroom Pepper Salt",
    price: "200",
    isVeg: true,
    image: image1,
    category: "Starter",
    specialInstructionGroups: []
  },
  {
    itemNo: "212",
    title: "Mushroom Do Pyaza",
    price: "240",
    isVeg: true,
    image: image1,
    category: "Main Course",
    specialInstructionGroups: []
  },
  {
    itemNo: "213",
    title: "Kadai Mushroom",
    price: "240",
    isVeg: true,
    image: image1,
    category: "Main Course",
    specialInstructionGroups: []
  },
  {
    itemNo: "558",
    title: "Ghee O/M/Dosa",
    price: "170",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "559",
    title: "Butter C/O/M/Dosa",
    price: "190",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "560",
    title: "Cheese O/M/Dosa",
    price: "170",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "754",
    title: "Milk Shake (1 Scoop)",
    price: "100",
    isVeg: true,
    image: image4,
    category: "Beverages",
    specialInstructionGroups: [
        {
            "key": "temperature",
            "title": "Temperature",
            "selectionType": "single",
            "options": [
                "Cold",
                "Normal"
            ]
        }
    ]
  },
  {
    itemNo: "561",
    title: "Ghee B/O/M/Dosa",
    price: "200",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "819",
    title: "Mushroom Chilli Dry",
    price: "240",
    isVeg: true,
    image: image1,
    category: "Starter",
    specialInstructionGroups: []
  },
  {
    itemNo: "562",
    title: "Butter C/O/M/Dosa",
    price: "200",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "563",
    title: "Ghee Butter Sada Dosa",
    price: "0",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  },
  {
    itemNo: "564",
    title: "Paneer B/S/Dosa",
    price: "210",
    isVeg: true,
    image: image3,
    category: "South Indian",
    specialInstructionGroups: [
        {
            "key": "spiceLevel",
            "title": "Spice Level",
            "selectionType": "single",
            "options": [
                "Mild",
                "Medium",
                "Spicy"
            ]
        },
        {
            "key": "extras",
            "title": "Extras",
            "selectionType": "multiple",
            "options": [
                "Extra Chutney",
                "Extra Sambar"
            ]
        }
    ]
  }
];
