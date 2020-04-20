<template>
    <div class="group-items-wrapper"
        :class="{
            'group-items-wrapper_inline' : inline,
            'group-items-wrapper_block' : !inline
        }"
    >
        <RadioCheckItem
            v-for="(item, index) in data"
            :key="index"
            :index="index"
            :mode="mode"
            :object="item"
            :label-position="labelPosition"
            :disabled="data.disabled || disabled"
            :checked="include(checkedModel, item.value)"
            @checked="getCheckedValue"
        ></RadioCheckItem>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import RadioCheckItem from "./radio-check.vue";
import { RadioCheckObject } from "@/models/radio-object";

@Component({
    components: { RadioCheckItem, }
})
export default class Group extends Vue {
    @Prop({ type: Boolean, default: false }) readonly inline!: boolean;
    @Prop({ type: String, default: 'right' }) readonly labelPosition!: string;
    @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
    @Prop({ type: String, default: 'radio' }) readonly mode!: string;
    @Prop({ type: Array, default: () => [] }) checked!: [string|number];
    @Prop({ type: Array, default: () => [] }) data!: RadioCheckObject[];

    private checkedModel: any[] = [];

    @Emit('checked')
    private getCheckedValue(value: string|number|undefined = undefined): string|number[]  {
        if (this.mode === 'radio') this.getCheckedValueRadio(value);
        else this.getCheckedValueCheckbox(value);

        return this.checkedModel;
    }

    private getCheckedValueCheckbox(value: string|number|undefined = undefined) {
        if (!value) this.checkedModel = this.checked.length ? this.checked : this.data.filter(item => item.checked).map(item => item.value) || [];
        else {
            const index = this.checkedModel.indexOf(value);
            index === -1 ? this.checkedModel.push(value) : this.checkedModel.splice(index, 1);
        }
    }

    private getCheckedValueRadio(value: string|number|undefined = undefined) {
        if (!value) {
            this.checkedModel = [];
            if (this.data.filter(item => item.checked).map(item => item.value)[0]) this.checkedModel = [this.data.filter(item => item.checked).map(item => item.value)[0]];
            else if (this.checked[0]) this.checkedModel = [this.checked[0]];
        }
        else this.checkedModel = [ value ];
    }

    private include(array: [], value: any): boolean {
        for(let i = 0; i <= array.length; i++) {
            if(array[i] === value) return true;
        }
        return false;
    }

    private created(): void {
        this.getCheckedValue();
    }
}
</script>

<style lang="scss">
    .group-items-wrapper {
        display: flex;
        &_inline {
            flex-direction: row;
        }
        &_block {
            flex-direction: column;
        }
    }
</style>