<script setup></script>

<template>
    <div class="flex-column link-button">
        <div>
            <slot name="image"></slot>
        </div>
        <div class="lnk-label font-comfortaa-700">
            <slot name="label"></slot>
        </div>
        <div class="lnk-descr">
            <slot name="description"></slot>
        </div>
    </div>
</template>

<style scoped>
.link-button {
    --comp-max-size: 18rem;
    --comp-min-size: 17rem;
    --comp-padding: 1rem;
    border-radius: 20px;
    border: 2px solid #fff;
    transition: border-color 500ms;

    max-width: 33%;
    max-height: calc(var(--comp-max-size) - var(--comp-padding));

    width: 25%;
    height: auto;

    min-width: var(--comp-min-size);
    min-height: var(--comp-min-size);

    padding: var(--comp-padding);

    justify-content: space-evenly;

    cursor: pointer;
}
.link-button:hover {
    border-color: var(--color-green);
}
.lnk-label {
    font-size: 4.5rem;
    line-height: 78px;
    width: fit-content;
}
.lnk-descr {
    font-size: 1.5rem;
    line-height: 28px;
    color: var(--color-gray);
    width: 70%;
}
</style>
