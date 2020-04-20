<template>
    <label
        class="control-item"
        :for="`${mode}_item_${index}`"
        :class="{ 'control-item_disabled': item.disabled || disabled, }"
    >
        <span
            class="control-item__label"
            :class="{
                'control-item__label_top': labelPosition === 'top',
                'control-item__label_left': labelPosition === 'left',
            }"
            v-if="labelPosition === 'left' || labelPosition === 'top'"
        >{{ item.text }}</span>
        <input class="control-item__input"
            :class="{
             'control-item__input_radio': mode === 'radio',
             'control-item__input_checkbox': mode === 'checkbox'
            }"
            :name="`${mode}-button`"
            :type="mode"
            :id="`${mode}_item_${index}`"
            :value="item.value"
            :checked="item.checked || checked"
            :disabled="item.disabled || disabled"
            @change="changeItemState(item)"
        >
        <div class="control-item__checker"
            :class="{
                'control-item__checker_radio': mode === 'radio',
                'control-item__checker_checkbox': mode === 'checkbox'
            }"
        ></div>
        <span
            class="control-item__label"
            :class="{
                'control-item__label_bottom': labelPosition === 'bottom',
                'control-item__label_right': labelPosition === 'right',
            }"
            v-if="labelPosition === 'right' || labelPosition === 'bottom'"
        >{{ item.text }}</span>
    </label>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Emit, Prop } from "vue-property-decorator";
    import { RadioCheckObject } from "@/models/radio-object"

    @Component
    export default class RadioButtons extends Vue {
        @Prop({ type: Boolean, default: true }) disabled!: boolean;
        @Prop({ type: Boolean, default: false }) checked!: boolean;

        @Prop({ type: Number, default: 1 }) index!: number;
        @Prop({ type: String, default: 'radio' }) mode!: string;

        @Prop({ type: Object, default: () => ({}) }) object!: RadioCheckObject;

        @Prop({ type: String, default: 'right' }) labelPosition!: string;

        private item: RadioCheckObject | object = {};

        @Emit('checked')
        private changeItemState(object: RadioCheckObject): string|number|undefined {
            if (object) return object.value;
        }

        private prepareData(object: RadioCheckObject): RadioCheckObject {
            return {
                ...object,
                checked: object.checked || false,
                disabled: object.disabled || false,
            };
        }

        private created(): void {
            this.item = this.prepareData(this.object);
        }
    }
</script>

<style lang="scss">
    $radio-ripple-size: 15px;
    $radio-ripple-small-size: 10px;

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

    @keyframes ripple-small {
        0% {
            border-radius: 50%;
            box-shadow: 0 0 0 1px $radio-indicator-outline-0;
        }
        50% {
            border-radius: 50%;
            box-shadow: 0 0 0 $radio-ripple-small-size $radio-indicator-outline-10;
        }
        100% {
            border-radius: 50%;
            box-shadow: 0 0 0 $radio-ripple-small-size $radio-indicator-outline-0;
        }
    }

    // *************************************
    *, *:before, *:after {
        box-sizing: border-box;
    }
    // *************************************

    .control-item {
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
            cursor: no-drop !important;
            .control-item {
                &__checker, &__label { cursor: no-drop !important;; }
                &__checker {
                    &_radio {
                        border-color: $radio-indicator-outline-10 !important;
                        &:after {
                            display: none !important;
                            background: $radio-indicator-outline-40 !important;
                        }
                    }
                    &_checkbox {
                        border-color: $radio-indicator-outline-10 !important;
                        &:after {
                            display: none !important;
                            /*background: transparent !important;*/
                        }
                    }
                }
                &__input {
                    &_radio {
                        &:checked ~ .control-item__checker {
                            &_radio  { background-color: $radio-indicator-inside-70 !important; }
                        }
                        &:checked ~ .control-item__checker {
                            &_radio:after { display: block !important; }
                        }
                    }
                    &_checkbox {
                        &:checked ~ .control-item__checker {
                            &_checkbox:after {
                                display: block !important;
                                opacity: .35 !important;
                                background-image: url("../../../assets/rexona.svg");
                            }
                        }
                    }
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
            &_radio {
                &:checked ~ .control-item__checker {
                    background-color: $radio-indicator-inside;
                    border-color: $radio-indicator-outline;
                }
                &:checked ~ .control-item__checker:after {
                    display: block;
                    animation: ripple .3s;
                    background: $radio-indicator-outline;
                }
            }
            &_checkbox {
                &:checked ~ .control-item__checker {
                    border-color: $radio-indicator-outline;
                }
                &:checked ~ .control-item__checker:after {
                    display: block;
                    animation: ripple-small .3s;
                    opacity: 1;
                    background-image: url("../../../assets/rexona.svg");
                }
            }
        }
        &__checker {
            display: flex;
            position: relative;
            height: 16px;
            width: 16px;
            background-color: transparent;
            &_radio {
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
            &_checkbox {
                border-radius: 3px;
                border: 1px solid $radio-indicator-inside;
                &:after {
                    content: "";
                    position: absolute;
                    display: none;
                    top: 2px;
                    left: 2px;
                    width: 10px;
                    height: 10px;
                }
            }
        }

        &:hover {
            .control-item {
                &__checker {
                    &_radio {
                        border-color: $radio-indicator-outline-40;
                        &:after {
                            display: block;
                            background: $radio-indicator-outline-40;
                        }
                    }
                    &_checkbox {
                        border-color: $radio-indicator-outline-40;
                        &:after {
                            display: block;
                            opacity: .5;
                            background-image: url("../../../assets/rexona.svg");
                        }
                    }
                }
                &__input {
                    &_radio {
                        &:checked ~ .control-item__checker {
                            background-color: $radio-indicator-inside;
                            border-color: $radio-indicator-outline;
                            &:after {
                                display: block;
                                animation: ripple .3s;
                                background: $radio-indicator-outline;
                            }
                        }
                    }
                    &_checkbox {
                        &:checked ~ .control-item__checker {
                            border-color: $radio-indicator-outline;
                            &:after {
                                display: block;
                                animation: ripple-small .3s;
                                opacity: 1;
                                background-image: url("../../../assets/rexona.svg");
                            }
                        }
                    }
                }
            }
        }
    }
</style>