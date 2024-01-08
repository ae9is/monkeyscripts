// ==UserScript==
// @name        insert-xray-toggle
// @description Insert a show/hide toggle for Prime Video's X-Ray, next to the other video player overlay options buttons.
// @version     0.1.0
// @namespace   https://github.com/ae9is
// @author      ae9is
// @license     MIT
// @match       https://*.primevideo.com/*
// @grant       none
// @updateURL   https://github.com/ae9is/monkeyscripts/raw/main/primevideo/insert-xray-toggle.user.js
// @downloadURL https://github.com/ae9is/monkeyscripts/raw/main/primevideo/insert-xray-toggle.user.js
// @run-at      document-idle
// ==/UserScript==

;(function () {
  'use strict'
  console.log('loading: insert-xray-toggle')
  addStyles()
  // Need to continually repaint
  insertXrayToggle()
  setInterval(insertXrayToggle, 500)
})()

function addStyles() {
  addToggleSwitchStyles()
}

function insertXrayToggle() {
  const DEFAULT_XRAY_TOGGLE_STATE = false
  const optionsWrapper = document.querySelector('.atvwebplayersdk-options-wrapper')
  let toggle = document.querySelector('#xray-toggle')
  if (optionsWrapper && !toggle) {
    toggle = createToggle(DEFAULT_XRAY_TOGGLE_STATE)
    optionsWrapper.parentNode.insertBefore(toggle, optionsWrapper.previousSibling)
  }
}

function createToggle(toggleState) {
  const toggleDiv = document.createElement('div')
  setAttributes(toggleDiv, {
    id: 'xray-toggle',
  })
  const input = document.createElement('input')
  setAttributes(input, {
    type: 'checkbox',
    id: 'xray-toggle-input',
    class: 'xray-toggle-input',
  })
  input.checked = toggleState
  input.onclick = handleClick
  setToggleState(input.checked)
  const label = document.createElement('label')
  setAttributes(label, {
    class: 'xray-toggle-label',
    for: 'xray-toggle-input',
  })
  const span = document.createElement('span')
  setAttributes(span, {
    class: 'xray-toggle-span',
  })
  span.innerHTML = 'X-Ray'
  toggleDiv.appendChild(input)
  toggleDiv.appendChild(label)
  toggleDiv.appendChild(span)
  return toggleDiv
}

function setAttributes(el, attrs) {
  Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]))
}

function handleClick(event) {
  const checkbox = event.target
  const checked = checkbox.checked
  setToggleState(checked)
}

function setToggleState(visible) {
  const xray = getXray()
  if (xray) {
    if (visible) {
      xray.style.setProperty('display', '')
    } else {
      xray.style.setProperty('display', 'none')
    }
  }
}

function getXray() {
  return document.querySelector('.xrayQuickView')
}

function addToggleSwitchStyles() {
  // Palette based on email list toggle switch colours, under account options
  const styles = document.createElement('style')
  styles.innerHTML = `
.xray-toggle-input {
  height: 0;
  width: 0;
  visibility: hidden;
}
.xray-toggle-label {
  cursor: pointer;
  text-indent: -9999rem;
  width: 3rem;
  height: 1.75rem;
  background: #8197a4;
  display: block;
  border-radius: 1.75rem;
  position: relative;
}
.xray-toggle-label:after {
  content: '';
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  width: 1.25rem;
  height: 1.25rem;
  background: #fff;
  border-radius: 1.25rem;
  transition: 0.3s;
}
.xray-toggle-input:checked + .xray-toggle-label {
  background: #00a0d6;
}
.xray-toggle-input:checked + .xray-toggle-label:after {
  left: calc(100% - 0.25rem);
  transform: translateX(-100%);
  background: #fff;
}
.xray-toggle-label:active:after {
  width: 1.8rem;
}
.xray-toggle-span {
  font-size: 1.3vw;
  font-weight: normal;
  color: #999;
  padding-right: 0.75rem;
}
.xray-toggle-input:checked ~ .xray-toggle-span {
  color: #fff;
}
#xray-toggle {
  margin-right: 1.5vw;
  display: flex;
  flex-direction: row-reverse;
  align-items: end;
}
`
  document.head.appendChild(styles)
}
