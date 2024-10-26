import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFormStore = defineStore('form', () => {
    const currentStep = ref(0);

    const formData = ref({
        step1: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            postalCode: ''
        },
        step2: {
            address: '',
            postal_code: '',
        },
        residential: {
            phone: '',
            address: '',
            city: '',
            postalCode: ''
        },
        building: {
            address: '',
            postalCode: ''
        },
        containerLayout: {
            container1100L: 0,
            container240L: 0,
            container120L: 0,
        },
        recommendedOptions: {
            selectedContainer: ''
        }
    });

    const nextStep = () => {
        if (currentStep.value < 3) currentStep.value++;
    };

    const previousStep = () => {
        if (currentStep.value > 0) currentStep.value--;
    };

    const resetForm = () => {
        currentStep.value = 0;
        formData.value = {
            step1: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                postalCode: ''
            },
            step2: {
                address: '',
                postal_code: '',
            },
            residential: {
                phone: '',
                address: '',
                city: '',
                postalCode: ''
            },
            building: {
                address: '',
                postalCode: ''
            },
            containerLayout: {
                container1100L: 0,
                container240L: 0,
                container120L: 0,
            },
            recommendedOptions: {
                selectedContainer: ''
            }
        };
    };

    return {
        currentStep,
        formData,
        nextStep,
        previousStep,
        resetForm
    };
});
