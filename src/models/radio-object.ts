import Vue from 'vue'

export const RADIO_DATA: RadioObject[] = [
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

export const CHECKBOX_DATA: RadioCheckObject[] = [
    {
        text: 'Female',
        value: 'female',
        // checked: true,
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
    }, {
        text: 'Catty',
        value: 'catty',
        disabled: true,
    }
];

export interface RadioObject{
    text: string
    value?: string|number
    disabled?: boolean
}

export interface RadioCheckObject{
    text: string;
    value?: string|number;
    disabled?: boolean;
    checked?: boolean;
}

export interface ReturnItemData {
    data: RadioCheckObject;
    index: number;
}

export interface RadioProps{
    labelPosition?: string;
    inline?: boolean;
    disabled?: boolean;
    data?: RadioObject[];
    selected?: any;
}

export interface IRadioButton extends Vue, Element{
    props: Vue.PropOptions;
    onSelectedValueChanged: void;
    checkSelected: void;
    onCheckedValue: void;
    selectedValue: string|number;
}

export interface IRadioCheckButton extends Vue, Element{
    props: Vue.PropOptions;
    prepareData: void;
}