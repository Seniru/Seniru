<script lang="ts">
    export let name: string
    export let value: string
    export let checked: boolean
</script>

<label>
    <input type="checkbox" {name} {value} {checked} on:change />
    {value}
</label>
<br />
