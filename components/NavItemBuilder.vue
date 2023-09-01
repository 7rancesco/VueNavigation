<script setup lang="ts">
    import {NavigationSchema} from '../NavigationSchema';

    const prop = defineProps(['item']);
    interface Select {
        label: string,
        event: Function
    }
    const activeEventSelect = () => {
        prop.item.options.find((e : Select) => e.label === prop.item.data).event();

    }

</script>
<template>
    <div v-if="item.type === 'link'">
        <button @click="NavigationSchema.link = item.link; NavigationSchema.show = false;">{{ item.label }}</button>
    </div>
    <div v-if="item.type === 'eventlink'">
        <button @click="NavigationSchema.link = item.link; item.event(); NavigationSchema.show = false;">{{ item.label }}</button>
    </div>
    <div v-if="item.type === 'event'">
        <button @click="item.event();">{{ item.label }}</button>
    </div>    
    <div v-if="item.type === 'eventselection'" class="select">
        {{ item.label }}
        <select v-model="item.data" @change="activeEventSelect()">
            <option v-for="option in item.options">{{option.label}}</option>
        </select>
    </div>
</template>
<style scoped>

    *{
        color: var(--color);
    }

    div, button{
        width: 15vw;
        height: 15vh;
        border: solid 1px var(--border);
        border-radius: 10px;
        margin-right: 1vw;
        background-color: rgba(0, 0, 0, 0.101);
    }

    button:hover{
        cursor: pointer;
    }

    button{
        /* background: var(--background); */
        border: none;
        font-size: 1rem;
    }

    select{
        width: 15vw;
        height: 4.5vh;
        border-radius: 5px;
        font-size: 1.2rem;
        background: transparent;
        color: var(--color);
        border: none;
    }

    .select{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
    }
</style>