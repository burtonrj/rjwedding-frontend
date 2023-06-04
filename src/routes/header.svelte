<script>
    import { onMount } from 'svelte';

    let innerWidth = 768; // default to mobile layout during server-side rendering

    onMount(() => {
        innerWidth = window.innerWidth; // once the component is mounted, we're in the client and we can access the window object

        const handleResize = () => {
            innerWidth = window.innerWidth;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
</script>

<header>
    {#if innerWidth <= 768} <!-- You can change this breakpoint to whatever you want -->
        <img src="/hero/mobile.png" alt="Mobile Hero"  class="object-fill"/>
    {:else}
        <img src="/hero/desktop.png" alt="Desktop Hero" class="object-fill"/>
    {/if}
</header>