<script lang="ts">
    import { slide } from "svelte/transition"
    import { sineInOut } from "svelte/easing"
    import { createEventDispatcher } from "svelte"

    import Option from "./Option.svelte"

    export let kind: string = "items"
    export let values: { [key: string]: boolean }

    const dispatch = createEventDispatcher()

    let isOpened = false
    let selected = values

    $: totalSelected = Object.keys(selected).filter((tag) => selected[tag]).length

    const openOptions = (evt: MouseEvent) => {
        isOpened = !isOpened
    }

    const updateSelected = (evt: Event) => {
        let target = evt.target as HTMLInputElement
        if (target.checked) selected[target.value] = true
        else selected[target.value] = false
        /* svelte reactive components work only on assignments */
        selected = selected
        dispatch("select", selected)
    }
</script>

<div class="main-container">
    <button class="select" on:click={openOptions}>
        {totalSelected}
        {kind} selected
        <i class="fa-solid fa-caret-down"></i>
    </button>
    {#if isOpened}
        <div class="options" transition:slide={{ duration: 400, axis: "y", easing: sineInOut }}>
            {#each Object.keys(values) as value}
                <Option name={kind} {value} checked={selected[value]} on:change={updateSelected} />
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    @use "../../utils/variables.scss" as v;

    .main-container {
        position: relative;
        z-index: 999;
    }

    .select {
        padding: 10px 15px;
        background-color: rgba(255, 255, 255, 0.1);
        border: 2px solid v.$background-color;
        display: inline-block;
        border-radius: 10px;
        cursor: pointer;
    }

    .options {
        position: absolute;
        padding: 10px 15px;
        background-color: #3d3d3d;
        border: 2px solid v.$background-color;
        border-radius: 10px;
    }
</style>
