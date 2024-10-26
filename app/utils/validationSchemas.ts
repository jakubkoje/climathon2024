// schemas.ts
import * as v from 'valibot';

export const step1Schema = v.object({
    firstName: v.pipe(v.string(), v.minLength(1, 'First name is required')),
    lastName: v.pipe(v.string(), v.minLength(1, 'Last name is required')),
    email: v.pipe(v.string(), v.email('Invalid email')),
    phone: v.pipe(v.string(), v.minLength(10, 'Phone number must be at least 10 characters')),
});

export const step2Schema = v.object({
    address: v.pipe(v.string(), v.minLength(1, 'Address is required')),
    city: v.pipe(v.string(), v.minLength(1, 'City is required')),
    postalCode: v.pipe(v.string(), v.minLength(5, 'Postal code must be at least 5 characters')),
});

export const step3Schema = v.object({
    address: v.pipe(v.string(), v.minLength(1, 'Address is required')),
    postalCode: v.pipe(v.string(), v.minLength(5, 'Postal code must be at least 5 characters')),
});

// Add types for each schema
export type Step1Schema = v.InferOutput<typeof step1Schema>;
export type Step2Schema = v.InferOutput<typeof step2Schema>;
export type Step3Schema = v.InferOutput<typeof step3Schema>;
