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

export interface RadioObject{
    text: string
    value?: string|number
    disabled?: boolean
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