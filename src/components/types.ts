export type itemList = {
    list: drinksIngredient 
}
export type drinksIngredient = {
    drinks: [
        ingredient
    ]
}
export type ingredient = {
    id: number,
    strIngredient1: string
    ticked: boolean,
}

export type ingredientArray = {
    list: [
        ingredient,
    ]
}

export type returnObject = {
    list: Array<ingredient>,
    success: boolean,
    possibleDrinks: any,
}