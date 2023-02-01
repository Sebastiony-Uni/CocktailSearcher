import axios from 'axios';
import type { Actions, PageServerLoad } from './$types';
import type { drinksIngredient, ingredient } from '../components/types';

export const load: PageServerLoad = async ({cookies, params}) => {
    const options = {
        method: 'GET',
        url: 'http://www.thecocktaildb.com/api/json/v1/1/list.php',
        params: {i: 'list'},
        headers: {
            'Access-Control-Allow-Origin': '*',
            'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
        },
        withCredentials: true,
        credentials: 'same-origin',

    };
    let res: any;
    await axios.request(options).then(function (response) {
        res = response.data;
        //console.log(response.data);
    }).catch(function (error) {
        //console.error(error);
    });
    let newArray: Array<any> = [];
    let idx: number = 0;
    //res!.drinks.forEach((e: any) => {console.log(e)})
    res!.drinks.forEach((e: any) => {
        newArray.push({
            id: idx,
            strIngredient1: e.strIngredient1,
            ticked: false,
        })
        idx++;
    })
    return {
        list: newArray,
    };
};

export const actions: Actions = {
    getdrink: async ({cookies, request}) => {
        const data = await request.formData();
        let addedParams = new URLSearchParams("");
        let tempArray: Array<any> = [];
        data.forEach((e) => {
            tempArray.push({
                i: e
            })
            addedParams.append('i',e.toString())
        })

        console.log(addedParams.toString())
        //Add all elements together
        let teststr = tempArray.map((e) => `&i=${e.i}`)
        //console.log(teststr)
        let newstr = teststr.join("");
        //console.log(newstr)
        newstr = teststr[0].replace(" ", "%20")
        newstr = newstr.slice(3)


        console.log('https://www.thecocktaildb.com/api/json/v1/1/filter.php?' + addedParams)
        let response: any;
        const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?' + addedParams).then((res) => res.json()).then((data) => response = data)

        return {
            success: true,
            possibleDrinks: await response.drinks,
        }
    }   
};

