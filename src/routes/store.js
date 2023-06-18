import { writable } from 'svelte/store';

export const apiUrl = import.meta.env.VITE_API_URL;
export const partyDate = import.meta.env.VITE_PARTY_DATE;
export const ceremonyDate = import.meta.env.VITE_CEREMONY_DATE;
export const parkingLimit = import.meta.env.VITE_PARKING_LIMIT

export const loginError = writable(null);

export const admin = writable(false);
export const displayName = writable(null);
export const partyCount = writable(null);
export const ceremonyCount = writable(null);
export const plusOne = writable(null);

export const partyAttendance = writable(null);
export const ceremonyAttendance = writable(null);
export const dietaryRequirements = writable(null);
export const songChoice = writable(null);
export const parkingRequired = writable(false);
export const code = writable(null);

export function invalidCode(){
    loginError.set("Whoops! That code is not valid. Check the code matches the one on your invite.");
    displayName.set(null);
    dietaryRequirements.set(null);
    songChoice.set(null);
    parkingRequired.set(null);
    code.set(null);
    ceremonyCount.set(null);
    plusOne.set(null);
    partyAttendance.set(null);
    ceremonyAttendance.set(null);
    partyCount.set(null);
    ceremonyCount.set(null);
    admin.set(false);
}
