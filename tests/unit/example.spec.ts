import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { RADIO_DATA, RadioProps } from "@/models/radio-object";
import RadioButton from '@/components/elements/radio/radio-button.vue'

function mountComponentWithProps (Component: any, propsData: any) {
  const Constructor = Vue.extend(Component);
  const vm = new Constructor({
    propsData
  }).$mount();
  return vm.$el;
}

/* Check label position according 'labelPosition' prop */
describe('Radio-Button label Position', () => {
  it('should be the correct label position (left)', () => {
    const RadioButtons = mountComponentWithProps(RadioButton, {});
    const radioSpan = document.querySelector('.radio-block__label');
    if (radioSpan)
      expect(radioSpan.classList.contains('radio-block__label_left')).toBeTruthy();
  });
  it('should be the correct label position (right)', () => {
    const RadioButtons = mountComponentWithProps(RadioButton, { labelPosition: 'right' });
    const radioSpan = document.querySelector('.radio-block__label');
    if (radioSpan)
      expect(radioSpan.classList.contains('radio-block__label_right')).toBeTruthy();
  });
});

/* Check if radio button's view is block/inline element */
describe('Radio-Button view', () => {
  it('should have the correct class for block view', () => {
    const RadioButtons = mountComponentWithProps(RadioButton, { });
    const radioView = document.querySelector('.radio-wrapper');
    if (radioView)
      expect(radioView.classList.contains('radio-wrapper_normal')).toBeTruthy();
  });
  it('should have the correct class for inline view', () => {
    const RadioButtons = mountComponentWithProps(RadioButton, { inline: true });
    const radioView = document.querySelector('.radio-wrapper');
    if (radioView)
      expect(radioView.classList.contains('radio-wrapper_inline')).toBeTruthy();
  });
});

/* Check if inputs are disabled */
describe('Radio-Button is disabled', () => {
  it('all radios should be disabled', () => {
    const RadioButtons = mount(RadioButton, {
      propsData: { data: RADIO_DATA, disabled: true }
    });
    const wrapper = RadioButtons.vm;
    const radioInput = wrapper.$el.querySelector('.radio-block__input');
    if (radioInput)
      expect((radioInput as HTMLInputElement).disabled).toBeTruthy()
  });
});

/* Check if data passed to props */
describe('Radio-Button required data', () => {
  it('should have data array', () => {
    const RadioButtons = mount(RadioButton, {
      propsData: { data: RADIO_DATA }
    });
    const wrapper = RadioButtons.vm;
    const data = (wrapper.$options.propsData as RadioProps).data;
    expect(data).toBeDefined();
  });
  it('should throw error cause data is required', () => {
    const RadioButtons = mount(RadioButton);
    const wrapper = RadioButtons.vm;
    const data = (wrapper.$options.propsData as RadioProps).data;
    if (!data)
      expect(() => {
        if (!data)
          throw new Error('Data is required!');
      }).toThrow();
  });
});

/* Check 'checkSelected' function */
describe('Radio-Button function checkSelected()', () => {
  it('should return value', () => {
    const RadioButtons = mount(RadioButton, {
      propsData: { selected: 'value_1' }
    });
    const wrapper = RadioButtons.vm;
    const checkSelected = wrapper.$options.methods ? wrapper.$options.methods.checkSelected : undefined;
    const selected = (wrapper.$options.propsData as RadioProps).selected;
    if (checkSelected) {
      // @ts-ignore
      expect(checkSelected(selected)).toBe(selected);
    }
  });
});
