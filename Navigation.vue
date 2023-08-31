<script setup lang="ts">

    import { NavigationSchema } from './NavigationSchema';
    import NavItemBuilder from './components/NavItemBuilder.vue'
    import { computed, ref, watch } from 'vue';

    const items = computed(() => {
        return NavigationSchema.items.find(e => e.label === NavigationSchema.selected);
    })

    const subSelect = ref<string>();

    watch(
        ()=> items.value,
        (i) => {
            if(i?.type === 'subgroup'){
                subSelect.value = i.subgroup[0].label;
            }
        }
    )

</script>

<template>
    <button class="button_menu"  @click="NavigationSchema.show = true">Menu</button>
<div v-if="NavigationSchema.show">

    <div class="navigation">
        <div class="nav_header">
            <select v-model="NavigationSchema.selected">
                <option v-for="value in NavigationSchema.items">{{ value.label }}</option>
            </select>
            <button @click="NavigationSchema.show = false">X</button>
        </div>
        <div>
            <div v-if="items?.type === 'group' " class="nav_items_container">
                <div v-for="item in items.group">
                    <NavItemBuilder :item="item"></NavItemBuilder>
                </div>
            </div>
            <div v-if="items?.type === 'subgroup' " class="nav_items_container">
                <select v-model="subSelect">
                    <option v-for="o in items.subgroup">{{ o.label }}</option>
                </select>
                <div v-for="item in items.subgroup" class="nav_items_container">
                    <div v-if=" item.label === subSelect" v-for="sub in item.group">
                        <NavItemBuilder :item="sub"></NavItemBuilder>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>        
</template>

<style scoped>
    .navigation{
        width: 100vw;
        height: 30vh;
        position: fixed;
        left: 0px;
        bottom: 0px;
        background: rgb(215, 250, 255);
    }

    .nav_header{
        height: 5vh;
        background: linear-gradient(rgba(0, 0, 0, 0.064), rgba(0, 0, 0, 0.138));
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 5px;
        padding-right: 5px;
    }

    .nav_items_container{
        display: flex;

    }

    .button_menu{
        position: fixed;
        width: 10vw;
        left: 45vw;
        bottom: 10px;
    }
</style>