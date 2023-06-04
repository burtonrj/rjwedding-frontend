<script>
    import { FallingConfetti } from 'svelte-canvas-confetti';
    import { partyAttendance, code, apiUrl } from '../store.js';
    import ErrorBox from '../errorbox.svelte';

    let confetti = false;
    let error;

    async function handleRSVP(answer, eventType){
        const response = await fetch(`${apiUrl}/rsvp`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: $code,
                    status: answer,
                    event: eventType
                })
            }
        
        );
        if (response.status == 200) {
            if (answer == 1){
                confetti = true;
            }
            partyAttendance.set(answer);
        } else if (response.status == 404) {
            invalidCode();
        } else {
            error = "Wow. This is embarrasing. There was an error. Please try again later."
        }
    }
</script>

<h3 class="mb-2 text-xl text-center mb-4"><b>RSVP - Let us know if you can make it</b></h3>
<div class="grid grid-cols-3 gap-1 mb-4">
    <h3 class="mb-2 text-lg text-center">Status:</h3>
    {#if $partyAttendance === -1}
        <span class='inline-flex text-center text-lg col-span-2'>
            Please let us know if you're coming
        </span>
    {:else if $partyAttendance === 0}
        <span class='inline-flex text-center items-center bg-red-100 text-red-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded-full mx-auto mb-3 col-span-2'>
            Sorry you can't make it
        </span>
    {:else}
        <span class='inline-flex text-center items-center bg-green-100 text-green-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded-full mx-auto mb-3 col-span-2'>
            See you at the party!
        </span>
    {/if}
</div>

<div class="grid grid-cols-2 gap-2">
    <button
    class="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-100 hover:bg-indigo-500 duration-300 bg-blue-500 text-white font-bold py-2 px-4 rounded"
    on:click={() => handleRSVP(1, "party")}
    >
        I'll be there! 😀
    </button>
    {#if confetti}
        <FallingConfetti particleCount={100}/>
    {/if}
    <button
    class="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-100 hover:bg-indigo-500 duration-300 bg-blue-500 text-white font-bold py-2 px-4 rounded"
    on:click={() => handleRSVP(0, "party")}
    >
        Sorry! Can't make it 🙁
    </button>
</div>
<ErrorBox {error}/>
