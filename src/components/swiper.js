import Vue from 'vue'
import {getParams} from './get-params.js'
import {initSwiper, mountSwiper} from './init-swiper.js'
import {needsScrollbar, needsNavigation, needsPagination, uniqueClasses, extend} from './utils.js'
import {renderLoop, calcLoopedSlides} from './loop.js'
import {getChangedParams} from './get-changed-params.js'
import {getChildren} from './get-children.js'
import {updateSwiper} from './update-swiper.js'
import {renderVirtual, updateOnVirtualData} from './virtual.js'
import SwiperSlide from './swiperSlide.js'

export default Vue.extend({
	name: 'Swiper',
	components: {
		SwiperSlide
	},
	props: {
		tag: {type: String, default: 'div'},
		wrapperTag: {type: String, default: 'div'},
		modules: {type: Array, default: undefined},
		init: {type: Boolean, default: undefined},
		direction: {type: String, default: undefined},
		touchEventsTarget: {type: String, default: undefined},
		initialSlide: {type: Number, default: undefined},
		speed: {type: Number, default: undefined},
		cssMode: {type: Boolean, default: undefined},
		updateOnWindowResize: {type: Boolean, default: undefined},
		resizeObserver: {type: Boolean, default: undefined},
		nested: {type: Boolean, default: undefined},
		focusableElements: {type: String, default: undefined},
		width: {type: Number, default: undefined},
		height: {type: Number, default: undefined},
		preventInteractionOnTransition: {type: Boolean, default: undefined},
		userAgent: {type: String, default: undefined},
		url: {type: String, default: undefined},
		edgeSwipeDetection: {type: [Boolean, String], default: undefined},
		edgeSwipeThreshold: {type: Number, default: undefined},
		autoHeight: {type: Boolean, default: undefined},
		setWrapperSize: {type: Boolean, default: undefined},
		virtualTranslate: {type: Boolean, default: undefined},
		effect: {type: String, default: undefined},
		breakpoints: {type: Object, default: undefined},
		spaceBetween: {type: Number, default: undefined},
		slidesPerView: {type: [Number, String], default: undefined},
		maxBackfaceHiddenSlides: {type: Number, default: undefined},
		slidesPerGroup: {type: Number, default: undefined},
		slidesPerGroupSkip: {type: Number, default: undefined},
		slidesPerGroupAuto: {type: Boolean, default: undefined},
		centeredSlides: {type: Boolean, default: undefined},
		centeredSlidesBounds: {type: Boolean, default: undefined},
		slidesOffsetBefore: {type: Number, default: undefined},
		slidesOffsetAfter: {type: Number, default: undefined},
		normalizeSlideIndex: {type: Boolean, default: undefined},
		centerInsufficientSlides: {type: Boolean, default: undefined},
		watchOverflow: {type: Boolean, default: undefined},
		roundLengths: {type: Boolean, default: undefined},
		touchRatio: {type: Number, default: undefined},
		touchAngle: {type: Number, default: undefined},
		simulateTouch: {type: Boolean, default: undefined},
		shortSwipes: {type: Boolean, default: undefined},
		longSwipes: {type: Boolean, default: undefined},
		longSwipesRatio: {type: Number, default: undefined},
		longSwipesMs: {type: Number, default: undefined},
		followFinger: {type: Boolean, default: undefined},
		allowTouchMove: {type: Boolean, default: undefined},
		threshold: {type: Number, default: undefined},
		touchMoveStopPropagation: {type: Boolean, default: undefined},
		touchStartPreventDefault: {type: Boolean, default: undefined},
		touchStartForcePreventDefault: {type: Boolean, default: undefined},
		touchReleaseOnEdges: {type: Boolean, default: undefined},
		uniqueNavElements: {type: Boolean, default: undefined},
		resistance: {type: Boolean, default: undefined},
		resistanceRatio: {type: Number, default: undefined},
		watchSlidesProgress: {type: Boolean, default: undefined},
		grabCursor: {type: Boolean, default: undefined},
		preventClicks: {type: Boolean, default: undefined},
		preventClicksPropagation: {type: Boolean, default: undefined},
		slideToClickedSlide: {type: Boolean, default: undefined},
		preloadImages: {type: Boolean, default: undefined},
		updateOnImagesReady: {type: Boolean, default: undefined},
		loop: {type: Boolean, default: undefined},
		loopAdditionalSlides: {type: Number, default: undefined},
		loopedSlides: {type: Number, default: undefined},
		loopFillGroupWithBlank: {type: Boolean, default: undefined},
		loopPreventsSlide: {type: Boolean, default: undefined},
		rewind: {type: Boolean, default: undefined},
		allowSlidePrev: {type: Boolean, default: undefined},
		allowSlideNext: {type: Boolean, default: undefined},
		swipeHandler: {type: Boolean, default: undefined},
		noSwiping: {type: Boolean, default: undefined},
		noSwipingClass: {type: String, default: undefined},
		noSwipingSelector: {type: String, default: undefined},
		passiveListeners: {type: Boolean, default: undefined},
		containerModifierClass: {type: String, default: undefined},
		slideClass: {type: String, default: undefined},
		slideBlankClass: {type: String, default: undefined},
		slideActiveClass: {type: String, default: undefined},
		slideDuplicateActiveClass: {type: String, default: undefined},
		slideVisibleClass: {type: String, default: undefined},
		slideDuplicateClass: {type: String, default: undefined},
		slideNextClass: {type: String, default: undefined},
		slideDuplicateNextClass: {type: String, default: undefined},
		slidePrevClass: {type: String, default: undefined},
		slideDuplicatePrevClass: {type: String, default: undefined},
		wrapperClass: {type: String, default: undefined},
		runCallbacksOnInit: {type: Boolean, default: undefined},
		observer: {type: Boolean, default: undefined},
		observeParents: {type: Boolean, default: undefined},
		observeSlideChildren: {type: Boolean, default: undefined},
		a11y: {type: [Boolean, Object], default: undefined},
		autoplay: {type: [Boolean, Object], default: undefined},
		controller: {type: Object, default: undefined},
		coverflowEffect: {type: Object, default: undefined},
		cubeEffect: {type: Object, default: undefined},
		fadeEffect: {type: Object, default: undefined},
		flipEffect: {type: Object, default: undefined},
		creativeEffect: {type: Object, default: undefined},
		cardsEffect: {type: Object, default: undefined},
		hashNavigation: {type: [Boolean, Object], default: undefined},
		history: {type: [Boolean, Object], default: undefined},
		keyboard: {type: [Boolean, Object], default: undefined},
		lazy: {type: [Boolean, Object], default: undefined},
		mousewheel: {type: [Boolean, Object], default: undefined},
		navigation: {type: [Boolean, Object], default: undefined},
		pagination: {type: [Boolean, Object], default: undefined},
		parallax: {type: [Boolean, Object], default: undefined},
		scrollbar: {type: [Boolean, Object], default: undefined},
		thumbs: {type: Object, default: undefined},
		virtual: {type: [Boolean, Object], default: undefined},
		zoom: {type: [Boolean, Object], default: undefined},
		grid: {type: [Object], default: undefined},
		freeMode: {type: [Boolean, Object], default: undefined}
	},
	data() {
		return {
			containerClasses: 'swiper',
			virtualData: null,
			breakpointChanged: false,
			initializedRef: false,
			swiperRef: null,
			oldPassedParamsRef: null,
			slidesRef: [],
			oldSlidesRef: []
		}
	},
	created() {
		const props = this.$props
		const originalSlots = this.$scopedSlots
		const {params: swiperParams, passedParams} = getParams(props)

		getChildren(originalSlots, this.slidesRef, this.oldSlidesRef)

		this.oldPassedParamsRef = passedParams
		this.oldSlidesRef = this.slidesRef

		const onBeforeBreakpoint = () => {
			getChildren(originalSlots, this.slidesRef, this.oldSlidesRef)
			this.breakpointChanged = true
		}

		swiperParams.onAny = (event, ...args) => {
			this.$emit(event, ...args)
		}

		Object.assign(swiperParams.on, {
			_beforeBreakpoint: onBeforeBreakpoint,
			_containerClasses(swiper, classes) {
				this.containerClasses = classes
			}
		})

		// init Swiper
		this.swiperRef = initSwiper(swiperParams)
		this.swiperRef.loopCreate = () => {}
		this.swiperRef.loopDestroy = () => {}
		if (swiperParams.loop) {
			this.swiperRef.loopedSlides = calcLoopedSlides(this.slidesRef, swiperParams)
		}
		if (this.swiperRef.virtual && this.swiperRef.params.virtual.enabled) {
			this.swiperRef.virtual.slides = this.slidesRef
			const extendWith = {
				cache: false,
				slides: this.slidesRef,
				renderExternal: (data) => {
					this.virtualData = data
				},
				renderExternalUpdate: false
			}
			extend(this.swiperRef.params.virtual, extendWith)
			extend(this.swiperRef.originalParams.virtual, extendWith)
		}

		// provide('swiper', swiperRef)
	},
	watch: {
		virtualData() {
			this.$nextTick(() => {
				updateOnVirtualData(this.swiperRef)
			})
		}
	},
	mounted() {
		if (!this.swiperElRef) return

		const {params: swiperParams} = getParams(this.$props)
		mountSwiper(
			{
				el: this.swiperElRef,
				nextEl: this.nextElRef,
				prevEl: this.prevElRef,
				paginationEl: this.paginationElRef,
				scrollbarEl: this.scrollbarElRef,
				swiper: this.swiperRef
			},
			swiperParams
		)
		console.log(this.swiperRef)
		this.$emit('swiper', this.swiperRef)
	},
	beforeDestroy() {
		if (this.swiperRef && !this.swiperRef.destroyed) {
			this.swiperRef.destroy(true, false)
		}
	},
	updated() {
		// set initialized flag
		if (!this.initializedRef && this.swiperRef) {
			this.swiperRef.emitSlidesClasses()
			this.initializedRef = true
		}
		// watch for params change
		const {passedParams: newPassedParams} = getParams(this.$props)

		const changedParams = getChangedParams(newPassedParams, this.oldPassedParamsRef, this.slidesRef, this.oldSlidesRef)
		this.oldPassedParamsRef = newPassedParams

		if ((changedParams.length || this.breakpointChanged) && this.swiperRef && !this.swiperRef.destroyed) {
			updateSwiper({
				swiper: this.swiperRef,
				slides: this.slidesRef,
				passedParams: newPassedParams,
				changedParams,
				nextEl: this.nextElRef,
				prevEl: this.prevElRef,
				scrollbarEl: this.scrollbarElRef,
				paginationEl: this.paginationElRef
			})
		}
		this.breakpointChanged = false
	},
	methods: {
		renderSlides(h, slides) {
			const {params: swiperParams} = getParams(this.$props)
			if (swiperParams.virtual) {
				return renderVirtual(h, this.swiperRef, slides, this.virtualData)
			}
			if (!swiperParams.loop || (this.swiperRef && this.swiperRef.destroyed)) {
				slides.forEach((slide) => {
					if (!slide.props) slide.props = {}
					slide.props.swiperRef = this.swiperRef
				})
				return slides
			}
			return renderLoop(h, this.swiperRef, slides, swiperParams)
		}
	},
	computed: {
		swiperElRef() {
			if (this.$refs && this.$refs.swiper) {
				return this.$refs.swiper
			}
			return null
		},
		prevElRef() {
			if (this.$refs && this.$refs.prev) {
				return this.$refs.prev
			}
			return null
		},
		nextElRef() {
			if (this.$refs && this.$refs.next) {
				return this.$refs.next
			}
			return null
		},
		scrollbarElRef() {
			if (this.$refs && this.$refs.scrollbar) {
				return this.$refs.scrollbar
			}
			return null
		},
		paginationElRef() {
			if (this.$refs && this.$refs.pagination) {
				return this.$refs.pagination
			}
			return null
		}
	},
	render(h) {
		const originalSlots = this.$scopedSlots
		const props = this.$props
		const vm = this
		const {slides, slots} = getChildren(originalSlots, this.slidesRef, this.oldSlidesRef)
		return h(
			vm.tag,
			{
				ref: 'swiper',
				class: uniqueClasses(vm.containerClasses)
			},
			[
				slots['container-start'],
				needsNavigation(props) && [
					h('div', {ref: 'prev', class: 'swiper-button-prev'}),
					h('div', {ref: 'next', class: 'swiper-button-next'})
				],
				needsScrollbar(props) && h('div', {ref: 'scrollbar', class: 'swiper-scrollbar'}),
				needsPagination(props) && h('div', {ref: 'pagination', class: 'swiper-pagination'}),
				h(vm.wrapperTag, {class: 'swiper-wrapper'}, [
					slots['wrapper-start'],
					vm.renderSlides(h, slides),
					slots['wrapper-end']
				]),
				slots['container-end']
			]
		)
	}
})
