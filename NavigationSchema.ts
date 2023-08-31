import { reactive, watch } from "vue";

interface Option {
    label: string
}

interface Link extends Option{
    type: "link"
    link : string
}

interface Event extends Option{
    type: "event"
    event: Function
}

interface optionSelect extends Option{
    label: string,
    event: Function
}

interface EventSelection extends Option{
    type: "eventselection"
    options: optionSelect[]
    data: string
}

interface EventLink extends Option{
    type: "eventlink"
    event: Function,
    link: string
}

interface Group extends Option{
    type: "group"
    group: Item[]
}

interface SubGroup extends Option{
    type: 'subgroup',
    subgroup: {
        label: string,
        group: Item[]
    }[]
}

type Item = Link | Event | EventLink | EventSelection | Group | SubGroup

interface Navigation{
    selected: string,
    lastSelected: string,
    link: string,
    items: Item[],
    show: boolean
}


export const NavigationSchema = reactive<Navigation>({
    selected: '',
    link: '',
    lastSelected: '',
    items: [

    ],
    show: false
})

watch(
    () => NavigationSchema.selected,
    (s) => {
        const item = NavigationSchema.items.find(e => e.label === s);
        if(item?.type === 'link'){
            NavigationSchema.show = false;
            NavigationSchema.link = item.link;
        }
        if(item?.type === 'eventlink'){
            NavigationSchema.show = false;
            NavigationSchema.link = item.link;
            item.event();
        }
        if(item?.type === 'event'){
            NavigationSchema.selected = NavigationSchema.lastSelected;
            item.event();
        } else {
            NavigationSchema.lastSelected = s;
        }
    }
)
watch(() =>NavigationSchema.items,
    () => {
        const first = NavigationSchema.items[0];
        if(first){
            NavigationSchema.link = first.type === 'link' ? first.link : ''
            NavigationSchema.selected = first.label
            NavigationSchema.lastSelected = first.label
        }
    }
)

