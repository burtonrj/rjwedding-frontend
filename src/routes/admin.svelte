<script>
    import { code, apiUrl } from './store.js';
    import { onMount } from 'svelte';
    let partyCount = -1;
    let ceremonyCount = -1;
    let reponseCount = -1;
    let totalGrps = -1;

    let downloadUrl = '';
    let fileName = '';
    

    onMount(async () => {
        // if necessary, replace this with the logic to get the URL
        // for example, from a config or an API call
        downloadUrl = `${apiUrl}/${$code}/download-database`;
        
        let date = new Date();
        let dateStr = `${date.getFullYear()}-${('0' + (date.getMonth()+1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
        fileName = `BurtonWeddingDatabase_${dateStr}.csv`;

        const response = await fetch(`${apiUrl}/admin/attendance`);
        if (response.status == 200) {
            let data = await response.json();
            partyCount = data.party_count;
            ceremonyCount = data.ceremony_count;
            reponseCount = data.response_count;
            totalGrps = data.total_groups;
        } else {
            console.log(`Error fetching attendance stats ${response.status}; ${response.statusText}`);
        }
    });

    
</script>
<div  class="mx-auto px-4 py-8 -mb-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mx-2">
      <!-- First column -->
      <div class="bg-indigo-100 rounded p-4 shadow-xl">
        <h3 class="mb-2 text-xl text-center"><b>Attendance stats</b></h3>
        <div class="mx-2">
          <strong>Number of people attending the ceremony:</strong>
          <p>{partyCount}</p>
          <strong>Number of people not attending the party:</strong>
          <p>{ceremonyCount}</p>
          <strong>Number of responses:</strong>
          <p>{reponseCount}/{totalGrps}</p>
        </div>
      </div>
      <!-- Second column -->
      <div class="bg-indigo-100 rounded p-4 shadow-xl">
        <h3 class="mb-2 mx-auto text-xl text-center"><b>Download database</b></h3>
        <div class="flex justify-center">
            <a href={downloadUrl} download={fileName} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Download CSV
            </a>
        </div>
      </div>
    </div>
</div>