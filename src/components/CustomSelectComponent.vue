<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
});

const emit = defineEmits(["input"])

const selected = ref(props.default
        ? props.default
        : props.options.length > 0
        ? props.options[0]
        : null
);
const open = ref(false);

onMounted(() => {
  emit('input', selected);
});
</script>

<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-select {
  position: relative;
  width: max-content;
  text-align: left;
  outline: none;
}

.custom-select .selected {
  background-color: inherit;
  color: var(--color-green);
  padding-right: 1em;
  cursor: pointer;
  user-select: none;
  width: max-content;
  min-width: 7rem;
}

.custom-select .selected.open {
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 50%;
  right: .2rem;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: var(--color-green) transparent transparent transparent;
}

.custom-select .items {
  color: #fff;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  position: absolute;
  background-color: rgba(10, 10, 10, 0.7);
  width: max-content;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  color: #fff;
  padding-right: 1em;
  cursor: pointer;
  user-select: none;
  line-height: 20px;
}

.custom-select .items div:hover {
  background-color: var(--color-dark-gray);
}

.selectHide {
  display: none;
}
</style>
