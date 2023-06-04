<script>
    import { plusOne, code, apiUrl } from '../store.js';
    import ErrorBox from '../errorbox.svelte';
    let error;

    async function handlePlusOne(event) {
        const response = await fetch(`${apiUrl}/plus-one`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: $code,
                    status: event.target.checked
                })
            }
        
        );
        if (response.status == 200){
            plusOne.set(event.target.checked);
        } else if (response.status == 404) {
            invalidCode();
        } else {
            error = "Wow. This is embarrasing. There was an error. Please try again later."
        }

    }
</script>

<div class="grid grid-cols-2 gap-2 mt-4">
    <div class="flex flex-col items-center col-span-2">
        <p class="text-center">Will you be bringing a plus one? (Please feel free too!)</p>
        <div class="flex items-center">
            <input id="link-checkbox" type="checkbox" checked={$plusOne} on:change={handlePlusOne} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="link-checkbox" class="ml-2 text-md text-gray-900">Yes, I will be bringing a plus one.</label>
        </div>
    </div>
</div>
<ErrorBox {error}/>
