function getChildren(originalSlots = {}, slidesRef, oldSlidesRef) {
	console.log(originalSlots)
	const slides = []

	const slots = {
		'container-start': [],
		'container-end': [],
		'wrapper-start': [],
		'wrapper-end': []
	}

	const getSlidesFromElements = (els, slotName) => {
		if (!Array.isArray(els)) {
			return
		}
		els.forEach((vnode) => {
			console.log(vnode)
			const isFragment = typeof vnode.tag === 'symbol'
			if (slotName === 'default') slotName = 'container-end'
			if (isFragment && vnode.children) {
				getSlidesFromElements(vnode.children, 'default')
			} else if (vnode.tag && (vnode.tag.includes('SwiperSlide') || vnode.tag.includes('AsyncComponentWrapper'))) {
				slides.push(vnode)
			} else if (slots[slotName]) {
				slots[slotName].push(vnode)
			}
		})
	}

	Object.keys(originalSlots).forEach((slotName) => {
		const els = originalSlots[slotName]()
		getSlidesFromElements(els, slotName)
	})
	oldSlidesRef.value = slidesRef.value
	slidesRef.value = slides
	console.log({slides, slots})

	return {slides, slots}
}

export {getChildren}
