<template>
    <div class="test-wrapper">
        <h2>
            Different loaders examples
        </h2>
        <button @click="loading = !loading">Loading is {{ !loading ? 'off' : 'on' }}</button>
        <label>
            Text:
            <input type="text" placeholder="Введите текст" v-model="text">
        </label>
        <label>
            Size:
            <select v-model="size">
                <option value="small">Small</option>
                <option value="normal">Normal</option>
                <option value="large">Large</option>
            </select>
        </label>
        <label>
            Is error?
            <input type="checkbox" v-model="isError">
        </label>
        <br>
        <label>
            Text position:
            <select v-model="position">
                <option value="right">Right</option>
                <option value="left">Left</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
            </select>
        </label>
        <label>
            Type of loading:
            <select v-model="type">
                <option value="dots">Dots</option>
                <option value="circle">Circle</option>
                <option value="line">Line</option>
            </select>
        </label>
        <label>
            Animation type:
            <select v-model="effect">
                <option value="slide">Slide</option>
                <option value="bump">Bump</option>
            </select>
        </label>
        <hr>
        <div>
            <InlineLoader
                :type="type"
                :text="text"
                :size="size"
                :effect="effect"
                :isError="isError"
                :position="position"
                v-if="loading"
            >
                <template #error>
                    Шо-то случилось!
                </template>
            </InlineLoader>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InlineLoader from "@/components/elements/loaders/InlineLoader.vue";

@Component({
    components: { InlineLoader }
})
export default class Loaders extends Vue {
    private position: string = 'right';
    private type: string = 'dots';
    private effect: string = 'slide';
    private size: string = 'small';
    private text: string = 'Загрузка';
    private loading: boolean = true;
    private isError: boolean = false;
}
</script>

<style lang="scss" scoped>
    .test-wrapper {
        width: 100%;
        height: 100%;
        padding: 5px 13px;
    }
    select {
        width: 170px;
        border: 1px solid #647daf;
        border-radius: 3px;
        margin: 7px 0;
        color: #647daf;
        outline: none;
        padding: 3px 7px;
    }
    button {
        border: 1px solid #647daf;
        border-radius: 7px;
        padding: 7px 10px;
        background-color: transparent;
        color: #647daf;
        width: 125px;
        margin-right: 7px;
        transition: background-color .3s, color .3s ease-in-out;
        outline: none;
        &:hover {
            background-color: #647daf;
            color: white;
        }
    }
    label {
        color: #647daf;
        & + label {
            margin-left: 7px;
        }
    }
    input[type="text"] {
        outline: none;
        color: #647daf;
        border: 1px solid #647daf;
        border-radius: 7px;
        padding: 3px 7px;
    }
</style>