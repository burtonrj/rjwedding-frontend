<script>
    import { FallingConfetti } from 'svelte-canvas-confetti';
    import { partyAttendance, ceremonyAttendance, code, ceremonyDate, partyDate, apiUrl } from '../store.js';
    import ErrorBox from '../errorbox.svelte';

    let confetti = false;
    let error;

    console.log($ceremonyAttendance)
    console.log($partyAttendance)

    async function handleRSVP(checkboxEvent, eventType){
        confetti = false;
        let answer = checkboxEvent.target.checked ? 1 : 0;
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
            if (eventType == "party")
                partyAttendance.set(answer);
            else if (eventType == "ceremony"){
                ceremonyAttendance.set(answer);
            }
        } else if (response.status == 404) {
            invalidCode();
        } else {
            error = "Wow. This is embarrasing. There was an error. Please try again later."
        }
    }

    function checkedDefault(attendanceValue){
        if (attendanceValue == -1){
            return 0;
        } else {
            return attendanceValue;
        }
    }
</script>

<div class="flex flex-col">
    <h3 class="mb-2 text-xl text-center mb-4"><b>RSVP - Let us know if you can make it</b></h3>
    <div class="grid grid-flex grid-cols-3">
        <p class="ml-4 text-md text-gray-900 col-span-2 text-center mx-auto my-auto">We can make the ceremony on <b>{ceremonyDate}</b></p>
        <label class="relative mx-auto my-auto">
            <input type="checkbox" checked={checkedDefault($ceremonyAttendance)} class="sr-only peer" on:change={(event) => handleRSVP(event, "ceremony")}>
            <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
    </div>
    <div class="grid grid-flex grid-cols-3 mt-2">
        <p class="ml-4 text-md text-gray-900 col-span-2 text-center mx-auto my-auto">We can make the party on <b>{partyDate}</b></p>
        <label class="relative mx-auto my-auto">
            <input type="checkbox" checked={checkedDefault($partyAttendance)} class="sr-only peer" on:change={(event) => handleRSVP(event, "party")}>
            <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
    </div>
    {#if confetti}
        <FallingConfetti particleCount={100}/>
    {/if}

    <div class="grid grid-cols-1 gap-1 mb-4 mt-4 mx-auto text-center">
        {#if $partyAttendance === 1 && $ceremonyAttendance === 1}
            <span class='inline-flex text-center items-center bg-green-100 text-green-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded-full mx-auto mb-3'>
                Yay! We're so glad you can join us on our big day and for the party!
            </span>
        {:else if $partyAttendance === 0 && $ceremonyAttendance === 1}
            <span class='inline-flex text-center items-center bg-green-100 text-green-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded-full mx-auto mb-3 col-span-1'>
                Yay! We're so excited to share our big day with you!
            </span>
        {:else if $partyAttendance === 1 && $ceremonyAttendance === 0}
            <span class='inline-flex text-center items-center bg-green-100 text-green-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded-full mx-auto mb-3 col-span-1'>
                Yay! We're so excited to see you at the party!
            </span>
        {:else if $partyAttendance === 0 && $ceremonyAttendance === 0}
            <span class='inline-flex text-center items-center bg-red-100 text-red-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded-full mx-auto mb-3'>
                Sorry you can't make it
            </span>
        {/if}
    </div>
    <ErrorBox {error}/>
</div>