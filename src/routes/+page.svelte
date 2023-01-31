<script lang='ts'>
    import axios from 'axios';
    import { writable } from 'svelte/store';
    import Ingredient from '../components/ingredient.svelte';
    import Drink from '../components/drink.svelte';
    import type { itemList, drinksIngredient, ingredient, ingredientArray, returnObject } from '../components/types';
  import type { ActionData } from './$types';
    export let data: returnObject;

    export let form: ActionData;

    let searchedValue: string = "";
    const list: Array<ingredient> = data.list;
    let searchedList = writable<Array<ingredient>>(list);
    let selectedIngredients = writable<Array<ingredient>>();
    let selectedAllBool: boolean = true;
        
    let possibleDrinks: any;
    $: {
        //Must be list.filter because otherwise it filters its own items out of the array
        searchedList.set(list.filter((i) => i.strIngredient1.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase())))
    }
    $: {
        possibleDrinks = form?.possibleDrinks;
    }
    function handleSelectAll(){
        // Code for selected all that are currently displayed
        let tempArray = $searchedList;
        tempArray.forEach((e) => e.ticked = selectedAllBool);
        searchedList.set(tempArray);
        selectedAllBool = !selectedAllBool;
        selectedIngredients.set(list.filter((i) => i.ticked == true))
    }


    function handleTicked(id: number){
        // create the temp array from the original
        let tempArray = $searchedList;
        // Switch the boolean on the value selected
        const pos = tempArray.map(e => e.id).indexOf(id);
        tempArray[pos].ticked = !list[id].ticked
        searchedList.set(tempArray);
        //Update the selected Ingredients array
        selectedIngredients.set(list.filter((i) => i.ticked == true))
    }
</script>
<h1 style="padding-left:30vw; margin-bottom:10vh">Welcome to Cocktail Searcher!</h1>

<div style="width:100vw; display:flex; flex-direction:row; ">

    
    <div style="width: 33vw;">
        
        <!-- Search for specific ingredients -->
        <label for='search'>Search for ingredients</label>
        <input id='search' bind:value={searchedValue} placeholder='Search for ingredients'/>
        <button on:click={handleSelectAll}>{selectedAllBool ? "Tick" : "Untick"} all</button>
        <button form="drinkForm" type='submit'>Submit</button>

        
        <!-- Listing all ingredients -->
        <p>Here are a list of Ingredients</p>
        {#each $searchedList as item}
        <Ingredient id={item.id} name={item.strIngredient1} ticked={item.ticked} on:ticked={() => handleTicked(item.id)}/>
            <!-- <p>{item.strIngredient1}</p> -->
        {/each}
    </div>
    <div style="width: 33vw;">
        <h1>Your selected Ingredients include:</h1>
        {#if $selectedIngredients}
        {#each $selectedIngredients as item}
        <p>{item.strIngredient1}</p>
        {/each}
        {/if}
    </div>

    <div style="width:33vw; background-color:aquamarine; display:flex; flex-direction: column; ">
        <h1> What you can make!</h1>
        {#if possibleDrinks}
        {#each possibleDrinks as item}
        <Drink id={item.idDrink} name={item.strDrink} img={item.strDrinkThumb}/>
        {/each}
        {:else}
        <p>No drinks can be made with this mix!</p>
        {/if}
        <!-- <Drink id={"100"} name="The motherfucker" img="https://www.thecocktaildb.com/images/media/drink/ql7bmx1503565106.jpg" /> -->
    </div>
            
            
</div>

{#if $selectedIngredients}
<form id="drinkForm" method="POST" action="?/getdrink" >
    {#each $selectedIngredients as item, i}
    <input hidden value={item.strIngredient1} name={item.id.toString()}/>
    {/each}
</form>
{/if}