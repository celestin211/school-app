let flashNotice;
let flashError;
let wrapperNode;
let templateNode;
let hiddenFlashOffset;
const CLASSES = {
	CONTAINER: 'flash-container',
	FLASH: 'flash-message',
	FLASH_CONTENT: 'flash-message__content',
	CLOSE_BUTTON: 'flash-message__close-button',
	ERROR: 'flash-message--error',
	ANIMATE_IN: 'flash-message--is-animating-in',
	ANIMATE_OUT: 'flash-message--is-animating-out',
	ANIMATE_DOWN: 'flash-message--is-animating-down',
};
const ATTRIBUTES = {
	STYLE: 'style',
	CSS_VARIABLE: '--element-height',
	ROLE: 'role',
	ROLE_ALERT: 'alert',
	ROLE_STATUS: 'status',
};
const EVENTS = {
	CLICK: 'click',
	ANIMATION_END: 'animationend',
	FLASH_HIDING: 'flash:hiding',
	DOM_READY: 'DOMContentLoaded',
};
const flash_messages = [];
const flash_helpers = {
	removeMessage: function(hiddenMessage) {
		(flash_messages.slice(hiddenMessage.index + 1)).forEach((flash) => {
			flash_helpers.shiftMessageDown(flash.node, hiddenMessage.height);
		})
		if (hiddenMessage.index !== -1) {
			flash_messages.splice(hiddenMessage.index, 1);
		}
	},
	
	shiftMessageDown: function(node, height) {
		node.classList.add(CLASSES.ANIMATE_DOWN);
		node.style.setProperty(ATTRIBUTES.CSS_VARIABLE, height);
		node.addEventListener(EVENTS.ANIMATION_END, () => {
			node.removeAttribute(ATTRIBUTES.STYLE);
			node.classList.remove(CLASSES.ANIMATE_DOWN);
		});
	},
	
	setHiddenFlashOffset: function(node) {
		const height = node.offsetHeight;
		if (node.nextSibling) {
			const siblingMargin = (parseFloat(
				window.getComputedStyle(node.nextSibling).marginBottom
			));
			hiddenFlashOffset = `${height + siblingMargin}px`;
		}
	}
}

class Flash {
	constructor(message, options = { isError: false, noticeDuration: 4000 }) {
		this.message = message;
		this.node = templateNode.cloneNode(true);
		this.isError = options.isError;
		this.contentNode = this.node.querySelector(`.${CLASSES.FLASH_CONTENT}`);
		this.closeButton = this.node.querySelector(`.${CLASSES.CLOSE_BUTTON}`);
		this.wrapperNode = wrapperNode;
		this.lastFocusedElement = document.activeElement || document.body;
		this.timeout = null;
		if (this.isError) {
			this.duration = null;
		} else {
			this.duration = options.noticeDuration;
		}
	}
	
	show() {
		flash_messages.push(this);
		this.closeButton.addEventListener(EVENTS.CLICK, () => {
			this.hide();
		});
		if (this.isError) {
			this.node.classList.add(CLASSES.ERROR);
			this.contentNode.setAttribute(ATTRIBUTES.ROLE, ATTRIBUTES.ROLE_ALERT);
		} else {
			this.contentNode.setAttribute(ATTRIBUTES.ROLE, ATTRIBUTES.ROLE_STATUS);
			this.timeout = setTimeout(() => this.hide(), this.duration);
		}
		this.contentNode.textContent = this.message;
		this.wrapperNode.appendChild(this.node);
		this.contentNode.focus();
		this.node.classList.add(CLASSES.ANIMATE_IN);
		this.node.addEventListener(EVENTS.ANIMATION_END, () => {
			this.node.classList.remove(CLASSES.ANIMATE_IN);
		});
	}
	
	hide() {
		flash_helpers.setHiddenFlashOffset(this.node);
		document.dispatchEvent(new CustomEvent(EVENTS.FLASH_HIDING, {
			detail: {
				index: flash_messages.indexOf(this),
				height: hiddenFlashOffset,
			},
		}));
		this.node.classList.add(CLASSES.ANIMATE_OUT);
		this.node.addEventListener(EVENTS.ANIMATION_END, () => {
			this.node.classList.remove(CLASSES.ANIMATE_OUT);
			this.wrapperNode.removeChild(this.node);
			if (this.wrapperNode.children.length) {
				this.wrapperNode.lastChild.querySelector(`.${CLASSES.FLASH_CONTENT}`).focus();
			} else {
				this.lastFocusedElement.focus();
			}
		});
	}
}

// document.addEventListener(EVENTS.DOM_READY, () => {
wrapperNode = document.querySelector(`.${CLASSES.CONTAINER}`);
templateNode = document.querySelector(`.${CLASSES.FLASH}`);

document.addEventListener(EVENTS.FLASH_HIDING, (event) => {
	const hiddenMessage = {
		index: event.detail.index,
		height: event.detail.height,
	};
	flash_helpers.removeMessage(hiddenMessage);
});
// });

(() => {
	const DEMO = {
		ERROR_BUTTON: 'js-activates-error',
		ERROR_MESSAGE: 'There was an error processing your request',
		NOTICE_BUTTON: 'js-activates-notice',
		NOTICE_MESSAGE: 'Photo uploaded',
	};
	const demoNoticeButton = document.querySelector(`.${DEMO.NOTICE_BUTTON}`);
	const demoErrorButton = document.querySelector(`.${DEMO.ERROR_BUTTON}`);
	demoNoticeButton.addEventListener(EVENTS.CLICK, () => {
		flashNotice = new Flash(DEMO.NOTICE_MESSAGE);
		flashNotice.show();
	});
	demoErrorButton.addEventListener(EVENTS.CLICK, () => {
		flashError = new Flash(DEMO.ERROR_MESSAGE, { isError: true });
		flashError.show();
	});
})();
