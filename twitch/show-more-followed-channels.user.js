// ==UserScript==
// @name        show-more-followed-channels
// @description Autoclick "show more" to display more followed channels.
// @version     0.1.0
// @namespace   https://github.com/ae9is
// @author      ae9is
// @license     MIT
// @match       https://www.twitch.tv/*
// @grant       none
// @updateURL   https://github.com/ae9is/monkeyscripts/raw/main/twitch/show-more-followed-channels.user.js
// @downloadURL https://github.com/ae9is/monkeyscripts/raw/main/twitch/show-more-followed-channels.user.js
// @run-at      document-idle
// ==/UserScript==

// Note: Instead of @run-at document-idle, could also use the waitForKeyELements() described here:
// https://stackoverflow.com/questions/12897446

(function() {
  console.log('loading: show-more-followed-channels')
  window.addEventListener('load', function() {
    clickSideBarExpandButton()
    setTimeout(() => {
      clickShowMoreButton(0)
    }, 1000)
  })
})()

function clickSideBarExpandButton() {
  var sideBarExpandButton = document.querySelector('button[aria-label="Expand Side Nav"]')
  if (sideBarExpandButton) {
    sideBarExpandButton.click()
  }
}

function clickShowMoreButton(clickCount) {
  var showMoreButton = document.querySelector('button[data-a-target="side-nav-show-more-button"]')
  if (showMoreButton && clickCount < 30) {
    setTimeout(() => {
      showMoreButton.click()
      clickShowMoreButton(clickCount + 1)
    }, 500)
  }
}
