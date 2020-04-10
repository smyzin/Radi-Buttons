import Vue from 'vue'

export interface RadioObject{
    text: string
    value?: string|number
    disabled?: boolean
}

export interface IRadioButton extends Vue{
    onSelectedValueChanged: void;
    checkSelected: void;
    onCheckedValue: void;
    selectedValue: string|number;
}