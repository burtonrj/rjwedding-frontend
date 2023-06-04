<script>
    
    import {partyDate, ceremonyDate, displayName, ceremonyCount} from "./store.js";
</script>
<div >
    <h3 class="text-center text-3xl text-center mx-auto py-3">Hi {$displayName} 👋 </h3>
    {#if $ceremonyCount === 0}
    <p class="text-center text-md text-center mx-2 px-4 py-0">We would love for you to join us on <b>{partyDate}</b> to celebrate us getting married!</p>
    <p class="text-center text-md text-center mx-2 px-4 py-0">
        A wedding to us is a celebration of love with our friends and family. We have decided we just want a big garden party with those closest to us.
        We don't care if you come in your Sunday best or pyjamas, we just want you to be there to celebrate with us.
    </p>
    {:else}
    <p class="text-center text-md text-center mx-2 px-4 py-0">We would love for you to join us for our wedding ceremony on the <b>{ceremonyDate}</b> and our wedding garden party on the <b>{partyDate}</b>.</p>
    <p class="text-center text-md text-center mx-2 px-4 py-0">
        We will be having a small ceremony at 2pm on {ceremonyDate} and then a big garden party the following day for our nearest and dearest.
    </p>
    {/if}
</div>