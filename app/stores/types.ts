// stores/types.ts
export interface FormField {
    label: string;
    model: string;
    type: string;
    required: boolean;
}

export interface Section {
    title: string;
    formFields: FormField[];
}

export interface Step {
    title: string;
    sections: Section[];
}

export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode: string;
    buildingAddress: string;
    buildingPostalCode: string;
    // Add more fields for future steps here
}
