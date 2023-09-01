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
    <button v-if="!NavigationSchema.show" class="button_menu"  @click="NavigationSchema.show = true">
        <svg viewBox="0 0 60 60">
            <path id="menu_line-1" stroke="var(--color)" stroke-width="1.5" d="M14 18 L46 18" ></path>
            <path id="menu_line-2" stroke="var(--color)" stroke-width="1.5" d="M10 31 L50 31" ></path>
            <path id="menu_line-3" stroke="var(--color)" stroke-width="1.5" d="M14 44 L46 44" ></path>
        </svg>
    </button>
<div v-if="NavigationSchema.show">

    <div class="navigation bounce_up">
        <div class="nav_header">
            <select v-model="NavigationSchema.selected">
                <option v-for="value in NavigationSchema.items">{{ value.label }}</option>
            </select>
            <button class="btn_close" @click="NavigationSchema.show = false">X</button>
        </div>
        <div>
            <div v-if="items?.type === 'group' " class="nav_items_container">
                <div v-for="item in items.group">
                    <NavItemBuilder :item="item"></NavItemBuilder>
                </div>
            </div>
            <div v-if="items?.type === 'subgroup' " class="nav_items_container">
                <div class="select">
                    <select v-model="subSelect">
                        <option v-for="o in items.subgroup">{{ o.label }}</option>
                    </select>
                </div>
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
        background: var(--background);
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        box-shadow: 0px -1px 3px 1px rgba(255, 255, 255, 0.172);
    }

    .nav_header{
        height: 5vh;
        background: linear-gradient(rgba(0, 0, 0, 0.064), rgba(0, 0, 0, 0.138));
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 15px;
        padding-right: 15px;
        border-bottom: solid 1px var(--border);
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;        
    }

    .nav_items_container{
        display: flex;
        padding: 15px;
    }

    .button_menu{
        position: fixed;
        width: 5vw;
        height: 5vw;
        left: 47.5vw;
        bottom: 10px;
        background: rgba(0, 0, 0, 0.069);
        color: var(--color);
        border: none;
        border-radius: 5vw;
        box-shadow: 0px 0px 5px 1px rgba(255, 255, 255, 0.062) inset;
    }

    .btn_close{
        border: none;
        background: transparent;
        color: var(--color);
        height: 4.5vh;
        width: 4.5vh;
        border-radius: 3px;
        font-size: 2rem;
        overflow: hidden;
        margin-bottom: 1vh;
    }

    .bounce_up{
        animation: bounce_up 0.5s ease;
    }

    button:hover{
        cursor: pointer;
    }

    select{
        width: 20vw;
        height: 4.5vh;
        border-radius: 5px;
        font-size: 1.2rem;
        background: rgba(255, 255, 255, 0.061);
        color: var(--color);
        border: solid 1px var(--border);
    }

    .select{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
    }    

    @keyframes bounce_up {
        from{
            transform: translateY(100%);
        }
        to{
            transform: translateY(0%);
        }
    }

    #menu_line-1{
        animation: line_menu 0.4s ease-in;
    }
    #menu_line-2{
        animation: line_menu 0.4s ease-in;
        animation-delay: 0.1s;
    }
    #menu_line-3{
        animation: line_menu 0.4s ease-in;
        animation-delay: 0.2s;
    }

    @keyframes line_menu {
        0%{
            stroke-dasharray: 30;
            stroke-width: 3;
        }
        99%{
            stroke-dasharray: 0;
            stroke-width: 0;
        }
    }
</style>