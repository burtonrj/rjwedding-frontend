<!-- Grid container -->
<script>
    
    import {apiUrl, code, dietaryRequirements} from './store.js';
	import ErrorBox from './errorbox.svelte';
    import ThumbsUp from './thumbsup.svelte';
    let error;
    let thumbsUp = false;

    async function handleSubmit(event){
        event.preventDefault();

        const requirements = document.getElementById('dietary-requirements-input').value;

        const response = await fetch(`${apiUrl}/dietary-requirements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: $code,
                requirements: requirements
            })
        });
        if (response.status == 200) {
            dietaryRequirements.set(requirements);
            thumbsUp = true;
            setTimeout(() => {
                thumbsUp = false;
            }, 3000);
        } else if (response.status == 404) {
            invalidCode();
        } else {
            error = "Wow. This is embarrasing. There was an error. Please try again later."
        }
    }
</script>

<div  class="mx-auto px-4 py-8 -mb-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mx-2">
        <!-- First column -->
        <div class="bg-indigo-100 rounded p-4 shadow-xl">
            <h3 class="mb-2 text-xl text-center"><b>What to expect on the day</b></h3>
            <p class="text-center">🍔 <b><a href="https://whatthepeck.co.uk" class="underline decoration-blue-500">What the Peck</a></b> from Bury St Edmunds will be providing the main course. Expect their amazing chicken burgers, a tasty veggie option, and fries</p>
            <p class="text-center mt-2">🍹 Welcome drinks are on us, but a local bar will be serving soft drinks and alcohol throughout the day and into the night, so please bring cash/card</p>
            <p class="text-center mt-2">🍰 We'll have brownies and wedding cake (ofc!) for desert</p>
            <p class="text-center mt-2">🍪 We're obnoxiously British, so we'll have a biscuit table and various snacks throughout the evening (please let us know if you have allergies!)</p>
        </div>

        <!-- Second column -->
        <div class="bg-indigo-100 rounded p-4 shadow-xl">
            <h3 class="mb-2 text-xl text-center"><b>Allergies/Dietary requirements</b></h3>
            <p class="text-center mb-4">We want you to have the best time possible, so please let us know if you have any allergies or specific food/drink requirements.</p>
            <form on:submit={handleSubmit}>
                <textarea id="dietary-requirements-input" name="dietary-requirements-input" rows="3" class="w-full p-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">{$dietaryRequirements}</textarea>
                <button type="submit" class="w-full transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-100 hover:bg-indigo-500 duration-300 bg-blue-500 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </form>
            <ErrorBox error={error} />
            {#if thumbsUp}
                <ThumbsUp />
            {/if}
        </div>
    </div>
</div>
