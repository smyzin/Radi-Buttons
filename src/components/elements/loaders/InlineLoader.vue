<template>
    <div class="wrapper" :class="[position, size, classes]">
        <div class="dots" :class="`dots_${effect}`" v-if="type === 'dots'">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
        <div class="circle" :class="[`circle_${effect}`]" v-else-if="type === 'circle'">
            <div :key="item" v-for="item in effect === 'slide' ? 12 : 5"></div>
        </div>
        <div class="line" :class="`line_${effect}`" v-else-if="type === 'line'">
            <div :key="item" v-for="item in effect === 'bump' ? 3 : 0"></div>
        </div>
        <div class="wrapper__desc" v-if="show">
            <div v-if="!isError">{{ text }}</div>
            <slot name="error" v-else>Ошибка</slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class InlineLoader extends Vue {
    @Prop({ type: String, default: '' }) private readonly text!: string;
    @Prop({ type: String, default: 'dots' }) private readonly type!: string;
    @Prop({ type: String, default: 'small' }) private readonly size!: string;
    @Prop({ type: String, default: 'slide' }) private readonly effect!: string;
    @Prop({ type: String, default: 'right' }) private readonly position!: string;
    @Prop({ type: Boolean, default: false }) private readonly isError!: boolean;

    private get classes(): Object {
        return {
            'wrapper_error': this.isError,
        }
    }

    private get show(): boolean {
        return this.text.length > 0;
    }
}
</script>

<style lang="scss" scoped>
/* Light main colors */
$light_bg_color: #ffffff;
$light_base_color: #28445d;
$light_text_color: #1a242c;
/* Dark main colors */
$dark_bg_color: #121212;
$dark_base_color: #55c5ca;
$dark_text_color: #a7bebe;

$loader_error_color: #ce5658;

$loader_small_size: 20px;
$loader_normal_size: 40px;
$loader_large_size: 60px;

.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 7px;

    &.right {
        flex-direction: row;
        .wrapper__desc { order: 1; margin-left: 7px; }
    }
    &.left {
        flex-direction: row;
        .wrapper__desc { order: -1; margin-right: 7px; }
    }
    &.top {
        flex-direction: column;
        .wrapper__desc { order: -1; margin-bottom: 7px; }
    }
    &.bottom {
        flex-direction: column;
        .wrapper__desc { order: 1; margin-top: 7px; }
    }

    &.small {
        .dots {
            height: $loader_small_size;
            & .dot {
                height: $loader_small_size - 12px;
                width: $loader_small_size - 12px;
            }
        }
        .circle {
            width: $loader_small_size;
            height: $loader_small_size;
        }
        .line {
            height: $loader_small_size;
            width: $loader_small_size;
            &_bump div {
                height: $loader_small_size - 14px;
                width: $loader_small_size - 14px;
            }
            &::before { height: $loader_small_size; }
            &::after { width: $loader_small_size - 5px; height: $loader_small_size - 5px; }
        }
    }
    &.normal {
        .dots {
            height: $loader_normal_size;
            & .dot {
                height: $loader_normal_size - 24px;
                width: $loader_normal_size - 24px;
            }
        }
        .circle {
            width: $loader_normal_size;
            height: $loader_normal_size;
            /* &_slide {
                height: $loader_normal_size - 24px;
                width: $loader_normal_size - 24px;
            } */
        }
        .line {
            height: $loader_normal_size;
            width: $loader_normal_size;
            &_bump div {
                height: $loader_normal_size - 28px;
                width: $loader_normal_size - 28px;
            }
            &::before { height: $loader_normal_size; }
            &::after { width: $loader_normal_size - 5px; height: $loader_normal_size - 5px; }
        }
    }
    &.large {
        .dots {
            height: $loader_large_size;
            & .dot {
                height: $loader_large_size - 36px;
                width: $loader_large_size - 36px;
            }
        }
        .circle {
            width: $loader_large_size;
            height: $loader_large_size;
        }
        .line {
            height: $loader_large_size;
            width: $loader_large_size;
            &_bump div {
                height: $loader_large_size - 42px;
                width: $loader_large_size - 42px;
            }
            &::before { height: $loader_large_size; }
            &::after { width: $loader_large_size - 5px; height: $loader_large_size - 5px; }
        }
    }

    &_error {
        .wrapper__desc {
            color: $loader_error_color !important;
        }
        .dots > .dot {
            background-color: $loader_error_color;
            animation: none !important;
        }
        .circle {
            &_bump div {
                background-color: $loader_error_color !important;
                animation-duration: 15s !important;
            }
            &_slide div {
                background: linear-gradient(rgba(206, 86, 88, .7), $loader_error_color) !important;
                animation: none;
            }
        }
        .line {
            &_bump div {
                background-color: $loader_error_color !important;
                animation: none !important;
                height: 100% !important;
            }
            &_slide {
                animation-play-state: paused !important;
                background: rgba(206, 86, 88, .35) !important;
                &::before {
                    background-image: linear-gradient(rgba(206, 86, 88, .25), rgba(206, 86, 88, .55)) !important;
                }
            }
        }
    }
}

.theme--dark {
    .wrapper {
        &__desc { color: $dark_text_color; }
    }
    .dot { background-color: $dark_base_color; }
    .circle {
        &_bump div {
            background-color: $dark_base_color;
        }
        &_slide div { background: linear-gradient(rgba(85, 197, 202, .7), $dark_base_color); }
    }
    .line {
        &_bump div { background-color: $dark_base_color; }
        &_slide {
            background: rgba(40, 68, 93, .45);
            &::before {
                background-image: linear-gradient(rgba(40, 68, 93, .40), $dark_base_color);
            }
            &::after { background: $dark_bg_color; }
        }
    }
}
.theme--light {
    .wrapper {
        &__desc { color: $light_text_color; }
    }
    .dot { background-color: $light_base_color; }
    .circle {
        &_bump div { background-color: $light_base_color; }
        &_slide div { background: linear-gradient(rgba(40, 68, 93, .7), $light_base_color); }
    }
    .line {
        &_bump div { background-color: $light_base_color; }
        &_slide {
            background: rgba(85, 197, 202, .15);
            &::before {
                background-image: linear-gradient(rgba(85, 197, 202, .25), $light_base_color);
            }
            &::after { background: $light_bg_color; }
        }
    }
}


.dots {
    display: flex;
    align-items: center;
    .dot { border-radius: 50%; margin: 0 2px; }
    &_slide .dot {
        animation: dots-slide .8s infinite ease-in-out;
        -webkit-animation: dots-slide .8s 0s infinite ease-in-out;
        &:nth-child(2) { animation-delay: .2s; }
        &:nth-child(3) { animation-delay: .4s; }
    }
    &_bump .dot {
        animation: dots-bump .8s infinite, dots-slide .8s infinite ease-in-out;
        -webkit-animation: dots-bump .8s infinite, dots-slide .8s infinite ease-in-out;
        &:nth-child(2) { animation-delay: .1s; }
        &:nth-child(3) { animation-delay: .2s; }
    }
}
.circle {
    position: relative;
    &_bump div {
        position: absolute;
        left: 8%; top: 11%;
        width: 15%; height: 15%;
        border-radius: 50%;
        animation: rotate 1.3s infinite cubic-bezier(0.7,0.3,0.3,0.7);
        transform: rotateZ(50deg); /* Starts from the middle */
        transform-origin: 275% 275%;
        &:nth-child(2){ animation-delay:0.17s; }
        &:nth-child(3){ animation-delay:0.34s; }
        &:nth-child(4){ animation-delay:0.51s; }
        &:nth-child(5){ animation-delay:0.68s; }
    }
    &_slide div {
        position: absolute;
        top: 38%;
        left: 48%;
        width: 6%;
        height: 24%;
        opacity: 1;
        border-radius: 5px;
        animation: fade 1s linear infinite;

        &:nth-child(1) {
            transform: rotate(0deg) translate(0, -130%);
            animation-delay: -1s;
        }
        &:nth-child(2) {
            transform: rotate(30.17deg) translate(0, -130%);
            animation-delay: -0.91666667s;
        }
        &:nth-child(3) {
            transform: rotate(60.34deg) translate(0, -130%);
            animation-delay: -0.83333333s;
        }
        &:nth-child(4) {
            transform: rotate(90.51deg) translate(0, -130%);
            animation-delay: -0.75s;
        }
        &:nth-child(5) {
            transform: rotate(120.68deg) translate(0, -130%);
            animation-delay: -0.66666667s;
        }
        &:nth-child(6) {
            transform: rotate(150.85deg) translate(0, -130%);
            animation-delay: -0.58333333s;
        }
        &:nth-child(7) {
            transform: rotate(181.02deg) translate(0, -130%);
            animation-delay: -0.5s;
        }
        &:nth-child(8) {
            transform: rotate(211.19deg) translate(0, -130%);
            animation-delay: -0.41666667s;
        }
        &:nth-child(9) {
            transform: rotate(241.36deg) translate(0, -130%);
            animation-delay: -0.33333333s;
        }
        &:nth-child(10) {
            transform: rotate(271.53deg) translate(0, -130%);
            animation-delay: -0.25s;
        }
        &:nth-child(11) {
            transform: rotate(301.7deg) translate(0, -130%);
            animation-delay: -0.16666667s;
        }
        &:nth-child(12) {
            transform: rotate(331.87deg) translate(0, -130%);
            animation-delay: -0.08333333s;
        }
    }
}
.line {
    &_bump {
        display: flex;
        align-items: center;
        & div {
            display: inline-block;
            border-radius: 8px;
            -webkit-animation: line-bump 1.1s infinite alternate;
            -moz-animation: line-bump 1.1s infinite alternate;
            animation: line-bump 1.1s infinite alternate;
            & + div { margin-left: 2px; }
            &:nth-child(1) {
                animation-delay: .2s;
                -webkit-animation-delay: .2s;
                -moz-animation-delay: .2s;
            }
            &:nth-child(2) {
                animation-delay: .4s;
                -webkit-animation-delay: .4s;
                -moz-animation-delay: .4s;
            }
            &:nth-child(3) {
                animation-delay: .6s;
                -webkit-animation-delay: .6s;
                -moz-animation-delay: .6s;
            }
        }
    }
    &_slide {
        & div { display: none; }
        border-radius: 80%;
        display: block;
        animation: spin .675s linear 0s infinite normal;

        &::before,
        &::after {
            content: "";
            display: block;
            position: absolute;
        }
        &::before {
            border-radius: 0 90px 90px 0;
            width: 50%;
            top: 0; right: 0;
            z-index: 1;
        }
        &::after {
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
        }
    }
}

@keyframes fade {
    0% { opacity: 1; }
    100% { opacity: .1; }

}
@keyframes line-bump {
    from {height: 10%;}
    to {height: 100%;}
}
@keyframes rotate {
    to { transform: rotateZ(410deg); } /* If it starts with 50deg, a complete turn ends with 410deg */
}
@keyframes spin {
    to { transform: rotate(360deg); }
}
@keyframes dots-slide {
    0% { opacity: 1; }
    50% { opacity: .5; }
    100% { opacity: .2; }
}
@keyframes dots-bump {
    0% {
        -webkit-transform:translateY(0);
        transform:translateY(0);
    }
    25% {
        -webkit-transform:translateY(4px);
        transform:translateY(4px);
    }
    50% {
        -webkit-transform:translateY(0);
        transform:translateY(0);
    }
    75% {
        -webkit-transform:translateY(-4px);
        transform:translateY(-4px)
    }
    100% {
        -webkit-transform:translateY(0);
        transform:translateY(0);
    }
}
</style>