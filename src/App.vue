<template>
	<div id="app">
		<vue-swiper dir="rtl" class="my-swiper" @init="init">
			<swiper-slide> Slide 1 </swiper-slide>
			<swiper-slide> Slide 2 </swiper-slide>
			<swiper-slide> Slide 3 </swiper-slide>
		</vue-swiper>
	</div>
</template>

<script>
import VueSwiper from './components/swiper'
import swiperSlide from './components/swiperSlide'
import 'swiper/swiper-bundle.min.css'
export default {
	name: 'App',
	components: {
		VueSwiper,
		swiperSlide
	},
	methods: {
		init(s, d) {
			console.log(s, d)
		}
	}
}
</script>

<style>
.my-swiper .swiper-slide {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	height: 300px;
	width: 300px;
	background-color: rgb(67, 186, 202);
}
</style>
