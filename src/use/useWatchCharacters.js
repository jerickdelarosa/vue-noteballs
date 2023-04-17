import { watch } from 'vue'

export function useWatchCharacters(valuetoWatch, maxChars) {
    watch(valuetoWatch, (newVal, oldVal) => {
        if (newVal.length === maxChars) {
            alert(`Only ${maxChars} characters allowed!`)
        }
    })
}