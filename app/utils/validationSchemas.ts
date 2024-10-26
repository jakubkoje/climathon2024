// schemas.ts
import * as v from 'valibot';

export const step1Schema = v.object({
    firstName: v.pipe(v.string(), v.minLength(1, 'First name is required')),
    lastName: v.pipe(v.string(), v.minLength(1, 'Last name is required')),
    email: v.pipe(v.string(), v.email('Invalid email')),
    phone: v.pipe(v.string(), v.regex(/^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/, 'Phone number has an invalid format')),
    address: v.pipe(v.string(), v.minLength(1, 'Address is required')),
    city: v.pipe(v.string(), v.minLength(1, 'City is required')),
    postalCode: v.pipe(v.string(), v.regex(/^\d{5}$/, 'Invalid postal code')),
});

export const step2Schema = v.object({
    address: v.pipe(v.string(), v.minLength(1, 'Address is required')),
    postalCode: v.pipe(
        v.string(),
        v.minLength(5, 'Postal code is invalid'),
        //v.custom((code: string) => bratislavaPostalCodes.includes(code) || 'Postal code must be a valid Bratislava postal code')
    )
});

export const step3Schema = v.object({
    map: v.array(v.array(v.number()), 'The selected location is not suitable for the container stand'),
});

const bratislavaPostalCodes: string[] = [
    "81101", "81102", "81103", "81104", "81105", "81106", "81107", "81108", "81109", "81499",
    "82101", "82102", "82103", "82104", "82105", "82106", "82107", "82108", "82109",
    "83101", "83102", "83103", "83104", "83105", "83106", "83107",
    "84101", "84102", "84103", "84104", "84105", "84106", "84107", "84108", "84109", "84110",
    "85101", "85102", "85103", "85104", "85105", "85106", "85107", "85108", "85109", "85110"
];


// Add types for each schema
export type Step1Schema = v.InferOutput<typeof step1Schema>;
export type Step2Schema = v.InferOutput<typeof step2Schema>;
export type Step3Schema = v.InferOutput<typeof step3Schema>;
