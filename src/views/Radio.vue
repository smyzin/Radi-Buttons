<template>
    <div class="test-wrapper">
        <h2>
            Radio Buttons Elements
        </h2>
        <button @click="isLeft = true">Left position</button> - <button @click="isLeft = false">Right position</button>
        <br>
        <button @click="isInline = true">Inline position</button> - <button @click="isInline = false">Block position</button>
        <hr>
        <div>
            <RadioButtons
                :label-position="changePosition"
                :selected="selected"
                :data="radioArray"
                :inline="isInline"
                :disabled="isLoading"
                @checked="updateCheckedValue"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import RadioButtons from "../components/elements/radio/radio-button.vue";

@Component({
    components: {
        RadioButtons
    }
})
export default class Radio extends Vue {
    private radioArray = [
        {
            text: 'Female',
            value: 'female'
        }, {
            text: 'Male',
            value: 'male',
        }, {
            text: 'Unknown',
            value: 'unknown',
        }, {
            text: 'Doggy',
            value: 'doggy',
            disabled: true,
        }
    ];
    private isChecked = '';
    private selected = this.radioArray[3].value;

    private isLoading: boolean = false;
    private isLeft: boolean = true;
    private isInline: boolean = true;
    private get changePosition(): string {
        return this.isLeft ? 'left' : 'right';
    }

    private updateCheckedValue(value: any) {
        console.log('New value is ', { value });
        this.isChecked = value;
        this.selected = value.value;
    }

    @Watch('onSelect')
    onRadioButtonSelect(value: any): boolean {
        console.log({ value });
        return true;
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