// ==UserScript==
// @name        insert-followed-channels-search-box
// @description Add a search box filtering followed channels.
// @version     0.2.0
// @namespace   https://github.com/ae9is
// @author      ae9is
// @license     MIT
// @match       https://www.twitch.tv/*
// @grant       none
// @updateURL   https://github.com/ae9is/monkeyscripts/raw/main/twitch/insert-followed-channels-search-box.user.js
// @downloadURL https://github.com/ae9is/monkeyscripts/raw/main/twitch/insert-followed-channels-search-box.user.js
// @run-at      document-idle
// ==/UserScript==

;(function () {
  console.log('loading: insert-followed-channels-search-box')
  window.addEventListener('load', insertSearchInput)
})()

function insertSearchInput() {
  var sideNavSection = document.querySelector('.side-nav-section')
  var followedSideNavHeader = document.querySelector('.followed-side-nav-header')
  if (sideNavSection && followedSideNavHeader) {
    var followSearchInput = document.createElement('input')
    setAttributes(followSearchInput, {
      type: 'text',
      id: 'follow-search-input',
      placeholder: 'Search',
    })
    followSearchInput.style.margin = '0.5em'
    sideNavSection.insertBefore(followSearchInput, followedSideNavHeader.nextSibling)

    // Note: addEventListener's don't work here
    //followSearchInput.addEventListener('oninput', handleSearch)
    followSearchInput.oninput = handleSearch

    // Toggle search visibility when nav side bar opened and closed
    var collapseToggleButton = document.querySelector('.collapse-toggle')
    collapseToggleButton.onclick = toggleSearch
  }
}

function setAttributes(el, attrs) {
  Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]))
}

function handleSearch(event) {
  var searchText = event.target.value
  if (!searchText) {
    searchText = ''
  }
  hideSideNavCardsNotMatching(searchText)
}

function hideSideNavCardsNotMatching(searchText) {
  var sideNavCards = document.querySelectorAll('#side-nav .side-nav-card')
  sideNavCards.forEach((card) => {
    var matches = homogenize(card.innerText).includes(homogenize(searchText))
    if (!matches) {
      card.style.display = 'none'
    } else {
      card.style.display = ''
    }
  })
}

function homogenize(text) {
  return text.trim().toLowerCase().replace(/\s+/g, '')
}

function toggleSearch(event) {
  var searchInput = document.getElementById('follow-search-input')
  if (searchInput) {
    if (searchInput?.style?.display !== 'none') {
      searchInput.style.display = 'none'
    } else {
      searchInput.style.display = ''
    }
  }
}
