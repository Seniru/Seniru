<script lang="ts">
    export let name: string
</script>

<span>
    # {name}
</span>

<style lang="scss">
    @use "../utils/variables.scss" as v;
    span {
        background-color: v.$secondary-color;
        color: v.$text-color-primary;
        padding: 3px 10px;
        margin: 2px 4px;
        border-radius: 15px;
    }
</style>
