<script>
    import { ceremonyCount, ceremonyDate, partyDate } from "./store";
</script>
<div class="bg-indigo-100 rounded p-4 shadow-xl">
    {#if $ceremonyCount === 0}
        <h3 class="mb-2 text-xl text-center"><b>Location</b></h3>
        <p class="text-center text-lg">39 Harwich Road</p>
        <p class="text-center text-lg">Lawford, Manningtree</p>
        <p class="text-center text-lg">Essex</p>
        <p class="text-center text-lg mb-3">CO11 2LS</p>
        <p class="text-center">
            <a href="https://www.google.co.uk/maps/place/39+Harwich+Rd,+Lawford,+Ardleigh,+Manningtree+CO11+2LS/"
            target="_blank"
            class="text-blue-600 hover:text-blue-800 text-lg">📍 View on Google Maps</a>
        </p>
    {:else}
        <h3 class="mb-2 text-xl text-center"><b>Ceremony Location - {ceremonyDate}</b></h3>
        <p class="text-center text-lg">Bury St Edmunds Registration Office</p>
        <p class="text-center text-lg">7 Angel Hill</p>
        <p class="text-center text-lg">Bury St Edmunds</p>
        <p class="text-center text-lg mb-3">IP33 1UZ</p>
        <p class="text-center">
            <a href="https://goo.gl/maps/VYzXVAmnhoAg41mE8"
            target="_blank"
            class="text-blue-600 hover:text-blue-800 text-lg">📍 View on Google Maps</a>
        </p>

        <h3 class="mb-2 mt-3 text-xl text-center"><b>Party Location - {partyDate}</b></h3>
        <p class="text-center text-lg">39 Harwich Road</p>
        <p class="text-center text-lg">Lawford, Manningtree</p>
        <p class="text-center text-lg">Essex</p>
        <p class="text-center text-lg mb-3">CO11 2LS</p>
        <p class="text-center">
            <a href="https://goo.gl/maps/iWqYa6A5YkP6E1TY9"
            target="_blank"
            class="text-blue-600 hover:text-blue-800 text-lg">📍 View on Google Maps</a>
        </p>
    {/if}
</div>