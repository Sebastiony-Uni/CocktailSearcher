<script lang='ts'>
    export let id: number;
    export let name: string;
    export let ticked: boolean;
	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function handleTick(){
        ticked = !ticked;
        dispatch('ticked', {
            id: id,
            ticked: ticked,
        })
    }
</script>

<div style="display: flex; width: 300px; align-items:center; justify-content:space-between;">
    <div style="">
        <p>{name}</p>
    </div>
    <div style="">
        {#if ticked}
        <button on:click={handleTick}>✅</button>
        {:else}
        <button style="padding:3px 11px;" on:click={handleTick}>&nbsp;</button>
        {/if}
    </div>
</div>