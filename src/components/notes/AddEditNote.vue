<template>
  <div class="card has-background-success-dark p-4 mb-5">
    <div class="field">
      <div class="control">
        <!-- you cannot directly props a v-model, use :value instead -->
        <!-- then you use $event.target.value for emit -->
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          placeholder="Add a new note"
          ref="newNoteRef"
        />
      </div>
    </div>
    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
/* PROPS */
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits("update:modelValue");
</script>