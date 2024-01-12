// ==UserScript==
// @name        insert-xray-toggle
// @description Insert a show/hide toggle for Prime Video's X-Ray, next to the other video player overlay options buttons.
// @version     0.2.0
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

function addStyles() {
  const styles = document.createElement('style')
  styles.innerHTML = `
.xray-toggle-input {
  height: 0;
  width: 0;
  visibility: hidden;
}
/* Toggle switch container */
#xray-toggle {
  margin-right: 1.5vw;
  display: flex;
  flex-direction: row-reverse;
  align-items: end;
}
/* Toggle switch label */
.xray-toggle-span {
  font-size: 1.4166666666666665vw;
  font-weight: normal;
  color: #999;
  padding-right: 0.75vw;
}
.xray-toggle-input:checked ~ .xray-toggle-span {
  color: #fff;
}
/* Toggle switch border */
.xray-toggle-label {
  cursor: pointer;
  text-indent: -9999vw;
  width: 2.25vw;
  height: 1.2vw;
  border: solid 0.2vw #999;
  display: block;
  border-radius: 1.2vw;
  position: relative;
}
.xray-toggle-label:hover {
  border-color: #fff;
}
/* Dot indicator */
.xray-toggle-label:hover::after {
  background: #fff;
}
.xray-toggle-label::after {
  content: '';
  position: absolute;
  top: 0.2vw;
  left: 0.25vw;
  width: 0.8vw;
  height: 0.8vw;
  background: #999;
  border-radius: 0.8vw;
  /* Affects hover highlighting as well, but not unpleasant */
  transition: 0.2s;
}
.xray-toggle-input:checked + .xray-toggle-label::after {
  left: calc(100% - 0.275vw);
  transform: translateX(-100%);
}
.xray-toggle-label:active::after {
  width: 1.2vw;
}
/* Line indicator */
.xray-toggle-label::before {
  content: '';
  position: absolute;
  top: 0.45vw;
  left: 0.35vw;
  width: 1.55vw;
  height: 0.2vw;
  border-radius: 0.2vw;
  transition: 0.2s;
}
.xray-toggle-input:checked + .xray-toggle-label::before {
  background: #999;
}
.xray-toggle-input:checked + .xray-toggle-label:hover::before {
  background: #fff;
}
`
  document.head.appendChild(styles)
}
