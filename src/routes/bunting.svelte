<script>
    import { reveal } from 'svelte-reveal';
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition'; 

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

<picture use:reveal={{ transition: "fade" }} class="-mt-2 mb-2" transition:fly="{{ y: 200, duration: 2000 }}">
    <source srcset="/bunting-desktop.svg" media="(min-width: 768px)">
    <source srcset="/bunting-mobile.svg" media="(max-width: 767px)">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img src="/bunting-desktop.svg" alt="Divider Image">
</picture>