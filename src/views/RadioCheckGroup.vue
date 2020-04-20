<template>
    <div class="test-wrapper">
        <h2>
            Radio/CheckBox Buttons Elements in Group
        </h2>
        <div>
            <button @click="setLoading" :disabled="isLoading" style="color: white;">Set Loading</button>
            <br>
            <button @click="isLeft = true" :disabled="isLoading" style="color: white;">Set left position</button>
            <span>  ---  </span>
            <button @click="isLeft = false" :disabled="isLoading" style="color: white;">Set right position</button>
            <br>
            <button @click="isInline = true" :disabled="isLoading" style="color: white;">Set inline view</button>
            <span>  ---  </span>
            <button @click="isInline = false" :disabled="isLoading" style="color: white;">Set block view</button>
        </div>
        <div style="color: white;">
            Selected: {{ model }}
        </div>
        <hr>
        <div>
            <GroupItems
                :label-position="changePosition"
                :inline="isInline"
                :data.sync="options"
                :mode="'radio'"
                :checked="model"
                :disabled="isLoading"
                @checked="getCheckedValue"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Watch } from "vue-property-decorator";
    import GroupItems from "../components/elements/universal/group.vue";

    import { RADIO_DATA, CHECKBOX_DATA } from "@/models/radio-object";

    @Component({
        components: { GroupItems, }
    })
    export default class Radio extends Vue {
        private radioArray = RADIO_DATA;
        private options = CHECKBOX_DATA;
        private isChecked = '';
        private selected = this.radioArray[0].value;

        private model = [];

        private isLoading: boolean = false;
        private isLeft: boolean = false;
        private isInline: boolean = true;
        private get changePosition(): string {
            return this.isLeft ? 'left' : 'right';
        }

        private setLoading() {
            this.isLoading = true;

            setTimeout(() => {
                this.isLoading = false;
            }, 2500);
        }

        private getCheckedValue(selected: any) {
            this.model = selected;
        }
    }
</script>

<style scoped>
    .test-wrapper {
        width: 100%;
        height: 100%;
        background-color: #052829;
    }
    .test-wrapper > h2, .test-wrapper > button {
        color: white;
    }
</style>