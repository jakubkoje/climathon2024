export default defineAppConfig({
    ui: {
        input: {
            slots: {
                root: 'w-full focus-[]',
                base: 'h-[2.5rem]'
            }
        },
        button: {
            slots: {
                base: 'cursor-pointer'
            }
        }
    }
})