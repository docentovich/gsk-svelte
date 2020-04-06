<script>
    import { slide } from "svelte/transition";

    export let display = true;
</script>

{#if display}
    <div transition:slide>
        <slot />
    </div>
{:else}
    <div style="display: none">
        <slot />
    </div>
{/if}
