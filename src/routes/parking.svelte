<script>
    import { code, apiUrl, parkingLimit, parkingRequired, invalidCode } from './store.js';
    import {onMount} from 'svelte';
    import ErrorBox from './errorbox.svelte';
    let availableSpaces;
    let spacesAlert = 0;
    let error;

    async function getAvailableSpaces(){
        const response = await fetch(`${apiUrl}/${$code}/parking_count`);
        const data = await response.json();
        let parkingCount = data.parking_count;
        availableSpaces = parkingLimit - parkingCount;
        if (availableSpaces < 10) {
            spacesAlert = 1;
        }
        if (availableSpaces < 1) {
            spacesAlert = 2;
        }
    }

    onMount(async () => {
        await getAvailableSpaces();
    });

    async function handleParkingRequired(event){
        parkingRequired.set(event.target.checked);
        const response = await fetch(`${apiUrl}/parking-required`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: $code,
                    required: event.target.checked
                })
            }
        
        );
        if (response.status == 200){
            parkingRequired.set(event.target.checked);
            await getAvailableSpaces();
        } else if (response.status == 404) {
            invalidCode();
        } else {
            error = "Wow. This is embarrasing. There was an error. Please try again later."
        }
    }
</script>
<div class="bg-indigo-100 rounded p-4 shadow-xl text-center">
    <h2 class="mb-2 text-xl text-center mb-4"><b>Parking</b></h2>
    <p>We have limited parking so please try to car share or get a taxi. If you have no other options and need to drive, please let us know with the switch below so we can plan parking.</p>
    <div class="mt-4 mb-4 items-center"> 
        {#if spacesAlert == 0}
            <span class="inline-flex text-center text-xl font-medium">Available spaces: {availableSpaces}</span>
        {:else if spacesAlert == 1}
            <span class="inline-flex text-center text-xl font-medium text-yellow-500">Available spaces: {availableSpaces}</span>
        {:else if spacesAlert == 2}
            <span class="inline-flex text-center text-xl font-medium text-red-500">Available spaces: {availableSpaces}</span>
        {/if}
    </div>
    <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={$parkingRequired} class="sr-only peer" on:change={handleParkingRequired}>
        <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-900">We need a parking space</span>
    </label>
</div>
<ErrorBox {error}/>