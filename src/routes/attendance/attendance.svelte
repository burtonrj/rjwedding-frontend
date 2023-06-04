<script>
    import { displayName, partyCount, ceremonyCount } from '../store.js';
    import RSVP from "./rsvp.svelte"
    import RSVPVip from "./rsvp-vip.svelte"
    import PlusOne from "./plusone.svelte"

    function plusOneView() {
        if ($displayName.includes("&") || $partyCount == 1){
            return false; 
        }
        return true;
    }
    
</script>

<div class="bg-indigo-100 rounded p-4 shadow-xl">
    {#if $ceremonyCount > 0}
        <RSVPVip />
        {#if plusOneView()}
        <PlusOne />
        {/if}
    {:else}
        <RSVP />
        {#if plusOneView()}
        <PlusOne />
        {/if}
    {/if}
</div>