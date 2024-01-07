// ==UserScript==
// @name        insert-xray-toggle
// @description Insert a show/hide toggle for Prime Video's X-Ray, next to the other video player overlay options buttons.
// @version     0.0.0
// @namespace   https://github.com/ae9is
// @author      ae9is
// @license     MIT
// @match       https://*.primevideo.com/*
// @grant       none
// @updateURL   https://github.com/ae9is/monkeyscripts/raw/main/primevideo/insert-xray-toggle.user.js
// @downloadURL https://github.com/ae9is/monkeyscripts/raw/main/primevideo/insert-xray-toggle.user.js
// @run-at      document-idle
// ==/UserScript==

(function() {
  'use strict'
  console.log('loading: insert-xray-toggle')
  addStyles()
  // Need to continually repaint, one off load isn't enough
  //window.addEventListener('load', insertXrayToggle)
  insertXrayToggle()
  setInterval(insertXrayToggle, 500)
  // Start hidden
  hideXray()
})()

function addStyles() {
  addToggleSwitchStyles()
  //addArrowStyles()
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

function hideXray() {
  const xray = getXray()
  xray.style.setProperty('display', 'none')
}

function createToggle(toggleState) {
  const buttonBarMenuClasses = '' //'f7mv6lt'
  const toggleDiv = document.createElement('div')
  setAttributes(toggleDiv, {
    id: 'xray-toggle',
    class: buttonBarMenuClasses,
  })
  const input = document.createElement('input')
  setAttributes(input, {
    type: 'checkbox',
    id: 'xray-toggle-input',
    class: 'xray-toggle-input',
  })
  input.checked = toggleState
  input.onclick = toggleXray
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
  //const arrow = createArrow('down')
  //arrow.onclick = input.onclick
  //label.appendChild(arrow)
  //toggleDiv.appendChild(arrow)
  toggleDiv.appendChild(input)
  toggleDiv.appendChild(label)
  toggleDiv.appendChild(span)
  return toggleDiv
}

function setAttributes(el, attrs) {
  Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]))
}

const openArrowClass = 'xrayVodArrow xrayVodArrowRight'
const closedArrowClass = 'xrayVodArrow xrayVodArrowLeft'

function toggleXray(event) {
  const checkbox = event.target
  const checked = checkbox.checked
  const xray = getXray()
  if (xray) {
    if (checked) {
      xray.style.setProperty('display', '')
    } else {
      xray.style.setProperty('display', 'none')
    }
  }
  /*
  const arrow = getArrow()
  if (arrow) {
    if (checked) {
      xray.style.setProperty('class', openArrowClass)
    } else {
      xray.style.setProperty('class', closedArrowClass)
    }
  }
  */
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

// For mimicking site's collapse arrows
/*
function addArrowStyles() {
  const styles = document.createElement('style')
  styles.innerHTML = `
.xrayVodArrow {
  display: inline-block;
  padding: 0;
  width: 0.5rem;
}
.xrayVodArrowDown {
  transform: rotate(270deg);
}
.xrayVodArrowUp {
  transform: rotate(90deg);
}
.xrayVodArrowLeft {
  transform: rotate(0deg);
}
.xrayVodArrowRight {
  transform: rotate(180deg);
}
  `
  document.head.appendChild(styles)
}

function createArrow(type) {
  const arrowImage = document.createElement('img')
  setAttributes(arrowImage, {
    class: 'fuorrko',
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxMSAxNyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+QXJ0Ym9hcmQgMTY8L3RpdGxlPjxwYXRoIGQ9Ik0yLjYzMiAxMGw2LjUzIDYgMS4wNjktLjktNy4yNzItNi42IDcuMTgzLTYuNi0uOTgtLjktNi41MyA2TDEgOC41IDIuNjMyIDEweiIgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+',
    alt: '',
  })
  arrowImage.width = '0.5rem'
  let arrowClass = openArrowClass
  if (type === 'up') {
    arrowClass = closedArrowClass
  }
  const arrow = document.createElement('div')
  setAttributes(arrow, {
    id: 'xray-toggle-arrow',
    class: arrowClass,
  })
  arrow.appendChild(arrowImage)
  return arrow
}

function getArrow() {
  return document.querySelector('#xray-toggle-arrow')
}
*/

// Included with Prime check circle
/* 
<svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true">
  <title>Entitled</title>
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="currentColor" stroke="none" fill-rule="evenodd">
    </path>
  </svg>
</svg>
*/