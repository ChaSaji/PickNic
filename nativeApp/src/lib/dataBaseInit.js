//reset
export const Material =[
    {
        "name": "material name",
        "pass2Photo": "pass/photo",
        "stock": 5,
        "colorId": 1
    },
    {
        "name": "name",
        "pass2Photo": "pass/photo2",
        "stock": 10,
        "colorId": 8
    },
    {
        "name": "\u3058\u3083\u304c\u3044\u3082",
        "pass2Photo": "potate.jpg",
        "stock": 2,
        "colorId": 1
    },
    {
        "name": "\u306b\u3093\u3058\u3093",
        "pass2Photo": "carrot.jpg",
        "stock": 3,
        "colorId": 1
    },
    {
        "name": "\u7389\u306d\u304e",
        "pass2Photo": "onion.jpg",
        "stock": 3,
        "colorId": 1
    },
    {
        "name": "\u725b\u8089",
        "pass2Photo": "beef.jpg",
        "stock": 1,
        "colorId": 0
    }
];
export const RecipeDetail =[
    {
        "mealId": 1,
        "materialId": 2,
        "needNum": 225
    },
    {
        "mealId": 1,
        "materialId": 3,
        "needNum": 10
    },
    {
        "mealId": 3,
        "materialId": 4,
        "needNum": 1
    },
    {
        "mealId": 3,
        "materialId": 5,
        "needNum": 2
    },
    {
        "mealId": 3,
        "materialId": 6,
        "needNum": 1
    }
];
export const MaterialPhotoRelation =[
    {
        "materialId": 123,
        "photoId": 555
    },
    {
        "materialId": 456,
        "photoId": 789
    },
    {
        "materialId": 6,
        "photoId": 3
    }
];
export const Photo =[
    {
        "name": "photo",
        "ratitude": 123.456,
        "longitude": 123.789,
        "pass2Photo": "photopass",
        "visited": 1
    },
    {
        "name": "photo2",
        "ratitude": 456.789,
        "longitude": 35.678,
        "pass2Photo": "pass2",
        "visited": 0
    },
    {
        "name": "photo3",
        "ratitude": 34.722,
        "longitude": 137.717,
        "pass2Photo": "apple.jpg",
        "visited": 1
    }
];
export const Meal =[
    {
        "badgeId": 2,
        "mealStatusId": 1,
        "pass2Photo": "meal/pass/to/excel.png",
        "name": "name meal1"
    },
    {
        "badgeId": 3,
        "mealStatusId": 4,
        "pass2Photo": "pass2",
        "name": "name meal2"
    },
    {
        "badgeId": 3,
        "mealStatusId": 3,
        "pass2Photo": "curry.jpg",
        "name": "\u30ab\u30ec\u30fc\u30e9\u30a4\u30b9"
    }
];
export const MealStatus =[
    {
        "locked": 1,
        "cooked": 0
    },
    {
        "locked": 1,
        "cooked": 1
    },
    {
        "locked": 1,
        "cooked": 0
    }
];
export const Badge =[
    {
        "name": "excel",
        "pass2Photo": "pas1",
        "isHave": 1
    },
    {
        "name": "badged",
        "pass2Photo": "pas2",
        "isHave": 0
    },
    {
        "name": "\u7d66\u98df",
        "pass2Photo": "school.jpg",
        "isHave": 1
    }
];
