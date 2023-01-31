<script lang='ts'>
    export let img: string;
    export let id: string;
    export let name: string;
</script>

<div style="width:auto; height:75px; display:flex; background-color:gray">
    <!-- Image -->
    <img style="width:75px; height:75px;" src={img} alt={name} />
    <!-- Text -->
    <div style="display:flex; padding-left:20px; flex-direction:col">
        <h1>{name}</h1>
        <!-- <p>{id}</p> -->
    </div>
</div>