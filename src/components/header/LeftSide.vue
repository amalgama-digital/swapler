<template>
    <div @click="$router.push({name: 'main'})" class="app-header__child">
        <img src="/img/svg/swapler_icon.svg" alt="" />
        <p class="font-comfortaa-700 hideable">swapler</p>
    </div>
</template>

<style scoped>
.app-header__child {
    justify-content: flex-start;
    gap: 0.3rem;
    cursor: pointer;
}
.app-header__child > img {
    width: 40px;
}
p {
    font-size: 30px;
}
</style>
