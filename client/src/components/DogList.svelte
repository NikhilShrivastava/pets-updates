<script lang="ts">
    import { onMount } from "svelte";
    import DogDetails from './DogDetails.svelte';
    import DogFilters from './DogFilters.svelte';
    import { dogFilters } from '../stores/dogStore';

    interface Dog {
        id: number;
        name: string;
        breed: string;
    }

    let dogs: Dog[] = [];
    let loading = true;
    let error: string | null = null;

    $: fetchDogs($dogFilters);

    const fetchDogs = async (filters: any) => {
        loading = true;
        const params = new URLSearchParams();
        if (filters.breed) params.append('breed', filters.breed);
        if (filters.showOnlyAvailable) params.append('available', 'true');

        try {
            const response = await fetch(`/api/dogs?${params}`);
            if(response.ok) {
                dogs = await response.json();
            } else {
                error = `Failed to fetch data: ${response.status} ${response.statusText}`;
            }
        } catch (err) {
            error = `Error: ${err instanceof Error ? err.message : String(err)}`;
        } finally {
            loading = false;
        }
    };

    onMount(() => {
        fetchDogs();
    });
</script>

<div class="container mx-auto p-4">
    <DogFilters />
    
    {#if loading}
        <!-- loading animation -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each Array(6) as _, i}
                <div class="bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-slate-700/50">
                    <div class="p-6">
                        <div class="animate-pulse">
                            <div class="h-6 bg-slate-700 rounded w-3/4 mb-3"></div>
                            <div class="h-4 bg-slate-700 rounded w-1/2 mb-4"></div>
                            <div class="h-4 bg-slate-700 rounded w-1/4 mt-6"></div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else if error}
        <!-- error display -->
        <div class="text-center py-12 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
            <p class="text-red-400">{error}</p>
        </div>
    {:else if dogs.length === 0}
        <!-- no dogs found -->
        <div class="text-center py-12 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
            <p class="text-slate-300">No dogs available at the moment.</p>
        </div>
    {:else}
        <!-- dog list -->
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {#each dogs as dog (dog.id)}
                <DogDetails {dog} />
            {/each}
        </div>
    {/if}
</div>