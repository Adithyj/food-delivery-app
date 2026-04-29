const restaurants = [
  {
    id: 1,
    name: "Five Star",
    rating: "4.6",
    cuisine: "Fast Food • Beverages",
    location: "Diya Enclave Complex",
    price: "₹400 for two",
    distance: "10.8 km",
    offer: "Flat 30% off",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    menuImages: [
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
    ],
    photos: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      "https://images.unsplash.com/photo-1544148103-0773bf10d330"
    ]
  },

  {
    id: 2,
    name: "Spice Garden",
    rating: "4.4",
    cuisine: "North Indian",
    location: "MG Road",
    price: "₹600 for two",
    distance: "5.2 km",
    offer: "Flat 20% off",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    menuImages: [
      "https://images.unsplash.com/photo-1562967916-eb82221dfb92"
    ],
    photos: [
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1"
    ]
  },

  {
    id: 3,
    name: "Urban Bites",
    rating: "4.5",
    cuisine: "Cafe • Continental",
    location: "City Center",
    price: "₹500 for two",
    distance: "3.5 km",
    offer: "Flat 25% off",
    image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee",
    menuImages: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
    ],
    photos: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb"
    ]
  },

  {
    id: 4,
    name: "BBQ Nation",
    rating: "4.7",
    cuisine: "BBQ • Buffet",
    location: "Forum Mall",
    price: "₹1200 for two",
    distance: "2.1 km",
    offer: "Flat 15% off",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
    menuImages: [
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
    ],
    photos: [
      "https://images.unsplash.com/photo-1555992336-03a23c7b20ee"
    ]
  },

  {
    id: 5,
    name: "Pizza Hub",
    rating: "4.3",
    cuisine: "Pizza • Italian",
    location: "BTM Layout",
    price: "₹350 for two",
    distance: "4.8 km",
    offer: "Buy 1 Get 1",
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
    menuImages: [
      "https://images.unsplash.com/photo-1548365328-9f547fb0953c"
    ],
    photos: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591"
    ]
  },

  {
    id: 6,
    name: "Burger Town",
    rating: "4.2",
    cuisine: "Burgers • Fast Food",
    location: "Indiranagar",
    price: "₹300 for two",
    distance: "3.2 km",
    offer: "Flat ₹100 off",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    menuImages: [
      "https://images.unsplash.com/photo-1550547660-d9450f859349"
    ],
    photos: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    ]
  },

  {
    id: 7,
    name: "Royal Biryani",
    rating: "4.6",
    cuisine: "Biryani • Mughlai",
    location: "Shivajinagar",
    price: "₹500 for two",
    distance: "6.1 km",
    offer: "Flat 20% off",
    image: "https://images.unsplash.com/photo-1604908812776-2b9c4c1f0c65",
    menuImages: [
      "https://images.unsplash.com/photo-1604908812776-2b9c4c1f0c65"
    ],
    photos: [
      "https://images.unsplash.com/photo-1563379091339-03246963d51a"
    ]
  },

  {
    id: 8,
    name: "Green Leaf",
    rating: "4.1",
    cuisine: "Veg • South Indian",
    location: "Jayanagar",
    price: "₹250 for two",
    distance: "2.9 km",
    offer: "Flat 10% off",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    menuImages: [
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
    ],
    photos: [
      "https://images.unsplash.com/photo-1605478580700-2d4d7f8b2f5f"
    ]
  },

  {
    id: 9,
    name: "Ocean Grill",
    rating: "4.5",
    cuisine: "Seafood",
    location: "Whitefield",
    price: "₹900 for two",
    distance: "8.5 km",
    offer: "Flat 25% off",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0",
    menuImages: [
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0"
    ],
    photos: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
    ]
  },

  {
    id: 10,
    name: "Cafe Brew",
    rating: "4.3",
    cuisine: "Cafe • Coffee",
    location: "HSR Layout",
    price: "₹400 for two",
    distance: "4.2 km",
    offer: "Flat 15% off",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    menuImages: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
    ],
    photos: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
    ]
  },

  {
    id: 11,
    name: "Tandoori Nights",
    rating: "4.6",
    cuisine: "North Indian • BBQ",
    location: "Koramangala",
    price: "₹700 for two",
    distance: "3.7 km",
    offer: "Flat 20% off",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    menuImages: [
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
    ],
    photos: [
      "https://images.unsplash.com/photo-1600628422019-3d1d33e3f47c"
    ]
  },

  {
    id: 12,
    name: "Sweet Treats",
    rating: "4.2",
    cuisine: "Desserts",
    location: "Malleshwaram",
    price: "₹200 for two",
    distance: "5.0 km",
    offer: "Flat 10% off",
    image: "https://images.unsplash.com/photo-1505253213348-cd54c6a9a65b",
    menuImages: [
      "https://images.unsplash.com/photo-1505253213348-cd54c6a9a65b"
    ],
    photos: [
      "https://images.unsplash.com/photo-1551024601-bec78aea704b"
    ]
  },

  {
    id: 13,
    name: "Wok Express",
    rating: "4.4",
    cuisine: "Chinese",
    location: "Electronic City",
    price: "₹450 for two",
    distance: "7.2 km",
    offer: "Flat 18% off",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
    menuImages: [
      "https://images.unsplash.com/photo-1585032226651-759b368d7246"
    ],
    photos: [
      "https://images.unsplash.com/photo-1544025162-d76694265947"
    ]
  },

  {
    id: 14,
    name: "Punjabi Dhaba",
    rating: "4.3",
    cuisine: "Punjabi",
    location: "Yelahanka",
    price: "₹500 for two",
    distance: "9.1 km",
    offer: "Flat 22% off",
    image: "https://images.unsplash.com/photo-1600628422019-3d1d33e3f47c",
    menuImages: [
      "https://images.unsplash.com/photo-1600628422019-3d1d33e3f47c"
    ],
    photos: [
      "https://images.unsplash.com/photo-1600628422019-3d1d33e3f47c"
    ]
  },

  {
    id: 15,
    name: "Italiano",
    rating: "4.5",
    cuisine: "Italian",
    location: "Brigade Road",
    price: "₹800 for two",
    distance: "2.5 km",
    offer: "Flat 25% off",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b84c6b3d",
    menuImages: [
      "https://images.unsplash.com/photo-1523987355523-c7b5b84c6b3d"
    ],
    photos: [
      "https://images.unsplash.com/photo-1523987355523-c7b5b84c6b3d"
    ]
  }
];

export default restaurants;