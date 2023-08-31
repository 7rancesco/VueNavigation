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
    <div v-if="item.type === 'eventselection'">
        {{ item.label }}
        <select v-model="item.data" @change="activeEventSelect()">
            <option v-for="option in item.options">{{option.label}}</option>
        </select>
    </div>
</template>
<style scoped>
</style>