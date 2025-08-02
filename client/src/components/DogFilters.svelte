<script lang="ts">
    import { dogFilters } from '../stores/dogStore';
    import { onMount } from 'svelte';

    interface Breed {
        id: number;
        name: string;
    }

    let breeds: Breed[] = [];

    onMount(async () => {
        const response = await fetch('/api/breeds');
        breeds = await response.json();
    });
</script>

<div class="flex gap-4 items-center mb-6">
    <select 
        class="bg-slate-700 border border-slate-600 text-slate-200 rounded-lg px-4 py-2 w-48"
        bind:value={$dogFilters.breed}
    >
        <option value="">All Breeds</option>
        {#each breeds as breed}
            <option value={breed.name}>{breed.name}</option>
        {/each}
    </select>

    <label class="flex items-center gap-2 text-slate-300">
        <input
            type="checkbox"
            class="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500"
            bind:checked={$dogFilters.showOnlyAvailable}
        >
        Show only available dogs
    </label>
</div>
