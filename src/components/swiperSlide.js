import Vue from 'vue'

import {uniqueClasses} from './utils'
export default Vue.extend({
	name: 'SwiperSlide',
	props: {
		tag: {type: String, default: 'div'},
		swiperRef: {type: Object, required: false},
		zoom: {type: Boolean, default: undefined},
		virtualIndex: {type: [String, Number], default: undefined}
	},
	data() {
		return {
			eventAttached: false,
			slideClasses: 'swiper-slide'
		}
	},
	mounted() {
		if (!this.swiperRef) return
		this.swiperRef.on('_slideClass', this.updateClasses)
		this.eventAttached = true
	},
	beforeUpdate() {
		if (this.eventAttached || !this.swiperRef) return
		this.swiperRef.on('_slideClass', this.updateClasses)
		this.eventAttached = true
	},
	updated() {
		if (!this.slideElRef || !this.swiperRef) return
		if (this.swiperRef.destroyed) {
			if (this.slideClasses !== 'swiper-slide') {
				this.slideClasses = 'swiper-slide'
			}
		}
	},
	computed: {
		slideElRef() {
			if (this.$refs && this.$refs.slide) {
				return this.$refs.slide.el
			}
			return null
		}
	},
	methods: {
		updateClasses(swiper, el, classNames) {
			if (el === this.slideElRef) {
				this.slideClasses = classNames
			}
		}
	},
	render(h) {
		const vm = this
		const slots = this.$scopedSlots
		return h(
			vm.tag,
			{
				class: uniqueClasses(`${vm.slideClasses}`),
				ref: 'slide',
				'data-swiper-slide-index': vm.virtualIndex
			},
			vm.zoom
				? h(
						'div',
						{
							class: 'swiper-zoom-container',
							'data-swiper-zoom': typeof vm.zoom === 'number' ? vm.zoom : undefined
						},
						slots.default && slots.default(vm.slideData)
				  )
				: slots.default && slots.default(vm.slideData)
		)
	}
})
