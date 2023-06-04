<script>
    import { fade } from 'svelte/transition';
    import { afterUpdate } from 'svelte';
    let visible = true;

    afterUpdate(() => {
        setTimeout(() => {
            visible = false;
        }, 3000);
    });
</script>

{#if visible}
<div transition:fade class="bg-blue-100 border-blue-500 text-blue-700 px-4 py-3 mt-2" role="alert">
    <p class="font-bold">Thanks 👍 you're the best!</p>
</div>
{/if}