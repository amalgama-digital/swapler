<template>
    <div class="flex-row info-container w-80">
        <div class="flex-row logo-container w-50">
            <img src="/img/svg/swapler_icon.svg" alt="" />
            <p class="font-comfortaa-700">swapler</p>
        </div>
        <span class="info-text w-50">
            multifunctional platform for managing your NFT`s
        </span>
    </div>
</template>

<style scoped>
img {
    width: 146px;
}
p {
    font-size: 81px;
}
.info-container {
    justify-content: space-between;
    align-items: center;
}
.logo-container {
    gap: 0.5rem;
    justify-content: flex-start;
}
.info-text {
    color: var(--color-green);
    font-size: 1.5rem;
    line-height: 2rem;
    font-style: normal;
    font-weight: 300;
}
</style>
