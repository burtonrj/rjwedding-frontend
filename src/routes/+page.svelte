<script>
  
  import { displayName, admin } from './store.js';
  import Title from './title.svelte';
  import Header from './header.svelte?browser';
  import Bunting from './bunting.svelte?browser';
  import Attendance from './attendance/attendance.svelte';
  import Parking from './parking.svelte';
  import Food from './food.svelte';
  import Login from './login.svelte';
	import Location from './location.svelte';
  import Admin from './admin.svelte';
  import Footer from './footer.svelte';

</script>

{#if $displayName}
  {#if $admin}
    <Header/>
    <Admin/>
    <Footer/>
  {:else}
    <Header/>
    <Title/>
    <div  class="mx-auto px-4 py-8 -mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mx-2">
        <!-- First column -->
        <Attendance/>
        <!-- Second column -->
        <Location/>
      </div>
    </div>
    <Bunting/>
    <Food/>
    <Bunting/>
    <div  class="mx-auto px-4 py-8 -mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mx-2">
        <div class="bg-indigo-100 rounded p-4 shadow-xl">
          <h3 class="mb-2 text-xl text-center"><b>Party Itinerary</b></h3>
          <ul>
              <li>3:00 PM - Arrival & Welcome drinks 🍹</li>
              <li>4:00 PM - Welcome speeches 🎤</li>
              <li>4:30 PM - Food time! 🍔</li>
              <li>5:30 PM - Cake cutting! 🍰</li>
              <li>6:00 PM - First dance 💃🕺</li>
              <li>6:30 PM - Band starts 🎸 Drink, dance, & be merry! 🥳</li>
              <li>11:30 PM - Home time 🚕</li>
          </ul>
        </div>
        <Parking/>
      </div>
    </div>
    <Bunting/>
    <div  class="mx-auto px-4 py-8 -mb-6">
      <div class="grid grid-cols-1 md:grid-cols-1 gap-6 mx-2">
        <div class="bg-indigo-100 rounded p-4 shadow-xl">
          <h3 class="mb-2 text-xl text-center"><b>FAQs</b></h3>
          <div class="mx-2">
              <strong>What is the dress code for the party?</strong>
              <p>Wear anything you feel comfortable in, there's no dress code, but please bear in mind that we'll be outside, dancing in a grassy field (so maybe skip the high heels 😉).</p>
              <strong>Will there be vegetarian and vegan food options? </strong>
              <p>Yep 😊 there will be lots of options. Please fill in the "Allergies/Dietary requirements" section if there is anything in particular we need to be aware of.</p>
              <strong>What should I do about a wedding present?</strong>
              <p>We've lived together for a while now so we have everything we need, but if you would like to gift us something, we would appreciate some pennies to put towards our honeymoon 😊</p>
              <strong>Is there parking?</strong>
              <p>There will be some parking on a first-come first-serve basis, so please get taxis if you can.</p>
              <strong>What are the local taxi companies?</strong>
              <p>Five Sevens - 01206 577777</p>
              <p>All the Fours - 01206 544444</p>
              <p>Panther Cabs - 01206 525525</p>
              <p>Five Eights - 01206 588888</p>
              <p>Book your cabs in advance!</p>
              <strong>Can I bring my dog? </strong>
              <p>No, a dog will be provided 🐶. In all seriousness, Bertie the chocolate labrador will be there, but she gets too excited with other dogs and tends to hurt herself. 
                She also loves food a little too much for her own good (a typical labrador), so please don't feed her.</p>
              <strong>Are children welcome?</strong>
              <p>Yes! We want to make our party as inclusive as possible. Please be aware however, that due to number of people we're catering for we are limited with our food options. The main meal will consist of 
                chicken burgers and chips (plus a veggie option), and there will be snacks, biscuits, deserts, and a cheese board. If your child has specific dietary requirements, please feel free to bring your own food. 
                We can provide refrigeration and access to a microwave if needed.
              </p>
          </div>
        </div>
      </div>
    </div>
    <Bunting/>
    <div  class="mx-auto px-4 py-8 -mb-6">
      <div class="grid grid-cols-1 md:grid-cols-1 gap-6 mx-2">
        <div class="bg-indigo-100 rounded p-4 shadow-xl">
          <h3 class="mb-2 text-xl text-center mb-4"><b>Want to contribute to the wedding playlist? 🎶</b></h3>
          <p class="text-center text-lg mt-4 mb-4">
            If you have a Spotify account, you can add songs to the playlist using this 
            <a href="https://open.spotify.com/playlist/5YtD4gzAuvUIv0CVtWpgog?si=4cdf8045b05d44f6&pt=efe4a592ca386bb7af30bdf5945f3626" 
            class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">link</a>. 
            Just click the "Add Song" button and search for the song you want to add. If you don't have a Spotify account, you can create one for free 
            <a href="https://www.spotify.com/us/signup/"
            class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">here</a>.</p>
          <iframe
            style="border-radius:12px"
            src="https://open.spotify.com/embed/playlist/5YtD4gzAuvUIv0CVtWpgog?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify">
          </iframe>
        </div>
      </div>
    </div>
    <Footer/>
  {/if}
{:else}
  <Login />
{/if}