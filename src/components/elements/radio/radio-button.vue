<template>
    <div
        class="radio-wrapper"
        :class="{
            'radio-wrapper_normal': !inline,
            'radio-wrapper_inline': inline,
        }"
    >
        <label
            class="radio-block"
            :class="{ 'radio-block_disabled': radio.disabled || disabled, }"
            :key="index"
            :for="radio.value"
            v-for="(radio, index) in data"
        >
            <span
                class="radio-block__label"
                :class="{
                    'radio-block__label_top': labelPosition === 'top',
                    'radio-block__label_left': labelPosition === 'left',
                }"
                v-if="labelPosition === 'left' || labelPosition === 'top'"
            >{{ radio.text }}</span>
            <input type="radio"
                class="radio-block__input"
                name="radioGroup"
                :id="radio.value"
                :value="radio.value"
                :disabled="radio.disabled || disabled"
                v-model="selectedValue"
            >
            <div class="radio-block__checker"></div>
            <span
                class="radio-block__label"
                :class="{
                    'radio-block__label_bottom': labelPosition === 'bottom',
                    'radio-block__label_right': labelPosition === 'right',
                }"
                v-if="labelPosition === 'right' || labelPosition === 'bottom'"
            >{{ radio.text }}</span>
        </label>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Emit, Watch, Prop } from "vue-property-decorator";
import { RadioObject } from "@/models/radio-object"

@Component
export default class RadioButtons extends Vue {
    @Prop({ type: String, default: 'left' }) labelPosition!: string;
    @Prop({ type: Boolean, default: false }) inline!: boolean;
    @Prop({ type: Boolean, default: false }) disabled!: boolean;
    @Prop({ type: Array, default: () => [] }) data!: RadioObject[];
    @Prop({ type: String||Number, default: '' }) selected!: any;

    private selectedValue?: any = '';

    @Watch('selectedValue')
    private onSelectedValueChanged(value: string|number) {
        this.onCheckedValue(value);
    }

    @Emit('checked')
    private onCheckedValue(id: string|number) {
        const checked = this.data.find(el => el.value === id);
        if (!checked) return ;
        this.selectedValue = id;
        return checked;
    }

    private checkSelected(value: any) {
        if (value) {
            if (typeof value === 'string' || value instanceof String) {
                return value.length ? value : '';
            } else if (typeof value === 'number' && isFinite(value)) {
                return value;
            }
        }
        return '';
    }

    mounted(): void {
        this.selectedValue = this.checkSelected(this.selected);
    }
}
</script>

<style lang="scss">
$radio-ripple-size: 15px;

$radio-text-color: rgba(167, 190, 190, 1);
$radio-text-color-10: rgba(167, 190, 190, .1);
$radio-text-color-30: rgba(167, 190, 190, .3);
$radio-text-color-50: rgba(167, 190, 190, .5);
$radio-text-color-70: rgba(167, 190, 190, .7);
$radio-text-color-80: rgba(167, 190, 190, .8);
$radio-indicator-outline: rgba(85, 197, 202, 1);
$radio-indicator-outline-0: rgba(85, 197, 202, 0);
$radio-indicator-outline-40: rgba(85, 197, 202, .4);
$radio-indicator-outline-10: rgba(85, 197, 202, .1);

$radio-indicator-inside: rgba(0, 102, 107, 1);
$radio-indicator-inside-30: rgba(0, 102, 107, .3);
$radio-indicator-inside-70: rgba(0, 102, 107, .7);

@keyframes ripple {
    0% {
        box-shadow: 0 0 0 1px $radio-indicator-outline-0;
    }
    50% {
        box-shadow: 0 0 0 $radio-ripple-size $radio-indicator-outline-10;
    }
    100% {
        box-shadow: 0 0 0 $radio-ripple-size $radio-indicator-outline-0;
    }
}

// *************************************
*, *:before, *:after {
    box-sizing: border-box;
}
// *************************************

.radio-wrapper {
    display: flex;
    &_inline {
        flex-direction: row;
    }
    &_normal {
        flex-direction: column;
    }
}

.radio-block {
    margin: 16px 10px;
    position: relative;
    cursor: pointer;
    font-size: 14px;
    color: $radio-text-color;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;

    &_disabled {
        color: $radio-text-color-30 !important;
        .radio-block {
            &__checker, &__label { cursor: no-drop; }
            &__checker {
                border-color: $radio-indicator-outline-10 !important;
                &:after {
                    display: none !important;
                    background: $radio-indicator-outline-40 !important;
                }
            }
            &__input {
                &:checked ~ .radio-block__checker { background-color: $radio-indicator-inside-70 !important; }
                &:checked ~ .radio-block__checker:after { display: block !important; }
            }
        }
    }

    &__label {
        display: flex;
        min-width: 100px;
        max-width: 100%;
        letter-spacing: 0.21px;
        &_right { padding-left: 14px; }
        &_left { padding-right: 14px; }
    }
    &__input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        &:checked ~ .radio-block__checker {
            background-color: $radio-indicator-inside;
            border-color: $radio-indicator-outline;
        }
        &:checked ~ .radio-block__checker:after {
            display: block;
            animation: ripple .3s;
            background: $radio-indicator-outline;
        }
    }
    &__checker {
        display: flex;
        position: relative;
        height: 16px;
        width: 16px;
        background-color: transparent;
        border-radius: 50%;
        border: 1px solid $radio-indicator-inside;
        &:after {
            content: "";
            position: absolute;
            display: none;
            top: 4px;
            left: 4px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
        }
    }

    &:hover {
        .radio-block {
            &__checker {
                border-color: $radio-indicator-outline-40;
                &:after {
                    display: block;
                    background: $radio-indicator-outline-40;
                }
            }
            &__input {
                &:checked ~ .radio-block__checker {
                    background-color: $radio-indicator-inside;
                    border-color: $radio-indicator-outline;
                    &:after {
                        display: block;
                        animation: ripple .3s;
                        background: $radio-indicator-outline;
                    }
                }
            }
        }
    }
}
</style>