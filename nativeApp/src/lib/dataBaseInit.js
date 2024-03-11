//reset
export const MaterialPhotoRelation =[
    {
        "materialId": 123,
        "photoId": 555
    },
    {
        "materialId": 456,
        "photoId": 789
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
    }
];
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
        "mealId": 5,
        "materialId": 1,
        "needNum": 1
    }
];
