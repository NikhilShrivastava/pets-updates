import { writable } from 'svelte/store';

export interface DogFilters {
    breed: string;
    showOnlyAvailable: boolean;
}

export const dogFilters = writable<DogFilters>({
    breed: '',
    showOnlyAvailable: false
});
