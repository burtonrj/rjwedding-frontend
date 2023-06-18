<script>
    import { 
      loginError, 
      apiUrl,
      admin,
      displayName,
      dietaryRequirements, 
      songChoice, 
      parkingRequired, 
      code, 
      ceremonyCount,
      partyCount,
      plusOne,
      partyAttendance,
      ceremonyAttendance
    } from './store.js';
    import { onMount } from 'svelte';

    let npin = 8;
    let pinWobble = Array(npin).fill(false);

    onMount(() => {
        // Add classes to body
        document.body.classList.add('bg-gray-100', 'min-h-screen', 'flex', 'items-center', 'justify-center');
        return () => {
            // Remove classes from body
            document.body.classList.remove('bg-gray-100', 'min-h-screen', 'flex', 'items-center', 'justify-center');
        };
    });

    function handleInputBox(i, event) {
        if (event.target.value.length >= event.target.maxLength) {
            if (i < npin - 1) {
                const nextInput = document.getElementById(`pin-input-${i+1}`);
                nextInput.focus();
            }
            pinWobble[i] = true;
            setTimeout(() => pinWobble[i] = false, 500);
        }
    }

    function handleInputBoxKeydown(i, event) {
        if (event.key === 'Backspace') {
            if (i > 0) {
                const prevInput = document.getElementById(`pin-input-${i-1}`);
                const currentInput = document.getElementById(`pin-input-${i}`);
                if (currentInput.value.length == 0) {
                    prevInput.focus();
                }
            }
        }

        if (event.key === 'ArrowLeft') {
            if (i > 0) {
                const prevInput = document.getElementById(`pin-input-${i-1}`);
                prevInput.focus();
            }
        } else if (event.key === 'ArrowRight') {
            if (i < npin - 1) {
                const nextInput = document.getElementById(`pin-input-${i+1}`);
                nextInput.focus();
            }
        }
    }

    function isAlphabetic(str) {
        return /^[a-zA-Z]+$/.test(str);
    }

    function convertToUppercase(input){
        if (isAlphabetic(input)) {
            return input.toUpperCase();
        }
        return input;
    }

    async function handleLogin(event) {
        event.preventDefault();
        const pin = Array(npin).fill().map((_, i) => convertToUppercase(document.getElementById(`pin-input-${i}`).value)).join('');
        console.log(pin);
        if (pin.length != npin) {
            loginError.set('Whoops! Your code is too short buddy, it should be 8 digits.');
        } else {
          const response = await fetch(`${apiUrl}/${pin}`);
          if (response.status == 200) {
            let data = await response.json();
            loginError.set(null);

            displayName.set(data.display_name);
            dietaryRequirements.set(data.dietary_requirements);
            songChoice.set(data.song_choice);
            parkingRequired.set(data.parking_required);
            code.set(data.code);
            ceremonyCount.set(data.ceremony_count);
            partyCount.set(data.party_count);
            plusOne.set(data.plus_one);
            partyAttendance.set(data.party_attendance);
            ceremonyAttendance.set(data.ceremony_attendance);
            admin.set(data.admin);

          } else {
            loginError.set('Whoops! That code is not valid. Check the code matches the one on your invite.');
          }
        }
    }
</script>

<div>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img src="/wedding_portrait.png" alt="Image of the happy couple" class="-mb-16 mx-auto object-center w-80"/>
    <div class="bg-white p-6 rounded-lg shadow-md">
        <h1 class="text-2xl mb-1 text-center">Enter PIN</h1>
        <p class="text-sm text-center mb-4">
          You can find this on your invite 🕵️‍♂️
        </p>
        <form class="space-y-4" on:submit={handleLogin}>
          <div class="grid grid-cols-4 md:grid-cols-8 gap-x-2 gap-y-4">
            {#each {length: npin} as _, i}
              <input
                id={`pin-input-${i}`}
                name={`pin-input-${i}`}
                type="text"
                maxlength="1"
                on:input={(event) => handleInputBox(i, event)}
                on:keydown={(event) => handleInputBoxKeydown(i, event)}
                class="w-16 h-16 border-2 border-gray-300 rounded-lg text-center text-xl pin-input text-transform: uppercase {pinWobble[i] ? 'shake' : ''}"
              />
            {/each}
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-300"
          >
            Come in! 💃
          </button>
        </form>
      </div>
      {#if $loginError}
        <p class="text-red-500 text-center mt-4">{$loginError}</p>
      {/if}
</div>

<style>
    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
    }

    .shake {
        animation: shake 0.4s;
    }
</style>