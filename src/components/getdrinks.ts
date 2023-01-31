import axios from 'axios';


export async function handleIngredients() {
    let res;
    const options = {
        method: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?',
        params: {i: 'vodka&whiskey'},
        headers: {
            'Access-Control-Allow-Origin': '*',
            'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
        },
        withCredentials: true,
        credentials: 'same-origin',
        
    };
    await axios.request(options).then(function (response) {
        res = response.data;
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
    
}