

/*BEGIN:https://boutique.orange.fr/medias/newshop/js/libraries.js*/
/* eslint-disable */
/* -------------------------------------------------- *
// Cloud Zoom V1.0.2
// (c) 2010 by R Cecco. <http://www.professorcloud.com>
// MIT License
* -------------------------------------------------- */
(function ($) { function format(str) { for (var i = 1; i < arguments.length; i++) { str = str.replace('%' + (i - 1), arguments[i]) } return str } function CloudZoom(jWin, opts) { var sImg = $('img', jWin); var img1; var img2; var zoomDiv = null; var $mouseTrap = null; var lens = null; var $tint = null; var softFocus = null; var $ie6Fix = null; var zoomImage; var controlTimer = 0; var cw, ch; var destU = 0; var destV = 0; var currV = 0; var currU = 0; var filesLoaded = 0; var mx, my; var ctx = this, zw; setTimeout(function () { if ($mouseTrap === null) { var w = jWin.width(); jWin.parent().append(format('<div style="width:%0px;position:absolute;top:75%;left:%1px;text-align:center" class="cloud-zoom-loading" >Loading...</div>', w / 3, (w / 2) - (w / 6))).find(':last').css('opacity', 0.5) } }, 200); var ie6FixRemove = function () { if ($ie6Fix !== null) { $ie6Fix.remove(); $ie6Fix = null } }; this.removeBits = function () { if (lens) { lens.remove(); lens = null } if ($tint) { $tint.remove(); $tint = null } if (softFocus) { softFocus.remove(); softFocus = null } ie6FixRemove(); $('.cloud-zoom-loading', jWin.parent()).remove() }; this.destroy = function () { jWin.data('zoom', null); if ($mouseTrap) { $mouseTrap.unbind(); $mouseTrap.remove(); $mouseTrap = null } if (zoomDiv) { zoomDiv.remove(); zoomDiv = null } this.removeBits() }; this.fadedOut = function () { if (zoomDiv) { zoomDiv.remove(); zoomDiv = null } this.removeBits() }; this.controlLoop = function () { if (lens) { var x = (mx - sImg.offset().left - (cw * 0.5)) >> 0; var y = (my - sImg.offset().top - (ch * 0.5)) >> 0; if (x < 0) { x = 0 } else if (x > (sImg.outerWidth() - cw)) { x = (sImg.outerWidth() - cw) } if (y < 0) { y = 0 } else if (y > (sImg.outerHeight() - ch)) { y = (sImg.outerHeight() - ch) } lens.css({ left: x, top: y }); lens.css('background-position', (-x) + 'px ' + (-y) + 'px'); destU = (((x) / sImg.outerWidth()) * zoomImage.width) >> 0; destV = (((y) / sImg.outerHeight()) * zoomImage.height) >> 0; currU += (destU - currU) / opts.smoothMove; currV += (destV - currV) / opts.smoothMove; zoomDiv.css('background-position', (-(currU >> 0) + 'px ') + (-(currV >> 0) + 'px')) } controlTimer = setTimeout(function () { ctx.controlLoop() }, 30) }; this.init2 = function (img, id) { filesLoaded++; if (id === 1) { zoomImage = img } if (filesLoaded === 2) { this.init() } }; this.init = function () { $('.cloud-zoom-loading', jWin.parent()).remove(); $mouseTrap = jWin.parent().append(format("<div class='mousetrap' style='z-index:999;position:absolute;width:%0px;height:%1px;left:%2px;top:%3px;\'></div>", sImg.outerWidth(), sImg.outerHeight(), 0, 0)).find(':last'); $mouseTrap.bind('mousemove', this, function (event) { mx = event.pageX; my = event.pageY }); $mouseTrap.bind('mouseleave', this, function (event) { clearTimeout(controlTimer); if (lens) { lens.fadeOut(299) } if ($tint) { $tint.fadeOut(299) } if (softFocus) { softFocus.fadeOut(299) } zoomDiv.fadeOut(300, function () { ctx.fadedOut() }); return false }); $mouseTrap.bind('mouseenter', this, function (event) { mx = event.pageX; my = event.pageY; zw = event.data; if (zoomDiv) { zoomDiv.stop(true, false); zoomDiv.remove() } var xPos = opts.adjustX, yPos = opts.adjustY; var siw = sImg.outerWidth(); var sih = sImg.outerHeight(); var w = opts.zoomWidth; var h = opts.zoomHeight; if (opts.zoomWidth == 'auto') { w = siw } if (opts.zoomHeight == 'auto') { h = sih } var appendTo = jWin.parent(); switch (opts.position) { case 'top': yPos -= h; break; case 'right': xPos += siw; break; case 'bottom': yPos += sih; break; case 'left': xPos -= w; break; case 'inside': w = siw; h = sih; break; default: appendTo = $('#' + opts.position); if (!appendTo.length) { appendTo = jWin; xPos += siw; yPos += sih } else { w = appendTo.innerWidth(); h = appendTo.innerHeight() } } zoomDiv = appendTo.append(format('<div id="cloud-zoom-big" class="cloud-zoom-big" style="display:none;position:absolute;left:0px;top:%1px;width:%2px;height:%3px;background-image:url(\'%4\');z-index:99;"></div>', xPos, yPos, w, h, zoomImage.src)).find(':last'); if (sImg.attr('title') && opts.showTitle) { zoomDiv.append(format('<div class="cloud-zoom-title">%0</div>', sImg.attr('title'))).find(':last').css('opacity', opts.titleOpacity) } if ($.browser.msie && $.browser.version < 7) { $ie6Fix = $('<iframe frameborder="0" src="#"></iframe>').css({ position: "absolute", left: xPos, top: yPos, zIndex: 99, width: w, height: h }).insertBefore(zoomDiv) } zoomDiv.fadeIn(500); if (lens) { lens.remove(); lens = null } cw = (sImg.outerWidth() / zoomImage.width) * zoomDiv.width(); ch = (sImg.outerHeight() / zoomImage.height) * zoomDiv.height(); lens = jWin.append(format("<div class = 'cloud-zoom-lens' style='display:none;z-index:98;position:absolute;width:%0px;height:%1px;'></div>", cw, ch)).find(':last'); $mouseTrap.css('cursor', lens.css('cursor')); var noTrans = false; if (opts.tint) { lens.css('background', 'url("' + sImg.attr('src') + '")'); $tint = jWin.append(format('<div style="display:none;position:absolute; left:0px; top:0px; width:%0px; height:%1px; background-color:%2;" />', sImg.outerWidth(), sImg.outerHeight(), opts.tint)).find(':last'); $tint.css('opacity', opts.tintOpacity); noTrans = true; $tint.fadeIn(500) } if (opts.softFocus) { lens.css('background', 'url("' + sImg.attr('src') + '")'); softFocus = jWin.append(format('<div style="position:absolute;display:none;top:2px; left:2px; width:%0px; height:%1px;" />', sImg.outerWidth() - 2, sImg.outerHeight() - 2, opts.tint)).find(':last'); softFocus.css('background', 'url("' + sImg.attr('src') + '")'); softFocus.css('opacity', 0.5); noTrans = true; softFocus.fadeIn(500) } if (!noTrans) { lens.css('opacity', opts.lensOpacity) } if (opts.position !== 'inside') { lens.fadeIn(500) } zw.controlLoop(); return }) }; img1 = new Image(); $(img1).load(function () { ctx.init2(this, 0) }); img1.src = sImg.attr('src'); img2 = new Image(); $(img2).load(function () { ctx.init2(this, 1) }); img2.src = jWin.attr('href') } $.fn.CloudZoom = function (options) { try { document.execCommand("BackgroundImageCache", false, true) } catch (e) { } this.each(function () { var relOpts, opts; if (!$(this).attr('rel')) { relOpts = {}; } else { var json = '{' + $(this).attr('rel').replace(/[']/g, '"') + '}'; relOpts = $.parseJSON(json); } if ($(this).is('.cloud-zoom')) { $(this).css({ 'position': 'relative', 'display': 'block' }); $('img', $(this)).css({ 'display': 'block' }); if ($(this).parent().attr('id') != 'wrap') { $(this).wrap('<div id="wrap" style="top:0px;z-index:1;position:relative;width:318px;"></div>') } opts = $.extend({}, $.fn.CloudZoom.defaults, options); opts = $.extend({}, opts, relOpts); $(this).data('zoom', new CloudZoom($(this), opts)) } else if ($(this).is('.cloud-zoom-gallery')) { opts = $.extend({}, relOpts, options); $(this).data('relOpts', opts); $(this).bind('click', $(this), function (event) { var data = event.data.data('relOpts'); $('#' + data.useZoom).data('zoom').destroy(); $('#' + data.useZoom).attr('href', event.data.attr('href')); $('#' + data.useZoom + ' img').attr('src', event.data.data('relOpts').smallImage); $('#' + event.data.data('relOpts').useZoom).CloudZoom(); }) } }); return this }; $.fn.CloudZoom.defaults = { zoomWidth: 'auto', zoomHeight: 'auto', position: 'inside', tint: false, tintOpacity: 0.5, lensOpacity: 0.5, softFocus: false, smoothMove: 3, showTitle: true, titleOpacity: 0.5, adjustX: 0, adjustY: 0 } })(jQuery);
/* eslint-enable */

/* eslint-disable */
/* -------------------------------------------------- *
* jQuery Galleriffic plugin
* Copyright (c) 2008 Trent Foley (http://trentacular.com)
// MIT License
* -------------------------------------------------- */
(function ($) { var allImages = {}; var imageCounter = 0; $.galleriffic = { version: '2.0.1', normalizeHash: function (hash) { return hash.replace(/^.*#/, '').replace(/\?.*$/, '') }, getImage: function (hash) { if (!hash) return undefined; hash = $.galleriffic.normalizeHash(hash); return allImages[hash] }, gotoImage: function (hash) { var imageData = $.galleriffic.getImage(hash); if (!imageData) return false; var gallery = imageData.gallery; gallery.gotoImage(imageData); return true }, removeImageByHash: function (hash, ownerGallery) { var imageData = $.galleriffic.getImage(hash); if (!imageData) return false; var gallery = imageData.gallery; if (ownerGallery && ownerGallery != gallery) return false; return gallery.removeImageByIndex(imageData.index) } }; var defaults = { delay: 3000, numThumbs: 20, preloadAhead: 40, enableTopPager: false, enableBottomPager: true, maxPagesToShow: 7, imageContainerSel: '', captionContainerSel: '', controlsContainerSel: '', loadingContainerSel: '', renderSSControls: true, renderNavControls: true, playLinkText: 'Play', pauseLinkText: 'Pause', prevLinkText: 'Previous', nextLinkText: 'Next', nextPageLinkText: 'Next &rsaquo;', prevPageLinkText: '&lsaquo; Prev', enableHistory: false, enableKeyboardNavigation: true, autoStart: false, syncTransitions: false, defaultTransitionDuration: 1000, onSlideChange: undefined, onTransitionOut: undefined, onTransitionIn: undefined, onPageTransitionOut: undefined, onPageTransitionIn: undefined, onImageAdded: undefined, onImageRemoved: undefined }; $.fn.galleriffic = function (settings) { $.extend(this, { version: $.galleriffic.version, isSlideshowRunning: false, slideshowTimeout: undefined, clickHandler: function (e, link) { this.pause(); if (!this.enableHistory) { var hash = $.galleriffic.normalizeHash($(link).attr('href')); $.galleriffic.gotoImage(hash); e.preventDefault() } }, appendImage: function (listItem) { this.addImage(listItem, false, false); return this }, insertImage: function (listItem, position) { this.addImage(listItem, false, true, position); return this }, addImage: function (listItem, thumbExists, insert, position) { var $li = (typeof listItem === "string") ? $(listItem) : listItem; var $aThumb = $li.find('a.thumb'); var slideUrl = $aThumb.attr('href'); var title = $aThumb.attr('title'); var $caption = $li.find('.caption').remove(); var hash = $aThumb.attr('name'); imageCounter++; if (!hash || allImages['' + hash]) { hash = imageCounter } if (!insert) position = this.data.length; var imageData = { title: title, slideUrl: slideUrl, caption: $caption, hash: hash, gallery: this, index: position }; if (insert) { this.data.splice(position, 0, imageData); this.updateIndices(position) } else { this.data.push(imageData) } var gallery = this; if (!thumbExists) { this.updateThumbs(function () { var $thumbsUl = gallery.find('ul.thumbs'); if (insert) $thumbsUl.children(':eq(' + position + ')').before($li); else $thumbsUl.append($li); if (gallery.onImageAdded) gallery.onImageAdded(imageData, $li) }) } allImages['' + hash] = imageData; $aThumb.attr('rel', 'history').attr('href', '#' + hash).removeAttr('name').click(function (e) { gallery.clickHandler(e, this) }); return this }, removeImageByIndex: function (index) { if (index < 0 || index >= this.data.length) return false; var imageData = this.data[index]; if (!imageData) return false; this.removeImage(imageData); return true }, removeImageByHash: function (hash) { return $.galleriffic.removeImageByHash(hash, this) }, removeImage: function (imageData) { var index = imageData.index; this.data.splice(index, 1); delete allImages['' + imageData.hash]; this.updateThumbs(function () { var $li = gallery.find('ul.thumbs').children(':eq(' + index + ')').remove(); if (gallery.onImageRemoved) gallery.onImageRemoved(imageData, $li) }); this.updateIndices(index); return this }, updateIndices: function (startIndex) { for (i = startIndex; i < this.data.length; i++) { this.data[i].index = i } return this }, initializeThumbs: function () { this.data = []; var gallery = this; this.find('ul.thumbs > li').each(function (i) { gallery.addImage($(this), true, false) }); return this }, isPreloadComplete: false, preloadInit: function () { if (this.preloadAhead == 0) return this; this.preloadStartIndex = this.currentImage.index; var nextIndex = this.getNextIndex(this.preloadStartIndex); return this.preloadRecursive(this.preloadStartIndex, nextIndex) }, preloadRelocate: function (index) { this.preloadStartIndex = index; return this }, preloadRecursive: function (startIndex, currentIndex) { if (startIndex != this.preloadStartIndex) { var nextIndex = this.getNextIndex(this.preloadStartIndex); return this.preloadRecursive(this.preloadStartIndex, nextIndex) } var gallery = this; var preloadCount = currentIndex - startIndex; if (preloadCount < 0) preloadCount = this.data.length - 1 - startIndex + currentIndex; if (this.preloadAhead >= 0 && preloadCount > this.preloadAhead) { setTimeout(function () { gallery.preloadRecursive(startIndex, currentIndex) }, 500); return this } var imageData = this.data[currentIndex]; if (!imageData) return this; if (imageData.image) return this.preloadNext(startIndex, currentIndex); var image = new Image(); image.onload = function () { imageData.image = this; gallery.preloadNext(startIndex, currentIndex) }; image.alt = imageData.title; image.src = imageData.slideUrl; return this }, preloadNext: function (startIndex, currentIndex) { var nextIndex = this.getNextIndex(currentIndex); if (nextIndex == startIndex) { this.isPreloadComplete = true } else { var gallery = this; setTimeout(function () { gallery.preloadRecursive(startIndex, nextIndex) }, 100) } return this }, getNextIndex: function (index) { var nextIndex = index + 1; if (nextIndex >= this.data.length) nextIndex = 0; return nextIndex }, getPrevIndex: function (index) { var prevIndex = index - 1; if (prevIndex < 0) prevIndex = this.data.length - 1; return prevIndex }, pause: function () { this.isSlideshowRunning = false; if (this.slideshowTimeout) { clearTimeout(this.slideshowTimeout); this.slideshowTimeout = undefined } if (this.$controlsContainer) { this.$controlsContainer.find('div.ss-controls a').removeClass().addClass('play').attr('title', this.playLinkText).attr('href', '#play').html(this.playLinkText) } return this }, play: function () { this.isSlideshowRunning = true; if (this.$controlsContainer) { this.$controlsContainer.find('div.ss-controls a').removeClass().addClass('pause').attr('title', this.pauseLinkText).attr('href', '#pause').html(this.pauseLinkText) } if (!this.slideshowTimeout) { var gallery = this; this.slideshowTimeout = setTimeout(function () { gallery.ssAdvance() }, this.delay) } return this }, toggleSlideshow: function () { if (this.isSlideshowRunning) this.pause(); else this.play(); return this }, ssAdvance: function () { if (this.isSlideshowRunning) this.next(true); return this }, next: function (dontPause, bypassHistory) { this.gotoIndex(this.getNextIndex(this.currentImage.index), dontPause, bypassHistory); return this }, previous: function (dontPause, bypassHistory) { this.gotoIndex(this.getPrevIndex(this.currentImage.index), dontPause, bypassHistory); return this }, nextPage: function (dontPause, bypassHistory) { var page = this.getCurrentPage(); var lastPage = this.getNumPages() - 1; if (page < lastPage) { var startIndex = page * this.numThumbs; var nextPage = startIndex + this.numThumbs; this.gotoIndex(nextPage, dontPause, bypassHistory) } return this }, previousPage: function (dontPause, bypassHistory) { var page = this.getCurrentPage(); if (page > 0) { var startIndex = page * this.numThumbs; var prevPage = startIndex - this.numThumbs; this.gotoIndex(prevPage, dontPause, bypassHistory) } return this }, gotoIndex: function (index, dontPause, bypassHistory) { if (!dontPause) this.pause(); if (index < 0) index = 0; else if (index >= this.data.length) index = this.data.length - 1; var imageData = this.data[index]; if (!bypassHistory && this.enableHistory) $.historyLoad(String(imageData.hash)); else this.gotoImage(imageData); return this }, gotoImage: function (imageData) { var index = imageData.index; if (this.onSlideChange) this.onSlideChange(this.currentImage.index, index); this.currentImage = imageData; this.preloadRelocate(index); this.refresh(); return this }, getDefaultTransitionDuration: function (isSync) { if (isSync) return this.defaultTransitionDuration; return this.defaultTransitionDuration / 2 }, refresh: function () { var imageData = this.currentImage; if (!imageData) return this; var index = imageData.index; if (this.$controlsContainer) { this.$controlsContainer.find('div.nav-controls a.prev').attr('href', '#' + this.data[this.getPrevIndex(index)].hash).end().find('div.nav-controls a.next').attr('href', '#' + this.data[this.getNextIndex(index)].hash) } var previousSlide = this.$imageContainer.find('span.current').addClass('previous').removeClass('current'); var previousCaption = 0; if (this.$captionContainer) { previousCaption = this.$captionContainer.find('span.current').addClass('previous').removeClass('current') } var isSync = this.syncTransitions && imageData.image; var isTransitioning = true; var gallery = this; var transitionOutCallback = function () { isTransitioning = false; previousSlide.remove(); if (previousCaption) previousCaption.remove(); if (!isSync) { if (imageData.image && imageData.hash == gallery.data[gallery.currentImage.index].hash) { gallery.buildImage(imageData, isSync) } else { if (gallery.$loadingContainer) { gallery.$loadingContainer.show() } } } }; if (previousSlide.length == 0) { transitionOutCallback() } else { if (this.onTransitionOut) { this.onTransitionOut(previousSlide, previousCaption, isSync, transitionOutCallback) } else { previousSlide.fadeTo(this.getDefaultTransitionDuration(isSync), 0.0, transitionOutCallback); if (previousCaption) previousCaption.fadeTo(this.getDefaultTransitionDuration(isSync), 0.0) } } if (isSync) this.buildImage(imageData, isSync); if (!imageData.image) { var image = new Image(); image.onload = function () { imageData.image = this; if (!isTransitioning && imageData.hash == gallery.data[gallery.currentImage.index].hash) { gallery.buildImage(imageData, isSync) } }; image.alt = imageData.title; image.src = imageData.slideUrl } this.relocatePreload = true; return this.syncThumbs() }, buildImage: function (imageData, isSync) { var gallery = this; var nextIndex = this.getNextIndex(imageData.index); var newSlide = this.$imageContainer.append('<span class="image-wrapper current"><a class="advance-link" rel="history" href="#' + this.data[nextIndex].hash + '" title="' + imageData.title + '">&nbsp;</a></span>').find('span.current').css('opacity', '0'); newSlide.find('a').append(imageData.image).click(function (e) { gallery.clickHandler(e, this) }); var newCaption = 0; if (this.$captionContainer) { newCaption = this.$captionContainer.append('<span class="image-caption current"></span>').find('span.current').css('opacity', '0').append(imageData.caption) } if (this.$loadingContainer) { this.$loadingContainer.hide() } if (this.onTransitionIn) { this.onTransitionIn(newSlide, newCaption, isSync) } else { newSlide.fadeTo(this.getDefaultTransitionDuration(isSync), 1.0); if (newCaption) newCaption.fadeTo(this.getDefaultTransitionDuration(isSync), 1.0) } if (this.isSlideshowRunning) { if (this.slideshowTimeout) clearTimeout(this.slideshowTimeout); this.slideshowTimeout = setTimeout(function () { gallery.ssAdvance() }, this.delay) } return this }, getCurrentPage: function () { return Math.floor(this.currentImage.index / this.numThumbs) }, syncThumbs: function () { var page = this.getCurrentPage(); if (page != this.displayedPage) this.updateThumbs(); var $thumbs = this.find('ul.thumbs').children(); $thumbs.filter('.selected').removeClass('selected'); $thumbs.eq(this.currentImage.index).addClass('selected'); return this }, updateThumbs: function (postTransitionOutHandler) { var gallery = this; var transitionOutCallback = function () { if (postTransitionOutHandler) postTransitionOutHandler(); gallery.rebuildThumbs(); if (gallery.onPageTransitionIn) gallery.onPageTransitionIn(); else gallery.show() }; if (this.onPageTransitionOut) { this.onPageTransitionOut(transitionOutCallback) } else { this.hide(); transitionOutCallback() } return this }, rebuildThumbs: function () { var needsPagination = this.data.length > this.numThumbs; var page = this.getCurrentPage(); var startIndex = page * this.numThumbs; var stopIndex = startIndex + this.numThumbs - 1; if (stopIndex >= this.data.length) stopIndex = this.data.length - 1; var $thumbsUl = this.find('ul.thumbs'); $thumbsUl.find('li').each(function (i) { var $li = $(this); if (i >= startIndex && i <= stopIndex) { $li.show() } else { $li.hide() } }); this.displayedPage = page; $thumbsUl.removeClass('noscript'); return this }, getNumPages: function () { return Math.ceil(this.data.length / this.numThumbs) }, buildPager: function (pager) { var gallery = this; var numPages = this.getNumPages(); var page = this.getCurrentPage(); var startIndex = page * this.numThumbs; var pagesRemaining = this.maxPagesToShow - 1; var pageNum = page - Math.floor((this.maxPagesToShow - 1) / 2) + 1; if (pageNum > 0) { var remainingPageCount = numPages - pageNum; if (remainingPageCount < pagesRemaining) { pageNum = pageNum - (pagesRemaining - remainingPageCount) } } if (pageNum < 0) { pageNum = 0 } if (page > 0) { var prevPage = startIndex - this.numThumbs; pager.append('<a rel="history" href="#' + this.data[prevPage].hash + '" title="' + this.prevPageLinkText + '">' + this.prevPageLinkText + '</a>') } if (pageNum > 0) { this.buildPageLink(pager, 0, numPages); if (pageNum > 1) pager.append('<span class="ellipsis">&hellip;</span>'); pagesRemaining-- } while (pagesRemaining > 0) { this.buildPageLink(pager, pageNum, numPages); pagesRemaining--; pageNum++ } if (pageNum < numPages) { var lastPageNum = numPages - 1; if (pageNum < lastPageNum) pager.append('<span class="ellipsis">&hellip;</span>'); this.buildPageLink(pager, lastPageNum, numPages) } var nextPage = startIndex + this.numThumbs; if (nextPage < this.data.length) { pager.append('<a rel="history" href="#' + this.data[nextPage].hash + '" title="' + this.nextPageLinkText + '">' + this.nextPageLinkText + '</a>') } pager.find('a').click(function (e) { gallery.clickHandler(e, this) }); return this }, buildPageLink: function (pager, pageNum, numPages) { var pageLabel = pageNum + 1; var currentPage = this.getCurrentPage(); if (pageNum == currentPage) pager.append('<span class="current">' + pageLabel + '</span>'); else if (pageNum < numPages) { var imageIndex = pageNum * this.numThumbs; pager.append('<a rel="history" href="#' + this.data[imageIndex].hash + '" title="' + pageLabel + '">' + pageLabel + '</a>') } return this } }); $.extend(this, defaults, settings); if (this.enableHistory && !$.historyInit) this.enableHistory = false; if (this.imageContainerSel) this.$imageContainer = $(this.imageContainerSel); if (this.captionContainerSel) this.$captionContainer = $(this.captionContainerSel); if (this.loadingContainerSel) this.$loadingContainer = $(this.loadingContainerSel); this.initializeThumbs(); if (this.maxPagesToShow < 3) this.maxPagesToShow = 3; this.displayedPage = -1; this.currentImage = this.data[0]; var gallery = this; if (this.$loadingContainer) this.$loadingContainer.hide(); if (this.controlsContainerSel) { this.$controlsContainer = $(this.controlsContainerSel).empty(); if (this.renderSSControls) { if (this.autoStart) { this.$controlsContainer.append('<div class="ss-controls"><a href="#pause" class="pause" title="' + this.pauseLinkText + '">' + this.pauseLinkText + '</a></div>') } else { this.$controlsContainer.append('<div class="ss-controls"><a href="#play" class="play" title="' + this.playLinkText + '">' + this.playLinkText + '</a></div>') } this.$controlsContainer.find('div.ss-controls a').click(function (e) { gallery.toggleSlideshow(); e.preventDefault(); return false }) } if (this.renderNavControls) { this.$controlsContainer.append('<div class="nav-controls"><a class="prev" rel="history" title="' + this.prevLinkText + '">' + this.prevLinkText + '</a><a class="next" rel="history" title="' + this.nextLinkText + '">' + this.nextLinkText + '</a></div>').find('div.nav-controls a').click(function (e) { gallery.clickHandler(e, this) }) } } var initFirstImage = !this.enableHistory || !location.hash; if (this.enableHistory && location.hash) { var hash = $.galleriffic.normalizeHash(location.hash); var imageData = allImages[hash]; if (!imageData) initFirstImage = true } if (initFirstImage) this.gotoIndex(0, false, true); if (this.enableKeyboardNavigation) { $(document).keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; switch (key) { case 32: gallery.next(); e.preventDefault(); break; case 33: gallery.previousPage(); e.preventDefault(); break; case 34: gallery.nextPage(); e.preventDefault(); break; case 35: gallery.gotoIndex(gallery.data.length - 1); e.preventDefault(); break; case 36: gallery.gotoIndex(0); e.preventDefault(); break; case 37: gallery.previous(); e.preventDefault(); break; case 39: gallery.next(); e.preventDefault(); break } }) } if (this.autoStart) this.play(); setTimeout(function () { gallery.preloadInit() }, 1000); return this } })(jQuery); (function ($) { var defaults = { mouseOutOpacity: 0.67, mouseOverOpacity: 1.0, fadeSpeed: 'fast', exemptionSelector: '.selected' }; $.fn.opacityrollover = function (settings) { $.extend(this, defaults, settings); var config = this; function fadeTo(element, opacity) { var $target = $(element); if (config.exemptionSelector) $target = $target.not(config.exemptionSelector); $target.fadeTo(config.fadeSpeed, opacity) } this.css('opacity', this.mouseOutOpacity).hover(function () { fadeTo(this, config.mouseOverOpacity) }, function () { fadeTo(this, config.mouseOutOpacity) }); return this } })(jQuery);
/* eslint-enable */

/* eslint-disable */
/* -------------------------------------------------- *
// Lazy Load - jQuery plugin for lazy loading images
// Copyright (c) 2007-2012 Mika Tuupola
// MIT License
// Project home: http://www.appelsiini.net/projects/lazyload
// Version:  1.7.2
* -------------------------------------------------- */
(function (a, b) { $window = a(b), a.fn.lazyload = function (c) { function f() { var b = 0; d.each(function () { var c = a(this); if (e.skip_invisible && !c.is(":visible")) return; if (!a.abovethetop(this, e) && !a.leftofbegin(this, e)) if (!a.belowthefold(this, e) && !a.rightoffold(this, e)) c.trigger("appear"); else if (++b > e.failure_limit) return !1 }) } var d = this, e = { threshold: 0, failure_limit: 0, event: "scroll", effect: "show", container: b, data_attribute: "original", skip_invisible: !0, appear: null, load: null }; return c && (undefined !== c.failurelimit && (c.failure_limit = c.failurelimit, delete c.failurelimit), undefined !== c.effectspeed && (c.effect_speed = c.effectspeed, delete c.effectspeed), a.extend(e, c)), $container = e.container === undefined || e.container === b ? $window : a(e.container), 0 === e.event.indexOf("scroll") && $container.bind(e.event, function (a) { return f() }), this.each(function () { var b = this, c = a(b); b.loaded = !1, c.one("appear", function () { if (!this.loaded) { if (e.appear) { var f = d.length; e.appear.call(b, f, e) } a("<img />").bind("load", function () { c.hide().attr("src", c.data(e.data_attribute))[e.effect](e.effect_speed), b.loaded = !0; var f = a.grep(d, function (a) { return !a.loaded }); d = a(f); if (e.load) { var g = d.length; e.load.call(b, g, e) } }).attr("src", c.data(e.data_attribute)) } }), 0 !== e.event.indexOf("scroll") && c.bind(e.event, function (a) { b.loaded || c.trigger("appear") }) }), $window.bind("resize", function (a) { f() }), f(), this }, a.belowthefold = function (c, d) { var e; return d.container === undefined || d.container === b ? e = $window.height() + $window.scrollTop() : e = $container.offset().top + $container.height(), e <= a(c).offset().top - d.threshold }, a.rightoffold = function (c, d) { var e; return d.container === undefined || d.container === b ? e = $window.width() + $window.scrollLeft() : e = $container.offset().left + $container.width(), e <= a(c).offset().left - d.threshold }, a.abovethetop = function (c, d) { var e; return d.container === undefined || d.container === b ? e = $window.scrollTop() : e = $container.offset().top, e >= a(c).offset().top + d.threshold + a(c).height() }, a.leftofbegin = function (c, d) { var e; return d.container === undefined || d.container === b ? e = $window.scrollLeft() : e = $container.offset().left, e >= a(c).offset().left + d.threshold + a(c).width() }, a.inviewport = function (b, c) { return !a.rightofscreen(b, c) && !a.leftofscreen(b, c) && !a.belowthefold(b, c) && !a.abovethetop(b, c) }, a.extend(a.expr[":"], { "below-the-fold": function (c) { return a.belowthefold(c, { threshold: 0, container: b }) }, "above-the-top": function (c) { return !a.belowthefold(c, { threshold: 0, container: b }) }, "right-of-screen": function (c) { return a.rightoffold(c, { threshold: 0, container: b }) }, "left-of-screen": function (c) { return !a.rightoffold(c, { threshold: 0, container: b }) }, "in-viewport": function (c) { return !a.inviewport(c, { threshold: 0, container: b }) }, "above-the-fold": function (c) { return !a.belowthefold(c, { threshold: 0, container: b }) }, "right-of-fold": function (c) { return a.rightoffold(c, { threshold: 0, container: b }) }, "left-of-fold": function (c) { return !a.rightoffold(c, { threshold: 0, container: b }) } }) })(jQuery, window);
/* eslint-enable */

/* eslint-disable */
/* -------------------------------------------------- *
http://www.baijs.nl/tinycarousel/
* -------------------------------------------------- */
(function (a) { a.tiny = a.tiny || {}; a.tiny.carousel = { options: { start: 1, display: 1, axis: "x", controls: true, pager: false, interval: false, intervaltime: 3000, rewind: false, animation: true, duration: 1000, callback: null} }; a.fn.tinycarousel_start = function () { a(this).data("tcl").start(); }; a.fn.tinycarousel_stop = function () { a(this).data("tcl").stop(); }; a.fn.tinycarousel_move = function (c) { a(this).data("tcl").move(c - 1, true); }; function b(q, e) { var i = this, h = a(".viewport:first", q), g = a(".overview:first", q), k = g.children(), f = a(".next:first", q), d = a(".prev:first", q), l = a(".pager:first", q), w = 0, u = 0, p = 0, j = undefined, o = false, n = true, s = e.axis === "x"; function m() { if (e.controls) { d.toggleClass("disable", p <= 0); f.toggleClass("disable", !(p + 1 < u)); } if (e.pager) { var x = a(".pagenum", l); x.removeClass("active"); a(x[p]).addClass("active"); } } function v(x) { if (a(this).hasClass("pagenum")) { i.move(parseInt(this.rel, 10), true); } return false; } function t() { if (e.interval && !o) { clearTimeout(j); j = setTimeout(function () { p = p + 1 === u ? -1 : p; i.move(1); }, e.intervaltime); } } function r() { if (e.controls && d.length > 0 && f.length > 0) { d.click(function () { i.move(-1); return false; }); f.click(function () { i.move(1); return false; }); } if (e.interval) { q.hover(i.stop, i.start); } if (e.pager && l.length > 0) { a("a", l).click(v); } } this.stop = function () { clearTimeout(j); o = true; }; this.start = function () { o = false; t(); }; this.move = function (y, z) { if (z === true) { p = y; } else { p++; } if ((p + 1) == u) { var x = {}; x[s ? "left" : "top"] = -(p * (w * e.display)); g.animate(x, { queue: false, duration: e.animation ? e.duration : 0, complete: function () { g.css(s ? "left" : "top", 0); if (typeof e.callback === "function") { e.callback.call(this, k[p], p); } } }); p = 0; m(); t(); } else { if (p > -1 && p + 1 < u) { var x = {}; x[s ? "left" : "top"] = -(p * (w * e.display)); g.animate(x, { queue: false, duration: e.animation ? e.duration : 0, complete: function () { if (typeof e.callback === "function") { e.callback.call(this, k[p], p); } } }); m(); t(); } } }; function c() { w = s ? a(k[0]).outerWidth(true) : a(k[0]).outerHeight(true); var y = Math.ceil(((s ? h.outerWidth() : h.outerHeight()) / (w * e.display)) - 1); u = Math.max(1, Math.ceil(k.length / e.display) - y); var x = a(".slide-1").clone(); x.removeClass("slide-1").addClass("slide-" + (u + 1)); g.append(x); u++; p = Math.min(u, Math.max(1, e.start)) - 2; g.css(s ? "width" : "height", (w * (k.length + 1))); i.move(1); r(); return i; } return c(); } a.fn.tinycarousel = function (d) { var c = a.extend({}, a.tiny.carousel.options, d); this.each(function () { a(this).data("tcl", new b(a(this), c)); }); return this; }; } (jQuery));
/* eslint-enable */

/* eslint-disable */
/*! jQuery Validation Plugin - v1.11.1 - 3/22/2013\n
* http://github.com/jzaefferer/jquery-validation
* Copyright (c) 2013 Jarn Zaefferer; Licensed MIT */
(function(a){a.extend(a.fn,{validate:function(c){if(!this.length){if(c&&c.debug&&window.console){console.warn("Nothing selected, can't validate, returning nothing.")}return}var b=a.data(this[0],"validator");if(b){return b}if(!a.browser.msie||a.browser.version>7){this.attr("novalidate","novalidate")}b=new a.validator(c,this[0]);a.data(this[0],"validator",b);if(b.settings.onsubmit){this.validateDelegate(":submit","click",function(d){if(b.settings.submitHandler){b.submitButton=d.target}if(a(d.target).hasClass("cancel")){b.cancelSubmit=true}if(a(d.target).attr("formnovalidate")!==undefined){b.cancelSubmit=true}});this.submit(function(d){if(b.settings.debug){d.preventDefault()}function e(){var f;if(b.settings.submitHandler){if(b.submitButton){f=a("<input type='hidden'/>").attr("name",b.submitButton.name).val(a(b.submitButton).val()).appendTo(b.currentForm)}b.settings.submitHandler.call(b,b.currentForm,d);if(b.submitButton){f.remove()}return false}return true}if(b.cancelSubmit){b.cancelSubmit=false;return e()}if(b.form()){if(b.pendingRequest){b.formSubmitted=true;return false}return e()}else{b.focusInvalid();return false}})}return b},valid:function(){if(a(this[0]).is("form")){return this.validate().form()}else{var c=true;var b=a(this[0].form).validate();this.each(function(){c=c&&b.element(this)});return c}},removeAttrs:function(b){var c={},d=this;a.each(b.split(/\s/),function(f,e){c[e]=d.attr(e);d.removeAttr(e)});return c},rules:function(g,i){var d=this[0];if(g){var e=a.data(d.form,"validator").settings;var c=e.rules;var h=a.validator.staticRules(d);switch(g){case"add":a.extend(h,a.validator.normalizeRule(i));delete h.messages;c[d.name]=h;if(i.messages){e.messages[d.name]=a.extend(e.messages[d.name],i.messages)}break;case"remove":if(!i){delete c[d.name];return h}var j={};a.each(i.split(/\s/),function(l,k){j[k]=h[k];delete h[k]});return j}}var b=a.validator.normalizeRules(a.extend({},a.validator.classRules(d),a.validator.attributeRules(d),a.validator.dataRules(d),a.validator.staticRules(d)),d);if(b.required){var f=b.required;delete b.required;b=a.extend({required:f},b)}return b}});a.extend(a.expr[":"],{blank:function(b){return !a.trim(""+a(b).val())},filled:function(b){return !!a.trim(""+a(b).val())},unchecked:function(b){return !a(b).prop("checked")}});a.validator=function(c,b){this.settings=a.extend(true,{},a.validator.defaults,c);this.currentForm=b;this.init()};a.validator.format=function(c,b){if(arguments.length===1){return function(){var d=a.makeArray(arguments);d.unshift(c);return a.validator.format.apply(this,d)}}if(arguments.length>2&&b.constructor!==Array){b=a.makeArray(arguments).slice(1)}if(b.constructor!==Array){b=[b]}a.each(b,function(d,e){c=c.replace(new RegExp("\\{"+d+"\\}","g"),function(){return e})});return c};a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(c,b){this.lastActive=c;if(this.settings.focusCleanup&&!this.blockFocusCleanup){if(this.settings.unhighlight){this.settings.unhighlight.call(this,c,this.settings.errorClass,this.settings.validClass)}this.addWrapper(this.errorsFor(c)).hide()}},onfocusout:function(c,b){if(!this.checkable(c)&&(c.name in this.submitted||!this.optional(c))){this.element(c)}},onkeyup:function(c,b){if(b.which===9&&this.elementValue(c)===""){return}else{if(c.name in this.submitted||c===this.lastElement){this.element(c)}}},onclick:function(c,b){if(c.name in this.submitted){this.element(c)}else{if(c.parentNode.name in this.submitted){this.element(c.parentNode)}}},highlight:function(b,d,c){if(b.type==="radio"){this.findByName(b.name).addClass(d).removeClass(c)}else{a(b).addClass(d).removeClass(c)}},unhighlight:function(b,d,c){if(b.type==="radio"){this.findByName(b.name).removeClass(d).addClass(c)}else{a(b).removeClass(d).addClass(c)}}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=a(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm);this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var b=(this.groups={});a.each(this.settings.groups,function(f,e){if(typeof e==="string"){e=e.split(/\s/)}a.each(e,function(h,g){b[g]=f})});var c=this.settings.rules;a.each(c,function(f,e){c[f]=a.validator.normalizeRule(e)});function d(f){var e=a.data(this[0].form,"validator"),g="on"+f.type.replace(/^validate/,"");if(e.settings[g]){e.settings[g].call(e,this[0],f)}}a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",d).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",d);if(this.settings.invalidHandler){a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)}},form:function(){this.checkForm();a.extend(this.submitted,this.errorMap);this.invalid=a.extend({},this.errorMap);if(!this.valid()){a(this.currentForm).triggerHandler("invalid-form",[this])}this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var b=0,c=(this.currentElements=this.elements());c[b];b++){this.check(c[b])}return this.valid()},element:function(c){c=this.validationTargetFor(this.clean(c));this.lastElement=c;this.prepareElement(c);this.currentElements=a(c);var b=this.check(c)!==false;if(b){delete this.invalid[c.name]}else{this.invalid[c.name]=true}if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers)}this.showErrors();return b},showErrors:function(c){if(c){a.extend(this.errorMap,c);this.errorList=[];for(var b in c){this.errorList.push({message:c[b],element:this.findByName(b)[0]})}this.successList=a.grep(this.successList,function(d){return !(d.name in c)})}if(this.settings.showErrors){this.settings.showErrors.call(this,this.errorMap,this.errorList)}else{this.defaultShowErrors()}},resetForm:function(){if(a.fn.resetForm){a(this.currentForm).resetForm()}this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass).removeData("previousValue")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(d){var b=0;for(var c in d){b++}return b},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()===0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid){try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}}},findLastActive:function(){var b=this.lastActive;return b&&a.grep(this.errorList,function(c){return c.element.name===b.name}).length===1&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){if(!this.name&&b.settings.debug&&window.console){console.error("%o has no name assigned",this)}if(this.name in c||!b.objectLength(a(this).rules())){return false}c[this.name]=true;return true})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.replace(" ",".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=a([]);this.toHide=a([]);this.currentElements=a([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},prepareElement:function(b){this.reset();this.toHide=this.errorsFor(b)},elementValue:function(b){var c=a(b).attr("type"),d=a(b).val();if(c==="radio"||c==="checkbox"){return a("input[name='"+a(b).attr("name")+"']:checked").val()}if(typeof d==="string"){return d.replace(/\r/g,"")}return d},check:function(g){g=this.validationTargetFor(this.clean(g));var i=a(g).rules();var j=false;var b=this.elementValue(g);var d;for(var h in i){var c={method:h,parameters:i[h]};try{d=a.validator.methods[h].call(this,b,g,c.parameters);if(d==="dependency-mismatch"){j=true;continue}j=false;if(d==="pending"){this.toHide=this.toHide.not(this.errorsFor(g));return}if(!d){this.formatAndAdd(g,c);return false}}catch(f){if(this.settings.debug&&window.console){console.log("Exception occurred when checking element "+g.id+", check the '"+c.method+"' method.",f)}throw f}}if(j){return}if(this.objectLength(i)){this.successList.push(g)}return true},customDataMessage:function(c,b){return a(c).data("msg-"+b.toLowerCase())||(c.attributes&&a(c).attr("data-msg-"+b.toLowerCase()))},customMessage:function(d,c){var b=this.settings.messages[d];return b&&(b.constructor===String?b:b[c])},findDefined:function(){for(var b=0;b<arguments.length;b++){if(arguments[b]!==undefined){return arguments[b]}}return undefined},defaultMessage:function(c,b){return this.findDefined(this.customMessage(c.name,b),this.customDataMessage(c,b),!this.settings.ignoreTitle&&c.title||undefined,a.validator.messages[b],"<strong>Warning: No message defined for "+c.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;if(typeof d==="function"){d=d.call(this,c.parameters,b)}else{if(e.test(d)){d=a.validator.format(d.replace(e,"{$1}"),c.parameters)}}this.errorList.push({message:d,element:b});this.errorMap[b.name]=d;this.submitted[b.name]=d},addWrapper:function(b){if(this.settings.wrapper){b=b.add(b.parent(this.settings.wrapper))}return b},defaultShowErrors:function(){var c,d;for(c=0;this.errorList[c];c++){var b=this.errorList[c];if(this.settings.highlight){this.settings.highlight.call(this,b.element,this.settings.errorClass,this.settings.validClass)}this.showLabel(b.element,b.message)}if(this.errorList.length){this.toShow=this.toShow.add(this.containers)}if(this.settings.success){for(c=0;this.successList[c];c++){this.showLabel(this.successList[c])}}if(this.settings.unhighlight){for(c=0,d=this.validElements();d[c];c++){this.settings.unhighlight.call(this,d[c],this.settings.errorClass,this.settings.validClass)}}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d=this.errorsFor(b);if(d.length){d.removeClass(this.settings.validClass).addClass(this.settings.errorClass);d.html(c)}else{d=a("<"+this.settings.errorElement+">").attr("for",this.idOrName(b)).addClass(this.settings.errorClass).html(c||"");if(this.settings.wrapper){d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()}if(!this.labelContainer.append(d).length){if(this.settings.errorPlacement){this.settings.errorPlacement(d,a(b))}else{d.insertAfter(b)}}}if(!c&&this.settings.success){d.text("");if(typeof this.settings.success==="string"){d.addClass(this.settings.success)}else{this.settings.success(d,b)}}this.toShow=this.toShow.add(d)},errorsFor:function(c){var b=this.idOrName(c);return this.errors().filter(function(){return a(this).attr("for")===b})},idOrName:function(b){return this.groups[b.name]||(this.checkable(b)?b.name:b.id||b.name)},validationTargetFor:function(b){if(this.checkable(b)){b=this.findByName(b.name).not(this.settings.ignore)[0]}return b},checkable:function(b){return(/radio|checkbox/i).test(b.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c)){return this.findByName(c.name).filter(":checked").length}}return b.length},depend:function(b,c){return this.dependTypes[typeof b]?this.dependTypes[typeof b](b,c):true},dependTypes:{"boolean":function(b,c){return b},string:function(b,c){return !!a(b,c.form).length},"function":function(b,c){return b(c)}},optional:function(c){var b=this.elementValue(c);return !a.validator.methods.required.call(this,b,c)&&"dependency-mismatch"},startRequest:function(b){if(!this.pending[b.name]){this.pendingRequest++;this.pending[b.name]=true}},stopRequest:function(c,b){this.pendingRequest--;if(this.pendingRequest<0){this.pendingRequest=0}delete this.pending[c.name];if(b&&this.pendingRequest===0&&this.formSubmitted&&this.form()){a(this.currentForm).submit();this.formSubmitted=false}else{if(!b&&this.pendingRequest===0&&this.formSubmitted){a(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false}}},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:true,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},number:{number:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(b,c){if(b.constructor===String){this.classRuleSettings[b]=c}else{a.extend(this.classRuleSettings,b)}},classRules:function(b){var c={};var d=a(b).attr("class");if(d){a.each(d.split(" "),function(){if(this in a.validator.classRuleSettings){a.extend(c,a.validator.classRuleSettings[this])}})}return c},attributeRules:function(c){var g={};var b=a(c);var e=b[0].getAttribute("type");for(var f in a.validator.methods){var d;if(f==="required"){d=b.get(0).getAttribute(f);if(d===""){d=true}d=!!d}else{d=b.attr(f)}if(/min|max/.test(f)&&(e===null||/number|range|text/.test(e))){d=Number(d)}if(d){g[f]=d}else{if(e===f&&e!=="range"){g[f]=true}}}if(g.maxlength&&/-1|2147483647|524288/.test(g.maxlength)){delete g.maxlength}return g},dataRules:function(b){var c,f,d={},e=a(b);for(c in a.validator.methods){f=e.data("rule-"+c.toLowerCase());if(f!==undefined){d[c]=f}}return d},staticRules:function(b){var d={};var c=a.data(b.form,"validator");if(c.settings.rules){d=a.validator.normalizeRule(c.settings.rules[b.name])||{}}return d},normalizeRules:function(b,c){a.each(b,function(e,f){if(f===false){delete b[e];return}if(f.param||f.depends){var d=true;switch(typeof f.depends){case"string":d=!!a(f.depends,c.form).length;break;case"function":d=f.depends.call(c,c);break}if(d){b[e]=f.param!==undefined?f.param:true}else{delete b[e]}}});a.each(b,function(e,d){b[e]=a.isFunction(d)?d(c):d});a.each(["minlength","maxlength"],function(){if(b[this]){b[this]=Number(b[this])}});a.each(["rangelength","range"],function(){var d;if(b[this]){if(a.isArray(b[this])){b[this]=[Number(b[this][0]),Number(b[this][1])]}else{if(typeof b[this]==="string"){d=b[this].split(/[\s,]+/);b[this]=[Number(d[0]),Number(d[1])]}}}});if(a.validator.autoCreateRanges){if(b.min&&b.max){b.range=[b.min,b.max];delete b.min;delete b.max}if(b.minlength&&b.maxlength){b.rangelength=[b.minlength,b.maxlength];delete b.minlength;delete b.maxlength}}return b},normalizeRule:function(b){if(typeof b==="string"){var c={};a.each(b.split(/\s/),function(){c[this]=true});b=c}return b},addMethod:function(d,c,b){a.validator.methods[d]=c;a.validator.messages[d]=b!==undefined?b:a.validator.messages[d];if(c.length<3){a.validator.addClassRules(d,a.validator.normalizeRule(d))}},methods:{required:function(e,b,d){if(!this.depend(d,b)){return"dependency-mismatch"}if(b.nodeName.toLowerCase()==="select"){var c=a(b).val();return c&&c.length>0}if(this.checkable(b)){return this.getLength(e,b)>0}return a.trim(e).length>0},email:function(b,c){return this.optional(c)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(b)},url:function(b,c){return this.optional(c)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(b)},date:function(b,c){return this.optional(c)||!/Invalid|NaN/.test(new Date(b).toString())},dateISO:function(b,c){return this.optional(c)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(b)},number:function(b,c){return this.optional(c)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(b)},digits:function(b,c){return this.optional(c)||/^\d+$/.test(b)},creditcard:function(f,d){if(this.optional(d)){return"dependency-mismatch"}if(/[^0-9 \-]+/.test(f)){return false}var c=0,b=0,e=false;f=f.replace(/\D/g,"");for(var h=f.length-1;h>=0;h--){var g=f.charAt(h);b=parseInt(g,10);if(e){if((b*=2)>9){b-=9}}c+=b;e=!e}return(c%10)===0},minlength:function(e,b,d){var c=a.isArray(e)?e.length:this.getLength(a.trim(e),b);return this.optional(b)||c>=d},maxlength:function(e,b,d){var c=a.isArray(e)?e.length:this.getLength(a.trim(e),b);return this.optional(b)||c<=d},rangelength:function(e,b,d){var c=a.isArray(e)?e.length:this.getLength(a.trim(e),b);return this.optional(b)||(c>=d[0]&&c<=d[1])},min:function(d,b,c){return this.optional(b)||d>=c},max:function(d,b,c){return this.optional(b)||d<=c},range:function(d,b,c){return this.optional(b)||(d>=c[0]&&d<=c[1])},equalTo:function(e,b,d){var c=a(d);if(this.settings.onfocusout){c.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(b).valid()})}return e===c.val()},remote:function(e,b,d){if(this.optional(b)){return"dependency-mismatch"}var g=this.previousValue(b);if(!this.settings.messages[b.name]){this.settings.messages[b.name]={}}g.originalMessage=this.settings.messages[b.name].remote;this.settings.messages[b.name].remote=g.message;d=typeof d==="string"&&{url:d}||d;if(g.old===e){return g.valid}g.old=e;var f=this;this.startRequest(b);var c={};c[b.name]=e;a.ajax(a.extend(true,{url:d,mode:"abort",port:"validate"+b.name,dataType:"json",data:c,success:function(l){f.settings.messages[b.name].remote=g.originalMessage;var h=l===true||l==="true";if(h){var k=f.formSubmitted;f.prepareElement(b);f.formSubmitted=k;f.successList.push(b);delete f.invalid[b.name];f.showErrors()}else{var j={};var i=l||f.defaultMessage(b,"remote");j[b.name]=g.message=a.isFunction(i)?i(e):i;f.invalid[b.name]=true;f.showErrors(j)}g.valid=h;f.stopRequest(b,h)}},d));return"pending"}}});a.format=a.validator.format}(jQuery));(function(a){var c={};if(a.ajaxPrefilter){a.ajaxPrefilter(function(d,g,f){var e=d.port;if(d.mode==="abort"){if(c[e]){c[e].abort()}c[e]=f}})}else{var b=a.ajax;a.ajax=function(d){var e=("mode" in d?d:a.ajaxSettings).mode,f=("port" in d?d:a.ajaxSettings).port;if(e==="abort"){if(c[f]){c[f].abort()}c[f]=b.apply(this,arguments);return c[f]}return b.apply(this,arguments)}}}(jQuery));(function(a){a.extend(a.fn,{validateDelegate:function(d,c,b){return this.bind(c,function(f){var e=a(f.target);if(e.is(d)){return b.apply(e,arguments)}})}})}(jQuery));
/* eslint-enable */

/* eslint-disable */
/**
 * Autotab - jQuery plugin 1.1b
 * http://www.lousyllama.com/sandbox/jquery-autotab
 * 
 * Copyright (c) 2008 Matthew Miller
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * Revised: 2008-09-10 16:55:08
 */
(function(a){var b=function(d){var f=null;var c=a("#"+d);var e=a("input[name="+d+"]");if(c.length){f=c}else{if(e!=undefined){f=e}}return f};a.fn.autotab_magic=function(f){for(var d=0;d<this.length;d++){var e=d+1;var c=d-1;if(d>0&&e<this.length){a(this[d]).autotab({target:a(this[e]),previous:a(this[c])})}else{if(d>0){a(this[d]).autotab({previous:a(this[c])})}else{a(this[d]).autotab({target:a(this[e])})}}if(f!=null&&(isNaN(f)&&f==a(this[d]).attr("id"))||(!isNaN(f)&&f==d)){a(this[d]).focus()}}return this};a.fn.autotab_filter=function(e){var d={format:"all",uppercase:false,lowercase:false,nospace:false,pattern:null};if(typeof e=="string"||typeof e=="function"){d.format=e}else{a.extend(d,e)}for(var c=0;c<this.length;c++){a(this[c]).bind("keyup",function(f){var h=this.value;switch(d.format){case"text":var g=new RegExp("[0-9]+","g");h=h.replace(g,"");break;case"alpha":var g=new RegExp("[^a-zA-Z]+","g");h=h.replace(g,"");break;case"number":case"numeric":var g=new RegExp("[^0-9]+","g");h=h.replace(g,"");break;case"alphanumeric":var g=new RegExp("[^0-9a-zA-Z]+","g");h=h.replace(g,"");break;case"custom":var g=new RegExp(d.pattern,"g");h=h.replace(g,"");break;case"all":default:if(typeof d.format=="function"){var h=d.format(h)}break}if(d.nospace){var g=new RegExp("[ ]+","g");h=h.replace(g,"")}if(d.uppercase){h=h.toUpperCase()}if(d.lowercase){h=h.toLowerCase()}if(h!=this.value){this.value=h}})}};a.fn.autotab=function(e){var d={format:"all",maxlength:2147483647,uppercase:false,lowercase:false,nospace:false,target:null,previous:null,pattern:null};a.extend(d,e);if(typeof d.target=="string"){d.target=b(d.target)}if(typeof d.previous=="string"){d.previous=b(d.previous)}var c=a(this).attr("maxlength");if(d.maxlength==2147483647&&c!=2147483647){d.maxlength=c}else{if(d.maxlength>0){a(this).attr("maxlength",d.maxlength)}else{d.target=null}}if(d.format!="all"){a(this).autotab_filter(d)}return a(this).bind("keydown",function(f){if(f.which==8&&this.value.length==0&&d.previous){d.previous.focus().val(d.previous.val())}}).bind("keyup",function(f){var g=[8,9,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45,46,144,145];if(f.which!=8){var h=a(this).val();if(a.inArray(f.which,g)==-1&&h.length==d.maxlength&&d.target){d.target.focus()}}})}})(jQuery);
/* eslint-enable */

/** Configuration de base **/
var globalConfig = {
	ajax: {
        dataType: 'json',
        contentType: "application/json; charset=utf-8", // header for webmethods
        type: 'post'
    },
	keyCodes: {
        ALT: 18,
        BACKSPACE: 8,
        CTRL: 17,
	    DELETE: 46,
	    DOWNARROW: 40,
	    END: 35,
        ENTER: 13,
        ESCAPE: 27,
	    HOME: 36,
	    INSERT: 45,
        LEFTARROW: 37,
        PAGEDOWN: 34,
        PAGEUP: 33,
        RIGHTARROW: 39,
	    SHIFT: 16,
        SPACEBAR: 32,
        TAB: 9,
        UPARROW: 38
    }
};

// Formate une chaine selon des motifs de remplacement
// ex: "{0}-{1}".format("value1", "value2") => value1-value2
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
      ? args[number]
      : match
        ;
    });
};

/* eslint-disable */
/**
****Plug-In popinNS 0.1
**** DOC ****
 
*POPIN HTML
***JS***
$(element).popinNS()
***HTML***
<a href="#" rel="width:500,height:500,targetElement:.classe-css" class="popin-delete">
ou
<a href="#" rel="width:500,height:500,targetElement:#identifiant-css" class="popin-delete">
	
	
*POPIN AJAX
***JS***
$(element).popinNS()
***HTML***
<a href="delivery-mode.html" rel="ajax:true,width:500,height:500" class="popin-delete">
Le lien vers le fichier AJAX se fait à l'aide de l'attribut HREF
Dans ce cas de figure, le paramètre "ajax:true" est obligatoire
On peut rajouter le paramètre "resize:true" pour redimensionner la popin en fonction du contenu de l'iframe
	
*PARAMETRES*
width (int)
height (int)
positionFixed (bool)
ajax (bool)
resize (bool)
targetElement (string)
overlayColor (#RVB)
overlayOpacity (float 0-1)
boxColor (#RVB)
closeButton (bool)
overlayClose (bool)
**/
$.fn.popinNS = function () { var g = { overlayColor: "#000", overlayOpacity: 0.8, boxColor: "#FFF", width: 320, height: 240, popinTop: undefined, popinLeft: Math.round(($(window).width() / 2) - (320 / 2)) + "px", positionFixed: false, ajax: false, hasCloseButton: true, resize: false, overlayClose: true, noiframe: false, inform: false, footerButton: false, textButton: "Fermer" }; var e = {}; var b = { popinTop: /popinTop:([0-9]+)/i, width: /width:([0-9]+)/i, height: /height:([0-9]+|auto)/i, ajax: /ajax:(true|false)/i, positionFixed: /positionFixed:(true|false)/i, resize: /resize:(true|false)/i, targetElement: /targetElement:([#\.\w-]*)/, overlayColor: /overlayColor:([#\w-]*)/, overlayOpacity: /overlayOpacity:([0-9]+[\.]*[0-9]*)/, boxColor: /boxColor:([#\w-]*)/, hasCloseButton: /closeButton:(true|false)/, overlayClose: /overlayClose:(true|false)/, noiframe: /noiframe:(true|false)/, inform: /inform:(true|false)/, footerButton: /footerButton:(true|false)/, textButtonClose: /textButtonClose:([\w]*)/ }; var d = function () { $("#popinNS").append('<a href="#" id="popinNSClose">fermer</a>'); $("#popinNSClose").live("click", function (j) { j.preventDefault(); $.fn.popinNS.closePopin() }) }; var a = function () { $("#popinNS").append('<a href="#" class="footer-button Btn08 ' + e.textButtonClose + '"><span>' + e.textButtonClose + "</span></a>").live("click", function (j) { j.preventDefault(); $.fn.popinNS.closePopin() }) }; var h = function () { if ((!$("#popinNS").length) || (!$("#popinNSOverlay").length)) { var j = $('<div id="popinNSOverlay"></div>').appendTo("body").css({ width: $("html").width() + "px", height: ($("body").height() > $("html").height()) ? ($("body").height() + "px") : ($("html").height() + "px"), background: g.overlayColor }).fadeTo(0, e.overlayOpacity); if (e.overlayClose === true) { j.click(function (k) { k.preventDefault(); $.fn.popinNS.closePopin() }) } if (e.inform == "true") { $('<div id="popinNS"></div>').appendTo("body>form").css({ "z-index": "101" }) } else { $('<div id="popinNS"></div>').appendTo("body").css({ "z-index": "101" }); $("body").addClass("z-indexed") } if (e.hasCloseButton === true) { d() } if (e.footerButton === true) { a() } } }; var f = function (n) { h(); var l = "", o = $("#popinNS"); if (e.targetElement != null && e.targetElement != "" && e.targetElement != undefined) { var j = $(e.targetElement).attr("id") + "-pop"; l = $(e.targetElement).clone(true).prop("id", j).addClass("cloned") } if (e.ajax === "true") { l = c(n) } o.append(l); $("#popinNSOverlay").show(); var p = { height: $(window).height(), width: $(window).width(), scrollTop: $(window).scrollTop() }; if ((e.ajax === "true") && (e.resize === "true")) { $("#popinNSajax").load(function () { $("#content", this.contentWindow.document.body).css("overflow", "hidden"); var q = $("#content", this.contentWindow.document.body).outerHeight(true) + 15; $(this).height(q); $(this).closest("#popinNS").height(q); var r = Math.round((p.height / 2) - (q / 2) + p.scrollTop); if (r <= 0) { r = "10px" } else { r = r + "px" } o.css("top", r) }) } var m = Math.round((p.height / 2) - (e.height / 2) + p.scrollTop); if (m <= 0) { m = "10px" } else { m = m + "px" } o.css({ top: $(window).scrollTop()  + 40 + "px", position: "absolute" }); var k = (e.height != "auto") ? e.height + "px" : e.height; if (e.popinTop !== undefined) { o.css("top", e.popinTop+"px") } o.css({ background: e.boxColor, color: e.textColor, width: e.width + "px", height: k, left: Math.round((p.width / 2) - (e.width / 2)) + "px", "z-index": 102 }).attr("tabIndex", -1).attr("aria-live", "polite"); if (e.hasCloseButton === true) { o.keydown(function (q) { if (q.which == globalConfig.keyCodes.ESCAPE) { q.preventDefault(); $.fn.popinNS.closePopin() } }) } $(".popinNSClose").live("click", function (q) { q.preventDefault(); $.fn.popinNS.closePopin() }); if ($.liaisonPopIn != undefined) { $(e.targetElement).liaisonPopIn() } }; var c = function (j) { var l = ""; if (!j.is("a")) { l = j.find("a").attr("href") } else { l = j.attr("href") } if (e.noiframe == "true") { $("body").append('<div class="popnoframe"><div class="popscript"></div></div>'); $(".popnoframe").load(l); var k = $(".popnoframe") } else { k = $("<iframe frameborder='0' hspace='0' src='" + l + "' id='popinNSajax' class='cloned' name='popinNSajax'> </iframe>"); k.css({ width: e.width + "px", height: e.height + "px" }) } return k }; function i(j) { var k = $.extend({}, g, j); return k } return this.each(function () { var n = g; var l = $(this); if (!l.is("a")) { var k = l.find("a").attr("rel") } else { var k = l.attr("rel") } if (k && k !== "") { var j = {}; $.each(b, function (m, o) { var p = o.exec(k); if (p != null && p != "") { j[m] = lastItem(p) } }) } l.unbind("click").bind("click", function (m) { m.preventDefault(); e = i(j); window.heightPopin = e.height; f(l); $(this).trigger("customClick") }) }) }; $.fn.popinNS.closePopin = function () { $("#popinNS").hide().empty().remove(); $("#popinNSOverlay").remove(); $("body").removeClass("z-indexed") };
/* eslint-enable */

//------------------------------ Generic helper functions ------------------------------------

function getSmlr(a, b) { return ((a && a < b) || !b) ? a : b; }
function isFunction(a) { return typeof a == 'function'; }
function lastItem(a) { var l = a.length; return (l > 1) ? a[l - 1] : a; }

/* eslint-disable */
/** 
 Plugin jQuery interne
 Définition plugin sur les éléments de formulaires de type "checkbox"
 ----------------------
 Attributs html optionnels
 data-label: attribut servant à définir un libellé spécifique (utilisé seulement pour l'accessibilité)
 data-reload: Si la checkbox doit être rechargée, définir l'attribut à true (par défaut, false)
 
 Exemple d'utilisation: 
 <asp:Checkbox CssClass="ns-checkbox" data-label="" runat="server" />
 <asp:Label CssClass="ns-checkbox-label" runat="server">Valeur label</asp:Label>
*/
$.fn.styleCheckbox=function(c){var b={linkText:"Ajouter ",linkCheckedText:"Supprimer ",reload:false},a=$.extend({},b,c);return this.each(function(){var e,d=$(this),f=$(this).find('input[type="checkbox"]');reload=d.attr("data-reload"),changeCheckboxState=function(g){$("#"+g.attr("data-for")).trigger("click")},testCheckboxState=function(j,i){var g="",h="";if(d.attr("data-label")){h=d.attr("data-label")}if(j.is(":checked")){g=a.linkCheckedText+h;i.addClass("checked").find("a").text(g).attr("aria-checked","true")}else{g=a.linkText+h;i.removeClass("checked").find("a").text(g).attr("aria-checked","false")}};if(reload){d.parent().find(".fake-checkbox").remove()}d.after(function(){return'<div class="fake-checkbox" data-for="'+f.attr("id")+'"><a href="#" role="checkbox"> </a></div>'}).hide();e=d.next(".fake-checkbox");testCheckboxState(f,e);if(f.prop("disabled")){e.addClass("disabled").on("click.checkbox","a",function(g){g.preventDefault()})}else{if($("html.ie").length){f.off("click").on("click",function(g){g.preventDefault();if($(this).prop("checked")){$(this).prop("checked",false)}else{$(this).prop("checked",true)}testCheckboxState($(this),e)});e.next().off("click").on("click",function(g){f.trigger("click")})}f.on("change",function(){testCheckboxState($(this),e)});e.on("click.checkbox","a",function(g){var h=$(this).parent();g.preventDefault();changeCheckboxState(h)}).on("keydown.checkbox","a",function(g){var h=$(this).parent();if(g.which==globalConfig.keyCodes.SPACEBAR){g.preventDefault();changeCheckboxState(h)}})}})};
/* eslint-enable */

/* eslint-disable */
/** 
 Plugin jQuery interne
 Définition plugin sur les éléments de formulaires de type "select"
 ----------------------
 Attributs html optionnels
 data-width: Redéfinition de la taille de l'élément (par défaut à 300px)
 data-align: alignement du texte du sélecteur (par défaut, le texte est centré)
 data-reload: Si le contenu du select doit être rechargé, définir l'attribut à true (par défaut, false)
 data-padding: Redéfinition du padding-left (par défaut à 4px)

 Exemple d'utilisation: 
 <asp:DropDownList CssClass="ns-ddl" data-width="" data-align="" data-reload="" runat="server" />

 !!!!!!!!!!!!!!!!!!!!! modification sur la taille (-2px par rapport à la taille du conteneur) du span .dyn-ddl-value et de la liste dyn-ddl-list 
 !!!!!!!!!!!!!!!!!!!!! pour un affichage "correcte" en cas de zoom / dezoom du navigateur --- cf brief #13055
*/
$.fn.styleSelect=function(e){var b,a={margin:4,padding:4,reload:false,select:null,setup:null,textalign:"center",width:"300"},d=$.extend({},a,e),f='<div class="dyn-ddl" data-id-ddl=""><a class="dyn-ddl-top" href="#"><span class="dyn-ddl-value"></span><span class="dyn-ddl-button"></span></a><ul class="dyn-ddl-list"></ul></div>';var b=function b(h,g){if(!h.hasClass("disabled")){h.on("focusin.dynamicDDL",".dyn-ddl-top",function(){var i=g.find("option"),j=h.attr("data-selected-index");$(this).on("keypress.dynamicDDL",function(l){switch(l.keyCode){case globalConfig.keyCodes.RIGHTARROW:case globalConfig.keyCodes.DOWNARROW:l.preventDefault();if(j<i.length-1){j++}break;case globalConfig.keyCodes.LEFTARROW:case globalConfig.keyCodes.UPARROW:l.preventDefault();if(j>0){j--}break;case globalConfig.keyCodes.TAB:break;default:var k=String.fromCharCode(l.which).toLowerCase();$matches=h.find(".dyn-ddl-list > li").filter(function(){return/^\w+$/i.test(k)&&new RegExp("^"+k,"i").test($(this).text())});nMatches=$matches.length;counter=g.data("counter")+1||0;curKey=g.data("key")||k;j=$matches.eq(counter).index();if(!nMatches){return false}if(curKey===k){if(counter<nMatches){g.data("counter",counter)}else{g.data("counter",0);j=$matches.eq(0).index()}}else{g.data("counter",0);j=$matches.eq(0).index()}}c(h,g,j)})}).on("click.dynamicDDL",".dyn-ddl-top",function(i){var j=$(".dyn-ddl-top",h).outerHeight(true);i.preventDefault();h.toggleClass("active").find(".dyn-ddl-list").css({left:0,top:Math.round(j.top)})}).on("click.dynamicDDL","li",function(i){h.toggleClass("active");if(h.attr("data-selected-index")!=$(this).attr("data-opt-index")){c(h,g,$(this).attr("data-opt-index"))}}).on("click.dynamicDDL","li > a",function(i){i.preventDefault()}).on("mouseleave.dynamicDDL",function(){if($(this).hasClass("active")){$(this).removeClass("active")}})}};var c=function c(h,i,g){var j=i.find("option");i[0].selectedIndex=g;i.trigger("change");h.attr("data-selected-index",g).find(".dyn-ddl-value").text($(j.get(g)).text());if($.isFunction(d.select)){d.select()}};return this.each(function(){var k,g,h,o,j=$(this),i=j.attr("data-width"),l=j.attr("data-align"),n=j.attr("data-reload"),m=j.attr("data-padding");if(!n){n=d.reload}else{if(j.next().is(".dyn-ddl")){j.next().remove()}}k=j.after(f).next(".dyn-ddl");if(!i){i=d.width}if(!l){l=d.textalign}if(!m){m=d.padding}$("option",j).each(function(q,p){k.find("ul").append('<li data-opt-index="'+q+'"><a href="#" title="'+$(this).text()+'">'+$(this).text()+"</a></li>")});g=$(".dyn-ddl-top",k).outerHeight(true);h=$(".dyn-ddl-top > .dyn-ddl-button",k).outerWidth(true);m=(l=="left")?m:0;o=k.find(".dyn-ddl-top .dyn-ddl-value").outerWidth(true);k.attr("role","combobox").attr("data-id-ddl",j[0].id).attr("data-selected-index",j[0].selectedIndex).css("width",i).find(".dyn-ddl-list").css({left:0,"text-align":l,top:g,width:i-o-2}).end().find(".dyn-ddl-top .dyn-ddl-value").html($("option",j).eq(j[0].selectedIndex).text()).css({"padding-left":m+"px","text-align":l,width:(i-o)-h-m-2}).end();if(j.prop("disabled")){k.addClass("disabled")}b(k,j);j.hide();if($.isFunction(d.setup)){d.setup()}})};
/* eslint-enable */

/* eslint-disable */
/** 
 Plugin jQuery interne
 Définition plugin sur les éléments de formulaires de type "radio"
 ----------------------
 Attributs html optionnels
 data-reload: Si le bouton radio doit être rechargé, définir l'attribut à true (par défaut, false)

 Exemple d'utilisation: 
 <asp:RadioButton CssClass="ns-radio-button" data-reload="" runat="server" />
 <asp:Label CssClass="ns-radio-button-label" runat="server">Valeur label</asp:Label>
*/
$.fn.styleRadioButton=function(a){var c={reload:false},b=$.extend({},c,a);return this.each(function(){var f,e=$(this),d=$(this).find('input[type="radio"]');reload=e.attr("data-reload"),listRadioButtonsStrategy=function(h,g,k){var i=0;try{if(!$.isArray(h)){throw"Problème de construction du tableau des boutons radio";}switch(g){case -1:i=h.length-1;return h[i];case h.length:i=(k=="next")?0:g;return h[i];break;default:return h[g];break;}}catch(j){if(window.console!=undefined){console.log(j);}}return false;},changeRadioButtonState=function(h){var g=$("#"+h.attr("data-for"));$("#"+h.attr("data-for")).trigger("click");$('.ns-radio-button > input[name="'+g.attr("name")+'"]').each(function(){$('.fake-radio-button[data-for="'+$(this)[0].id+'"]').removeClass("checked").trigger("blur");});h.find("a").trigger("focus");testRadioButtonState(h);},testRadioButtonState=function(h){var g=$("#"+h.attr("data-for"));if(g.is(":checked")){h.addClass("checked").find("a").attr("aria-checked","true");}else{h.removeClass("checked").find("a").attr("aria-checked","false");}};if(!reload){reload=b.reload;}else{e.parent().find(".ns-radio-button-label").remove().end().find(".fake-radio-button").remove();}e.after(e.find("label").clone().addClass("ns-radio-button-label")).after(function(){return'<div class="fake-radio-button" data-for="'+d.attr("id")+'"><a href="#" role="radio">'+e.next(".ns-radio-button-label").text()+"</a></div>";}).hide();f=e.next(".fake-radio-button");testRadioButtonState(f);if(d.prop("disabled")){f.addClass("disabled").on("click","a",function(g){g.preventDefault();});}else{e.siblings(".ns-radio-button-label").on("click.radioButton",function(g){var h=$('.fake-radio-button[data-for="'+$(this).attr("for")+'"]');g.preventDefault();changeRadioButtonState(h);});f.on("click.radioButton","a",function(g){var h=$(this).parent();g.preventDefault();changeRadioButtonState(h);}).on("keydown.radioButton","a",function(g){var j=0,h=0,i=[],k=$(this).parent();$('.ns-radio-button > input[name="'+d.attr("name")+'"]').each(function(){i.push($('.fake-radio-button[data-for="'+$(this)[0].id+'"]'));});switch(g.which){case globalConfig.keyCodes.RIGHTARROW:case globalConfig.keyCodes.DOWNARROW:j=k.parent().index();h=(j==i.length)?j:j+1;g.preventDefault();changeRadioButtonState(listRadioButtonsStrategy(i,h,"next"));break;case globalConfig.keyCodes.LEFTARROW:case globalConfig.keyCodes.UPARROW:j=k.parent().index();h=j-1;g.preventDefault();changeRadioButtonState(listRadioButtonsStrategy(i,h,"previous"));break;}});}});};
/* eslint-enable */

/* eslint-disable */
/**
Récupére la balise en string
*/
jQuery.fn.outerHTML = function (s) { return s ? this.before(s).remove() : jQuery("<p>").append(this.eq(0).clone()).html(); };
/* eslint-enable */

/* eslint-disable */
/**
Gestion des popins avec jQuery UI Dialog
*/
$.fn.dialogNS=function(){var e=new Object,t={self:function(e,t){void 0!=t&&t.length>0?$("#"+e).parent().css("z-index",5e3).off().prependTo(t).find("[name]").attr("data-id","name"):$("#"+e).parent().css("z-index",5e3).off().prependTo("form:last").find("[name]").attr("data-id","name")},destroy:function(e){$('div[aria-describedby="'+e+'"]').remove()},center:function(e,t){var o,i=$.Deferred(),d=$('div[aria-describedby="'+t+'"]');$(".ui-widget-overlay").css({width:$("html").width()+"px",height:$("body").height()>$("html").height()?$("body").height()+"px":$("html").height()+"px"}),o=setInterval(function(){d.length&&d.is(":visible")&&(i.resolve(),clearInterval(o))},50),i.then(function(){var t=e.dialog("option","position"),o=d.css("top").replace("px","");void 0!==t.my&&0>=+o&&d.css("top",$(window).scrollTop()+40+"px"),void 0===t.my&&d.css("top",t[1]+"px"),d.css({position:"absolute",width:"auto",heigth:"auto"});var i=$(window).height(),n=d.height(),a=i-n;a=a/2+(document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop);var r=$(window).width(),l=d.width(),s=r-l;s/=2,0>=s&&(s=0),d.css({left:s+"px"}),$("body").trigger("scroll-to-element")})}};return function(o){var i=this,d=i.attr("id");if("open"==o)try{var n=$(i).parents('[data-type="DisplayAjax"]');i.dialogNS("destroy"),i.dialog(e[d]),i.dialog("open"),t.self(d,n),t.center(i,d),$(window).resize(function(){t.center(d)}),void 0==e[d]||""!=e[d].title&&void 0!=e[d].title||i.parent().find(".ui-dialog-titlebar").remove(),void 0!=e[d]&&0==e[d].closable&&$(self).parent().find(".ui-dialog-titlebar-close").remove()}catch(a){}else if("close"==o)try{t.destroy(d),i.dialog("destroy")}catch(a){}else if("destroy"==o)try{t.destroy(d),i.dialog("destroy")}catch(a){}else e[d]=o,void 0==e[d]||void 0==e[d].autoOpen?i.dialogNS("open"):0==e[d].autoOpen?i.dialogNS("close"):1==e[d].autoOpen&&i.dialogNS("open")}}();
/* eslint-enable */

/* eslint-disable */
/**
jquery.countdown v1.6.3
*/
(function (b) { function c() { this.regional = []; this.regional[""] = { labels: ["Years", "Months", "Weeks", "Days", "Hours", "Minutes", "Seconds"], labels1: ["Year", "Month", "Week", "Day", "Hour", "Minute", "Second"], compactLabels: ["y", "m", "w", "d"], whichLabels: null, digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], timeSeparator: ":", isRTL: false }; this._defaults = { until: null, since: null, timezone: null, serverSync: null, format: "dHMS", layout: "", compact: false, significant: 0, description: "", expiryUrl: "", expiryText: "", alwaysExpire: false, onExpiry: null, onTick: null, tickInterval: 1 }; b.extend(this._defaults, this.regional[""]); this._serverSyncs = []; var m = (typeof Date.now == "function" ? Date.now : function () { return new Date().getTime() }); var n = (window.performance && typeof window.performance.now == "function"); function o(s) { var r = (s < 1000000000000 ? (n ? (performance.now() + performance.timing.navigationStart) : m()) : s || m()); if (r - p >= 1000) { i._updateTargets(); p = r } q(o) } var q = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null; var p = 0; if (!q || b.noRequestAnimationFrame) { b.noRequestAnimationFrame = null; setInterval(function () { i._updateTargets() }, 980) } else { p = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || m(); q(o) } } var k = 0; var l = 1; var g = 2; var h = 3; var j = 4; var a = 5; var d = 6; b.extend(c.prototype, { markerClassName: "hasCountdown", propertyName: "countdown", _rtlClass: "countdown_rtl", _sectionClass: "countdown_section", _amountClass: "countdown_amount", _rowClass: "countdown_row", _holdingClass: "countdown_holding", _showClass: "countdown_show", _descrClass: "countdown_descr", _timerTargets: [], setDefaults: function (m) { this._resetExtraLabels(this._defaults, m); b.extend(this._defaults, m || {}) }, UTCDate: function (p, s, q, u, r, m, n, t) { if (typeof s == "object" && s.constructor == Date) { t = s.getMilliseconds(); n = s.getSeconds(); m = s.getMinutes(); r = s.getHours(); u = s.getDate(); q = s.getMonth(); s = s.getFullYear() } var o = new Date(); o.setUTCFullYear(s); o.setUTCDate(1); o.setUTCMonth(q || 0); o.setUTCDate(u || 1); o.setUTCHours(r || 0); o.setUTCMinutes((m || 0) - (Math.abs(p) < 30 ? p * 60 : p)); o.setUTCSeconds(n || 0); o.setUTCMilliseconds(t || 0); return o }, periodsToSeconds: function (m) { return m[0] * 31557600 + m[1] * 2629800 + m[2] * 604800 + m[3] * 86400 + m[4] * 3600 + m[5] * 60 + m[6] }, _attachPlugin: function (m, o) { m = b(m); if (m.hasClass(this.markerClassName)) { return } var n = { options: b.extend({}, this._defaults), _periods: [0, 0, 0, 0, 0, 0, 0] }; m.addClass(this.markerClassName).data(this.propertyName, n); this._optionPlugin(m, o) }, _addTarget: function (m) { if (!this._hasTarget(m)) { this._timerTargets.push(m) } }, _hasTarget: function (m) { return (b.inArray(m, this._timerTargets) > -1) }, _removeTarget: function (m) { this._timerTargets = b.map(this._timerTargets, function (n) { return (n == m ? null : n) }) }, _updateTargets: function () { for (var m = this._timerTargets.length - 1; m >= 0; m--) { this._updateCountdown(this._timerTargets[m]) } }, _optionPlugin: function (s, o, p) { s = b(s); var q = s.data(this.propertyName); if (!o || (typeof o == "string" && p == null)) { var n = o; o = (q || {}).options; return (o && n ? o[n] : o) } if (!s.hasClass(this.markerClassName)) { return } o = o || {}; if (typeof o == "string") { var n = o; o = {}; o[n] = p } if (o.layout) { o.layout = o.layout.replace(/</g, "<").replace(/>/g, ">") } this._resetExtraLabels(q.options, o); var m = (q.options.timezone != o.timezone); b.extend(q.options, o); this._adjustSettings(s, q, o.until != null || o.since != null || m); var r = new Date(); if ((q._since && q._since < r) || (q._until && q._until > r)) { this._addTarget(s[0]) } this._updateCountdown(s, q) }, _updateCountdown: function (r, p) { var n = b(r); p = p || n.data(this.propertyName); if (!p) { return } n.html(this._generateHTML(p)).toggleClass(this._rtlClass, p.options.isRTL); if (b.isFunction(p.options.onTick)) { var q = p._hold != "lap" ? p._periods : this._calculatePeriods(p, p._show, p.options.significant, new Date()); if (p.options.tickInterval == 1 || this.periodsToSeconds(q) % p.options.tickInterval == 0) { p.options.onTick.apply(r, [q]) } } var m = p._hold != "pause" && (p._since ? p._now.getTime() < p._since.getTime() : p._now.getTime() >= p._until.getTime()); if (m && !p._expiring) { p._expiring = true; if (this._hasTarget(r) || p.options.alwaysExpire) { this._removeTarget(r); if (b.isFunction(p.options.onExpiry)) { p.options.onExpiry.apply(r, []) } if (p.options.expiryText) { var o = p.options.layout; p.options.layout = p.options.expiryText; this._updateCountdown(r, p); p.options.layout = o } if (p.options.expiryUrl) { window.location = p.options.expiryUrl } } p._expiring = false } else { if (p._hold == "pause") { this._removeTarget(r) } } n.data(this.propertyName, p) }, _resetExtraLabels: function (p, q) { var o = false; for (var m in q) { if (m != "whichLabels" && m.match(/[Ll]abels/)) { o = true; break } } if (o) { for (var m in p) { if (m.match(/[Ll]abels[02-9]|compactLabels1/)) { p[m] = null } } } }, _adjustSettings: function (t, s, r) { var p; var u = 0; var o = null; for (var q = 0; q < this._serverSyncs.length; q++) { if (this._serverSyncs[q][0] == s.options.serverSync) { o = this._serverSyncs[q][1]; break } } if (o != null) { u = (s.options.serverSync ? o : 0); p = new Date() } else { var m = (b.isFunction(s.options.serverSync) ? s.options.serverSync.apply(t, []) : null); p = new Date(); u = (m ? p.getTime() - m.getTime() : 0); this._serverSyncs.push([s.options.serverSync, u]) } var n = s.options.timezone; n = (n == null ? -p.getTimezoneOffset() : n); if (r || (!r && s._until == null && s._since == null)) { s._since = s.options.since; if (s._since != null) { s._since = this.UTCDate(n, this._determineTime(s._since, null)); if (s._since && u) { s._since.setMilliseconds(s._since.getMilliseconds() + u) } } s._until = this.UTCDate(n, this._determineTime(s.options.until, p)); if (u) { s._until.setMilliseconds(s._until.getMilliseconds() + u) } } s._show = this._determineShow(s) }, _destroyPlugin: function (m) { m = b(m); if (!m.hasClass(this.markerClassName)) { return } this._removeTarget(m[0]); m.removeClass(this.markerClassName).empty().removeData(this.propertyName) }, _pausePlugin: function (m) { this._hold(m, "pause") }, _lapPlugin: function (m) { this._hold(m, "lap") }, _resumePlugin: function (m) { this._hold(m, null) }, _hold: function (n, m) { var o = b.data(n, this.propertyName); if (o) { if (o._hold == "pause" && !m) { o._periods = o._savePeriods; var p = (o._since ? "-" : "+"); o[o._since ? "_since" : "_until"] = this._determineTime(p + o._periods[0] + "y" + p + o._periods[1] + "o" + p + o._periods[2] + "w" + p + o._periods[3] + "d" + p + o._periods[4] + "h" + p + o._periods[5] + "m" + p + o._periods[6] + "s"); this._addTarget(n) } o._hold = m; o._savePeriods = (m == "pause" ? o._periods : null); b.data(n, this.propertyName, o); this._updateCountdown(n, o) } }, _getTimesPlugin: function (m) { var n = b.data(m, this.propertyName); return (!n ? null : (n._hold == "pause" ? n._savePeriods : (!n._hold ? n._periods : this._calculatePeriods(n, n._show, n.options.significant, new Date())))) }, _determineTime: function (o, m) { var p = function (r) { var s = new Date(); s.setTime(s.getTime() + r * 1000); return s }; var q = function (t) { t = t.toLowerCase(); var r = new Date(); var x = r.getFullYear(); var v = r.getMonth(); var A = r.getDate(); var s = r.getHours(); var w = r.getMinutes(); var y = r.getSeconds(); var u = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g; var z = u.exec(t); while (z) { switch (z[2] || "s") { case "s": y += parseInt(z[1], 10); break; case "m": w += parseInt(z[1], 10); break; case "h": s += parseInt(z[1], 10); break; case "d": A += parseInt(z[1], 10); break; case "w": A += parseInt(z[1], 10) * 7; break; case "o": v += parseInt(z[1], 10); A = Math.min(A, i._getDaysInMonth(x, v)); break; case "y": x += parseInt(z[1], 10); A = Math.min(A, i._getDaysInMonth(x, v)); break } z = u.exec(t) } return new Date(x, v, A, s, w, y, 0) }; var n = (o == null ? m : (typeof o == "string" ? q(o) : (typeof o == "number" ? p(o) : o))); if (n) { n.setMilliseconds(0) } return n }, _getDaysInMonth: function (n, m) { return 32 - new Date(n, m, 32).getDate() }, _normalLabels: function (m) { return m }, _generateHTML: function (v) { var n = this; v._periods = (v._hold ? v._periods : this._calculatePeriods(v, v._show, v.options.significant, new Date())); var x = false; var t = 0; var r = v.options.significant; var o = b.extend({}, v._show); for (var u = k; u <= d; u++) { x |= (v._show[u] == "?" && v._periods[u] > 0); o[u] = (v._show[u] == "?" && !x ? null : v._show[u]); t += (o[u] ? 1 : 0); r -= (v._periods[u] > 0 ? 1 : 0) } var s = [false, false, false, false, false, false, false]; for (var u = d; u >= k; u--) { if (v._show[u]) { if (v._periods[u]) { s[u] = true } else { s[u] = r > 0; r-- } } } var p = (v.options.compact ? v.options.compactLabels : v.options.labels); var q = v.options.whichLabels || this._normalLabels; var w = function (z) { var y = v.options["compactLabels" + q(v._periods[z])]; return (o[z] ? n._translateDigits(v, v._periods[z]) + (y ? y[z] : p[z]) + " " : "") }; var m = function (z) { var y = v.options["labels" + q(v._periods[z])]; return ((!v.options.significant && o[z]) || (v.options.significant && s[z]) ? '<span class="' + i._sectionClass + '"><span class="' + i._amountClass + '">' + n._translateDigits(v, v._periods[z]) + "</span><br/>" + (y ? y[z] : p[z]) + "</span>" : "") }; return (v.options.layout ? this._buildLayout(v, o, v.options.layout, v.options.compact, v.options.significant, s) : ((v.options.compact ? '<span class="' + this._rowClass + " " + this._amountClass + (v._hold ? " " + this._holdingClass : "") + '">' + w(k) + w(l) + w(g) + w(h) + (o[j] ? this._minDigits(v, v._periods[j], 2) : "") + (o[a] ? (o[j] ? v.options.timeSeparator : "") + this._minDigits(v, v._periods[a], 2) : "") + (o[d] ? (o[j] || o[a] ? v.options.timeSeparator : "") + this._minDigits(v, v._periods[d], 2) : "") : '<span class="' + this._rowClass + " " + this._showClass + (v.options.significant || t) + (v._hold ? " " + this._holdingClass : "") + '">' + m(k) + m(l) + m(g) + m(h) + m(j) + m(a) + m(d)) + "</span>" + (v.options.description ? '<span class="' + this._rowClass + " " + this._descrClass + '">' + v.options.description + "</span>" : ""))) }, _buildLayout: function (u, y, q, m, r, z) { var n = u.options[m ? "compactLabels" : "labels"]; var v = u.options.whichLabels || this._normalLabels; var p = function (B) { return (u.options[(m ? "compactLabels" : "labels") + v(u._periods[B])] || n)[B] }; var o = function (C, B) { return u.options.digits[Math.floor(C / B) % 10] }; var s = { desc: u.options.description, sep: u.options.timeSeparator, yl: p(k), yn: this._minDigits(u, u._periods[k], 1), ynn: this._minDigits(u, u._periods[k], 2), ynnn: this._minDigits(u, u._periods[k], 3), y1: o(u._periods[k], 1), y10: o(u._periods[k], 10), y100: o(u._periods[k], 100), y1000: o(u._periods[k], 1000), ol: p(l), on: this._minDigits(u, u._periods[l], 1), onn: this._minDigits(u, u._periods[l], 2), onnn: this._minDigits(u, u._periods[l], 3), o1: o(u._periods[l], 1), o10: o(u._periods[l], 10), o100: o(u._periods[l], 100), o1000: o(u._periods[l], 1000), wl: p(g), wn: this._minDigits(u, u._periods[g], 1), wnn: this._minDigits(u, u._periods[g], 2), wnnn: this._minDigits(u, u._periods[g], 3), w1: o(u._periods[g], 1), w10: o(u._periods[g], 10), w100: o(u._periods[g], 100), w1000: o(u._periods[g], 1000), dl: p(h), dn: this._minDigits(u, u._periods[h], 1), dnn: this._minDigits(u, u._periods[h], 2), dnnn: this._minDigits(u, u._periods[h], 3), d1: o(u._periods[h], 1), d10: o(u._periods[h], 10), d100: o(u._periods[h], 100), d1000: o(u._periods[h], 1000), hl: p(j), hn: this._minDigits(u, u._periods[j], 1), hnn: this._minDigits(u, u._periods[j], 2), hnnn: this._minDigits(u, u._periods[j], 3), h1: o(u._periods[j], 1), h10: o(u._periods[j], 10), h100: o(u._periods[j], 100), h1000: o(u._periods[j], 1000), ml: p(a), mn: this._minDigits(u, u._periods[a], 1), mnn: this._minDigits(u, u._periods[a], 2), mnnn: this._minDigits(u, u._periods[a], 3), m1: o(u._periods[a], 1), m10: o(u._periods[a], 10), m100: o(u._periods[a], 100), m1000: o(u._periods[a], 1000), sl: p(d), sn: this._minDigits(u, u._periods[d], 1), snn: this._minDigits(u, u._periods[d], 2), snnn: this._minDigits(u, u._periods[d], 3), s1: o(u._periods[d], 1), s10: o(u._periods[d], 10), s100: o(u._periods[d], 100), s1000: o(u._periods[d], 1000) }; var w = q; for (var A = k; A <= d; A++) { var x = "yowdhms".charAt(A); var t = new RegExp("\\{" + x + "<\\}([\\s\\S]*)\\{" + x + ">\\}", "g"); w = w.replace(t, ((!r && y[A]) || (r && z[A]) ? "$1" : "")) } b.each(s, function (D, C) { var B = new RegExp("\\{" + D + "\\}", "g"); w = w.replace(B, C) }); return w }, _minDigits: function (n, o, m) { o = "" + o; if (o.length >= m) { return this._translateDigits(n, o) } o = "0000000000" + o; return this._translateDigits(n, o.substr(o.length - m)) }, _translateDigits: function (n, m) { return ("" + m).replace(/[0-9]/g, function (o) { return n.options.digits[o] }) }, _determineShow: function (m) { var o = m.options.format; var n = []; n[k] = (o.match("y") ? "?" : (o.match("Y") ? "!" : null)); n[l] = (o.match("o") ? "?" : (o.match("O") ? "!" : null)); n[g] = (o.match("w") ? "?" : (o.match("W") ? "!" : null)); n[h] = (o.match("d") ? "?" : (o.match("D") ? "!" : null)); n[j] = (o.match("h") ? "?" : (o.match("H") ? "!" : null)); n[a] = (o.match("m") ? "?" : (o.match("M") ? "!" : null)); n[d] = (o.match("s") ? "?" : (o.match("S") ? "!" : null)); return n }, _calculatePeriods: function (v, B, s, n) { v._now = n; v._now.setMilliseconds(0); var z = new Date(v._now.getTime()); if (v._since) { if (n.getTime() < v._since.getTime()) { v._now = n = z } else { n = v._since } } else { z.setTime(v._until.getTime()); if (n.getTime() > v._until.getTime()) { v._now = n = z } } var t = [0, 0, 0, 0, 0, 0, 0]; if (B[k] || B[l]) { var y = i._getDaysInMonth(n.getFullYear(), n.getMonth()); var p = i._getDaysInMonth(z.getFullYear(), z.getMonth()); var A = (z.getDate() == n.getDate() || (z.getDate() >= Math.min(y, p) && n.getDate() >= Math.min(y, p))); var u = function (F) { return (F.getHours() * 60 + F.getMinutes()) * 60 + F.getSeconds() }; var D = Math.max(0, (z.getFullYear() - n.getFullYear()) * 12 + z.getMonth() - n.getMonth() + ((z.getDate() < n.getDate() && !A) || (A && u(z) < u(n)) ? -1 : 0)); t[k] = (B[k] ? Math.floor(D / 12) : 0); t[l] = (B[l] ? D - t[k] * 12 : 0); n = new Date(n.getTime()); var r = (n.getDate() == y); var w = i._getDaysInMonth(n.getFullYear() + t[k], n.getMonth() + t[l]); if (n.getDate() > w) { n.setDate(w) } n.setFullYear(n.getFullYear() + t[k]); n.setMonth(n.getMonth() + t[l]); if (r) { n.setDate(w) } } var E = Math.floor((z.getTime() - n.getTime()) / 1000); var o = function (F, G) { t[F] = (B[F] ? Math.floor(E / G) : 0); E -= t[F] * G }; o(g, 604800); o(h, 86400); o(j, 3600); o(a, 60); o(d, 1); if (E > 0 && !v._since) { var m = [1, 12, 4.3482, 7, 24, 60, 60]; var q = d; var C = 1; for (var x = d; x >= k; x--) { if (B[x]) { if (t[q] >= C) { t[q] = 0; E = 1 } if (E > 0) { t[x]++; E = 0; q = x; C = 1 } } C *= m[x] } } if (s) { for (var x = k; x <= d; x++) { if (s && t[x]) { s-- } else { if (!s) { t[x] = 0 } } } } return t } }); var e = ["getTimes"]; function f(n, m) { if (n == "option" && (m.length == 0 || (m.length == 1 && typeof m[0] == "string"))) { return true } return b.inArray(n, e) > -1 } b.fn.countdown = function (n) { var m = Array.prototype.slice.call(arguments, 1); if (f(n, m)) { return i["_" + n + "Plugin"].apply(i, [this[0]].concat(m)) } return this.each(function () { if (typeof n == "string") { if (!i["_" + n + "Plugin"]) { throw "Unknown command: " + n } i["_" + n + "Plugin"].apply(i, [this].concat(m)) } else { i._attachPlugin(this, n || {}) } }) }; var i = b.countdown = new c() })(jQuery);
/* eslint-enable */

/* eslint-disable */
/**
* autoNumeric.js
* @author: Bob Knothe
* @author: Sokolov Yura aka funny_falcon
* @version: 1.9.16 - 2013-09-11 GMT 9:00 PM
**/
(function (l) { function m(v) { var w = {}; if (v.selectionStart === undefined) { v.focus(); var u = document.selection.createRange(); w.length = u.text.length; u.moveStart("character", -v.value.length); w.end = u.text.length; w.start = w.end - w.length } else { w.start = v.selectionStart; w.end = v.selectionEnd; w.length = w.end - w.start } return w } function g(v, w, x) { if (v.selectionStart === undefined) { v.focus(); var u = v.createTextRange(); u.collapse(true); u.moveEnd("character", x); u.moveStart("character", w); u.select() } else { v.selectionStart = w; v.selectionEnd = x } } function e(v, u) { l.each(u, function (x, w) { if (typeof w === "function") { u[x] = w(v, u, x) } else { if (typeof v.autoNumeric[w] === "function") { u[x] = v.autoNumeric[w](v, u, x) } } }) } function c(v, u) { if (typeof (v[u]) === "string") { v[u] *= 1 } } function b(y, x) { e(y, x); x.oEvent = null; x.tagList = ["B", "CAPTION", "CITE", "CODE", "DD", "DEL", "DIV", "DFN", "DT", "EM", "H1", "H2", "H3", "H4", "H5", "H6", "INS", "KDB", "LABEL", "LI", "OUTPUT", "P", "Q", "S", "SAMPLE", "SPAN", "STRONG", "TD", "TH", "U", "VAR"]; var w = x.vMax.toString().split("."), z = (!x.vMin && x.vMin !== 0) ? [] : x.vMin.toString().split("."); c(x, "vMax"); c(x, "vMin"); c(x, "mDec"); x.allowLeading = true; x.aNeg = x.vMin < 0 ? "-" : ""; w[0] = w[0].replace("-", ""); z[0] = z[0].replace("-", ""); x.mInt = Math.max(w[0].length, z[0].length, 1); if (x.mDec === null) { var B = 0, u = 0; if (w[1]) { B = w[1].length } if (z[1]) { u = z[1].length } x.mDec = Math.max(B, u) } if (x.altDec === null && x.mDec > 0) { if (x.aDec === "." && x.aSep !== ",") { x.altDec = "," } else { if (x.aDec === "," && x.aSep !== ".") { x.altDec = "." } } } var A = x.aNeg ? "([-\\" + x.aNeg + "]?)" : "(-?)"; x.aNegRegAutoStrip = A; x.skipFirstAutoStrip = new RegExp(A + "[^-" + (x.aNeg ? "\\" + x.aNeg : "") + "\\" + x.aDec + "\\d].*?(\\d|\\" + x.aDec + "\\d)"); x.skipLastAutoStrip = new RegExp("(\\d\\" + x.aDec + "?)[^\\" + x.aDec + "\\d]\\D*$"); var v = "-" + x.aNum + "\\" + x.aDec; x.allowedAutoStrip = new RegExp("[^" + v + "]", "gi"); x.numRegAutoStrip = new RegExp(A + "(?:\\" + x.aDec + "?(\\d+\\" + x.aDec + "\\d+)|(\\d*(?:\\" + x.aDec + "\\d*)?))"); return x } function s(u, z, v) { if (z.aSign) { while (u.indexOf(z.aSign) > -1) { u = u.replace(z.aSign, "") } } u = u.replace(z.skipFirstAutoStrip, "$1$2"); u = u.replace(z.skipLastAutoStrip, "$1"); u = u.replace(z.allowedAutoStrip, ""); if (z.altDec) { u = u.replace(z.altDec, z.aDec) } var A = u.match(z.numRegAutoStrip); u = A ? [A[1], A[2], A[3]].join("") : ""; if ((z.lZero === "allow" || z.lZero === "keep") && v !== "strip") { var x = [], w = ""; x = u.split(z.aDec); if (x[0].indexOf("-") !== -1) { w = "-"; x[0] = x[0].replace("-", "") } if (x[0].length > z.mInt && x[0].charAt(0) === "0") { x[0] = x[0].slice(1) } u = w + x.join(z.aDec) } if ((v && z.lZero === "deny") || (v && z.lZero === "allow" && z.allowLeading === false)) { var y = "^" + z.aNegRegAutoStrip + "0*(\\d" + (v === "leading" ? ")" : "|$)"); y = new RegExp(y); u = u.replace(y, "$1$2") } return u } function p(u, w, v) { w = w.split(","); if (v === "set" || v === "focusout") { u = u.replace("-", ""); u = w[0] + u + w[1] } else { if ((v === "get" || v === "focusin" || v === "pageLoad") && u.charAt(0) === w[0]) { u = u.replace(w[0], "-"); u = u.replace(w[1], "") } } return u } function k(u, x, v) { if (x && v) { var w = u.split(x); if (w[1] && w[1].length > v) { if (v > 0) { w[1] = w[1].substring(0, v); u = w.join(x) } else { u = w[0] } } } return u } function h(u, w, v) { if (w && w !== ".") { u = u.replace(w, ".") } if (v && v !== "-") { u = u.replace(v, "-") } if (!u.match(/\d/)) { u += "0" } return u } function j(y, u) { var x = y.indexOf("."), w = +y; if (x !== -1) { if (w < 1e-06 && w > -1) { y = +y; if (y < 1e-06 && y > 0) { y = (y + 10).toString(); y = y.substring(1) } if (y < 0 && y > -1) { y = (y - 10).toString(); y = "-" + y.substring(2) } y = y.toString() } else { var v = y.split("."); if (v[1] !== undefined) { if (+v[1] === 0) { y = v[0] } else { v[1] = v[1].replace(/0*$/, ""); y = v.join(".") } } } } return (u.lZero === "keep") ? y : y.replace(/^0*(\d)/, "$1") } function d(u, w, v) { if (v && v !== "-") { u = u.replace("-", v) } if (w && w !== ".") { u = u.replace(".", w) } return u } function o(u, v) { u = s(u, v); u = k(u, v.aDec, v.mDec); u = h(u, v.aDec, v.aNeg); var w = +u; if (v.oEvent === "set" && (w < v.vMin || w > v.vMax)) { l.error("The value (" + w + ") from the 'set' method falls outside of the vMin / vMax range") } return w >= v.vMin && w <= v.vMax } function t(w, u, v) { if (w === "" || w === u.aNeg) { if (u.wEmpty === "zero") { return w + "0" } if (u.wEmpty === "sign" || v) { return w + u.aSign } return w } return null } function r(z, x) { z = s(z, x); var v = z.replace(",", "."), u = t(z, x, true); if (u !== null) { return u } var B = ""; if (x.dGroup === 2) { B = /(\d)((\d)(\d{2}?)+)$/ } else { if (x.dGroup === 4) { B = /(\d)((\d{4}?)+)$/ } else { B = /(\d)((\d{3}?)+)$/ } } var A = z.split(x.aDec); if (x.altDec && A.length === 1) { A = z.split(x.altDec) } var w = A[0]; if (x.aSep) { while (B.test(w)) { w = w.replace(B, "$1" + x.aSep + "$2") } } if (x.mDec !== 0 && A.length > 1) { if (A[1].length > x.mDec) { A[1] = A[1].substring(0, x.mDec) } z = w + x.aDec + A[1] } else { z = w } if (x.aSign) { var y = z.indexOf(x.aNeg) !== -1; z = z.replace(x.aNeg, ""); z = x.pSign === "p" ? x.aSign + z : z + x.aSign; if (y) { z = x.aNeg + z } } if (x.oEvent === "set" && v < 0 && x.nBracket !== null) { z = p(z, x.nBracket, x.oEvent) } return z } function a(w, C) { w = (w === "") ? "0" : w.toString(); c(C, "mDec"); var v = "", I = 0, A = "", y = (typeof (C.aPad) === "boolean" || C.aPad === null) ? (C.aPad ? C.mDec : 0) : +C.aPad; var B = function (J) { var K = y === 0 ? (/(\.[1-9]*)0*$/) : y === 1 ? (/(\.\d[1-9]*)0*$/) : new RegExp("(\\.\\d{" + y + "}[1-9]*)0*$"); J = J.replace(K, "$1"); if (y === 0) { J = J.replace(/\.$/, "") } return J }; if (w.charAt(0) === "-") { A = "-"; w = w.replace("-", "") } if (!w.match(/^\d/)) { w = "0" + w } if (A === "-" && +w === 0) { A = "" } if ((+w > 0 && C.lZero !== "keep") || (w.length > 0 && C.lZero === "allow")) { w = w.replace(/^0*(\d)/, "$1") } var H = w.lastIndexOf("."), E = H === -1 ? w.length - 1 : H, F = (w.length - 1) - E; if (F <= C.mDec) { v = w; if (F < y) { if (H === -1) { v += "." } while (F < y) { var z = "000000".substring(0, y - F); v += z; F += z.length } } else { if (F > y) { v = B(v) } else { if (F === 0 && y === 0) { v = v.replace(/\.$/, "") } } } return A + v } var G = H + C.mDec, D = +w.charAt(G + 1), x = w.substring(0, G + 1).split(""), u = (w.charAt(G) === ".") ? (w.charAt(G - 1) % 2) : (w.charAt(G) % 2); if ((D > 4 && C.mRound === "S") || (D > 4 && C.mRound === "A" && A === "") || (D > 5 && C.mRound === "A" && A === "-") || (D > 5 && C.mRound === "s") || (D > 5 && C.mRound === "a" && A === "") || (D > 4 && C.mRound === "a" && A === "-") || (D > 5 && C.mRound === "B") || (D === 5 && C.mRound === "B" && u === 1) || (D > 0 && C.mRound === "C" && A === "") || (D > 0 && C.mRound === "F" && A === "-") || (D > 0 && C.mRound === "U")) { for (I = (x.length - 1); I >= 0; I -= 1) { if (x[I] !== ".") { x[I] = +x[I] + 1; if (x[I] < 10) { break } if (I > 0) { x[I] = "0" } } } } x = x.slice(0, G + 1); v = B(x.join("")); return (+v === 0) ? v : A + v } function q(u, v) { this.settings = v; this.that = u; this.$that = l(u); this.formatted = false; this.settingsClone = b(this.$that, this.settings); this.value = u.value } q.prototype = { init: function (u) { this.value = this.that.value; this.settingsClone = b(this.$that, this.settings); this.ctrlKey = u.ctrlKey; this.cmdKey = u.metaKey; this.shiftKey = u.shiftKey; this.selection = m(this.that); if (u.type === "keydown" || u.type === "keyup") { this.kdCode = u.keyCode } this.which = u.which; this.processed = false; this.formatted = false }, setSelection: function (u, w, v) { u = Math.max(u, 0); w = Math.min(w, this.that.value.length); this.selection = { start: u, end: w, length: w - u }; if (v === undefined || v) { g(this.that, u, w) } }, setPosition: function (v, u) { this.setSelection(v, v, u) }, getBeforeAfter: function () { var w = this.value, v = w.substring(0, this.selection.start), u = w.substring(this.selection.end, w.length); return [v, u] }, getBeforeAfterStriped: function () { var u = this.getBeforeAfter(); u[0] = s(u[0], this.settingsClone); u[1] = s(u[1], this.settingsClone); return u }, normalizeParts: function (u, x) { var w = this.settingsClone; x = s(x, w); var y = x.match(/^\d/) ? true : "leading"; u = s(u, w, y); if ((u === "" || u === w.aNeg) && w.lZero === "deny") { if (x > "") { x = x.replace(/^0*(\d)/, "$1") } } var v = u + x; if (w.aDec) { var z = v.match(new RegExp("^" + w.aNegRegAutoStrip + "\\" + w.aDec)); if (z) { u = u.replace(z[1], z[1] + "0"); v = u + x } } if (w.wEmpty === "zero" && (v === w.aNeg || v === "")) { u += "0" } return [u, x] }, setValueParts: function (u, z) { var x = this.settingsClone, y = this.normalizeParts(u, z), v = y.join(""), w = y[0].length; if (o(v, x)) { v = k(v, x.aDec, x.mDec); if (w > v.length) { w = v.length } this.value = v; this.setPosition(w, false); return true } return false }, signPosition: function () { var w = this.settingsClone, v = w.aSign, y = this.that; if (v) { var z = v.length; if (w.pSign === "p") { var u = w.aNeg && y.value && y.value.charAt(0) === w.aNeg; return u ? [1, z + 1] : [0, z] } var x = y.value.length; return [x - z, x] } return [1000, -1] }, expandSelectionOnSign: function (v) { var u = this.signPosition(), w = this.selection; if (w.start < u[1] && w.end > u[0]) { if ((w.start < u[0] || w.end > u[1]) && this.value.substring(Math.max(w.start, u[0]), Math.min(w.end, u[1])).match(/^\s*$/)) { if (w.start < u[0]) { this.setSelection(w.start, u[0], v) } else { this.setSelection(u[1], w.end, v) } } else { this.setSelection(Math.min(w.start, u[0]), Math.max(w.end, u[1]), v) } } }, checkPaste: function () { if (this.valuePartsBeforePaste !== undefined) { var v = this.getBeforeAfter(), u = this.valuePartsBeforePaste; delete this.valuePartsBeforePaste; v[0] = v[0].substr(0, u[0].length) + s(v[0].substr(u[0].length), this.settingsClone); if (!this.setValueParts(v[0], v[1])) { this.value = u.join(""); this.setPosition(u[0].length, false) } } }, skipAllways: function (x) { var z = this.kdCode, C = this.which, u = this.ctrlKey, B = this.cmdKey, w = this.shiftKey; if (((u || B) && x.type === "keyup" && this.valuePartsBeforePaste !== undefined) || (w && z === 45)) { this.checkPaste(); return false } if ((z >= 112 && z <= 123) || (z >= 91 && z <= 93) || (z >= 9 && z <= 31) || (z < 8 && (C === 0 || C === z)) || z === 144 || z === 145 || z === 45) { return true } if ((u || B) && z === 65) { return true } if ((u || B) && (z === 67 || z === 86 || z === 88)) { if (x.type === "keydown") { this.expandSelectionOnSign() } if (z === 86 || z === 45) { if (x.type === "keydown" || x.type === "keypress") { if (this.valuePartsBeforePaste === undefined) { this.valuePartsBeforePaste = this.getBeforeAfter() } } else { this.checkPaste() } } return x.type === "keydown" || x.type === "keypress" || z === 67 } if (u || B) { return true } if (z === 37 || z === 39) { var v = this.settingsClone.aSep, y = this.selection.start, A = this.that.value; if (x.type === "keydown" && v && !this.shiftKey) { if (z === 37 && A.charAt(y - 2) === v) { this.setPosition(y - 1) } else { if (z === 39 && A.charAt(y + 1) === v) { this.setPosition(y + 1) } } } return true } if (z >= 34 && z <= 40) { return true } return false }, processAllways: function () { var u; if (this.kdCode === 8 || this.kdCode === 46) { if (!this.selection.length) { u = this.getBeforeAfterStriped(); if (this.kdCode === 8) { u[0] = u[0].substring(0, u[0].length - 1) } else { u[1] = u[1].substring(1, u[1].length) } this.setValueParts(u[0], u[1]) } else { this.expandSelectionOnSign(false); u = this.getBeforeAfterStriped(); this.setValueParts(u[0], u[1]) } return true } return false }, processKeypress: function () { var w = this.settingsClone, v = String.fromCharCode(this.which), x = this.getBeforeAfterStriped(), u = x[0], y = x[1]; if (v === w.aDec || (w.altDec && v === w.altDec) || ((v === "." || v === ",") && this.kdCode === 110)) { if (!w.mDec || !w.aDec) { return true } if (w.aNeg && y.indexOf(w.aNeg) > -1) { return true } if (u.indexOf(w.aDec) > -1) { return true } if (y.indexOf(w.aDec) > 0) { return true } if (y.indexOf(w.aDec) === 0) { y = y.substr(1) } this.setValueParts(u + w.aDec, y); return true } if (v === "-" || v === "+") { if (!w.aNeg) { return true } if (u === "" && y.indexOf(w.aNeg) > -1) { u = w.aNeg; y = y.substring(1, y.length) } if (u.charAt(0) === w.aNeg) { u = u.substring(1, u.length) } else { u = (v === "-") ? w.aNeg + u : u } this.setValueParts(u, y); return true } if (v >= "0" && v <= "9") { if (w.aNeg && u === "" && y.indexOf(w.aNeg) > -1) { u = w.aNeg; y = y.substring(1, y.length) } if (w.vMax <= 0 && w.vMin < w.vMax && this.value.indexOf(w.aNeg) === -1 && v !== "0") { u = w.aNeg + u } this.setValueParts(u + v, y); return true } return true }, formatQuick: function () { var z = this.settingsClone, A = this.getBeforeAfterStriped(), D = this.value; if ((z.aSep === "" || (z.aSep !== "" && D.indexOf(z.aSep) === -1)) && (z.aSign === "" || (z.aSign !== "" && D.indexOf(z.aSign) === -1))) { var C = [], u = ""; C = D.split(z.aDec); if (C[0].indexOf("-") > -1) { u = "-"; C[0] = C[0].replace("-", ""); A[0] = A[0].replace("-", "") } if (C[0].length > z.mInt && A[0].charAt(0) === "0") { A[0] = A[0].slice(1) } A[0] = u + A[0] } var v = r(this.value, this.settingsClone), y = v.length; if (v) { var E = A[0].split(""), B = 0; for (B; B < E.length; B += 1) { if (!E[B].match("\\d")) { E[B] = "\\" + E[B] } } var w = new RegExp("^.*?" + E.join(".*?")); var x = v.match(w); if (x) { y = x[0].length; if (((y === 0 && v.charAt(0) !== z.aNeg) || (y === 1 && v.charAt(0) === z.aNeg)) && z.aSign && z.pSign === "p") { y = this.settingsClone.aSign.length + (v.charAt(0) === "-" ? 1 : 0) } } else { if (z.aSign && z.pSign === "s") { y -= z.aSign.length } } } this.that.value = v; this.setPosition(y); this.formatted = true } }; function f(u) { if (typeof u === "string") { u = u.replace(/\[/g, "\\[").replace(/\]/g, "\\]"); u = "#" + u.replace(/(:|\.)/g, "\\$1") } return l(u) } function n(v, u, w) { var y = v.data("autoNumeric"); if (!y) { y = {}; v.data("autoNumeric", y) } var x = y.holder; if ((x === undefined && u) || w) { x = new q(v.get(0), u); y.holder = x } return x } var i = { init: function (u) { return this.each(function () { var z = l(this), y = z.data("autoNumeric"), w = z.data(); if (typeof y !== "object") { var x = { aNum: "0123456789", aSep: ",", dGroup: "3", aDec: ".", altDec: null, aSign: "", pSign: "p", vMax: "999999999.99", vMin: "0.00", mDec: null, mRound: "S", aPad: true, nBracket: null, wEmpty: "empty", lZero: "allow", aForm: true, onSomeEvent: function () { } }; y = l.extend({}, x, w, u); if (y.aDec === y.aSep) { l.error("autoNumeric will not function properly when the decimal character aDec: '" + y.aDec + "' and thousand seperater aSep: '" + y.aSep + "' are the same character"); return this } z.data("autoNumeric", y) } else { return this } y.lastSetValue = ""; y.runOnce = false; var A = n(z, y); if (l.inArray(z.prop("tagName"), y.tagList) === -1 && z.prop("tagName") !== "INPUT") { l.error("The <" + z.prop("tagName") + "> is not supported by autoNumeric()"); return this } if (y.runOnce === false && y.aForm) { if (z.is("input[type=text], input[type=hidden], input:not([type])")) { var v = true; if (z[0].value === "" && y.wEmpty === "empty") { z[0].value = ""; v = false } if (z[0].value === "" && y.wEmpty === "sign") { z[0].value = y.aSign; v = false } if (v) { z.autoNumeric("set", z.val()) } } if (l.inArray(z.prop("tagName"), y.tagList) !== -1 && z.text() !== "") { z.autoNumeric("set", z.text()) } } y.runOnce = true; if (z.is("input[type=text], input[type=hidden], input:not([type])")) { z.on("keydown.autoNumeric", function (B) { A = n(z); if (A.settings.aDec === A.settings.aSep) { l.error("autoNumeric will not function properly when the decimal character aDec: '" + A.settings.aDec + "' and thousand seperater aSep: '" + A.settings.aSep + "' are the same character"); return this } if (A.that.readOnly) { A.processed = true; return true } A.init(B); A.settings.oEvent = "keydown"; if (A.skipAllways(B)) { A.processed = true; return true } if (A.processAllways()) { A.processed = true; A.formatQuick(); B.preventDefault(); return false } A.formatted = false; return true }); z.on("keypress.autoNumeric", function (C) { var D = n(z), B = D.processed; D.init(C); D.settings.oEvent = "keypress"; if (D.skipAllways(C)) { return true } if (B) { C.preventDefault(); return false } if (D.processAllways() || D.processKeypress()) { D.formatQuick(); C.preventDefault(); return false } D.formatted = false }); z.on("keyup.autoNumeric", function (B) { var C = n(z); C.init(B); C.settings.oEvent = "keyup"; var D = C.skipAllways(B); C.kdCode = 0; delete C.valuePartsBeforePaste; if (z[0].value === C.settings.aSign) { if (C.settings.pSign === "s") { g(this, 0, 0) } else { g(this, C.settings.aSign.length, C.settings.aSign.length) } } if (D) { return true } if (this.value === "") { return true } if (!C.formatted) { C.formatQuick() } }); z.on("focusin.autoNumeric", function () { var C = n(z); C.settingsClone.oEvent = "focusin"; if (C.settingsClone.nBracket !== null) { var B = z.val(); z.val(p(B, C.settingsClone.nBracket, C.settingsClone.oEvent)) } C.inVal = z.val(); var D = t(C.inVal, C.settingsClone, true); if (D !== null) { z.val(D); if (C.settings.pSign === "s") { g(this, 0, 0) } else { g(this, C.settings.aSign.length, C.settings.aSign.length) } } }); z.on("focusout.autoNumeric", function () { var F = n(z), B = F.settingsClone, E = z.val(), G = E; F.settingsClone.oEvent = "focusout"; var D = ""; if (B.lZero === "allow") { B.allowLeading = false; D = "leading" } if (E !== "") { E = s(E, B, D); if (t(E, B) === null && o(E, B, z[0])) { E = h(E, B.aDec, B.aNeg); E = a(E, B); E = d(E, B.aDec, B.aNeg) } else { E = "" } } var C = t(E, B, false); if (C === null) { C = r(E, B) } if (C !== G) { z.val(C) } if (C !== F.inVal) { z.change(); delete F.inVal } if (B.nBracket !== null && z.autoNumeric("get") < 0) { F.settingsClone.oEvent = "focusout"; z.val(p(z.val(), B.nBracket, B.oEvent)) } }) } }) }, destroy: function () { return l(this).each(function () { var u = l(this); u.off(".autoNumeric"); u.removeData("autoNumeric") }) }, update: function (u) { return l(this).each(function () { var v = f(l(this)), x = v.data("autoNumeric"); if (typeof x !== "object") { l.error("You must initialize autoNumeric('init', {options}) prior to calling the 'update' method"); return this } var w = v.autoNumeric("get"); x = l.extend(x, u); n(v, x, true); if (x.aDec === x.aSep) { l.error("autoNumeric will not function properly when the decimal character aDec: '" + x.aDec + "' and thousand seperater aSep: '" + x.aSep + "' are the same character"); return this } v.data("autoNumeric", x); if (v.val() !== "" || v.text() !== "") { return v.autoNumeric("set", w) } return }) }, set: function (u) { return l(this).each(function () { var v = f(l(this)), x = v.data("autoNumeric"), y = u.toString(), w = u.toString(); if (typeof x !== "object") { l.error("You must initialize autoNumeric('init', {options}) prior to calling the 'set' method"); return this } if (w === v.attr("value")) { y = y.replace(",", ".") } if (w !== v.attr("value") && x.runOnce === false) { y = s(y, x) } if (!l.isNumeric(+y)) { return "" } y = j(y, x); x.oEvent = "set"; x.lastSetValue = y; y.toString(); if (y !== "") { y = a(y, x) } y = d(y, x.aDec, x.aNeg); if (!o(y, x)) { y = a("", x) } y = r(y, x); if (v.is("input[type=text], input[type=hidden], input:not([type])")) { return v.val(y) } if (l.inArray(v.prop("tagName"), x.tagList) !== -1) { return v.text(y) } l.error("The <" + v.prop("tagName") + "> is not supported by autoNumeric()"); return false }) }, get: function () { var u = f(l(this)), v = u.data("autoNumeric"); if (typeof v !== "object") { l.error("You must initialize autoNumeric('init', {options}) prior to calling the 'get' method"); return this } v.oEvent = "get"; var w = ""; if (u.is("input[type=text], input[type=hidden], input:not([type])")) { w = u.eq(0).val() } else { if (l.inArray(u.prop("tagName"), v.tagList) !== -1) { w = u.eq(0).text() } else { l.error("The <" + u.prop("tagName") + "> is not supported by autoNumeric()"); return false } } if ((w === "" && v.wEmpty === "empty") || (w === v.aSign && (v.wEmpty === "sign" || v.wEmpty === "empty"))) { return "" } if (v.nBracket !== null && w !== "") { w = p(w, v.nBracket, v.oEvent) } if (v.runOnce || v.aForm === false) { w = s(w, v) } w = h(w, v.aDec, v.aNeg); if (+w === 0 && v.lZero !== "keep") { w = "0" } if (v.lZero === "keep") { return w } w = j(w); return w }, getString: function () { var x = false, y = f(l(this)), u = y.serialize(), z = u.split("&"), A = 0; for (A; A < z.length; A += 1) { var w = z[A].split("="); var v = l('*[name="' + decodeURIComponent(w[0]) + '"]').data("autoNumeric"); if (typeof v === "object") { if (w[1] !== null && l('*[name="' + decodeURIComponent(w[0]) + '"]').data("autoNumeric") !== undefined) { w[1] = l('input[name="' + decodeURIComponent(w[0]) + '"]').autoNumeric("get"); z[A] = w.join("="); x = true } } } if (x === true) { return z.join("&") } l.error("You must initialize autoNumeric('init', {options}) prior to calling the 'getString' method"); return this }, getArray: function () { var v = false, u = f(l(this)), w = u.serializeArray(); l.each(w, function (y, z) { var x = l('*[name="' + decodeURIComponent(z.name) + '"]').data("autoNumeric"); if (typeof x === "object") { if (z.value !== "" && l('*[name="' + decodeURIComponent(z.name) + '"]').data("autoNumeric") !== undefined) { z.value = l('input[name="' + decodeURIComponent(z.name) + '"]').autoNumeric("get").toString() } v = true } }); if (v === true) { return w } l.error("You must initialize autoNumeric('init', {options}) prior to calling the 'getArray' method"); return this }, getSettings: function () { var u = f(l(this)); return u.eq(0).data("autoNumeric") } }; l.fn.autoNumeric = function (u) { if (i[u]) { return i[u].apply(this, Array.prototype.slice.call(arguments, 1)) } if (typeof u === "object" || !u) { return i.init.apply(this, arguments) } l.error('Method "' + u + '" is not supported by autoNumeric()') } } (jQuery));
/* eslint-enable */

/* eslint-disable */
/**
 Compte à rebours
*/
(function (b) { b.extend = function (f, c) { f = f || {}; if (arguments.length > 2) { for (var e = 1; e < arguments.length; e++) { b.extend(f, arguments[e]) } } else { for (var d in c) { f[d] = c[d] } } return f }; var a = function (c) { this.conf = b.extend({ dateStart: new Date(), dateEnd: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)), selector: ".timer", msgBefore: "Be ready!", msgAfter: "It's over, sorry folks!", msgPattern: "{days} days, {hours} h {minutes}' {seconds}''", msgPatternSingle: "{days} day, {hours} h {minutes}' {seconds}''", msgPatternNoDays: "{hours} h {minutes}' {seconds}''", onStart: null, onEnd: null }, c); this.selector = $(this.conf.selector).length ? $(this.conf.selector)[0] : null; this.interval = 1000; this.now = new Date(); this.patterns = [{ pattern: "{years}", secs: 31536000 }, { pattern: "{months}", secs: 2628000 }, { pattern: "{weeks}", secs: 604800 }, { pattern: "{days}", secs: 86400 }, { pattern: "{hours}", secs: 3600 }, { pattern: "{minutes}", secs: 60 }, { pattern: "{seconds}", secs: 1}]; this.init() }; a.prototype.init = function () { this.defineInterval(); if (this.now < this.conf.dateEnd && this.now >= this.conf.dateStart) { this.run(); this.callback("start") } else { this.outOfInterval() } }; a.prototype.run = function () { var d = this.now.valueOf() / 1000; var c = this.conf.dateEnd.valueOf() / 1000; var f = Math.abs(c - d); var e = this; var g = b.setInterval(function () { f--; if (f > 0) { e.display(f) } else { b.clearInterval(g); e.outOfInterval(); e.callback("end") } }, this.interval); this.display(f) }; a.prototype.display = function (e) { var c = this.conf.msgPattern; for (var d = 0; d < this.patterns.length; d++) { var g = this.patterns[d]; if (this.conf.msgPattern.indexOf(g.pattern) !== -1) { var f = Math.floor(e / g.secs); if (g.pattern == "{days}" && f == 1) { c = this.conf.msgPatternSingle } if (g.pattern == "{days}" && f == 0) { c = this.conf.msgPatternNoDays } e -= f * g.secs; if (g.pattern != "{days}" && f < 10) { f = "0" + f } c = c.replace(g.pattern, f) } } if (this.selector) { this.selector.innerHTML = c } }; a.prototype.defineInterval = function () { for (var c = this.patterns.length; c > 0; c--) { var d = this.patterns[c - 1]; if (this.conf.msgPattern.indexOf(d.pattern) !== -1) { this.interval = d.secs * 1000; return } } }; a.prototype.outOfInterval = function () { var c = this.now < this.conf.dateStart ? this.conf.msgBefore : this.conf.msgAfter; for (var e = 0; e < this.selector.length; e++) { this.selector[e].innerHTML = c } }; a.prototype.callback = function (c) { c = c.capitalize(); if (typeof this.conf["on" + c] === "function") { this.conf["on" + c]() } if (typeof b.jQuery !== "undefined") { b.jQuery(this.conf.selector).trigger("countdown" + c) } }; String.prototype.capitalize = function () { return this.charAt(0).toUpperCase() + this.slice(1) }; b.Countdown = a } (window));
/* eslint-enable */

/* eslint-disable */
/*
* Basic jQuery Slider plug-in v.1.3  -- Slider fade ou x translation
* http://www.basic-slider.com
* Authored by John Cobb - http://www.johncobb.name
*/
(function (e) { "use strict"; e.fn.bjqs = function (t) { var n = { width: 700, height: 300, animtype: "fade", animduration: 450, animspeed: 4e3, automatic: !0, showcontrols: !0, centercontrols: !0, nexttext: "Next", prevtext: "Prev", showmarkers: !0, centermarkers: !0, keyboardnav: !0, hoverpause: !0, usecaptions: !0, randomstart: !1, responsive: !1 }, r = e.extend({}, n, t), i = this, s = i.find("ul.bjqs"), o = s.children("li"), u = null, a = null, f = null, l = null, c = null, h = null, p = null, d = null, v = { slidecount: o.length, animating: !1, paused: !1, currentslide: 1, nextslide: 0, currentindex: 0, nextindex: 0, interval: null }, m = { width: null, height: null, ratio: null }, g = { fwd: "forward", prev: "previous" }, y = function () { o.addClass("bjqs-slide"); r.responsive ? b() : E(); if (v.slidecount > 1) { r.randomstart && L(); r.showcontrols && x(); r.showmarkers && T(); r.keyboardnav && N(); r.hoverpause && r.automatic && C(); r.animtype === "slide" && S() } r.usecaptions && k(); if (r.animtype === "slide" && !r.randomstart) { v.currentindex = 1; v.currentslide = 2 } s.show(); o.eq(v.currentindex).show(); r.automatic && (v.interval = setInterval(function () { O(g.fwd, !1) }, r.animspeed)) }, b = function () { m.width = i.outerWidth(); m.ratio = m.width / r.width, m.height = r.height * m.ratio; if (r.animtype === "fade") { o.css({ height: r.height, width: "100%" }); o.children("img").css({ height: r.height, width: "100%" }); s.css({ height: r.height, width: "100%" }); i.css({ height: r.height, "max-width": r.width, position: "relative" }); if (m.width < r.width) { o.css({ height: m.height }); o.children("img").css({ height: m.height }); s.css({ height: m.height }); i.css({ height: m.height }) } e(window).resize(function () { m.width = i.outerWidth(); m.ratio = m.width / r.width, m.height = r.height * m.ratio; o.css({ height: m.height }); o.children("img").css({ height: m.height }); s.css({ height: m.height }); i.css({ height: m.height }) }) } if (r.animtype === "slide") { o.css({ height: r.height, width: r.width }); o.children("img").css({ height: r.height, width: r.width }); s.css({ height: r.height, width: r.width * r.slidecount }); i.css({ height: r.height, "max-width": r.width, position: "relative" }); if (m.width < r.width) { o.css({ height: m.height }); o.children("img").css({ height: m.height }); s.css({ height: m.height }); i.css({ height: m.height }) } e(window).resize(function () { m.width = i.outerWidth(), m.ratio = m.width / r.width, m.height = r.height * m.ratio; o.css({ height: m.height, width: m.width }); o.children("img").css({ height: m.height, width: m.width }); s.css({ height: m.height, width: m.width * r.slidecount }); i.css({ height: m.height }); h.css({ height: m.height, width: m.width }); w(function () { O(!1, v.currentslide) }, 200, "some unique string") }) } }, w = function () { var e = {}; return function (t, n, r) { r || (r = "Don't call this twice without a uniqueId"); e[r] && clearTimeout(e[r]); e[r] = setTimeout(t, n) } }(), E = function () { o.css({ height: r.height, width: r.width }); s.css({ height: r.height, width: r.width }); i.css({ height: r.height, width: r.width, position: "relative" }) }, S = function () { p = o.eq(0).clone(); d = o.eq(v.slidecount - 1).clone(); p.attr({ "data-clone": "last", "data-slide": 0 }).appendTo(s).show(); d.attr({ "data-clone": "first", "data-slide": 0 }).prependTo(s).show(); o = s.children("li"); v.slidecount = o.length; h = e('<div class="bjqs-wrapper"></div>'); if (r.responsive && m.width < r.width) { h.css({ width: m.width, height: m.height, overflow: "hidden", position: "relative" }); s.css({ width: m.width * (v.slidecount + 2), left: -m.width * v.currentslide }) } else { h.css({ width: r.width, height: r.height, overflow: "hidden", position: "relative" }); s.css({ width: r.width * (v.slidecount + 2), left: -r.width * v.currentslide }) } o.css({ "float": "left", position: "relative", display: "list-item" }); h.prependTo(i); s.appendTo(h) }, x = function () { u = e('<ul class="bjqs-controls"></ul>'); a = e('<li class="bjqs-next"><a href="#" data-direction="' + g.fwd + '">' + r.nexttext + "</a></li>"); f = e('<li class="bjqs-prev"><a href="#" data-direction="' + g.prev + '">' + r.prevtext + "</a></li>"); u.on("click", "a", function (t) { t.preventDefault(); var n = e(this).attr("data-direction"); if (!v.animating) { n === g.fwd && O(g.fwd, !1); n === g.prev && O(g.prev, !1) } }); f.appendTo(u); a.appendTo(u); u.appendTo(i); if (r.centercontrols) { u.addClass("v-centered"); var t = (i.height() - a.children("a").outerHeight()) / 2, n = t / r.height * 100, s = n + "%"; a.find("a").css("top", s); f.find("a").css("top", s) } }, T = function () { l = e('<ol class="bjqs-markers"></ol>'); e.each(o, function (t, n) { var i = t + 1, s = t + 1; r.animtype === "slide" && (s = t + 2); var o = e('<li><a href="#">' + i + "</a></li>"); i === v.currentslide && o.addClass("active-marker"); o.on("click", "a", function (e) { e.preventDefault(); !v.animating && v.currentslide !== s && O(!1, s) }); o.appendTo(l) }); l.appendTo(i); c = l.find("li"); if (r.centermarkers) { l.addClass("h-centered"); var t = (r.width - l.width()) / 2; l.css("left", t) } }, N = function () { e(document).keyup(function (e) { if (!v.paused) { clearInterval(v.interval); v.paused = !0 } if (!v.animating) if (e.keyCode === 39) { e.preventDefault(); O(g.fwd, !1) } else if (e.keyCode === 37) { e.preventDefault(); O(g.prev, !1) } if (v.paused && r.automatic) { v.interval = setInterval(function () { O(g.fwd) }, r.animspeed); v.paused = !1 } }) }, C = function () { i.hover(function () { if (!v.paused) { clearInterval(v.interval); v.paused = !0 } }, function () { if (v.paused) { v.interval = setInterval(function () { O(g.fwd, !1) }, r.animspeed); v.paused = !1 } }) }, k = function () { e.each(o, function (t, n) { var r = e(n).children("img:first-child").attr("title"); r || (r = e(n).children("a").find("img:first-child").attr("title")); if (r) { r = e('<p class="bjqs-caption">' + r + "</p>"); r.appendTo(e(n)) } }) }, L = function () { var e = Math.floor(Math.random() * v.slidecount) + 1; v.currentslide = e; v.currentindex = e - 1 }, A = function (e) { if (e === g.fwd) if (o.eq(v.currentindex).next().length) { v.nextindex = v.currentindex + 1; v.nextslide = v.currentslide + 1 } else { v.nextindex = 0; v.nextslide = 1 } else if (o.eq(v.currentindex).prev().length) { v.nextindex = v.currentindex - 1; v.nextslide = v.currentslide - 1 } else { v.nextindex = v.slidecount - 1; v.nextslide = v.slidecount } }, O = function (e, t) { if (!v.animating) { v.animating = !0; if (t) { v.nextslide = t; v.nextindex = t - 1 } else A(e); if (r.animtype === "fade") { if (r.showmarkers) { c.removeClass("active-marker"); c.eq(v.nextindex).addClass("active-marker") } o.eq(v.currentindex).fadeOut(r.animduration); o.eq(v.nextindex).fadeIn(r.animduration, function () { v.animating = !1; v.currentslide = v.nextslide; v.currentindex = v.nextindex }) } if (r.animtype === "slide") { if (r.showmarkers) { var n = v.nextindex - 1; n === v.slidecount - 2 ? n = 0 : n === -1 && (n = v.slidecount - 3); c.removeClass("active-marker"); c.eq(n).addClass("active-marker") } r.responsive && m.width < r.width ? v.slidewidth = m.width : v.slidewidth = r.width; s.animate({ left: -v.nextindex * v.slidewidth }, r.animduration, function () { v.currentslide = v.nextslide; v.currentindex = v.nextindex; if (o.eq(v.currentindex).attr("data-clone") === "last") { s.css({ left: -v.slidewidth }); v.currentslide = 2; v.currentindex = 1 } else if (o.eq(v.currentindex).attr("data-clone") === "first") { s.css({ left: -v.slidewidth * (v.slidecount - 2) }); v.currentslide = v.slidecount - 1; v.currentindex = v.slidecount - 2 } v.animating = !1 }) } } }; y() } })(jQuery);
/* eslint-enable */

/* eslint-disable */
// UAParser.js v0.7.0
// Lightweight JavaScript-based User-Agent string parser
// http://github.com/faisalman/ua-parser-js
//
// Copyright © 2012-2013 Faisalman <fyzlman@gmail.com>
// Dual licensed under GPLv2 & MIT
(function (window, undefined) { "use strict"; var EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", MAJOR = "major", MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", ARCHITECTURE = "architecture", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv"; var util = { has: function (str1, str2) { if (typeof str1 === "string") { return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1 } }, lowerize: function (str) { return str.toLowerCase() } }; var mapper = { rgx: function () { for (var result, i = 0, j, k, p, q, matches, match, args = arguments; i < args.length; i += 2) { var regex = args[i], props = args[i + 1]; if (typeof result === UNDEF_TYPE) { result = {}; for (p in props) { q = props[p]; if (typeof q === OBJ_TYPE) { result[q[0]] = undefined } else { result[q] = undefined } } } for (j = k = 0; j < regex.length; j++) { matches = regex[j].exec(this.getUA()); if (!!matches) { for (p = 0; p < props.length; p++) { match = matches[++k]; q = props[p]; if (typeof q === OBJ_TYPE && q.length > 0) { if (q.length == 2) { if (typeof q[1] == FUNC_TYPE) { result[q[0]] = q[1].call(this, match) } else { result[q[0]] = q[1] } } else if (q.length == 3) { if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) { result[q[0]] = match ? q[1].call(this, match, q[2]) : undefined } else { result[q[0]] = match ? match.replace(q[1], q[2]) : undefined } } else if (q.length == 4) { result[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined } } else { result[q] = match ? match : undefined } } break } } if (!!matches) break } return result }, str: function (str, map) { for (var i in map) { if (typeof map[i] === OBJ_TYPE && map[i].length > 0) { for (var j = 0; j < map[i].length; j++) { if (util.has(map[i][j], str)) { return i === UNKNOWN ? undefined : i } } } else if (util.has(map[i], str)) { return i === UNKNOWN ? undefined : i } } return str } }; var maps = { browser: { oldsafari: { major: { 1: ["/8", "/1", "/3"], 2: "/4", "?": "/" }, version: { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" } } }, device: { sprint: { model: { "Evo Shift 4G": "7373KT" }, vendor: { HTC: "APA", Sprint: "Sprint" } } }, os: { windows: { version: { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2000: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", RT: "ARM" } } } }; var regexes = { browser: [[/APP-([\w\s-\d]+)\/((\d+)?[\w\.]+)/i], [NAME, VERSION, MAJOR], [/(opera\smini)\/((\d+)?[\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i, /(opera).+version\/((\d+)?[\w\.]+)/i, /(opera)[\/\s]+((\d+)?[\w\.]+)/i], [NAME, VERSION, MAJOR], [/\s(opr)\/((\d+)?[\w\.]+)/i], [[NAME, "Opera"], VERSION, MAJOR], [/(kindle)\/((\d+)?[\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?((\d+)?[\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?((\d+)?[\w\.]*)/i, /(?:ms|\()(ie)\s((\d+)?[\w\.]+)/i, /(rekonq)((?:\/)[\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron)\/((\d+)?[\w\.-]+)/i], [NAME, VERSION, MAJOR], [/(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i], [[NAME, "IE"], VERSION, MAJOR], [/(yabrowser)\/((\d+)?[\w\.]+)/i], [[NAME, "Yandex"], VERSION, MAJOR], [/(comodo_dragon)\/((\d+)?[\w\.]+)/i], [[NAME, /_/g, " "], VERSION, MAJOR], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i], [NAME, VERSION, MAJOR], [/(dolfin)\/((\d+)?[\w\.]+)/i], [[NAME, "Dolphin"], VERSION, MAJOR], [/((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i], [[NAME, "Chrome"], VERSION, MAJOR], [/version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i], [VERSION, MAJOR, [NAME, "Mobile Safari"]], [/version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i], [VERSION, MAJOR, NAME], [/webkit.+?(mobile\s?safari|safari)((\/[\w\.]+))/i], [NAME, [MAJOR, mapper.str, maps.browser.oldsafari.major], [VERSION, mapper.str, maps.browser.oldsafari.version]], [/(konqueror)\/((\d+)?[\w\.]+)/i, /(webkit|khtml)\/((\d+)?[\w\.]+)/i], [NAME, VERSION, MAJOR], [/(navigator|netscape)\/((\d+)?[\w\.-]+)/i], [[NAME, "Netscape"], VERSION, MAJOR], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?((\d+)?[\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i, /(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i, /(uc\s?browser|polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i, /(links)\s\(((\d+)?[\w\.]+)/i, /(gobrowser)\/?((\d+)?[\w\.]+)*/i, /(ice\s?browser)\/v?((\d+)?[\w\._]+)/i, /(mosaic)[\/\s]((\d+)?[\w\.]+)/i], [NAME, VERSION, MAJOR], [/(apple(?:coremedia|))\/((\d+)[\w\._]+)/i, /(coremedia) v((\d+)[\w\._]+)/i], [NAME, VERSION, MAJOR], [/(aqualung|lyssna|bsplayer)\/((\d+)*[\w\.-]+)/i], [NAME, VERSION], [/(ares|ossproxy)\s((\d+)[\w\.-]+)/i], [NAME, VERSION, MAJOR], [/(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i, /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i, /(lg player|nexplayer)\s((\d+)[\d\.]+)/i, /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i], [NAME, VERSION, MAJOR], [/(nexplayer)\s((\d+)[\w\.-]+)/i], [NAME, VERSION, MAJOR], [/(flrp)\/((\d+)[\w\.-]+)/i], [[NAME, "Flip Player"], VERSION, MAJOR], [/(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i], [NAME], [/(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i], [NAME, VERSION, MAJOR], [/(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i, /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i, /(lavf)((\d+)[\d\.]+)/i], [NAME, VERSION, MAJOR], [/(htc_one_s)\/((\d+)[\d\.]+)/i], [[NAME, /_/g, " "], VERSION, MAJOR], [/(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i], [NAME, VERSION], [/(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i], [NAME, VERSION, MAJOR], [/(mplayer)/i, /(yourmuze)/i, /(media player classic|nero showtime)/i], [NAME], [/(nero (?:home|scout))\/((\d+)[\w\.-]+)/i], [NAME, VERSION, MAJOR], [/(nokia\d+)\/((\d+)[\w\.-]+)/i], [NAME, VERSION, MAJOR], [/\s(songbird)\/((\d+)[\w\.-]+)/i], [NAME, VERSION, MAJOR], [/(winamp)3 version ((\d+)[\w\.-]+)/i, /(winamp)\s((\d+)[\w\.-]+)/i, /(winamp)mpeg\/((\d+)[\w\.-]+)/i], [NAME, VERSION, MAJOR], [/(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i], [NAME], [/(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i], [NAME, VERSION, MAJOR], [/(smp)((\d+)[\d\.]+)/i], [NAME, VERSION, MAJOR], [/(vlc) media player - version ((\d+)[\w\.]+)/i, /(vlc)\/((\d+)[\w\.-]+)/i, /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i, /(foobar2000)\/((\d+)[\d\.]+)/i, /(itunes)\/((\d+)[\d\.]+)/i], [NAME, VERSION, MAJOR], [/(wmplayer)\/((\d+)[\w\.-]+)/i, /(windows-media-player)\/((\d+)[\w\.-]+)/i], [[NAME, /-/g, " "], VERSION, MAJOR], [/windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i], [VERSION, MAJOR, [NAME, "Windows"]], [/(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i], [NAME, VERSION, MAJOR], [/(rad.io)\s((\d+)[\d\.]+)/i, /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i], [[NAME, "rad.io"], VERSION, MAJOR]], cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [[ARCHITECTURE, "amd64"]], [/(ia32(?=;))/i], [[ARCHITECTURE, util.lowerize]], [/((?:i[346]|x)86)[;\)]/i], [[ARCHITECTURE, "ia32"]], [/windows\s(ce|mobile);\sppc;/i], [[ARCHITECTURE, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [[ARCHITECTURE, /ower/, "", util.lowerize]], [/(sun4\w)[;\)]/i], [[ARCHITECTURE, "sparc"]], [/(ia64(?=;)|68k(?=\))|arm(?=v\d+;)|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i], [ARCHITECTURE, util.lowerize]], device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i], [MODEL, VENDOR, [TYPE, TABLET]], [/applecoremedia\/[\w\.]+ \((ipad)/], [MODEL, [VENDOR, "Apple"], [TYPE, TABLET]], [/(apple\s{0,1}tv)/i], [[MODEL, "Apple TV"], [VENDOR, "Apple"]], [/(hp).+(touchpad)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i], [VENDOR, MODEL, [TYPE, TABLET]], [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i], [MODEL, [VENDOR, "Amazon"], [TYPE, TABLET]], [/\((ip[honed|\s\w*]+);.+(apple)/i], [MODEL, VENDOR, [TYPE, MOBILE]], [/\((ip[honed|\s\w*]+);/i], [MODEL, [VENDOR, "Apple"], [TYPE, MOBILE]], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i], [VENDOR, MODEL, [TYPE, MOBILE]], [/\((bb10);\s(\w+)/i], [[VENDOR, "BlackBerry"], MODEL, [TYPE, MOBILE]], [/android.+((transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7))/i], [[VENDOR, "Asus"], MODEL, [TYPE, TABLET]], [/(sony)\s(tablet\s[ps])/i], [VENDOR, MODEL, [TYPE, TABLET]], [/(nintendo)\s([wids3u]+)/i], [VENDOR, MODEL, [TYPE, CONSOLE]], [/((playstation)\s[3portablevi]+)/i], [[VENDOR, "Sony"], MODEL, [TYPE, CONSOLE]], [/(sprint\s(\w+))/i], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i], [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]], [/\s((milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?))[\w\s]+build\//i, /(mot)[\s-]?(\w+)*/i], [[VENDOR, "Motorola"], MODEL, [TYPE, MOBILE]], [/android.+\s((mz60\d|xoom[\s2]{0,2}))\sbuild\//i], [[VENDOR, "Motorola"], MODEL, [TYPE, TABLET]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i], [[VENDOR, "Samsung"], MODEL, [TYPE, TABLET]], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i], [[VENDOR, "Samsung"], MODEL, [TYPE, MOBILE]], [/(sie)-(\w+)*/i], [[VENDOR, "Siemens"], MODEL, [TYPE, MOBILE]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i], [[VENDOR, "Nokia"], MODEL, [TYPE, MOBILE]], [/android\s3\.[\s\w-;]{10}((a\d{3}))/i], [[VENDOR, "Acer"], MODEL, [TYPE, TABLET]], [/android\s3\.[\s\w-;]{10}(lg?)-([06cv9]{3,4})/i], [[VENDOR, "LG"], MODEL, [TYPE, TABLET]], [/((nexus\s[45]))/i, /(lg)[e;\s-\/]+(\w+)*/i], [[VENDOR, "LG"], MODEL, [TYPE, MOBILE]], [/android.+((ideatab[a-z0-9\-\s]+))/i], [[VENDOR, "Lenovo"], MODEL, [TYPE, TABLET]], [/(lg) netcast\.tv/i], [VENDOR, [TYPE, SMARTTV]], [/(mobile|tablet);.+rv\:.+gecko\//i], [TYPE, VENDOR, MODEL]], engine: [[/APP-([\w\s-\d]+)\/((\d+)?[\w\.]+)/i], [[NAME, "Mobile-App"], VERSION], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [NAME, VERSION], [/rv\:([\w\.]+).*(gecko)/i], [VERSION, NAME]], os: [[/microsoft\s(windows)\s(vista|xp)/i], [NAME, VERSION], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[NAME, "Windows"], [VERSION, mapper.str, maps.os.windows.version]], [/\((bb)(10);/i], [[NAME, "BlackBerry"], VERSION], [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)\/([\w\.]+)/i, /(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego)[\/\s-]?([\w\.]+)*/i], [NAME, VERSION], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i], [[NAME, "Symbian"], VERSION], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[NAME, "Firefox OS"], VERSION], [/(nintendo|playstation)\s([wids3portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i], [NAME, VERSION], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[NAME, "Chromium OS"], VERSION], [/(sunos)\s?([\w\.]+\d)*/i], [[NAME, "Solaris"], VERSION], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i], [NAME, VERSION], [/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i], [[NAME, "iOS"], [VERSION, /_/g, "."]], [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i], [NAME, [VERSION, /_/g, "."]], [/(haiku)\s(\w+)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(macintosh|mac(?=_powerpc)|plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos)/i, /(unix)\s?([\w\.]+)*/i], [NAME, VERSION]] }; var UAParser = function (uastring) { var ua = uastring || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY); if (!(this instanceof UAParser)) { return new UAParser(uastring).getResult() } this.getBrowser = function () { return mapper.rgx.apply(this, regexes.browser) }; this.getCPU = function () { return mapper.rgx.apply(this, regexes.cpu) }; this.getDevice = function () { return mapper.rgx.apply(this, regexes.device) }; this.getEngine = function () { return mapper.rgx.apply(this, regexes.engine) }; this.getOS = function () { return mapper.rgx.apply(this, regexes.os) }; this.getResult = function () { return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() } }; this.getUA = function () { return ua }; this.setUA = function (uastring) { ua = uastring; return this }; this.setUA(ua) }; if (typeof exports !== UNDEF_TYPE) { if (typeof module !== UNDEF_TYPE && module.exports) { exports = module.exports = UAParser } exports.UAParser = UAParser } else { window.UAParser = UAParser; if (typeof define === FUNC_TYPE && define.amd) { define(function () { return UAParser }) } if (typeof window.jQuery !== UNDEF_TYPE) { var $ = window.jQuery; var parser = new UAParser; $.ua = parser.getResult(); $.ua.get = function () { return parser.getUA() }; $.ua.set = function (uastring) { parser.setUA(uastring); var result = parser.getResult(); for (var prop in result) { $.ua[prop] = result[prop] } } } } })(this);
/* eslint-enable */

/* eslint-disable */
/*!
 * jCarouselLite - v1.0.1
 * http://www.gmarwaha.com/jquery/jcarousellite/
 * Copyright (c) 2014 Ganeshji Marwaha
 * Licensed MIT (http://github.com/ganeshmax/jcarousellite/blob/master/LICENSE)
*/
(function ($) { $.fn.jCarouselLite = function (o) { o = $.extend({ btnPrev: null, btnNext: null, btnGo: null, mouseWheel: false, auto: null, speed: 200, easing: null, vertical: false, circular: true, visible: 3, start: 0, scroll: 1, beforeStart: null, afterEnd: null }, o || {}); return this.each(function () { var b = false, animCss = o.vertical ? "top" : "left", sizeCss = o.vertical ? "height" : "width"; var c = $(this), ul = $("ul", c), tLi = $("li", ul), tl = tLi.size(), v = o.visible; if (o.circular) { ul.prepend(tLi.slice(tl - v - 1 + 1).clone()).append(tLi.slice(0, v).clone()); o.start += v } var f = $("li", ul), itemLength = f.size(), curr = o.start; c.css("visibility", "visible"); f.css({ overflow: "hidden", float: o.vertical ? "none" : "left" }); ul.css({ margin: "0", padding: "0", position: "relative", "list-style-type": "none", "z-index": "1" }); c.css({ overflow: "hidden", position: "relative", "z-index": "2", left: "0px" }); var g = o.vertical ? height(f) : width(f); var h = g * itemLength; var j = g * v; f.css({ width: f.width(), height: f.height() }); ul.css(sizeCss, h + "px").css(animCss, -(curr * g)); c.css(sizeCss, j + "px"); if (o.btnPrev) $(o.btnPrev).click(function () { return go(curr - o.scroll) }); if (o.btnNext) $(o.btnNext).click(function () { return go(curr + o.scroll) }); if (o.btnGo) $.each(o.btnGo, function (i, a) { $(a).click(function () { return go(o.circular ? o.visible + i : i) }) }); if (o.mouseWheel && c.mousewheel) c.mousewheel(function (e, d) { return d > 0 ? go(curr - o.scroll) : go(curr + o.scroll) }); if (o.auto) setInterval(function () { go(curr + o.scroll) }, o.auto + o.speed); function vis() { return f.slice(curr).slice(0, v) }; function go(a) { if (!b) { if (o.beforeStart) o.beforeStart.call(this, vis()); if (o.circular) { if (a <= o.start - v - 1) { ul.css(animCss, -((itemLength - (v * 2)) * g) + "px"); curr = a == o.start - v - 1 ? itemLength - (v * 2) - 1 : itemLength - (v * 2) - o.scroll } else if (a >= itemLength - v + 1) { ul.css(animCss, -((v) * g) + "px"); curr = a == itemLength - v + 1 ? v + 1 : v + o.scroll } else curr = a } else { if (a < 0 || a > itemLength - v) return; else curr = a } b = true; ul.animate(animCss == "left" ? { left: -(curr * g) } : { top: -(curr * g) }, o.speed, o.easing, function () { if (o.afterEnd) o.afterEnd.call(this, vis()); b = false }); if (!o.circular) { $(o.btnPrev + "," + o.btnNext).removeClass("disabled"); $((curr - o.scroll < 0 && o.btnPrev) || (curr + o.scroll > itemLength - v && o.btnNext) || []).addClass("disabled") } } return false } }) }; function css(a, b) { return parseInt($.css(a[0], b)) || 0 }; function width(a) { return a[0].offsetWidth + css(a, 'marginLeft') + css(a, 'marginRight') }; function height(a) { return a[0].offsetHeight + css(a, 'marginTop') + css(a, 'marginBottom') } })(jQuery);
/* eslint-enable */

/* eslint-disable */
/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
/**
 * Version modifiée pour cause de bug sous FF car plug-in plus maintenu.
 * https://github.com/digitalBush/jquery.maskedinput/issues/275
 * https://github.com/vikmind/jquery.maskedinput/blob/8e9755256b0fa6f1dc1786d0ac26f220a07f0af5/dist/jquery.maskedinput.js
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){var t,n=navigator.userAgent,a=/iphone/i.test(n),i=/chrome/i.test(n),r=/android/i.test(n);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;return 0===this.length||this.is(":hidden")||this.get(0)!==document.activeElement?void 0:"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(n,o){var c,l,u,f,s,h,g,m;if(!n&&this.length>0){c=e(this[0]);var d=c.data(e.mask.dataName);return d?d():void 0}return o=e.extend({autoclear:e.mask.autoclear,placeholder:e.mask.placeholder,completed:null},o),l=e.mask.definitions,u=[],f=g=n.length,s=null,n=String(n),e.each(n.split(""),function(e,t){"?"==t?(g--,f=e):l[t]?(u.push(new RegExp(l[t])),null===s&&(s=u.length-1),f>e&&(h=u.length-1)):u.push(null)}),this.trigger("unmask").each(function(){function c(){if(o.completed){for(var e=s;h>=e;e++)if(u[e]&&C[e]===d(e))return;o.completed.call(E)}}function d(e){return e<o.placeholder.length?o.placeholder.charAt(e):o.placeholder.charAt(0)}function p(e){for(;++e<g&&!u[e];);return e}function v(e){for(;--e>=0&&!u[e];);return e}function b(e,t){var n,a;if(!(0>e)){for(n=e,a=p(t);g>n;n++)if(u[n]){if(!(g>a&&u[n].test(C[a])))break;C[n]=C[a],C[a]=d(a),a=p(a)}w(),E.caret(Math.max(s,e))}}function k(e){var t,n,a,i;for(t=e,n=d(e);g>t;t++)if(u[t]){if(a=p(t),i=C[t],C[t]=n,!(g>a&&u[a].test(i)))break;n=i}}function y(e){var t=E.val(),n=E.caret();if(m&&m.length&&m.length>t.length){for(T(!0);n.begin>0&&!u[n.begin-1];)n.begin--;if(0===n.begin)for(;n.begin<s&&!u[n.begin];)n.begin++;E.caret(n.begin,n.begin)}else{var a=(T(!0),t.charAt(n.begin));n.begin<g&&(u[n.begin]?u[n.begin].test(a)&&n.begin++:(n.begin++,u[n.begin].test(a)&&n.begin++)),E.caret(n.begin,n.begin)}c()}function x(e){T(),E.val()!=N&&E.change()}function j(e){var t={home:35,end:36,left:37,right:39},n=!1;for(sk in t)if(t.hasOwnProperty(sk)&&t[sk]===e){n=!0;break}return n}function A(e){if(!E.prop("readonly")){var t,n,i,r=e.which||e.keyCode;m=E.val(),8===r||46===r||a&&127===r?(t=E.caret(),n=t.begin,i=t.end,i-n===0&&(n=46!==r?v(n):i=p(n-1),i=46===r?p(i):i),S(n,i),b(n,i-1),e.preventDefault()):13===r?x.call(this,e):27===r&&(E.val(N),E.caret(0,T()),e.preventDefault())}}function R(t){if(!E.prop("readonly")){var n,a,i,o=t.which||t.keyCode,l=E.caret();if(!(t.ctrlKey||t.altKey||t.metaKey||32>o||j(o))&&o&&13!==o){if(l.end-l.begin!==0&&(S(l.begin,l.end),b(l.begin,l.end-1)),n=p(l.begin-1),g>n&&(a=String.fromCharCode(o),u[n].test(a))){if(k(n),C[n]=a,w(),i=p(n),r){var f=function(){e.proxy(e.fn.caret,E,i)()};setTimeout(f,0)}else E.caret(i);l.begin<=h&&c()}t.preventDefault()}}}function S(e,t){var n;for(n=e;t>n&&g>n;n++)u[n]&&(C[n]=d(n))}function w(){E.val(C.join(""))}function T(e){var t,n,a,i=E.val(),r=-1;for(t=0,a=0;g>t;t++)if(u[t]){for(C[t]=d(t);a++<i.length;)if(n=i.charAt(a-1),u[t].test(n)){C[t]=n,r=t;break}if(a>i.length){S(t+1,g);break}}else C[t]===i.charAt(a)&&a++,f>t&&(r=t);return e?w():f>r+1?o.autoclear||C.join("")===D?(E.val()&&E.val(""),S(0,g)):w():(w(),E.val(E.val().substring(0,r+1))),f?t:s}var E=e(this),C=e.map(n.split(""),function(e,t){return"?"!=e?l[e]?d(t):e:void 0}),D=C.join(""),N=E.val();E.data(e.mask.dataName,function(){return e.map(C,function(e,t){return u[t]&&e!=d(t)?e:null}).join("")}),E.one("unmask",function(){E.off(".mask").removeData(e.mask.dataName)}).on("focus.mask",function(){if(!E.prop("readonly")){clearTimeout(t);var e;N=E.val(),e=T(),t=setTimeout(function(){E.get(0)===document.activeElement&&(w(),e==n.replace("?","").length?E.caret(0,e):E.caret(e))},10)}}).on("blur.mask",x).on("keydown.mask",A).on("keypress.mask",R).on("input.mask paste.mask",function(){E.prop("readonly")||setTimeout(function(){var e=T(!0);E.caret(e),c()},0)}),i&&r&&E.off("input.mask").on("input.mask",y),T()})}})});
/* eslint-enable */

/* eslint-disable */
/* ============================================================================
 * jquery.clearsearch.js v1.0.3
 * https://github.com/waslos/jquery-clearsearch
 * ============================================================================
 * Copyright (c) 2012, Was los.de GmbH & Co. KG
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the "Was los.de GmbH & Co. KG" nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 * ========================================================================= */
!function(e){e.fn.clearSearch=function(t){var a=e.extend({clearClass:"clear_input",focusAfterClear:!0,linkText:"&times;"},t);return this.each(function(){function t(){i.val("").change(),n(),a.focusAfterClear&&i.focus(),"function"==typeof a.callback&&a.callback()}function n(){c()?l.show():l.hide(),s()}function c(){return i.val().replace(/^\s+|\s+$/g,"").length>0}function s(){var e=i.outerWidth(),t=i.outerHeight();l.css({top:t/2-l.height()/2,left:e-t/2-l.height()/2})}var l,i=e(this),r=a.clearClass+"_div";i.parent().hasClass(r)||(i.wrap('<div style="position: relative;" class="'+r+'">'+i.html()+"</div>"),i.after('<a style="position: absolute; cursor: pointer;" class="'+a.clearClass+'">'+a.linkText+"</a>")),l=i.next(),l.on("click",t),i.on("keyup keydown change focus",n),n()})}}(jQuery);
/* eslint-enable */

/**
 Gestion du téléchargement de zip
*/
(function ($) {
    $.fn.zipServiceClient = function (options) {
        var $this = this;
        var settings = $.extend({ rootURI: '', documents: '', autoOpen: false, callback: { progress: '', done: '', error: '' } }, options);

        $this.click(function (e) {
            e.preventDefault();

            $.ajax({
                url: settings.rootURI + 'api/GetArchive/GetArchives',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: { ids: settings.documents }
            }).done(function (pathZip) {
                if (settings.autoOpen) {
                    window.open(pathZip, '_blank', null);
                }

                if (settings.callback.done !== ''
                    && window[settings.callback.done] !== 'undefined') {
                    window[settings.callback.done]();
                }
            }).error(function (xhr, textStatus, errorThrown) {
                if (settings.callback.error !== ''
                    && window[settings.callback.error] !== 'undefined') {
                    window[settings.callback.error]();
                }
            }).progress(function () {
                if (settings.callback.progress !== ''
                    && window[settings.callback.progress] !== 'undefined') {
                    window[settings.callback.progress]();
                }
            });
        });
    };
})(jQuery);

(function ($) {
    // list of all events this will wrap
    var events = ['initializeRequest', 'beginRequest', 'endRequest', 'pageLoading', 'pageLoaded'];

    $.each(events, function (i, name) {
        // make a new camel-cased public 'atlas*' name for the event
        var mappedName = 'prm' + name.substring(0, 1).toUpperCase() + name.substring(1),
            // build a callback for PageRequestManager's event
            handler = function (sender, args) {
                $('body').trigger(mappedName, { sender: sender, args: args });
            };

        // Whenever the atlas* event is first bound or last unbound,
        // set up the callback with the PageRequestManager's version of the event
        $.event.special[mappedName] = {
            setup: function () {
                requestManage('add_' + name, handler);
            },
            teardown: function () {
                requestManage('remove_' + name, handler);
            }
        };

        // also build a shortcut jquery plugin method for the event
        $.fn[mappedName] = function (fn) {
            return fn ? this.bind(mappedName, fn) : this.trigger(mappedName);
        };
    });

    /**
     * Calls a given event-handling setup method on the PageRequestManager
     * if there currently is one.  Rewrites self to save performance on subsequent
     * calls.
     * @param {String} method The name of the method to call on the PageRequestManager
     * @param {Function} handler callback to pass as arg to the method
     */
    var requestManage = function (method, handler) {
        var prm = 'Sys' in window && 'WebForms' in window.Sys &&
                'PageRequestManager' in window.Sys.WebForms ?
                Sys.WebForms.PageRequestManager.getInstance() : null,
           bind = function (method, handler) {
               if (prm !== null) {
                   prm[method](handler);
               }
           };

        // go ahead and bind 
        bind(method, handler);
        // reassign this function for subsequent calls,
        // to not unnecessarily rebuild bind and prm items
        // this creates a closure over the current prm and bind
        requestManage = function (method, handler) {
            bind(method, handler);
        };
    };

    var eto_update_panel_events = ['RequestEnd', 'RequestStart'];

    $.each(eto_update_panel_events, function (i, name) {
        // make a new camel-cased public 'atlas*' name for the event
        var mappedName = 'eup' + name.substring(0, 1).toUpperCase() + name.substring(1),
            // build a callback for PageRequestManager's event
            handler = function (update_panel) {
                $('body').trigger(mappedName,  [update_panel] );
            };

        // Whenever the atlas* event is first bound or last unbound,
        // set up the callback with the PageRequestManager's version of the event
        $.event.special[mappedName] = {
            setup: function () {
                requestManageEUP('Add' + name, handler);
            }
        };

        // also build a shortcut jquery plugin method for the event
        $.fn[mappedName] = function (fn) {
            return fn ? this.bind(mappedName, fn) : this.trigger(mappedName);
        };
    });

    var requestManageEUP = function (method, handler) {
        var prm = '$EtoUpdatePanel' in window ?
                $EtoUpdatePanel : null,
           bind = function (method, handler) {
               if (prm !== null) {
                   prm[method](handler);
               }
           };

        // go ahead and bind 
        bind(method, handler);
        // reassign this function for subsequent calls,
        // to not unnecessarily rebuild bind and prm items
        // this creates a closure over the current prm and bind
        requestManageEUP = function (method, handler) {
            bind(method, handler);
        };
    };
})(jQuery);

/* eslint-disable */
/*
A simple jQuery function that can add listeners on attribute change.
http://meetselva.github.io/attrchange/

About License:
Copyright (C) 2013-2014 Selvakumar Arumugam
You may use attrchange plugin under the terms of the MIT License.
http://github.com/meetselva/attrchange/blob/master/MIT-License.txt
 */
!function (t) { function a() { var t = document.createElement("p"), a = !1; if (t.addEventListener) t.addEventListener("DOMAttrModified", function () { a = !0 }, !1); else { if (!t.attachEvent) return !1; t.attachEvent("onDOMAttrModified", function () { a = !0 }) } return t.setAttribute("id", "target"), a } function e(a, e) { if (a) { var n = this.data("attr-old-value"); if (e.attributeName.indexOf("style") >= 0) { n.style || (n.style = {}); var r = e.attributeName.split("."); e.attributeName = r[0], e.oldValue = n.style[r[1]], e.newValue = r[1] + ":" + this.prop("style")[t.camelCase(r[1])], n.style[r[1]] = e.newValue } else e.oldValue = n[e.attributeName], e.newValue = this.attr(e.attributeName), n[e.attributeName] = e.newValue; this.data("attr-old-value", n) } } var n = window.MutationObserver || window.WebKitMutationObserver; t.fn.attrchange = function (r, i) { if ("object" == typeof r) { var c = { trackValues: !1, callback: t.noop }; if ("function" == typeof r ? c.callback = r : t.extend(c, r), c.trackValues && this.each(function (a, e) { for (var n, r = {}, a = 0, i = e.attributes, c = i.length; c > a; a++) n = i.item(a), r[n.nodeName] = n.value; t(this).data("attr-old-value", r) }), n) { var o = { subtree: !1, attributes: !0, attributeOldValue: c.trackValues }, s = new n(function (a) { a.forEach(function (a) { var e = a.target; c.trackValues && (a.newValue = t(e).attr(a.attributeName)), "connected" === t(e).data("attrchange-status") && c.callback.call(e, a) }) }); return this.data("attrchange-method", "Mutation Observer").data("attrchange-status", "connected").data("attrchange-obs", s).each(function () { s.observe(this, o) }) } return a() ? this.data("attrchange-method", "DOMAttrModified").data("attrchange-status", "connected").on("DOMAttrModified", function (a) { a.originalEvent && (a = a.originalEvent), a.attributeName = a.attrName, a.oldValue = a.prevValue, "connected" === t(this).data("attrchange-status") && c.callback.call(this, a) }) : "onpropertychange" in document.body ? this.data("attrchange-method", "propertychange").data("attrchange-status", "connected").on("propertychange", function (a) { a.attributeName = window.event.propertyName, e.call(t(this), c.trackValues, a), "connected" === t(this).data("attrchange-status") && c.callback.call(this, a) }) : this } return "string" == typeof r && t.fn.attrchange.hasOwnProperty("extensions") && t.fn.attrchange.extensions.hasOwnProperty(r) ? t.fn.attrchange.extensions[r].call(this, i) : void 0 } }(jQuery);
/* eslint-enable */

/* eslint-disable */
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.5.9
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!function (a) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery) }(function (a) {
    "use strict"; var b = window.Slick || {}; b = function () { function c(c, d) { var f, e = this; e.defaults = { accessibility: !0, adaptiveHeight: !1, appendArrows: a(c), appendDots: a(c), arrows: !0, asNavFor: null, prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>', nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function (a, b) { return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (b + 1) + "</button>" }, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, useTransform: !1, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3 }, e.initials = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1 }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.hidden = "hidden", e.paused = !1, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, f, d), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0), e.checkResponsive(!0) } var b = 0; return c }(), b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) { var e = this; if ("boolean" == typeof c) d = c, c = null; else if (0 > c || c >= e.slideCount) return !1; e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function (b, c) { a(c).attr("data-slick-index", b) }), e.$slidesCache = e.$slides, e.reinit() }, b.prototype.animateHeight = function () { var a = this; if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) { var b = a.$slides.eq(a.currentSlide).outerHeight(!0); a.$list.animate({ height: b }, a.options.speed) } }, b.prototype.animateSlide = function (b, c) { var d = {}, e = this; e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({ left: b }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({ top: b }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({ animStart: e.currentLeft }).animate({ animStart: b }, { duration: e.options.speed, easing: e.options.easing, step: function (a) { a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d)) }, complete: function () { c && c.call() } })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () { e.disableTransition(), c.call() }, e.options.speed)) }, b.prototype.asNavFor = function (b) { var c = this, d = c.options.asNavFor; d && null !== d && (d = a(d).not(c.$slider)), null !== d && "object" == typeof d && d.each(function () { var c = a(this).slick("getSlick"); c.unslicked || c.slideHandler(b, !0) }) }, b.prototype.applyTransition = function (a) { var b = this, c = {}; b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c) }, b.prototype.autoPlay = function () { var a = this; a.autoPlayTimer && clearInterval(a.autoPlayTimer), a.slideCount > a.options.slidesToShow && a.paused !== !0 && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed)) }, b.prototype.autoPlayClear = function () { var a = this; a.autoPlayTimer && clearInterval(a.autoPlayTimer) }, b.prototype.autoPlayIterator = function () { var a = this; a.options.infinite === !1 ? 1 === a.direction ? (a.currentSlide + 1 === a.slideCount - 1 && (a.direction = 0), a.slideHandler(a.currentSlide + a.options.slidesToScroll)) : (a.currentSlide - 1 === 0 && (a.direction = 1), a.slideHandler(a.currentSlide - a.options.slidesToScroll)) : a.slideHandler(a.currentSlide + a.options.slidesToScroll) }, b.prototype.buildArrows = function () { var b = this; b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" })) }, b.prototype.buildDots = function () { var c, d, b = this; if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) { for (d = '<ul class="' + b.options.dotsClass + '">', c = 0; c <= b.getDotCount() ; c += 1) d += "<li>" + b.options.customPaging.call(this, b, c) + "</li>"; d += "</ul>", b.$dots = a(d).appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false") } }, b.prototype.buildOut = function () { var b = this; b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function (b, c) { a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "") }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable") }, b.prototype.buildRows = function () { var b, c, d, e, f, g, h, a = this; if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) { for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) { var i = document.createElement("div"); for (c = 0; c < a.options.rows; c++) { var j = document.createElement("div"); for (d = 0; d < a.options.slidesPerRow; d++) { var k = b * h + (c * a.options.slidesPerRow + d); g.get(k) && j.appendChild(g.get(k)) } i.appendChild(j) } e.appendChild(i) } a.$slider.html(e), a.$slider.children().children().children().css({ width: 100 / a.options.slidesPerRow + "%", display: "inline-block" }) } }, b.prototype.checkResponsive = function (b, c) { var e, f, g, d = this, h = !1, i = d.$slider.width(), j = window.innerWidth || a(window).width(); if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) { f = null; for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e])); null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h]) } }, b.prototype.changeSlide = function (b, c) { var f, g, h, d = this, e = a(b.target); switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) { case "previous": g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c); break; case "next": g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c); break; case "index": var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll; d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus"); break; default: return } }, b.prototype.checkNavigable = function (a) { var c, d, b = this; if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1]; else for (var e in c) { if (a < c[e]) { a = d; break } d = c[e] } return a }, b.prototype.cleanUpEvents = function () { var b = this; b.options.dots && null !== b.$dots && (a("li", b.$dots).off("click.slick", b.changeSlide), b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).off("mouseenter.slick", a.proxy(b.setPaused, b, !0)).off("mouseleave.slick", a.proxy(b.setPaused, b, !1))), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.$list.off("mouseenter.slick", a.proxy(b.setPaused, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.setPaused, b, !1)), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition) }, b.prototype.cleanUpRows = function () { var b, a = this; a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.html(b)) }, b.prototype.clickHandler = function (a) { var b = this; b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault()) }, b.prototype.destroy = function (b) { var c = this; c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () { a(this).attr("style", a(this).data("originalStyling")) }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c]) }, b.prototype.disableTransition = function (a) { var b = this, c = {}; c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c) }, b.prototype.fadeSlide = function (a, b) { var c = this; c.cssTransitions === !1 ? (c.$slides.eq(a).css({ zIndex: c.options.zIndex }), c.$slides.eq(a).animate({ opacity: 1 }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({ opacity: 1, zIndex: c.options.zIndex }), b && setTimeout(function () { c.disableTransition(a), b.call() }, c.options.speed)) }, b.prototype.fadeSlideOut = function (a) { var b = this; b.cssTransitions === !1 ? b.$slides.eq(a).animate({ opacity: 0, zIndex: b.options.zIndex - 2 }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({ opacity: 0, zIndex: b.options.zIndex - 2 })) }, b.prototype.filterSlides = b.prototype.slickFilter = function (a) { var b = this; null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit()) }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () { var a = this; return a.currentSlide }, b.prototype.getDotCount = function () { var a = this, b = 0, c = 0, d = 0; if (a.options.infinite === !0) for (; b < a.slideCount;)++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow; else if (a.options.centerMode === !0) d = a.slideCount; else for (; b < a.slideCount;)++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow; return d - 1 }, b.prototype.getLeft = function (a) { var c, d, f, b = this, e = 0; return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c }, b.prototype.getOption = b.prototype.slickGetOption = function (a) { var b = this; return b.options[a] }, b.prototype.getNavigableIndexes = function () { var e, a = this, b = 0, c = 0, d = []; for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount) ; e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow; return d }, b.prototype.getSlick = function () { return this }, b.prototype.getSlideCount = function () { var c, d, e, b = this; return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function (c, f) { return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0 }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll }, b.prototype.goTo = b.prototype.slickGoTo = function (a, b) { var c = this; c.changeSlide({ data: { message: "index", index: parseInt(a) } }, b) }, b.prototype.init = function (b) { var c = this; a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA() }, b.prototype.initArrowEvents = function () { var a = this; a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.on("click.slick", { message: "previous" }, a.changeSlide), a.$nextArrow.on("click.slick", { message: "next" }, a.changeSlide)) }, b.prototype.initDotEvents = function () { var b = this; b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", { message: "index" }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.setPaused, b, !0)).on("mouseleave.slick", a.proxy(b.setPaused, b, !1)) }, b.prototype.initializeEvents = function () { var b = this; b.initArrowEvents(), b.initDotEvents(), b.$list.on("touchstart.slick mousedown.slick", { action: "start" }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", { action: "move" }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", { action: "end" }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.$list.on("mouseenter.slick", a.proxy(b.setPaused, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.setPaused, b, !1)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition) }, b.prototype.initUI = function () { var a = this; a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show(), a.options.autoplay === !0 && a.autoPlay() }, b.prototype.keyHandler = function (a) { var b = this; a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({ data: { message: "previous" } }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({ data: { message: "next" } })) }, b.prototype.lazyLoad = function () { function g(b) { a("img[data-lazy]", b).each(function () { var b = a(this), c = a(this).attr("data-lazy"), d = document.createElement("img"); d.onload = function () { b.animate({ opacity: 0 }, 100, function () { b.attr("src", c).animate({ opacity: 1 }, 200, function () { b.removeAttr("data-lazy").removeClass("slick-loading") }) }) }, d.src = c }) } var c, d, e, f, b = this; b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = e + b.options.slidesToShow, b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d)) }, b.prototype.loadSlider = function () { var a = this; a.setPosition(), a.$slideTrack.css({ opacity: 1 }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad() }, b.prototype.next = b.prototype.slickNext = function () { var a = this; a.changeSlide({ data: { message: "next" } }) }, b.prototype.orientationChange = function () { var a = this; a.checkResponsive(), a.setPosition() }, b.prototype.pause = b.prototype.slickPause = function () { var a = this; a.autoPlayClear(), a.paused = !0 }, b.prototype.play = b.prototype.slickPlay = function () { var a = this; a.paused = !1, a.autoPlay() }, b.prototype.postSlide = function (a) { var b = this; b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay === !0 && b.paused === !1 && b.autoPlay(), b.options.accessibility === !0 && b.initADA() }, b.prototype.prev = b.prototype.slickPrev = function () { var a = this; a.changeSlide({ data: { message: "previous" } }) }, b.prototype.preventDefault = function (a) { a.preventDefault() }, b.prototype.progressiveLazyLoad = function () { var c, d, b = this; c = a("img[data-lazy]", b.$slider).length, c > 0 && (d = a("img[data-lazy]", b.$slider).first(), d.attr("src", null), d.attr("src", d.attr("data-lazy")).removeClass("slick-loading").load(function () { d.removeAttr("data-lazy"), b.progressiveLazyLoad(), b.options.adaptiveHeight === !0 && b.setPosition() }).error(function () { d.removeAttr("data-lazy"), b.progressiveLazyLoad() })) }, b.prototype.refresh = function (b) { var d, e, c = this; e = c.slideCount - c.options.slidesToShow, c.options.infinite || (c.slideCount <= c.options.slidesToShow ? c.currentSlide = 0 : c.currentSlide > e && (c.currentSlide = e)), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, { currentSlide: d }), c.init(), b || c.changeSlide({ data: { message: "index", index: d } }, !1) }, b.prototype.registerBreakpoints = function () { var c, d, e, b = this, f = b.options.responsive || null; if ("array" === a.type(f) && f.length) { b.respondTo = b.options.respondTo || "window"; for (c in f) if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) { for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--; b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings } b.breakpoints.sort(function (a, c) { return b.options.mobileFirst ? a - c : c - a }) } }, b.prototype.reinit = function () { var b = this; b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses(0), b.setPosition(), b.$slider.trigger("reInit", [b]), b.options.autoplay === !0 && b.focusHandler() }, b.prototype.resize = function () { var b = this; a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () { b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition() }, 50)) }, b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) { var d = this; return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit()) }, b.prototype.setCSS = function (a) { var d, e, b = this, c = {}; b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c))) }, b.prototype.setDimensions = function () { var a = this; a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({ padding: "0px " + a.options.centerPadding }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({ padding: a.options.centerPadding + " 0px" })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length))); var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width(); a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b) }, b.prototype.setFade = function () { var c, b = this; b.$slides.each(function (d, e) { c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({ position: "relative", right: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 }) : a(e).css({ position: "relative", left: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 }) }), b.$slides.eq(b.currentSlide).css({ zIndex: b.options.zIndex - 1, opacity: 1 }) }, b.prototype.setHeight = function () { var a = this; if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) { var b = a.$slides.eq(a.currentSlide).outerHeight(!0); a.$list.css("height", b) } }, b.prototype.setOption = b.prototype.slickSetOption = function (b, c, d) { var f, g, e = this; if ("responsive" === b && "array" === a.type(c)) for (g in c) if ("array" !== a.type(e.options.responsive)) e.options.responsive = [c[g]]; else { for (f = e.options.responsive.length - 1; f >= 0;) e.options.responsive[f].breakpoint === c[g].breakpoint && e.options.responsive.splice(f, 1), f--; e.options.responsive.push(c[g]) } else e.options[b] = c; d === !0 && (e.unload(), e.reinit()) }, b.prototype.setPosition = function () { var a = this; a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a]) }, b.prototype.setProps = function () { var a = this, b = document.body.style; a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1 }, b.prototype.setSlideClasses = function (a) { var c, d, e, f, b = this; d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a, d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad() }, b.prototype.setupInfinite = function () { var c, d, e, b = this; if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) { for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned"); for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned"); b.$slideTrack.find(".slick-cloned").find("[id]").each(function () { a(this).attr("id", "") }) } }, b.prototype.setPaused = function (a) { var b = this; b.options.autoplay === !0 && b.options.pauseOnHover === !0 && (b.paused = a, a ? b.autoPlayClear() : b.autoPlay()) }, b.prototype.selectHandler = function (b) { var c = this, d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"), e = parseInt(d.attr("data-slick-index")); return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e) }, b.prototype.slideHandler = function (a, b, c) {
        var d, e, f, g, h = null, i = this; return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
            i.postSlide(d);
        }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () { i.postSlide(d) }) : i.postSlide(d))) : (i.options.autoplay === !0 && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function () { i.postSlide(e) })) : i.postSlide(e), void i.animateHeight()) : void (c !== !0 ? i.animateSlide(h, function () { i.postSlide(e) }) : i.postSlide(e))))
    }, b.prototype.startLoad = function () { var a = this; a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading") }, b.prototype.swipeDirection = function () { var a, b, c, d, e = this; return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "left" : "right" : "vertical" }, b.prototype.swipeEnd = function (a) { var c, b = this; if (b.dragging = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1; if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) switch (b.swipeDirection()) { case "left": c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.slideHandler(c), b.currentDirection = 0, b.touchObject = {}, b.$slider.trigger("swipe", [b, "left"]); break; case "right": c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.slideHandler(c), b.currentDirection = 1, b.touchObject = {}, b.$slider.trigger("swipe", [b, "right"]) } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {}) }, b.prototype.swipeHandler = function (a) { var b = this; if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) { case "start": b.swipeStart(a); break; case "move": b.swipeMove(a); break; case "end": b.swipeEnd(a) } }, b.prototype.swipeMove = function (a) { var d, e, f, g, h, b = this; return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0) }, b.prototype.swipeStart = function (a) { var c, b = this; return 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void (b.dragging = !0)) }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () { var a = this; null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit()) }, b.prototype.unload = function () { var b = this; a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "") }, b.prototype.unslick = function (a) { var b = this; b.$slider.trigger("unslick", [b, a]), b.destroy() }, b.prototype.updateArrows = function () { var b, a = this; b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))) }, b.prototype.updateDots = function () { var a = this; null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false")) }, b.prototype.visibility = function () { var a = this; document[a.hidden] ? (a.paused = !0, a.autoPlayClear()) : a.options.autoplay === !0 && (a.paused = !1, a.autoPlay()) }, b.prototype.initADA = function () { var b = this; b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) { a(this).attr({ role: "option", "aria-describedby": "slick-slide" + b.instanceUid + c }) }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function (c) { a(this).attr({ role: "presentation", "aria-selected": "false", "aria-controls": "navigation" + b.instanceUid + c, id: "slick-slide" + b.instanceUid + c }) }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA() }, b.prototype.activateADA = function () { var a = this; a.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" }) }, b.prototype.focusHandler = function () { var b = this; b.$slider.on("focus.slick blur.slick", "*", function (c) { c.stopImmediatePropagation(); var d = a(this); setTimeout(function () { b.isPlay && (d.is(":focus") ? (b.autoPlayClear(), b.paused = !0) : (b.paused = !1, b.autoPlay())) }, 0) }) }, a.fn.slick = function () { var f, g, a = this, c = arguments[0], d = Array.prototype.slice.call(arguments, 1), e = a.length; for (f = 0; e > f; f++) if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g; return a }
});
/* eslint-enable */

/* eslint-disable */
/*!
 * jQuery Placeholder Plugin v2.3.1
 * http://github.com/mathiasbynens/jquery-placeholder
 *
 * Copyright 2011, 2015 Mathias Bynens
 * Released under the MIT license
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof module&&module.exports?require("jquery"):jQuery)}(function(a){function b(b){var c={},d=/^jQuery\d+$/;return a.each(b.attributes,function(a,b){b.specified&&!d.test(b.name)&&(c[b.name]=b.value)}),c}function c(b,c){var d=this,f=a(this);if(d.value===f.attr(h?"placeholder-x":"placeholder")&&f.hasClass(n.customClass))if(d.value="",f.removeClass(n.customClass),f.data("placeholder-password")){if(f=f.hide().nextAll('input[type="password"]:first').show().attr("id",f.removeAttr("id").data("placeholder-id")),b===!0)return f[0].value=c,c;f.focus()}else d==e()&&d.select()}function d(d){var e,f=this,g=a(this),i=f.id;if(!d||"blur"!==d.type||!g.hasClass(n.customClass))if(""===f.value){if("password"===f.type){if(!g.data("placeholder-textinput")){try{e=g.clone().prop({type:"text"})}catch(j){e=a("<input>").attr(a.extend(b(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-enabled":!0,"placeholder-password":g,"placeholder-id":i}).bind("focus.placeholder",c),g.data({"placeholder-textinput":e,"placeholder-id":i}).before(e)}f.value="",g=g.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id",g.data("placeholder-id")).show()}else{var k=g.data("placeholder-password");k&&(k[0].value="",g.attr("id",g.data("placeholder-id")).show().nextAll('input[type="password"]:last').hide().removeAttr("id"))}g.addClass(n.customClass),g[0].value=g.attr(h?"placeholder-x":"placeholder")}else g.removeClass(n.customClass)}function e(){try{return document.activeElement}catch(a){}}var f,g,h=!1,i="[object OperaMini]"===Object.prototype.toString.call(window.operamini),j="placeholder"in document.createElement("input")&&!i&&!h,k="placeholder"in document.createElement("textarea")&&!i&&!h,l=a.valHooks,m=a.propHooks,n={};j&&k?(g=a.fn.placeholder=function(){return this},g.input=!0,g.textarea=!0):(g=a.fn.placeholder=function(b){var e={customClass:"placeholder"};return n=a.extend({},e,b),this.filter((j?"textarea":":input")+"["+(h?"placeholder-x":"placeholder")+"]").not("."+n.customClass).not(":radio, :checkbox, [type=hidden]").bind({"focus.placeholder":c,"blur.placeholder":d}).data("placeholder-enabled",!0).trigger("blur.placeholder")},g.input=j,g.textarea=k,f={get:function(b){var c=a(b),d=c.data("placeholder-password");return d?d[0].value:c.data("placeholder-enabled")&&c.hasClass(n.customClass)?"":b.value},set:function(b,f){var g,h,i=a(b);return""!==f&&(g=i.data("placeholder-textinput"),h=i.data("placeholder-password"),g?(c.call(g[0],!0,f)||(b.value=f),g[0].value=f):h&&(c.call(b,!0,f)||(h[0].value=f),b.value=f)),i.data("placeholder-enabled")?(""===f?(b.value=f,b!=e()&&d.call(b)):(i.hasClass(n.customClass)&&c.call(b),b.value=f),i):(b.value=f,i)}},j||(l.input=f,m.value=f),k||(l.textarea=f,m.value=f),a(function(){a(document).delegate("form","submit.placeholder",function(){var b=a("."+n.customClass,this).each(function(){c.call(this,!0,"")});setTimeout(function(){b.each(d)},10)})}),a(window).bind("beforeunload.placeholder",function(){var b=!0;try{"javascript:void(0)"===document.activeElement.toString()&&(b=!1)}catch(c){}b&&a("."+n.customClass).each(function(){this.value=""})}))});
/* eslint-enable */

/* eslint-disable */
// Production steps of ECMA-262, Edition 5, 15.2.3.5
// Reference: http://es5.github.io/#x15.2.3.5
// Polyfill Object.create
"function"!=typeof Object.create&&(Object.create=function(){function t(){}var e=Object.prototype.hasOwnProperty;return function(r){if("object"!=typeof r)throw TypeError("Object prototype may only be an Object or null");t.prototype=r;var o=new t;if(t.prototype=null,arguments.length>1){var n=Object(arguments[1]);for(var c in n)e.call(n,c)&&(o[c]=n[c])}return o}}());

//Polyfill Object.keys
Object.keys||(Object.keys=function(){"use strict";var t=Object.prototype.hasOwnProperty,r=!{toString:null}.propertyIsEnumerable("toString"),e=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],o=e.length;return function(n){if("function"!=typeof n&&("object"!=typeof n||null===n))throw new TypeError("Object.keys called on non-object");var c,l,p=[];for(c in n)t.call(n,c)&&p.push(c);if(r)for(l=0;o>l;l++)t.call(n,e[l])&&p.push(e[l]);return p}}());

//Polyfill Function.bind
Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var o=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&t?this:t,o.concat(Array.prototype.slice.call(arguments)))};return r.prototype=this.prototype,i.prototype=new r,i});

//Polyfill Array.filter
Array.prototype.filter||(Array.prototype.filter=function(r){"use strict";if(void 0===this||null===this)throw new TypeError;var t=Object(this),e=t.length>>>0;if(e>t.length||"function"!=typeof r)throw new TypeError;for(var i=[],n=arguments.length>=2?arguments[1]:void 0,o=0;e>o;o++)if(o in t){var f=t[o];r.call(n,f,o,t)&&i.push(f)}return i});

//Polyfill Array.every
Array.prototype.every||(Array.prototype.every=function(r,t){"use strict";var e,n;if(null==this)throw new TypeError("this vaut null ou n est pas défini");var i=Object(this),o=i.length>>>0;if("function"!=typeof r)throw new TypeError;for(arguments.length>1&&(e=t),n=0;o>n;){var a;if(n in i){a=i[n];var u=r.call(e,a,n,i);if(!u)return!1}n++}return!0});

// Production ECMA-262, Edition 5, 15.4.4.17
// Référence : http://es5.github.io/#x15.4.4.17
//Polyfill Array.some
Array.prototype.some||(Array.prototype.some=function(r){"use strict";if(null==this)throw new TypeError("Array.prototype.some appelé avec null ou undefined");if("function"!=typeof r)throw new TypeError;for(var e=Object(this),t=e.length>>>0,o=arguments.length>=2?arguments[1]:void 0,n=0;t>n;n++)if(n in e&&r.call(o,e[n],n,e))return!0;return!1});

// ECMA-262, Edition 5, 15.4.4.18
// Référence: http://es5.github.io/#x15.4.4.18
//Polyfill Array.forEach
Array.prototype.forEach || (Array.prototype.forEach = function (r) { var t, n; if (null == this) throw new TypeError(" this vaut null ou n est pas défini"); var o = Object(this), e = o.length >>> 0; if ("function" != typeof r) throw new TypeError(r + " n est pas une fonction"); for (arguments.length > 1 && (t = arguments[1]), n = 0; e > n;) { var a; n in o && (a = o[n], r.call(t, a, n, o)), n++ } });

//String.trim
String.prototype.trim || (String.prototype.trim = function () { return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") });

//String.endsWith
String.prototype.endsWith || (String.prototype.endsWith = function (t, n) { var e = this.toString(); ("number" != typeof n || !isFinite(n) || Math.floor(n) !== n || n > e.length) && (n = e.length), n -= t.length; var r = e.lastIndexOf(t, n); return -1 !== r && r === n });

/* eslint-enable */
/*END:https://boutique.orange.fr/medias/newshop/js/libraries.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/NavigationTiming.js*/
// Fonction NavigationTiming
(function ($) 
{
    
    var performance = window.performance
        || window.msPerformance
        || false;
    
    NavigationTiming['TIME_AFTER_LOAD'] = 50;
    
    function NavigationTiming ()
    {
        this.url = '/navtiming.ashx';
        this.header_name = 'NT_w3c';
        this.version = '2.0';
        
        if (performance)
        {
            this.addEventListeners();
        }
    }
    
    /**
     * Ajoute des écouteurs d'événement
     */
    NavigationTiming.prototype.addEventListeners = function () 
    {
        var scope = this
          , time_after_load = NavigationTiming.TIME_AFTER_LOAD
          , max_timer_gap = 1000
          , deferred = $.Deferred();
        
        $(window)
            .on('load', function ()
            {
                if (performance.timing.loadEventEnd > 0) 
                { 
                    deferred.resolve();
                }
                else 
                {
                    time_after_load = Math.max(time_after_load * 1.5, max_timer_gap);
                    window.setTimeout(function () 
                    {
                        deferred.resolve();
                    }, time_after_load);
                }
                
                deferred.then(function () 
                {
                    scope.send();
                })
            })
            .on('beforeunload', function ()
            {
                scope.send();
            });
    };
    
    /**
     * Collecte les informations de navigation
     * 
     * @returns {string[]}
     */
    NavigationTiming.prototype.collect = function () 
    {
        var timing = performance.timing
          , navigation = performance.navigation
          , no_value = 0;
          
        return [
            this.version,
            timing.navigationStart || no_value,
			timing.redirectStart || no_value,
			timing.unloadEventStart || no_value,
			timing.unloadEventEnd || no_value,
			timing.redirectEnd || no_value,
			timing.fetchStart || no_value,
			timing.domainLookupStart || no_value,
			timing.domainLookupEnd || no_value,
			timing.connectStart || no_value,
			timing.secureConnectionStart || no_value,
			timing.connectEnd || no_value,
			timing.requestStart || no_value,
			timing.responseStart || no_value,
			timing.responseEnd || no_value,
			timing.domLoading || no_value,
			timing.domInteractive || no_value,
			timing.domContentLoadedEventStart || no_value,
			timing.domContentLoadedEventEnd || no_value,
			timing.domComplete || no_value,
			timing.loadEventStart || no_value,
			timing.loadEventEnd || no_value,
			navigation.redirectCount || no_value,
			navigation.type || no_value
        ]
    };
    
    /**
     * Envoie une requête HTTP
     * 
     * @returns {Object} Promise
     */
    NavigationTiming.prototype.send = function ()
    {
        var $head = $('head')
          , ajax_configuration = {
              'headers': {
                  'data-idpage': $head.attr('data-idpage') || '',
                  'data-typologieOffre': $head.attr('data-typologieOffre') || ''
              },
              'method': 'GET',
              'url': this.url
          };
        
        ajax_configuration['headers'][this.header_name] = this.collect().join('|');
        
        return $.ajax(ajax_configuration);
    };
    
    new NavigationTiming();

})(jQuery);
/*END:https://boutique.orange.fr/medias/newshop/js/NavigationTiming.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/Sidebar.js*/
var Sidebar = (function ($) 
{

    function Sidebar ($sidebar) 
    {
        this.css_class = 'in-motion';
        this.is_able_to_scroll = false;
        this.offset = {
            bottom: 0,
            top: 0
        };
        this.$sidebar = $sidebar;
    }

    Sidebar.prototype.init = function ($last_block) 
    {
        $(window).off('.sidebar');

        // Définit la position de la sidebar
        // topPosition a definir avec le conteneur de la sidebar pour éviter un cumul de valeur
        // (la valeur de fixed-top s'additionnant avec l'offset top)
        this.offset.top = this.$sidebar.offset().top;
        this.offset.bottom = $last_block.offset().top + $last_block.height();
        this.bottom_position = $last_block.position().top + $last_block.outerHeight(true);
        this.addEventListeners($last_block);
        this.scroll($last_block);

    };

    Sidebar.prototype.addEventListeners = function (newHeight)
    {
        var scope = this;

        $(window).on('scroll.sidebar', function ()
        {
 
            scope.scroll(newHeight);
           
        });

        // A chaque lancement de la Sidebar, définit la nouvelle taille du block offre
        // Lorsque l'on clique sur en savoir+ redéfinit la taille du block offre
        // Le setTimeout permet de lancer l'action après l'animation de show/hide
        setTimeout(function () { scope.offset.bottom = newHeight.offset().top + newHeight.outerHeight(true); }, 100);
        $('body')
        .on('click', '\'.' + newHeight.attr('class') + ' a.roll\'', function () {
            setTimeout(function () { scope.offset.bottom = newHeight.offset().top + newHeight.outerHeight(true); }, 150);
        })

    };

    Sidebar.prototype.checkContentHeight = function ($blocks) 
    {
        var height_content = 0;

        // Initialisation du défilement de la sidebar
        // seulement si elle est plus petite que le bloc principal et que le bloc principal est plus grand que 500px
        // si sidebar plus grande -> reste static
        for (var i = 0, blocks_length = $blocks.length; i < blocks_length; i++)
        {
            (function (block) 
            {
                height_content += $(block).height();
            })($blocks[i]);
        }

        if (height_content > this.$sidebar.height()
            && height_content > 500)
        {
            this.is_able_to_scroll = true;
        }
        return this;
    };

    Sidebar.prototype.scroll = function (newHeight)
    {
        var scope = this;

        if (!this.is_able_to_scroll)
        {
            return;
        }
        
        this.$sidebar
            .removeAttr('style')
            .addClass('enabled')
            .removeClass(this.css_class);

        if (this.isSidebarInViewportLimits())
        {
            this.$sidebar.removeClass('enabled').addClass(this.css_class);
        }
        else if (this.isSidebarAboveViewport())
        {

            this.$sidebar
                .addClass('enabled')
                .css('top', ((newHeight.position().top + newHeight.outerHeight()) - this.$sidebar.outerHeight(true)));
        }
    };

    Sidebar.prototype.isSidebarInViewportLimits = function ()
    {
        var $window = $(window);

        if ($window.scrollTop() >= this.offset.top
            && ($(window).scrollTop() + this.$sidebar.height()) <= this.offset.bottom)
        {
            return true;
        }

        return false;
    };

    Sidebar.prototype.isSidebarAboveViewport = function ()
    {
        var $window = $(window);

        if (($window.scrollTop() + this.$sidebar.outerHeight(true)) >= this.offset.bottom)
        {
            return true;
        }

        return false;
    };

    return Sidebar;

})(jQuery);
/*END:https://boutique.orange.fr/medias/newshop/js/Sidebar.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/ComparisonService.js*/
var ComparisonService = (function ($, global_config) 
{
    
    ComparisonService['PREFIX_URL'] = '/mobiles/Comparateur.aspx'; 
    
    function ComparisonService () 
    {
    }
    
    /**
     * Ajoute un produit au mini-comparateur
     * 
     * @param {Object} product_model
     * @return {Object} Promise
     */
    ComparisonService.addProduct = function (product_model) 
    {
        var ajax_config = $.extend({}, global_config.ajax, {
            url: ComparisonService.PREFIX_URL + '/addProductToCompare',
            data: JSON.stringify(product_model)
        });
        
        return $.ajax(ajax_config);
    };
    
    /**
     * Retourne la liste des produits comparés
     * 
     * @return {Object} Promise
     */
    ComparisonService.getProducts = function () 
    {
        var ajax_config = $.extend({}, global_config.ajax, {
            url: ComparisonService.PREFIX_URL + '/getProductsToCompare',
            data: JSON.stringify({})
        });
        
        return $.ajax(ajax_config);
    };
    
    /**
     * Vide le comparateur
     * 
     * @return {Object} Promise
     */
    ComparisonService.empty = function () 
    {
        var ajax_config = $.extend({}, global_config.ajax, {
            url: ComparisonService.PREFIX_URL + '/emptyComparison',
            data: JSON.stringify({})
        });
        
        return $.ajax(ajax_config);
    };
    
    /**
     * Supprime un produit
     * 
     * @param {Object} product_model
     * @return {Object} Promise
     */
    ComparisonService.removeProduct = function (product_model) 
    {
        var ajax_config = $.extend({}, global_config.ajax, {
            url: ComparisonService.PREFIX_URL + '/removeProductToCompare',
            data: JSON.stringify(product_model)
        });
        
        return $.ajax(ajax_config);
    };
    
    return ComparisonService;
    
})(jQuery, globalConfig);
/*END:https://boutique.orange.fr/medias/newshop/js/ComparisonService.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/ProductImageAnimation.js*/
var ProductImageAnimation = (function () 
{
 
    // Hauteur de l'image dans le comparateur
    ProductImageAnimation['IMAGE_HEIGHT'] = '75px';
    
    function ProductImageAnimation () 
    {
        this.style = {
            'display': 'none',
            'height': 'auto',
            'position': 'absolute',
            'z-index': 3
        };
        this.timeout_handler = null;
    };
    
    /**
     * Animation de l'image à l'ajout d'un produit dans le comparateur
     * 
     * @param {Object} target_offset
     */
    ProductImageAnimation.prototype.animate = function (target_offset) 
    {
        var scope = this;
        
        scope.$cloned_image.show();
        
        return scope.$cloned_image.animate({
            'height': ProductImageAnimation.IMAGE_HEIGHT,
            'left': target_offset.left + 17,
            'top': target_offset.top
        }, 800)
            .promise()
            .then(function () 
            {
                scope.$cloned_image.remove();
                
                return $.Deferred().resolve();
            });
    };
    
    ProductImageAnimation.prototype.init = function ($image) 
    {
        var offset;
        
        this.$cloned_image = $image.clone();
        
        if (!$image.length)
        {
            return;
        }
        // Offset de l'image courante
        offset = $image.offset();
        // Mise en forme du clone
        this.$cloned_image
            .addClass('product-image')
            .css($.extend({}, this.style, {
                'left': offset.left,
                'top': offset.top
            }))
            .appendTo('body');
    };
    
    return ProductImageAnimation;
    
})(jQuery);
/*END:https://boutique.orange.fr/medias/newshop/js/ProductImageAnimation.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/Comparison.js*/
// interface IProduct 
// {
//     /**
//      * @property {bool}
//      */
//     IsEmptyProduct: bool;

//     /**
//      * @property {number}
//      */
//     ArticleId: number;

//     /**
//      * @property {string}
//      */
//     Titre: string;

//     /**
//      * @property {string}
//      */
//     Marque: string;

//     /**
//      * @property {string}
//      */
//     LienFicheProduit: string;

//     /**
//      * @property {string}
//      */
//     Visuel: string;
// }

var ProductsComparison = (function ($, global_config) {
    
    // Nombre de produits qu'il est possible d'ajouter au comparateur
    ComparisonStrategyMaxProducts['MAX_PRODUCTS'] = 4;
    
    function ComparisonStrategyMaxProducts (products)
    {
        if (products.length === ComparisonStrategyMaxProducts.MAX_PRODUCTS)
        {
            $('#products-limit').dialog('open');
            return true;
        }
        
        return;
    }
    
    function ComparisonStrategyProductExists (products, range_id)
    {
        if ($.inArray(range_id, products) >= 0)
        {
            $('#mobile-already').dialog('open');
            return true;
        }
        
        return;
    }
    
    // Template produit
    Comparison['TPL_PRODUCT'] = [
        '<div class="product">',
            '<p class="product-description">',
                '<a href="{0}" title="{1}">',
                    '<img src="{2}" alt="{3}" class="product-image" />',
                '</a>',
            '</p>',
            '<a href="#" class="btn-delete-article" data-id="{4}">supprimer</a>',
        '</div>'
    ].join('');
    // Template produit vide
    Comparison['TPL_WRAPPER_EMPTY_PRODUCT'] = [
        '<div class="product empty-product">',
            '<img src="https://boutique.orange.fr/medias/newshop/images/comparator/add-phone.png" alt="ajouter un produit" class="empty-product-img" />',
        '</div>'
    ].join('');
    
    function Comparison (callback) 
    {
        this.callbackGetPicture = callback;
        this.products = [];
        
        this.addEventListeners();
    }
    
    /**
     * Attache des écouteurs d'événement
     */
    Comparison.prototype.addEventListeners = function () 
    {
        var scope = this;
        
        $('body')
            // Ajoute un produit au comparateur (Sélecteur)
            .on('click.comparison', '.add-to-comparison', function (evt) {
                evt.preventDefault();

                scope.addProduct($(this), this.getAttribute('data-id') * 1, this.getAttribute('data-label'));
            })
            // Supprimer tous les produits du comparateur
            .on('click.comparison', '.empty-comparison', function (evt) {
                evt.preventDefault();

                scope.empty();
            })
            // Suppression d'un produit du comparateur
            .on('click.comparison', '#comparison .btn-delete-article', function (evt) {
                evt.preventDefault();
                
                // Récupération de l'id pour le transmettre à la webmethod
                scope.removeProduct(this.getAttribute('data-id'));
            })
            // Cache/ouvre le comparateur
            .on('click.comparison', '#PanelComparateur #header-comparison > a:first', function (evt) {
                evt.preventDefault();

                $(this).toggleClass('on');
                $('#PanelComparateur #comparison-block').toggleClass('on');
            });
    };
    
    /**
     * Ajoute un produit au comparateur
     * 
     * @param {Object} $element
     * @param {number} range_id
     * @param {string} label
     */
    Comparison.prototype.addProduct = function ($element, range_id, label) 
    {
        var scope = this
          , product_model = { 
              'idProduct': range_id, 
              'labelProduct': label 
            }
          , product_image_anim = new ProductImageAnimation()
          , has_animation = true
          , $comparison_panel = $(document.getElementById('PanelComparateur'))
          , $product = $comparison_panel.find('.product').eq(scope.products.length);
          
        if (ComparisonStrategyMaxProducts(scope.products)
            || ComparisonStrategyProductExists(scope.products, range_id))
        {
            return;
        }
        
        if (typeof scope.callbackGetPicture !== 'function')
        {
            has_animation = false;
        }
        else
        {
            product_image_anim.init(scope.callbackGetPicture($element));
        }
        
        ComparisonService.addProduct(product_model)
            .then(function (result)
            {
                var product;
                
                if (!result.d) 
                {
                    return;
                }
                
                // ouvrir le comparateur quel que soit le résultat
                $comparison_panel
                    .find('#header-comparison > a').addClass('on').end()
                    .find('#comparison-block').addClass('on').end();
                
                product = result.d[0];
                
                scope.products.push(range_id);
                // Modifie la valeur de session
                sessionStorage.setItem('products_count', scope.products.length);
                // Met à jour le compteur
                scope.updateCount();
                // Animation de l'image produit 
                
                if (!has_animation)
                {
                    return;
                }
                
                product_image_anim.animate($product.offset())
                    .then(function () 
                    {
                        $product.replaceWith(Comparison.TPL_PRODUCT.format(
                                product.LienFicheProduit, 
                                product.Titre, 
                                product.Visuel, 
                                product.Titre, 
                                product.ArticleId));
                    });
            });
    };
    
    /**
     * Construit la vue du comparateur
     * 
     * @param {IProduct[]} products
     */
    Comparison.prototype.constructProductList = function (products) 
    {
        var scope = this
          , product_views = [];
        
        scope.products = [];
        
        for (var i = 0, products_length = products.length; i < products_length; i++)
        {
            (function (product) 
            {
                if (!product.IsEmptyProduct) 
                {
                    scope.products.push(product.ArticleId);
                    product_views.push(Comparison.TPL_PRODUCT.format(product.LienFicheProduit, product.Titre, product.Visuel, product.Titre, product.ArticleId));
                }
                else 
                {
                    product_views.push(Comparison.TPL_WRAPPER_EMPTY_PRODUCT);
                }
            })(products[i]);
        }
        // Mise à jour nombre d'articles en session
        sessionStorage.setItem('products_count', scope.products.length);
        
        scope.comparison_container.innerHTML = product_views.join('');
    };
    
    /**
     * Vide le comparateur
     */
    Comparison.prototype.empty = function () 
    {
        var scope = this;
        
        ComparisonService.empty()
            .then(function (result) 
            {
                if (!result.d) 
                {
                    return;
                }
                
                scope.products = Array(4).fill({
                    'IsEmptyProduct': true
                });
                // Construction du html pour la liste des produits à comparer
                scope.constructProductList(scope.products);
                // Met à jour le compteur
                scope.updateCount();
            });
    };
    
    /**
     * Initialise le comparateur
     */
    Comparison.prototype.init = function () 
    {
        var scope = this;
        
        scope.comparison_container = document.getElementById('comparison');

        if (scope.comparison_container === null)
        {
            $('body').off('.comparison');
            return;
        }
        
        ComparisonService.getProducts()
            .then(function (result) 
            {
                if (result.d === null) 
                {
                    return;
                }
                
                // Suppression des éléments DOM
                scope.comparison_container.innerHTML = "";
                // Construction du html pour la liste des produits à comparer
                scope.constructProductList(result.d);
                // Met à jour le compteur
                scope.updateCount();
            });
    };
    
    /**
     * Supprime un produit
     * 
     * @param {number} product_id
     */
    Comparison.prototype.removeProduct = function (product_id) 
    {
        var scope = this
          , product_model = { 
                'idProduct': product_id
            };
        
        ComparisonService.removeProduct(product_model)
            .then(function (result) 
            {
                if (!result.d) 
                {
                    return;
                }
                
                // Suppression des éléments DOM
                scope.comparison_container.innerHTML = "";
                // Construction du html pour la liste des produits à comparer
                scope.constructProductList(result.d);
                // Met à jour le compteur
                scope.updateCount();
            });
    };
    
    /**
     * Mise à jour de la vue compteur
     */
    Comparison.prototype.updateCount = function () 
    {
        var products_count = sessionStorage.getItem('products_count') * 1
          , label = (products_count > 1) ? 'articles' : 'article';
        
        $('#PanelComparateur #header-comparison strong')
            .text('({0} {1})'.format(products_count, label));
    };
    
    return Comparison;
    
}(jQuery, globalConfig));
/*END:https://boutique.orange.fr/medias/newshop/js/Comparison.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/ObjectGestion.js*/
var ObjectGestion = (function ($)
{
    /**
     * @param {string} attribute_prefix
     */
    function ObjectGestion (attribute_prefix)
    {
        this.attribute_prefix = attribute_prefix || '';
    }
    
    /**
     * Formatage de l'attribut en camelCase
     * 
     * @param {string} attribute_name
     * @return {string}
     */
    ObjectGestion.prototype.normalizeAttributeName = function (attribute_name) 
    {
        return attribute_name.replace(/-([a-z]{1})/ig, function (v, v1) 
        {
            return v1.toUpperCase();
        });
    };
    
    /**
     * Typage d'une chaine de caractères
     * Si "true"/"false", typage de la valeur en booléen
     * 
     * @param {string} attribute_value
     * @return {string|bool} 
     */
    ObjectGestion.prototype.normalizeAttributeValue = function (attribute_value) 
    {
        var normalized_value = attribute_value;

        normalized_value = (attribute_value === 'true')
            ? true
            : (attribute_value === 'false')
                ? false
                : normalized_value;

        if (!isNaN(attribute_value * 1))
        {
            normalized_value = attribute_value * 1;
        }

        return normalized_value;
    };
    
    /**
     * Parcours des attributs pour construire un objet de configuration
     * 
     * @param {Object} element
     */
    ObjectGestion.prototype.parseAttributes = function (element) {
        var scope = this
          , config = {}
          , regex = new RegExp('^' + scope.attribute_prefix + '-');

        for (var i = 0, attr_length = element.attributes.length; i < attr_length; i++)
        {
            (function (attr)
            {
                var key = '';

                if (regex.test(attr.name)) 
                {
                    regex.lastIndex = 0;
                    key = scope.normalizeAttributeName(attr.name.replace(regex, ''));
                    config[key] = scope.normalizeAttributeValue(attr.value);
                }
            })(element.attributes[i]);
        }
        
        return config;
    }
    
    return ObjectGestion;
    
})(jQuery);

/*END:https://boutique.orange.fr/medias/newshop/js/ObjectGestion.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/DialogGestion.js*/
var DialogGestion = (function ($)
{

    /**
     * @param {Object} $dialogs
     */
    function DialogGestion ($dialogs)
    {
        ObjectGestion.call(this, 'data-dialog-config');

        this.config_base = {
            'closeText': '',
            'modal': true,
            'resizable': false
        };
        this.$dialogs = $dialogs;
    }

    DialogGestion.prototype = Object.create(ObjectGestion.prototype);

    /**
     * Evénement de fermeture de la popin
     */
    DialogGestion.prototype.close = function ()
    {
        var scope = this
          , $dialog = $(scope)
          , callbacks = $dialog.attr('data-dialog-close-callback') ? $dialog.attr('data-dialog-close-callback').split(',') : [];

        for (var i = 0, callbacks_length = callbacks.length; i < callbacks_length; i++)
        {
            (function (callback)
            {
                if (callback in window)
                {
                    // Exécute le callback
                    window[callback](scope);
                }
            })(callbacks[i]);
        }

        $dialog.off('.dialog');

        if ($dialog.attr('data-dialog-destroy-on-close'))
        {
            $dialog.dialog('destroy');
        }
    };

    /**
     * Initialisation des popin
     */
    DialogGestion.prototype.init = function ()
    {
        var scope = this;

        for (var i = 0, dialog_length = scope.$dialogs.length; i < dialog_length; i++)
        {
            (function (dialog)
            {
                var $dialog = $(dialog)
                  , custom_config = scope.parseAttributes(dialog)
                  , config = {};

                config = $.extend({}, scope.config_base, custom_config, {
                    'close': function ()
                    {
                        scope.close.apply(this);
                    },
                    'open': function ()
                    {
                        scope.open.apply(this);
                    }
                });
                
                $dialog.dialog(config);
            })(scope.$dialogs[i]);
        }
    };

    /**
     * Evénement d'ouverture de la popin
     */
    DialogGestion.prototype.open = function ()
    {
        var scope = this
          , $dialog = $(scope)
          , callbacks = $dialog.attr('data-dialog-open-callback') ? $dialog.attr('data-dialog-open-callback').split(',') : [];

        for (var i = 0, callbacks_length = callbacks.length; i < callbacks_length; i++)
        {
            (function (callback)
            {
                if (callback in window)
                {
                    // Exécute le callback
                    window[callback](scope);
                }
            })(callbacks[i]);
        }

        if ($dialog.attr('data-dialog-position-top'))
        {
            $dialog.parent()
                .css({
                    'position': 'absolute',
                    'top': $dialog.attr('data-dialog-position-top')
                });
            $('body').trigger('scrolltop', [$dialog.attr('data-dialog-position-top')]);
        }

        $dialog
            // Déclenchement de la fermeture de la popin
            .on('click.dialog', '[data-dialog-close]', function (evt)
            {
                evt.preventDefault();

                $dialog.dialog('close');
            })

            // Déclenchement de la fermeture de la popin sans bloquer l'action par defaut
            .on('click.dialog', '[data-dialog-close-without-preventdefault]', function (evt)
            {
                $dialog.dialog('close');
            });
    };

    return DialogGestion;

})(jQuery);
/*END:https://boutique.orange.fr/medias/newshop/js/DialogGestion.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/CarouselGestion.js*/
var CarouselGestion = (function ($)
{
    
    /**
     * @param {Object} $carousels
     */
    function CarouselGestion ($carousels) 
    {
        ObjectGestion.call(this, 'data-slick');
        
        this.config_base = {
            'arrows': false,
            'autoplay': true,
            'autoplaySpeed': 6000,
            'dots': true,
            'mobileFirst': true,
            'speed': 700
        };
        this.$carousels = $carousels;
        this.pager_selector = '.carousel-pager';
        this.target_selector = '.viewport';
    }
    
    CarouselGestion.prototype = Object.create(ObjectGestion.prototype);
    
    /**
     * Attachement d'écouteurs d'événement
     */
    CarouselGestion.prototype.addEventListeners = function ($carousel) 
    {
        var scope = this
          , $carousel_pager = $carousel.parent().find(scope.pager_selector);
        
        $carousel.parent()
            .on('click', scope.pager_selector + ' ' + '.pagenum', function (evt)
            {
                evt.preventDefault();
                
                $carousel.slick('slickGoTo', this.getAttribute('rel'));
            });
            
        if ($carousel_pager.find('.pagenum').length)
        {
            $carousel.on('beforeChange', function (evt, slick, current_slide, next_slide) 
            {
                $carousel_pager.find('li')
                    .find('.active').removeClass('active').end()
                    .eq(next_slide).find('.pagenum').addClass('active');
            });
        }
    };
    
    /**
     * Initialise les différents caroussels
     */
    CarouselGestion.prototype.init = function () 
    {
        var scope = this;
        
        for (var i = 0, carousels_length = scope.$carousels.length; i < carousels_length; i++)
        {
            (function (carousel) 
            {
                var $carousel = $(carousel)
                  , $object_to_slide = $carousel.find(scope.target_selector)
                  , custom_config = scope.parseAttributes(carousel)
                  , config = {};
                  
                config = $.extend({}, scope.config_base, custom_config, {
                    'appendDots': $object_to_slide.nextAll(scope.pager_selector)
                });

                if (config.dots)
                {
                    $carousel.find(scope.pager_selector).empty();
                }
                
                $object_to_slide.slick(config);
                scope.addEventListeners($object_to_slide);
            })(scope.$carousels[i]);
        }
    };
    
    return CarouselGestion;
    
})(jQuery);

/*END:https://boutique.orange.fr/medias/newshop/js/CarouselGestion.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/base.js*/
function LaunchFormulaireAide() {
    $("script[data-src]").each(function (i, item) {
        var src = item.getAttribute('data-src'),
            $scriptTag = $('<script />', {
                'async': true,
                'id': 'script' + i,
                'src': src,
                'type': "text/javascript"
            });

        $('body').append($scriptTag);
    });
}

function LoadingPopinNS(relValue) {
    $('#LoadingPopinNS').attr('rel', relValue);
    $('#LoadingPopinNS').popinNS();
    $('#LoadingPopinNS').trigger('click');
}

function CheckMentions()
{
    var legal_notices_length = $('.legal-notices').length;

    for (var i = 0; i < legal_notices_length; i++)
    {
        (function (legal_notice) 
        {
            var $legal_notice = $(legal_notice)
              , $legal_notice_location = $legal_notice.parents('.legal-notices-location')
              , fragment = null
              , ul = null
              , li = null
              , highlight_mentions_length = $legal_notice_location.find('.highlight-mention').length;

            if ($.trim($legal_notice.text()) == '')
            {
                $legal_notice
                    .hide()
                    .parents('.legal-notices-location').hide();
            }
            // Ajout liens à côté de "voir les mentions légales"
            //if ($legal_notice_location.length)
            //{
            //    fragment = document.createDocumentFragment();
            //    ul = document.createElement('ul');
            //    li = document.createElement('li');

            //    li.innerHTML = '&nbsp;:&nbsp;';
            //    ul.appendChild(li);

            //    for (var j = 0; j < highlight_mentions_length; j++)
            //    {
            //        (function (highlight_mention)
            //        {
            //            var $highlight_mention = $(highlight_mention)
            //              , li_mention = document.createElement('li');

            //            li_mention.innerHTML = '<a href="{0}">{1}</a></li>'.format($highlight_mention.attr('href'), $highlight_mention.text());

            //            ul.appendChild(li_mention);
            //        })($legal_notice_location.find('.highlight-mention')[j]);
            //    }

            //    fragment.appendChild(ul);

            //    $legal_notice_location.find('.see-mentions').after(fragment);
            //}

            $legal_notice_location.find('#div_MLGlobal > span').hide();
        })($('.legal-notices')[i]);
    }
}

/*
    Objet de gestion des info-bulles
    Recharger le fonctionnel avec la méthode publique "reinit()"
*/
var informativeBubble = (function() {
    var infoBubble = {
        arrowSize: 16,
        // Valeur par défaut si la classe definissant le positionnement n'est pas renseignée
        // Peut prendre les valeurs suivantes :
        // [ position-top | position-right | position-bottom | position-left ]
        // qui correspondent au placement de l'infobulle
        defaultPosition: 'position-top',
        init: function () {
            infoBubble.bindEvents();
            infoBubble.getContent();
        },
        bindEvents: function () {
            $('body')
                .on('mouseenter focus', '.link-info-bubble', function () {
                    if ($('#' + $(this).attr('rel') + '_cloned').length == 0) {
                        infoBubble.show($(this), $(this).attr('rel'));
                    }
                })
                .on('mouseleave blur', '.link-info-bubble', function () {
                    infoBubble.hide($(this).attr('rel'));
                })
                .on('click', '.link-info-bubble', function (evt) {
                    evt.preventDefault();
                });
        },
        getContent: function () {
            $('.link-info-bubble').each(function (i, item) {
                var id = $(item).attr('rel')
                  , _bubble = document.getElementById(id);

                if ($.trim($(_bubble).text()) == '') {
                    $.get(this.href, function (data) {
                        var $content = $(data).find("#Content");

                        $content.removeAttr('id');
                        _bubble.appendChild($content[0]);
                    });
                }
            });
        },
        hide: function (id) {
            $('#' + id + '_cloned, #arrow-info-bubble').remove();
        },
        reinit: function () {
            infoBubble.getContent();
        },
        show: function ($link, id) {
            var ib_height
              , ib_width
              // definition des variables utilisées pour le positionnement de l'info-bulle
              , computed_top
              , computed_left
              // définition des variables utilisées pour le positionnement de la flèche
              // La flèche sera toujours cachée de 5px en dessous de l'info-bulle
              , arrow_class
              , computed_arrow_top
              , computed_arrow_left
              , $infoBubble = $('#' + id)
              , link_offset = $link.offset()
              , link_width = $link.outerWidth(true)
              , link_height = $link.outerHeight(true)
              , link_center_top = link_offset.top + (link_height / 2)
              , link_center_left = link_offset.left + (link_width / 2)
              // création de la fleche et positionnement dans le DOM (en dessous du body)
              , $arrow = $('<span id="arrow-info-bubble"></span>').appendTo('body')
              , $clonedInfoBubble = $infoBubble.clone(true)
                    .addClass('cloned')
                    .attr('id', id + '_cloned')
                    .appendTo('body');

            // si le positionnement n'est pas défini
            if (!$link.hasClass('position-top')
                    && !$link.hasClass('position-topLeft')
                    && !$link.hasClass('position-topRight')
                    && !$link.hasClass('position-right')
                    && !$link.hasClass('position-bottom')
                    && !$link.hasClass('position-bottomLeft')
                    && !$link.hasClass('position-bottomRight')
                    && !$link.hasClass('position-left')) {
                $link.addClass(default_position);
            }

            // Vérification de la présence de la classe "info-bubble" sur l'infobulle
            // il est préferable de la rajouter directement sur l'infobulle car elle permet de masquer le bloc
            if (!$clonedInfoBubble.hasClass('info-bubble')) {
                $clonedInfoBubble.addClass('info-bubble');
            }

            // Récuperation des dimensions de l'infobulle
            $clonedInfoBubble.show();
            ib_height = $clonedInfoBubble.outerHeight(true);
            ib_width = $clonedInfoBubble.outerWidth(true);
            $clonedInfoBubble.hide();

            // Infobulle en haut
            if ($link.hasClass('position-top')
                    || $link.hasClass('position-topLeft')
                    || $link.hasClass('position-topRight')) {
                //Flèche en bas de l'infobulle
                arrow_class = 'position-top';
                computed_arrow_top = (link_offset.top - 1) - infoBubble.arrowSize;
                computed_arrow_left = link_center_left - (infoBubble.arrowSize / 2);

                // Calcul de la position de l'infobulle à gauche
                if ($link.hasClass('position-top-left')) {
                    // A FAIRE
                }
                // Calcul de la position de l'infobulle à droite
                else if ($link.hasClass('position-top-right')) {
                    // A FAIRE
                }
                // Calcul de la position de l'infobulle centrée
                else {
                    computed_top = (link_offset.top - infoBubble.arrowSize) - ib_height;
                    computed_left = link_center_left - (ib_width / 2);
                }
            } else if ($link.hasClass('position-right')) { // Infobulle à droite
                // Flèche à gauche de l'infobulle
                arrow_class = 'position-right';
                computed_arrow_top = link_center_top - (infoBubble.arrowSize / 2);
                computed_arrow_left = (link_offset.left + link_width) + 4;

                // Calcul de la position de l'infobulle
                computed_top = link_center_top - (ib_height / 2);
                computed_left = (link_offset.left + link_width) + infoBubble.arrowSize;
            } else if ($link.hasClass('position-bottom')
                || $link.hasClass('position-bottomLeft')
                || $link.hasClass('position-bottomRight')) { // Infobulle en bas
                // Fleche en haut de l'infobulle
                arrow_class = 'position-bottom';
                computed_arrow_top = (link_offset.top + link_height) - 4;
                computed_arrow_left = link_center_left - (infoBubble.arrowSize / 2);

                // Calcul de la position de l'infobulle à gauche
                if ($link.hasClass('position-bottom-left')) {
                    // A FAIRE
                }
                // Calcul de la position de l'infobulle à droite
                else if ($link.hasClass('position-bottom-right')) {
                    // A FAIRE
                }
                // Calcul de la position de l'infobulle centrée
                else {
                    computed_top = (link_offset.top + link_height) + infoBubble.arrowSize;
                    computed_left = link_center_left - (ib_width / 2);
                }
            } else if ($link.hasClass('position-left')) { // Infobulle à gauche
                //Fleche à droite de l'infobulle
                arrow_class = 'position-left';
                computed_arrow_top = link_center_top - (infoBubble.arrowSize / 2);
                computed_arrow_left = (link_offset.left - infoBubble.arrowSize) - 1;

                // Calcul de la position de l'infobulle
                computed_top = link_center_top - (ib_height / 2);
                computed_left = (link_offset.left - infoBubble.arrowSize) - ib_width;
            }

            // Positionnement de l'infobulle
            $clonedInfoBubble
                .css({
                    'top': Math.round(computed_top) + 'px',
                    'left': Math.round(computed_left) + 'px'
                })
                .show();

            // Positionnement de la flèche
            $arrow
                .addClass(arrow_class)
                .css({
                    'top': Math.round(computed_arrow_top) + 'px',
                    'left': Math.round(computed_arrow_left) + 'px',
                    'display': 'block'
                });
        }
    };

    return {
        init: infoBubble.init,
        reinit: infoBubble.reinit
    }
}());

function displayMentions() {
    if ($("#mentions").is(":hidden")) {
        $("a.see-mentions").trigger('click');
    }
}

// detection user-agent
// alert si browser < IE8
// alert si browser < Chrome 26 (inclut Chromium 26+ et Opera 15+)
// alert si browser < Firefox 16
// alert si browser < Safari 6.1
function alertOldBrowser(ua_parser) {
    var alert_to_show = false
      , browser = ua_parser.getBrowser();

    switch (browser.name) {
        case 'Firefox':
            if (browser.major < 16) {
                alert_to_show = true;
            }
            break;

        case 'Opera':
            if (browser.major < 15) {
                alert_to_show = true;
            }
            break;

        case 'Chrome':
        case 'Chromium':
            if (browser.major < 26) {
                alert_to_show = true;
            }
            break;

        case 'IE':
            if (browser.major < 8) {
                alert_to_show = true;
            }
            break;

        case 'Safari':
            if (parseFloat(browser.version) < 6.1) {
                alert_to_show = true;
            }
            break;
    }

    if (alert_to_show) {
        $('body').animate({
            'padding-top': '+=55px'
        }, 1000);
        $('#alert-browser').css('display', 'block').animate({
            'top': '+=55px'
        }, 1000);
    }
}

// Gestion de l'affichage des messages d'erreurs
function ModalErrorMessage(idModal, idTitle, idContent, idClose) {
    // Variables statiques
    var balise = {
        original: {
            close: '>',
            open: '<'
        },
        replace: {
            close: ']]',
            open: '[['
        }
    };
    var format = {
        original: {
            close: />/g,
            open: /</g
        },
        replace: {
            close: /\]\]/g,
            open: /\[\[/g
        }
    };
    // Fermeture de la modal
    this.HideModal = function () {
        $EtoUpdatePanel.SetProperty(
            idModal,
            'Open',
            false);
        $EtoUpdatePanel.Reloading(idModal);
    };
    // Formatage des contenus
    this.FormatModal = function () {
        var $dialog = $("#" + idModal);
        var $title = $dialog.find("[id$='" + idTitle + "'] strong");
        if ($title != undefined && $title.length > 0) {
            var title = $title.html()
                .replace(format.replace.open, balise.original.open)
                .replace(format.replace.close, balise.original.close);
            $title.html(title);
        }

        var $content = $dialog.find("[id$='" + idContent + "'] p");
        if ($content != undefined && $content.length > 0) {
            var content = $content.html()
                .replace(format.replace.open, balise.original.open)
                .replace(format.replace.close, balise.original.close);
            $content.html(content);
        }

        var $close = $dialog.find("[id$='" + idClose + "'] a");
        if ($close != undefined && $close.length > 0) {
            var close = $close.html()
                .replace(format.replace.open, balise.original.open)
                .replace(format.replace.close, balise.original.close);
            $close.html(close);
        }
    };
    // Affichage de la modal
    this.ShowModal = function (title, content, close) {
        $EtoUpdatePanel.SetProperty(
            idModal,
            'Title',
            title != undefined && title != null
                ? title
                    .replace(format.original.open, balise.replace.open)
                    .replace(format.original.close, balise.replace.close)
                : '');
        $EtoUpdatePanel.SetProperty(
            idModal,
            'Content',
            content != undefined && content != null
                ? content
                    .replace(format.original.open, balise.replace.open)
                    .replace(format.original.close, balise.replace.close)
                : '');
        $EtoUpdatePanel.SetProperty(
            idModal,
            'Close',
            close != undefined && close != null
                ? close
                    .replace(format.original.open, balise.replace.open)
                    .replace(format.original.close, balise.replace.close)
                : '');
        $EtoUpdatePanel.SetProperty(
            idModal,
            'Open',
            true);
        $EtoUpdatePanel.Reloading(idModal);
    };
}

function parsePostBackParameter (href, is_simple_postback) {
    var regexp = (is_simple_postback) ? /__doPostBack\((["\w$,\s]+)/g : /PostBackOptions\((["\w$,\s]+)/g;

    if (href === undefined
        || !regexp.test(href)) {
        return;
    }
    
    regexp.lastIndex = 0;
    return regexp.exec(href)[1].replace(/"/g, '');
}

function executePostBack (href, is_simple_postback) {
    var postback_parameters = parsePostBackParameter(href, is_simple_postback)
      , params_array;

    if (postback_parameters) {
        params_array = postback_parameters.split(', ');

        for (var i = 0, length_array = params_array.length; i < length_array; i++) {
            params_array[i] = (params_array[i] == 'true') ? true : (params_array[i] == 'false') ? false : params_array[i];
        }

        if (is_simple_postback) {
            __doPostBack.apply(params_array);
        } else {
            WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(params_array[0], params_array[1], params_array[2], params_array[3], params_array[4], params_array[5], params_array[6]));
        }
    } else {
        eval(href);
    }
}

function appel_dcsMultiTrack () {
    
}

/**
 * Gestion ouverture popin session bientôt expirée
 *
 * @param {Object} dialog_elt
 */
function SessionExpiredDialogOpen (dialog_elt)
{
    var $dialog = $(dialog_elt)
      , session_value = sessionStorage.getItem('session_value');

    $dialog
        // Masque l'entête générée
        .prev().addClass('hidden-elt').end()
        // Remplace la valeur par défaut
        .find('.counter').text(session_value).end()
        // Persistance du choix utilisateur
        .on('click.dialog', '.save-session', function (evt)
        {
            evt.preventDefault();

            $.ajax({
                type: "GET",
                url: "/ajax/master/ReloadSession.ashx"
            })
                .then(function ()
                {
                    sessionStorage.setItem('session_value', $("#form1").attr('data-session-value') * 1);
                    $('#session-expired').dialog('close');
                });
        });
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

;(function ( $, window, document, undefined ) 
{

    // Nombre de minutes avant que la popin ne s'ouvre
    SessionToExpireGestion['MIN_MINUTES_BEFORE_POPIN_OPEN'] = 5;

    /**
     * Définit un intervalle 
     */
    function SessionToExpireGestion()
    {
        var $dialog = $('#session-expired')
          , interval_handler
          , interval_seconds = 60000;

        if ($("#form1").attr('data-session-value'))
        {
            sessionStorage.setItem('session_value', $("#form1").attr('data-session-value') * 1);
            // Toutes les minutes, décrémentation du temps de session
            interval_handler = setInterval(function ()
            {
                var session_value = sessionStorage.getItem('session_value');
                
                session_value--;
                sessionStorage.setItem('session_value', session_value);
                // Remplace la valeur par défaut
                $dialog.find('.counter').text(session_value);

                if (session_value <= 0)
                {
                    clearInterval(interval_handler);
                    window.location.replace('/perteSession.html');
                }

                if (session_value <= SessionToExpireGestion.MIN_MINUTES_BEFORE_POPIN_OPEN
                    && $dialog.hasClass('ui-dialog-content')
                    && !$dialog.dialog('isOpen'))
                {
                    $dialog.dialog('open');
                }
            }, interval_seconds);
        }
    }

    $(function () {
        var $echatHelper = $('#PNL_Help')
          , showMenuDelay = 400
          , hideMenuDelay = 500
          , $activeTab = null
          , timer
          , timerOut
          , ua_parser = new UAParser()
          , prm = 'Sys' in window && 'WebForms' in window.Sys &&
                'PageRequestManager' in window.Sys.WebForms ?
                Sys.WebForms.PageRequestManager.getInstance() : null;

        /**
         * Gestion des écouteurs d'événement
         */
        $('body')
            .on('prmPageLoaded', function ()
            {
                CheckMentions();
                if ('DialogGestion' in window)
                {
                    // Gestion Popins
                    new DialogGestion($('[data-dialog]')).init();
                }
            })
            .on('focus blur', 'a', function () {
                $(this).toggleClass('focus');
            })
            .on('mouseover', '#EditoTopVentes ul li, #prepaidTopDesVentes ul li, #prepaidTopDesVentesRechargement ul li', function () {
                
                if (!$(this).children("div").hasClass("show")) {
                    $(this).parent().find("div").removeClass("show");
                    $(this).children("div").addClass("show");
                }
            })
            .on('click', '.popin-intention .closePopin a, .bt-popin .btn-cancel-no-action, .popin .closePopin a', function (evt) {
                evt.preventDefault();

                $(this).parents('.ui-dialog.modal-ns').remove();

                if ($('.ui-widget-overlay').length) {
                    $('.ui-widget-overlay').remove();
                }
            })
            // Gestion TMS pour le mega-menu
            .on('mousedown', '.tms-tag', function () {
                if (typeof TmsClickEvents === "function") {
                    TmsClickEvent($(this).attr('data-track-page'), $(this).attr('data-track-zone'), $(this).attr('data-track-name'), '');
                }
            })
            // Gestion DCS pour le mega-menu
            .on('mousedown', '.dcs-tag', function () {
                if (typeof appel_dcsMultiTrack === "function") {
                    appel_dcsMultiTrack($(this).attr('data-dcs-tab'), $(this).attr('data-dcs-link'), $(this).attr('data-dcs-label'));
                }
            })
            // Gestion bouton TMS (version non-intrusive)
            .on('click', '.link-button-tms', function (evt) {
                if ($(this).attr('data-tagpage') !== undefined
                    && typeof TmsClickEvents === "function") {
                    TmsClickEvent($(this).attr('data-tagpage'), $(this).attr('data-tagzone'), $(this).attr('data-tagnom'), $(this).attr('data-tagtarget'));
                }
            })
            // Gestion TMS View
            .on('click', '.link-tms-view', function () 
            {
                if ($(this).attr('data-utagview')
                    && $(this).attr('data-utagview') in window) 
                {
                    utag.view(window[$(this).attr('data-utagview')]);
                }
            })
            // Ouverture popup
            .on('click', '.open-popup', function (evt) {
                var $link = $(this)
                  , data = ['scrollbars=yes']
                  , height = $link.attr('data-height-popup') || 1000
                  , width = $link.attr('data-width-popup') || 990;

                evt.preventDefault();

                if (height !== null) {
                    data.push("height=" + height);
                }

                if (width !== null) {
                    data.push("width=" + width);
                }

                window.open(this.href, "", data.join(','));
            })
            .on('click', '#PNL_Help .helpLinkTitle', function (evt) {
                evt.preventDefault();

                $echatHelper.toggleClass('active');

                if (!$('.fake-link').length) {
                    $('.panelHelpButtons').prepend('<a class="fake-link"></a>');
                }
            })
            .on('click', '#PNL_Help #buttonC2cId', function (evt) {
                evt.preventDefault();

                TmsClickEvents(this, false);
            })
            .on('click', '#PNL_Help .fake-link', function (evt) {
                evt.preventDefault();

                $echatHelper.toggleClass('active');
            })
            .on('mouseleave', '#PNL_Help .panelHelpButtons', function (evt) {
                if ($(this).parent().hasClass('active')) {
                    $echatHelper.find('.helpLinkTitle').trigger('click');
                }
            })
            .on('click', '#PNL_Help .echatWrapper', function (evt) {
                TmsClickEvt(this.getAttribute('data-tagpage'), this.getAttribute('data-tagzone'), this.getAttribute('data-tagname'));
            })
            // promotion affichage des mentions légales
            .on('click', 'a.mention', function (evt) {
                evt.preventDefault();

                if ($(this).next("p").is(":hidden")) {
                    $(this).addClass("on").next().show();
                } else {
                    $(this).removeClass("on").next().hide();
                }
            })
            .on('click', 'a.extra-information', function (evt) {
                evt.preventDefault();

                if ($(this).next("div").is(":hidden")) {
                    $(this).addClass("on").next().show();
                } else {
                    $(this).removeClass("on").next().hide();
                }
            })
            .on('click', '.see-mentions', function (evt) {
                var $mentions = $(this).nextAll('.legal-notices');

                evt.preventDefault();

                $(this).toggleClass('on');

                if ($mentions.is(':visible')) {
                    $mentions.find('.highlight').removeClass('highlight');
                }

                if ($mentions.is(":hidden")) {
                    $mentions.addClass('on');
                } else {
                    $mentions.removeClass('on');
                }
            })
            .on('click', '.see-mentions + ul a', function () {
                //$('.see-mentions').addClass('on');

                //$(this).parents('.legal-notices-location')
                //    .find('.legal-notices').addClass('on')
                //    .find('.highlight').removeClass('highlight');

                //$($(this).attr('href')).addClass('highlight');
            })
            .on('click', '.no-redirect', function (evt) {
                evt.preventDefault();
            })
            // Gestion de bloc cliquable
            .on('click.pointer', '.pointer', function (evt) {
                if (!$(evt.target).is('a')
                    && !$(evt.target).parent().is('a')) {
                    var $link = $(this).find('.target-link')
                      , href;

                    if (!$link.length) {
                        $link = $(this).find('a:first');
                    }

                    if ($link.is('.dl-ticket')) {
                        return;
                    }

                    href = $link.attr('href').replace('javascript:', '');

                    if ($link.length) {
                        // Exécute la fonction pour les tags TMS
                        if ($link.attr('onclick')) {
                            if (/^TmsClickEvents/.test($link.attr('onclick'))) {
                                var result = /^TmsClickEvents\(this,\s(true|false)\)/g.exec($link.attr('onclick'));

                                if (result.length) {
                                    TmsClickEvents($link[0], result[1] === 'true' ? true : false);
                                }
                            } else {
                                eval($link.attr('onclick'));
                            }
                        }

                        if ($link.hasClass('link-button-tms')) {
                            TmsClickEvent($link.attr('data-tagpage'), $link.attr('data-tagzone'), $link.attr('data-tagnom'), $link.attr('data-tagtarget'));
                        }

                        if ($link.is('.no-redirect')) {
                            return;
                        }

                        is_simple_postback = !/PostBackOptions/g.test(href);

                        if (/__doPostBack/g.test(href)
                            || /PostBackOptions/g.test(href)) {
                            executePostBack(href, is_simple_postback);
                        } else {
                            if ($link.attr('target') !== undefined
                                && $link.attr('target') === '_blank'
                                && !$(evt.target).is('a')) {
                                window.open(href);
                            } else if ($link.attr('target') === undefined
                                || $link.attr('target') !== 'ajax') {
                                window.location.href = href; // Fonctionnement normal, redirection vers la cible du lien
                            }
                        }
                    }
                }
            })
            /* mouseover / mouseout sur block pointer */
            .on({
                'mouseover': function () {
                    $(this).find('a').addClass('pointerHover');
                },
                'mouseout': function () {
                    $(this).find('a').removeClass('pointerHover');
                }
            }, '.pointer')
            // Gestion de cases à cocher avec envoi de tags TMS
            .on('click', '.checkbox-tms', function () {
                var tms_parameter = {
                    page: $(this).attr('data-tagpage'),
                    zone: $(this).attr('data-tagzone'),
                    nom: this.checked ? 'true' : 'false',
                    cible: $(this).attr('data-tagtarget') || ''
                };

                if ($(this).attr('data-force-tagnom')) {
                    //récupération du tagnom spécifié
                    tms_parameter.nom = $(this).attr('data-tagnom');
                }

                if (tms_parameter.cible != '') {
                    TmsClickEvent(tms_parameter.page, tms_parameter.zone, tms_parameter.nom, tms_parameter.cible);
                } else {
                    TmsClickEvt(tms_parameter.page, tms_parameter.zone, tms_parameter.nom);
                }
            })
            // Gestion affichage mega-menu au survol
            .on({
                'mouseover': function () {
                    var $li = $(this);

                    if ($activeTab === null) {
                        $activeTab = $li;
                    }

                    clearTimeout(timerOut);

                    timer = setTimeout(function () {
                        if ($activeTab !== null) {
                            $activeTab.find('.sub-navigation').hide();
                            $activeTab = $li;

                            $li.find('.sub-navigation').show();
                        }
                    }, showMenuDelay);
                },
                'mouseout': function () {
                    clearTimeout(timer);

                    timerOut = setTimeout(function () {
                        if ($activeTab !== null) {
                            $activeTab.find('.sub-navigation').hide();
                        }
                    }, hideMenuDelay);
                }
            }, '.header-mega-menu > li')
            // Gestion ouverture mega-menu pour mobile et tablette
            .on({
                'touchstart': function (evt) {
                    var $tab = $(this).parents('li');

                    evt.preventDefault();
                    evt.stopPropagation();

                    $(this).parent().next().toggle();

                    $('.header-mega-menu > li').each(function (i, tab) {
                        if (i !== $tab.index()) {
                            $(this).find('> div').hide();
                        }
                    });
                },
                'click': function (evt) {
                    if (Modernizr.touch) {
                        evt.preventDefault();
                        evt.stopPropagation();
                    }
                }
            }, '.header-mega-menu > li > span > a')
            // Evénement clic pour les boutons d'impression
            .on('click', '.print', function (evt) {
                evt.preventDefault();

                window.print();
            })
            // Popin "destination" pages offres BOI
            .on('click', '.lien-popin-offres-boi a', function (evt) {
                evt.preventDefault();
                var nomPopin = $(this).parent().attr('id');
                $('#popin-'+nomPopin+'').dialog("open");
            })
            // Popin page offre open
            .on('click', '.lien-popin-offres-open a.popin', function (evt) {
                evt.preventDefault();
                var nomPopin = $(this).parent().attr('data-popin');
                $('#popin-' + nomPopin + '').dialog("open");
            })
            // Gestion lecteur video (Affichage video)
            .on('click', '.banner-video .btn-play', function () {
                $(this)
                    .nextAll('.lecteur-video, .overlay-video').show().end()
                    .parent().addClass('play');
            })
            // Gestion lecteur video (Masquage video)
            .on('click', '.banner-video .lecteur-video .close', function () {
                $(this)
                    .parents('.banner-video')
                        .removeClass('play')
                        .find('.lecteur-video, .overlay-video').hide();
            })
            // Bouton close animation
            .on('click', '.anim .close-anim', function (evt) {
                evt.preventDefault();
                $(this).parents('.anim').hide();
            });

        if ($(".popin-offres-boi").length) {
            $(".popin-offres-boi").dialog({
                autoOpen: false,
                width: 906,
                dialogClass: 'popin-offres-boi',
                modal: true
            });
        }

        $("a.mention").next("p").hide();
        // detection vieux navigateurs
        alertOldBrowser(ua_parser);

        //ajout classe IE8
        var version = parseInt($.browser.version);
        if($.browser.msie && version <= 8 ){
            $('body').addClass('ie8');
        }

        // Lancement du formulaire
        setTimeout(LaunchFormulaireAide, 2000);
        // Initialisation du système d'infobulle
        informativeBubble.init();
        // Gestion caroussels
        if ('CarouselGestion' in window)
        {
            new CarouselGestion($('[data-slick-carousel]')).init();
        }
        // Gestion Popins
        if (prm === null
            && 'DialogGestion' in window)
        {
            new DialogGestion($('[data-dialog]')).init();
        }
        // Gestion session expirée
        SessionToExpireGestion();

        // @TODO: Supprimer cette portion de code après le passage des caroussels au nouveau système
        if ($('.carousel').length) {
            var $carousel = $('.carousel')
              , timer_slider = 4000;

            if ($('.timer-slider').length
                && $('.timer-slider').val() !== ''
                && $('.timer-slider').val() !== '0') {
                timer_slider = $('.timer-slider').val();
            }

            if ($carousel.attr('data-direction')) {
                $carousel.tinycarousel({ axis: $carousel.attr('data-direction'), pager: true, controls: false, interval: true, intervaltime: timer_slider });
            } else {
                $carousel.tinycarousel({ pager: true, controls: false, interval: true, intervaltime: timer_slider });
            }

            $carousel.tinycarousel_start();
        }
        // Fin @TODO

        if ($('#EditoTopVentes').length) {
            $("#EditoTopVentes ul li:first div").addClass("show");
        }

        if ($('#prepaidTopDesVentes').length) {
            $("#prepaidTopDesVentes ul li:first div").addClass("show");
        }

        if ($('#prepaidTopDesVentes').length) {
            $("#prepaidTopDesVentesRechargement ul li:first div").addClass("show");
        }
        // Déploiement plugin sur tous les éléments de formulaire définis avec ces classes
        if (!$('#main.order-route').length) {
            $('.ns-checkbox').styleCheckbox();
            $('.ns-ddl').styleSelect();
            $('.ns-radio-button').styleRadioButton();
        }

        $('.location-mentions-chapeau').each(function (i, item) {
            var value = $.trim($(item).text());

            if (value) {
                $(item).show();
            } else {
                $(item).hide();
            }
        });

        // Chargement de l'EtoUpdatePanel
        if (typeof ($EtoUpdatePanel) != "undefined") {
            $EtoUpdatePanel.Initialisation();

            $EtoUpdatePanel.AddRequestEnd(function (update) {
                var link;

                if ($('.cart-eup').length && update.ID != $('.cart-eup')[0].id) {
                    return;
                }

                if ($('#panier-content .panier-container').length > 0) {
                    link = $('#panier-content').find('a')[0].outerHTML;
                    document.getElementById('panier-content').outerHTML = '';
                }

                if ($('#main-header-newshop .cart').length) {
                    var img = $('#main-header-newshop .cart').find('img').detach();

                    if (link === undefined) {
                        return;
                    }

                    $('#main-header-newshop .cart').replaceWith(link);
                    $('#main-header-newshop .cart').addClass('visible')
                        .prepend(img);
                }
            });
        }

        // Visionneuse accessoires
        if ($('#carrousel-accessories').length) {
            $('#carrousel-accessories li').each(function (i, li) {
                if (!$(li).find('img').length) {
                    $(li).remove();
                }
            });

            $('#carrousel-accessories')
                // Activation du carrousel
                .find('.viewport').jCarouselLite({
                    btnNext: "#carrousel-accessories .next",
                    btnPrev: "#carrousel-accessories .prev",
                    visible: 4,
                    speed: 800
                });
        }

        if ($('body').attr('data-section-menu') !== null) {
            $('#navbar-item-' + $('body').attr('data-section-menu')).addClass('active');

            //optimisation SEO : rendu du contenu des sous-menu au onload de la page plutôt que rendu par le code-behind
            $('.header-submenu').each(function(idx, item){
                var $item = $(item),
                    id = $item.attr('data-header-submenu-id'),
                    $li = $('#navbar-item-' + id),
                    $contents = $item.contents();

                if($contents.length) {
                    var $content = $($contents[0].data);
                    $content.appendTo($li);
                    $item.remove();
                }
            });
        }

        if ($('#HF_UserAgent').length) {
            $('#HF_UserAgent').val("{0}|{1}".format(ua_parser.getBrowser().name, ua_parser.getBrowser().major));
        }

        /*banner video */

        // Gestion bloc animation (intertitielle & floatbox)
        // Cacher bloc
        function hideAnimation(timer, animHide) {
            timeoutID = window.setTimeout(
	            function () {
	                $('' + animHide  + '').hide();
	            }, timer * 1000);
        }

        $(window).on('scroll', function () {
            // 60 = hauteur du footer "#o-footer"
            if (($(window).height() + $(window).scrollTop()) >= (document.body.offsetHeight - 60)) {
                $('.anim.floatbox').addClass("js-bottom");
            } else {
                $('.anim.floatbox').removeClass("js-bottom");
            }
            // 213 = hauteur du footer "#o-footer" + hauteur de l'anim "floatbox" (90) - padding bottom de l'anim "interstitielle" (363)
            if (($(window).height() + $(window).scrollTop()) >= (document.body.offsetHeight - 213) && $('.anim.interstitielle').length && $('.anim.floatbox').length) {
                $('.anim.interstitielle').addClass("js-bottom");
            } else {
                $('.anim.interstitielle').removeClass("js-bottom");
            }
        });

        // Floatbox
        if ($('.anim.floatbox').length) {
            $(".anim .close-anim").focus();

            $(this).attr("tabindex", 1).focus();

            var timerAnim = $('.anim.floatbox #lbl_Timer').text();

            if (timerAnim*1 > 0) {
                hideAnimation(timerAnim, '.anim.floatbox');
            }
            
        }
        // Interstitielle
        if ($('.anim.interstitielle').length) {
            $(this).attr("tabindex", 1).focus();

            if ($('.anim.interstitielle .dl-player-container').length) {
                $('.anim.interstitielle .close-anim').css("right", "0");
            }

            var timerAnim = $('.anim.interstitielle #lbl_Timer').text();
            
            if (timerAnim * 1 > 0) {
                hideAnimation(timerAnim, '.anim.interstitielle');
            }
        }

        // Gestion fragment HTML
        if ($('.html-fragment').length)
        {
            var $html_fragments = $('.html-fragment');

            for (var i = 0, html_fragment_length = $html_fragments.length; i < html_fragment_length; i++)
            {
                (function (html_fragment)
                {
                    var $html_fragment = $(html_fragment);

                    $html_fragment.before($html_fragment.html());
                })($html_fragments[i]);
            }
        }

        // Gestion de la validation de navigation des UpdatePanel.
        if (prm != null) {
            var validNav = {
                name: 'Navigation-Validate-Web',
                selector: '[name="Navigation-Validate-Web"]'
            };

            prm.add_beginRequest(function (sender, args) {
                var $validate = $(validNav.selector);
                if ($validate.length > 0 && prm.get_isInAsyncPostBack()) {
                    args.set_cancel(true);
                }
            });
            prm.add_endRequest(function (sender, args) {
                var $validate = $(validNav.selector);
                if ($validate.length > 0) {
                    var response = args.get_response();
                    if (response) {
                        var validate = response.getResponseHeader(validNav.name);
                        if (validate) {
                            $validate.val(validate);
                        }
                    }
                }
            });
        }
    });
})(jQuery, window, document);
/*END:https://boutique.orange.fr/medias/newshop/js/base.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/autocomplete.js*/
/*********************************
* Autocompletion (sans m�gamenu) *
*********************************/

var GestionForm = {
    formId: "formsearch",
    inputSearchId: "txt_recherche",
    textDefault: "Rechercher dans la boutique",
    init: function () {
        if (document.getElementById(this.inputSearchId).value == "") {
            document.getElementById(this.inputSearchId).value = this.textDefault;
        }

        this.autoComplete();
    },
    // Initialisation de l'autocompletion
    autoComplete: function () {
        var field = document.getElementById("txt_recherche");
        var proprietes_autocompletion = {
            /* propri�t�s d'affichage des suggestions */
            'field': field,
            /* propri�t�s d'appel du proxy */ 
            'url': field.getAttribute("data-url-completion-service"),
            'nameOfInstanceForJsonP': 'BLO_Autocompletion_boutique',
            'blocks': [{ baseId: -7, max: 10, label: ""}],
            'callbacks': { "submit": { context: null, method: "formSubmission" } },
            'isFormSubmit': false,
            'divCompletionId': "divCompletion_eto",
            /* propri�t�s stylistiques */
            'defaultBlockLabel': '',
            'maxNbSuggestions': 8,
            'closeCompletionOnBlur': true,
            'maxNbChar': 30,
            'plugins': ['Petale'],
            'petaleBorderBottomOfContainer': 10,
            'petaleDefaultImages': {
                "default": "//img.ke.voila.fr/I/leMoteur/petaleGenericImage.jpg",
                "people": "//img.ke.voila.fr/I/leMoteur/petaleGenericPeople.jpg",
                "shopping": "//img.ke.voila.fr/I/leMoteur/petaleGenericShopping.jpg",
                "meteo": "//img.ke.voila.fr/I/leMoteur/petaleGenericMeteo.jpg",
                "boutique": "//img.ke.voila.fr/I/leMoteur/petaleGenericBoutique.png"
            }
        };

        BLO_Autocompletion_boutique = new orangesearch.completion.Component(proprietes_autocompletion);
        window.BLO_Autocompletion_boutique = BLO_Autocompletion_boutique
        window.BLO_Autocompletion_boutique.start();
    },
    // Serialise les valeurs de formulaire
    serialize: function () {
        var form = document.getElementById(this.formId),
            elems = form.elements,
            serialized = [], i, len = elems.length, str = '';

        for (i = 0; i < len; i += 1) {
            var element = elems[i];
            var type = element.type;
            var name = element.name;
            var value = element.value;

            switch (type) {
                case 'text':
                case 'hidden':
                case 'radio':
                case 'checkbox':
                case 'textarea':
                case 'select-one':
                    str = name + '=' + value;
                    serialized.push(str);
                    break;

                default:
                    break;
            }
        }

        return serialized.join('&');
    },
    // Soumission du formulaire
    submission: function (evt) {
        var valeurChamp = "",
            self = GestionForm;

        valeurChamp = evt.query === undefined ? document.getElementById(self.inputSearchId).value : evt.query;

        if (valeurChamp != undefined
            && valeurChamp != ""
            && valeurChamp != "Rechercher dans la boutique") {
            document.forms["formsearch"].submit();

            return true;
        }

        if (valeurChamp == "") {
            return false;
        }
    }
};

String.prototype.pregReplace = function (array_pattern, array_pattern_replace) {
    var new_string = this.toString();

    for (i = 0; i < array_pattern.length; i++) {
        var reg_exp = RegExp(array_pattern[i], "gi");
        var val_to_replace = array_pattern_replace[i];
        new_string = new_string.replace(reg_exp, val_to_replace);
    }

    return new_string;
};

String.prototype.deleteAccent = function () {
    var string = this.toString(),
		pattern_accent = new Array("�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�"),
		pattern_replace_accent = new Array("e", "e", "e", "e", "c", "a", "a", "a", "i", "i", "u", "o", "o", "o");

    var new_string = string.pregReplace(pattern_accent, pattern_replace_accent);

    return new_string;
};

var formSubmission = function (evt) {
    GestionForm.submission(evt);
};

$(document).ready(function () {
    // Si ancienne version
    if ('NonActivationRefonteHeaderNS' in window && window.NonActivationRefonteHeaderNS == true) {
        var input = document.getElementById('txt_recherche'),
            form = document.getElementById('formsearch'),
            submitButton = document.getElementById("searchFacLink");

        try {
            if (input !== null) {
                if (input.type == 'text') {
                    input.setAttribute('autocomplete', 'off');
                }

                // initialisation du champ de formulaire
                GestionForm.init();

                // Evenement
                $(form).bind("submit", GestionForm.submission);
                $(input).bind({
                    "focus": function (evt) {
                        if (this.value == "Rechercher dans la boutique") {
                            this.value = "";
                        }
                    },
                    "blur": function (evt) {
                        if (this.value == "") {
                            this.value = "Rechercher dans la boutique";
                        }
                    }
                });

                $(submitButton).bind("click", GestionForm.submission);
                $(document).bind("click", function () { BLO_Autocompletion_boutique.hideCompletionDiv() });
            } else {
                throw "Le champ de recherche n'est pas pr�sent, impossible d'initialiser l'autocompletion";
            }
        } catch (e) {
            if ((window['console'] !== undefined)) {
                console.log(e);
            }
        }
    }
});
/*END:https://boutique.orange.fr/medias/newshop/js/autocomplete.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/misc.js*/
// Encodage et retrait du html des param TMS
function MiseEnFormeTagTms(paramTms) {
    if (paramTms.page !== null && paramTms.zone !== null && paramTms.nom !== null) {
        paramTms.page = strip(paramTms.page)
        paramTms.zone = strip(paramTms.zone)
        paramTms.nom = strip(paramTms.nom)
        if (paramTms.cible != undefined) {
            paramTms.cible = strip(paramTms.cible)
        }
    }
}

// Récuperation du texte uniquement
function strip(string) {
    if (!string) {
        return '';
    }

    return string.replace(/<(.)*?>/g, '');
}

// fonction d'appel du tracking TMS, sur événement Clic (4 params)
function TmsClickEvent(page, zone, nom, cible) {

    var paramTms = { page: page, zone: zone, nom: nom, cible: cible };
    MiseEnFormeTagTms(paramTms);

    if (cible == undefined) {
        TmsClickEvt(paramTms.page, paramTms.zone, paramTms.nom);
        return;
    }
    if (typeof (utag) !== "undefined" && typeof (utag.link) === 'function') {
        utag.link(
	    {
	        "track_page": paramTms.page, //nom de la page
	        "track_zone": paramTms.zone, //nom de la zone
	        "track_nom": paramTms.nom, //nom de l'événement
	        "track_cible": paramTms.cible, //nom de la cible
	        "track_type_evt": "clic"
	    });
    }
}

// fonction d'appel du tracking TMS, sur événement Clic (3 params)
function TmsClickEvt(page, zone, nom) {

    var paramTms = { page: page, zone: zone, nom: nom };
    MiseEnFormeTagTms(paramTms);

    if (typeof (utag) !== "undefined" && typeof (utag.link) === 'function') {
        utag.link(
	    {
	        "track_page": paramTms.page, //nom de la page
	        "track_zone": paramTms.zone, //nom de la zone
	        "track_nom": paramTms.nom, //nom de l'événement
	        "track_type_evt": "clic"
	    });
    }
}

// fonction d'appel du tracking TMS, sur événement erreur (3 params)
function TmsErrorEvt(page, zone, nom) {

    var paramTms = { page: page, zone: zone, nom: nom };
    MiseEnFormeTagTms(paramTms);    

    if (typeof (utag) !== "undefined" && typeof (utag.link) === 'function') {
        utag.link(
	    {
	        "track_page": paramTms.page, //nom de la page
	        "track_zone": paramTms.zone, //nom de la zone
	        "track_nom": paramTms.nom, //nom de l'événement
	        "track_type_evt": "erreur"
	    });
    }
}

// fonction d'appel du tracking TMS, sur événement erreur (4 params)
function TmsErrorEvent(page, zone, nom, cible) {

    var paramTms = { page: page, zone: zone, nom: nom, cible: cible };
    MiseEnFormeTagTms(paramTms);    

    if (cible == undefined) {
        TmsClickEvt(paramTms.page, paramTms.zone, paramTms.nom);
        return;
    }
    if (typeof (utag) !== "undefined" && typeof (utag.link) === 'function') {
        utag.link(
	    {
	        "track_page": paramTms.page, //nom de la page
	        "track_zone": paramTms.zone, //nom de la zone
	        "track_nom": paramTms.nom, //nom de l'événement
	        "track_cible": paramTms.cible, //nom de la cible
	        "track_type_evt": "erreur"
	    });
    }
}

function TmsClickEvents(elm, cible) {
    var page = elm.getAttribute('TagPage');
    var zone = elm.getAttribute('TagZone');
    var nom = elm.getAttribute('TagNom');

    if (cible) {
        cible = elm.getAttribute('TagTarget');
        var paramTms = { page: page, zone: zone, nom: nom, cible: cible };
        MiseEnFormeTagTms(paramTms); 
        TmsClickEvent(paramTms.page, paramTms.zone, paramTms.nom, paramTms.cible);
    }
    else {
        var paramTms = { page: page, zone: zone, nom: nom };
        MiseEnFormeTagTms(paramTms);
        TmsClickEvt(paramTms.page, paramTms.zone, paramTms.nom);
    }
}

function TmsIfInvalid(control, validatorTms) {
    var validators = GetValidators(control);
    for (var i = 0; i < validators.length; i++) {
        var span = validators[i];
        if (!span.isvalid) {
            var nom = span.innerText == undefined ? span.textContent : span.innerText;
            TmsClickEvent(validatorTms.getAttribute('tmspage'), validatorTms.getAttribute('tmszone'), nom, validatorTms.getAttribute('tmscible'));
            return;
        }
    }
}

function TmsPushError(control, validatorTms) {
    var validators = GetValidators(control);
    for (var i = 0; i < validators.length; i++) {
        var span = validators[i];
        if (!span.isvalid) {
            TmsPushErrorChamp(span, validatorTms);
            return;
        }
    }
}

function TmsPushErrorChamp(span, validatorTms) {
    var nom = span.innerText == undefined ? span.textContent : span.innerText;
    TmsErrorEvent(validatorTms.getAttribute('tmspage'), validatorTms.getAttribute('tmszone'), nom, validatorTms.getAttribute('tmscible'));
}

function GetValidators(control) {
    if (control.Validators != undefined) return control.Validators;
    var controls = control.getElementsByTagName('input');
    var validators = new Array();
    for (var i = 0; i < controls.length; i++) {
        var span = controls[i].Validators;
        if (span == undefined) continue;
        for (var j = 0; j < span.length; j++) {
            validators.push(span[j]);
        }
    }
    return validators;
}

/*END:https://boutique.orange.fr/medias/newshop/js/misc.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/loadTagTms.js*/
$(document).ready(function () {
    $('span[controlToValidate]').each(function () {
        var validatorTms = this;
        $('#' + this.getAttribute('controltovalidate')).change(function () {
            TmsIfInvalid(this, validatorTms);
        });
    });
    $('.ValidateTms').click(function () {
        setTimeout(ValidateTagTms, 500);
    });
});

function ValidateTagTms() {
    $('span[controlToValidate]').each(function () {
        var validatorTms = this;
        if ($(validatorTms).attr('class') == 'tag-tms-doublon') return;
        var champs = $('#' + this.getAttribute('controltovalidate'));
        var count = champs.length;
        for (var i = 0; i < count; i++) {
            TmsPushError(champs[i], validatorTms);
        }
    });
};
/*END:https://boutique.orange.fr/medias/newshop/js/loadTagTms.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/test-cookies.js*/
// Verification de l'activation des cookies
$(document).ready(function () {

    //var accepteCookies = (navigator.cookieEnabled) ? true : false;
     var cookies = navigator.cookieEnabled ||
        ("cookie" in document && (document.cookie.length > 0 || (document.cookie = "test").indexOf.call(document.cookie, "test") > -1));

    var boutique = $('input[name="input-name-boutique"]').val();

    if (!cookies) {
        if(boutique == "sosh"){
            window.location.href = 'http://' + window.location.host + '/erreur-cookies-sosh.html';
        } else {
            if (boutique == "sosh-mobile") {
                window.location.href = 'http://' + window.location.host + '/erreur-cookies-sosh-m.html';
            } else {
                window.location.href = 'http://' + window.location.host + '/erreur-cookies-acqmob.html';
            }
        }
    } 

});
/*END:https://boutique.orange.fr/medias/newshop/js/test-cookies.js*/


/*BEGIN:http://c.woopic.com/oshare/js/share.min.js*/
(function(a,b){if(a.oShare){return false}a.oShare=new function(){var f=this,e={confId:null,className:"share-enabled",allowXhrCalls:true,debug:false,fb:{appId:null}},c=null,h=false,j={},g={},i=[];f.getConfId=function(){return e.confId};f.getUser=function(){return c};f.isXHRAllowed=function(){return(e.allowXhrCalls==true)};f.storage=new function(){var m=this,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function l(s){if(s){var q="",B,z,x,A,y,w,v,r=0,u=s.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{A=n.indexOf(u.charAt(r++));y=n.indexOf(u.charAt(r++));w=n.indexOf(u.charAt(r++));v=n.indexOf(u.charAt(r++));B=(A<<2)|(y>>4);z=((y&15)<<4)|(w>>2);x=((w&3)<<6)|v;q+=String.fromCharCode(B);if(w!==64){q+=String.fromCharCode(z)}if(v!==64){q+=String.fromCharCode(x)}}while(r<u.length);try{return JSON.parse(q)}catch(t){}}return{}}function o(s){s=JSON.stringify(s);var q="",z,x,v,y,w,u,t,r=0;do{z=s.charCodeAt(r++);x=s.charCodeAt(r++);v=s.charCodeAt(r++);y=z>>2;w=((z&3)<<4)|(x>>4);u=((x&15)<<2)|(v>>6);t=v&63;if(isNaN(x)){u=t=64}else{if(isNaN(v)){t=64}}q+=n.charAt(y)+n.charAt(w)+n.charAt(u)+n.charAt(t)}while(r<s.length);return q}function p(){var s="test",r="testval";if(typeof localStorage!=="undefined"){try{localStorage.setItem(s,r);if(localStorage.getItem(s)===r){return true}}catch(q){}}return false}m.get=function(r,q){if(k){var s=localStorage.getItem(r);return(q&&s?l(s):s)}return null};m.set=function(r,s,q,t){if(k){if(t){s=o(s)}localStorage.setItem(r,s)}return m};m.clear=function(q){q?localStorage.removeItem(q):localStorage.clear()};var k=p()};f.cookies=new function(t,s,x){var v=this,m=[],p,q;function o(){var z="testcookie",y=v.set(z,1).get(z)==="1";v.expire(z);return y}function l(y){var z=y.indexOf("=");z=z<0?y.length:z;return{key:decodeURIComponent(y.substr(0,z)),value:decodeURIComponent(y.substr(z+1))}}function k(y){var A={},C=y?y.split("; "):[],B;for(var z=0;z<C.length;z++){B=l(C[z]);if(A[B.key]===b){A[B.key]=B.value}}return A}function n(y){return Object.prototype.toString.call(y)==="[object Date]"&&!isNaN(y.getTime())}function u(y,z){z=z||new Date();switch(typeof y){case"number":y=new Date(z.getTime()+y*1000);break;case"string":y=new Date(y);break}if(y&&!n(y)){throw new Error("`expires` parameter cannot be converted to a valid Date instance")}return y}function r(z,B,y){z=z.replace(/[^#$&+\^`|]/g,encodeURIComponent);z=z.replace(/\(/g,"%28").replace(/\)/g,"%29");B=(B+"").replace(/[^!#$&+\:<\[\]~]/g,encodeURIComponent);y=y||{};var A=z+"="+B;A+=y.path?";path="+y.path:"";A+=y.domain?";domain="+y.domain:"";A+=y.expires?";expires="+y.expires.toUTCString():"";A+=y.secure?";secure":"";return A}function w(){m=k(document.cookie);p=document.cookie}v.get=function(y){if(p!==document.cookie){w()}return m[y]};v.set=function(z,A,y){y={path:y&&y.path||"/",domain:y&&y.domain||null,expires:y&&y.expires||null,secure:y&&y.secure!==b?y.secure:null};y.expires=u(A===b?1:y.expires);document.cookie=r(z,A,y);return v};v.expire=function(z,y){return v.set(z,b,y)};q=o()};function d(){function k(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)}return k()+k()+k()}f.log=function(m,l,k){if(e.debug&&typeof console!=="undefined"&&typeof console[l]==="function"){l=l||"log";k=k||"oShare Core";console[l]("["+k+"] "+m)}};f.setAdapter=function(k){for(var l in k){f[l]=k[l]}};f.init=function(k){e=f.extend(e,(k||{}))};f.load=function(){var k=f.get("[class^=osocial-]"),q;i=[];if(!h){var s=document.getElementsByTagName("head")[0],r=document.createElement("link");r.type="text/css";r.rel="stylesheet";r.href="//c.woopic.com/oshare/css/share.css?1453279306";s.appendChild(r);h=true}if(!c){var p="__osocial",n=f.storage.get(p);if(n){c=n}else{var l=f.cookies.get(p),t=new Date();if(l){c=l}else{c=d()}t.setDate(t.getDate()+90);f.storage.set(p,f.user,{expires:t.toGMTString()})}}if(typeof a.oShareInit==="function"){a.oShareInit()}var m=new RegExp(e.className);for(var o=0;o<k.length;o++){if(m.test(k[o].className)===false){q=k[o].className.match(/osocial-([a-z]+)( |$)/);if(q[1]!==null&&typeof j[q[1]]!=="undefined"){i.push(new j[q[1]](k[o],f));f.addClass(k[o],e.className)}}}f.trigger("oShareInitialized")};f.reload=function(k){for(var l=0;l<i.length;l++){if(typeof i[l].reload==="function"){i[l].reload(k)}}};f.registerPlugin=function(k,l){if(typeof j[k]!=="function"){j[k]=l}else{f.log("Plugin "+k+" already defined","warn")}};f.setCache=function(m,k,l){if(typeof g[m]==="undefined"){g[m]={}}g[m][k]=l};f.getCache=function(l,k){if(typeof g[l]!=="undefined"){return g[l][k]}return null}};if(a.addEventListener){a.addEventListener("load",oShare.load,false)}else{if(a.attachEvent){a.attachEvent("onload",oShare.load)}}})(window);oShare.setAdapter({extend:function(c,b){for(var a in b){if(typeof c[a]!=="object"||typeof b[a]!=="object"){c[a]=b[a]}else{c[a]=oShare.extend(c[a],b[a])}}return c},get:function(a,b){if(b===undefined){b=document}return b.querySelectorAll(a)},isDOMNode:function(a){return(a.nodeType===1||a.nodeType===11||a.nodeType===9)},addClass:function(c,b){if(oShare.isDOMNode(c)){c=[c]}for(var a=0;a<c.length;a++){if(!oShare.hasClass(c[a],b)){c[a].className+=" "+b}}},hasClass:function(b,a){return b.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"))},removeClass:function(c,b){if(oShare.isDOMNode(c)){c=[c]}for(var a=0;a<c.length;a++){c[a].className=c[a].className.replace(new RegExp("(\\s|^)"+b+"(\\s|$)")," ")}},data:function(b,j,h){function c(l){var i=/-([\da-z])/gi;return l.replace(i,function(m,n){return n.toUpperCase()})}function d(m){try{var i=JSON.parse(m);if(i){m=i}}catch(l){}if(typeof m=="string"&&(m=="false"||m=="true")){m=m=="true"}return m}var a,g,k=b&&b.attributes,f=k.length,e;if(f&&b.nodeType===1){while(f--){if(k[f]){a=k[f].name;if(a.indexOf("data-")===0){a=c(a.slice(5));if(j!==undefined&&a===j){return d(k[f].value)}else{if(j===undefined){g?null:g={};g[a]=d(k[f].value)}}}}}}return g},html:function(c,b){for(var a=0;a<c.length;a++){c[a].innerHTML=b}},ajax:function(i){if(oShare.isXHRAllowed()){var f={async:true,type:"GET",dataType:"json",data:{},url:"",success:function(){},error:function(){},cache:false},h;i=oShare.extend(f,i);if(window.XMLHttpRequest){h=new XMLHttpRequest()}else{if(window.ActiveXObject){try{h=new ActiveXObject("Msxml2.XMLHTTP")}catch(d){try{h=new ActiveXObject("Microsoft.XMLHTTP")}catch(g){h=null}}}}if(h){var a=null,b="";if(typeof i.data!=="string"){for(var c in i.data){b+=(b!=""?"&":"")+c+"="+i.data[c]}}else{b=i.data}if(i.type==="GET"&&b!==""){i.url=[i.url,b].join((i.url.indexOf("?")>-1)?"&":"?")}h.open(i.type,i.url,i.async);h.onreadystatechange=function(){if(h.readyState==4&&h.status==200){if(i.dataType==="json"){try{a=JSON.parse(h.responseText)}catch(j){a={}}}else{a=h.responseText}if(typeof i.success==="function"){i.success(a)}}else{if(h.readyState==4&&typeof i.error==="function"){i.error(h.status,h.responseText)}}};if(i.type==="GET"){h.send(null)}else{h.setRequestHeader("Content-Type","application/x-www-form-urlencoded");h.send(b)}}}},prepend:function(a,b){if(oShare.isDOMNode(a)){a.insertBefore(b,a.firstChild)}},append:function(a,b){if(oShare.isDOMNode(a)){a.appendChild(b)}},create:function(b){var c=/^<([\w]+)(?:\s*)([^>]+)?(?:\s*)>(.*)<\/[\w]+>$/,e=b.match(c);if(e){var d=document.createElement(e[1]);d.innerHTML=e[3];e[2]=e[2].replace(/^\s+|\s+$/gm,"");if(e[2].length){var f=/([\w]+)=(?:'|")([^"']+)(?:'|")\s*/g,a;while(a=f.exec(e[2])){if(a[1]!=="class"){d[a[1]]=a[2]}else{d.className=a[2]}}}}return d},on:function(e,d,c,a){function b(g){c.apply(e,[a||null,g])}if(e.addEventListener){e.addEventListener(d,b,false)}else{if(e.attachEvent){var f=/click|mousedown|mouseup|keydown|keyup|mouseover|mouseout|mouseenter/i;if(f.test(d)){d="on"+d}e.attachEvent(d,b)}}},trigger:function(a,b,f){f=f||{};b=b||document;try{new CustomEvent("test")}catch(d){if(!document.createEvent){return false}window.CustomEvent=function(e,g){function i(j,l){var k=document.createEvent(e);if(j!=null){h.call(k,j,(l||(l=g)).bubbles,l.cancelable,l.detail)}else{k.initCustomEvent=h}return k}function h(m,k,j,l){this["init"+e](m,k,j,l);"detail" in this||(this.detail=l)}return i}(window.CustomEvent?"CustomEvent":"Event",{bubbles:false,cancelable:false,detail:null})}var c=new CustomEvent(a,{detail:f});b.dispatchEvent(c)},attr:function(b,a,c){if(c===undefined){if(b.getAttribute){return b.getAttribute(a)}return null}else{if(b.setAttribute){return b.setAttribute(a,c)}}return b}});oShare.registerPlugin("share",function(j){var f=this,b={},d="oshare",p="//pms.orange.fr/module/socialgraf/"+oShare.getConfId()+"/shares/",c="Share Plugin",h={networks:["facebook","twitter","googleplus","linkedin","pinterest"],action:"share",caption:"partagez",count:null,url:null,text:document.title,shortenTotal:false,enableCounter:true,enableTracking:true,trackingMode:"gstat",comscoreTag:"",usePlugins:false,showShared:false,skin:"",facebook:{layout:"button_count",width:"",send:"false",faces:"false",colorscheme:"",font:"",lang:"fr_FR",name:"Facebook",shortname:"fb",text:""},twitter:{count:"horizontal",hashtags:"",via:"",related:"",lang:"fr",name:"Twitter",shortname:"tw",dnt:true,text:""},googleplus:{size:"medium",lang:"fr-FR",annotation:"bubble",name:"Google+",shortname:"gp",text:""},linkedin:{counter:"right",name:"LinkedIn",lang:"fr_FR",shortname:"in",text:"",summary:""},pinterest:{media:"",layout:"beside",color:"white",name:"Pinterest",shortname:"pin",text:""},viadeo:{text:"",encodeURL:false,shortname:"via",name:"Viadeo"}};f.id="share";function r(){var u,t,s,w,x=oShare.storage.get(d,true),v;for(u=0;u<h.networks.length;u++){t=h.networks[u];s=h[t];if(!h.usePlugins){v="oshare-bt "+s.shortname+" o_r_url_social_"+t;if(x&&x[h.url]&&x[h.url][t]){v+=" shared"}w=oShare.create('<a href="#" class="'+v+'" title="Partager sur '+s.name+'"><i class="icon-'+t+'"></i></a>');w.networkId=t;oShare.on(w,"click",function(y,z){if(z.preventDefault){z.preventDefault()}else{z.returnValue=false}a(this);i(y.network.name,this.href.substring(0,this.href.length-1))},{network:s});oShare.append(b,w)}else{k(t)}}}function n(t){if(h.enableCounter!==true){m(0)}var s=oShare.getCache(f.id,h.url);if(!s){s={refs:[f],count:{total:"undefined"}}}if(typeof t!=="undefined"){s.count.total=t}if(typeof s.count.total==="string"){if(h.count!==null){s.count.total=h.count}else{if(s.count.total==="pending"){setTimeout(function(){n()},200);return false}else{if(oShare.getConfId()){s.count.total="pending";oShare.setCache(f.id,h.url,s);oShare.ajax({url:p+encodeURIComponent(encodeURIComponent(h.url))+"?format=json",success:function(w){n(w.total)},error:function(){n(0)}});return false}}}}m(s.count.total);var v=false;for(var u=0;u<s.refs.length;u++){if(s.refs[u]==f){v=true;break}}if(!v){s.refs.push(f)}oShare.setCache(f.id,h.url,s)}function g(s){if(s>=1000000){s=(s/1000000).toFixed(2)+"M"}else{if(s>=1000){s=(s%1000===0)?(s/1000):(s/1000).toFixed(1);s+="k"}}return s}function m(v){v=(Number(v)===v&&v%1===0)?v:0;var u=oShare.get(".oshare-count",b),s=v?(h.shortenTotal?g(v):v):"",t=v?("partage"+(v>1?"s":"")):h.caption;if(!u.length){u=oShare.create('<span class="oshare-count"></span>');oShare.prepend(b,u)}else{u=u[0]}u.innerHTML='<span class="count">'+s+'</span> <span class="label'+(!v?" solo":"")+'">'+t+"</span>"}function o(s){var u,t=oShare.getCache(f.id,h.url);t.count[s]++;t.count.total++;for(u in t.refs){t.refs[u].showCount(t.count.total)}oShare.setCache(f.id,h.url,t);e(s)}function a(w){var y=w.networkId,t=h,s=(typeof t[y].url!=="undefined"&&t[y].url!="")?t[y].url:t.url,z=t[y].text!==""?encodeURIComponent(t[y].text):encodeURIComponent(t.text),x;if(typeof t[y].encodeURL=="undefined"||t[y].encodeURL==true){s=encodeURIComponent(s)}switch(y){case"facebook":x=window.open("https://www.facebook.com/sharer/sharer.php?u="+s,"","toolbar=0, status=0, width=900, height=500");break;case"twitter":x=window.open("https://twitter.com/intent/tweet?text="+z+"&url="+s+(t[y].via!==""?"&via="+t[y].via:""),"","toolbar=0, status=0, width=650, height=360");break;case"googleplus":x=window.open("https://plus.google.com/share?hl="+t[y].lang+"&url="+s,"","toolbar=0, status=0, width=900, height=500");break;case"linkedin":x=window.open("https://www.linkedin.com/shareArticle?mini=true&url="+s+"&title="+z+(t[y].summary!==""?"&summary="+encodeURIComponent(t[y].summary):""),"linkedin","toolbar=no,width=550,height=550");break;case"pinterest":var v=(typeof t[y].media!=="undefined"&&t[y].media!="")?encodeURIComponent(t[y].media):"";if(v===""){var A=oShare.get('meta[property="og:image"]');if(A){v=oShare.attr(A,"content");v?encodeURIComponent(t[y].media):null}}x=window.open("https://pinterest.com/pin/create/button/?url="+s+(v?"&media="+v:"")+"&description="+z,"pinterest","toolbar=no,width=700,height=300");break;case"viadeo":x=window.open("https://www.viadeo.com/shareit/share/?url="+s+"&title="+z+"&urllanguage=fr","viadeo","toolbar=no,width=550,height=550");break}if(x){var u=window.setInterval(function(){try{if(x==null||x.closed){window.clearInterval(u);if(t.showShared){oShare.addClass(w,"shared")}q(y);e(y)}}catch(B){}},1000)}}function q(s){var u=oShare.storage.get(d,true);if(!u||!u[h.url]||!u[h.url][s]){if(!u){u=[]}if(!u[h.url]){u[h.url]={}}u[h.url][s]=1;var t=new Date();t.setDate(t.getDate()+7);oShare.storage.set(d,u,{expires:t.toGMTString()},true)}}function k(u){opt=h[u];var w=encodeURIComponent(h.url),y=encodeURIComponent(h.text);switch(u){case"googleplus":oShare.append(b,'<div class="oshare-pbt googleplus"><div class="g-plusone" data-size="'+opt.size+'" data-href="'+w+'" data-annotation="'+opt.annotation+'"></div></div>');window.___gcfg={lang:h.googleplus.lang};if(typeof gapi==="undefined"){var x=document.getElementsByTagName("script")[0],v=document.createElement("script");v.type="text/javascript";v.async=true;v.src="//apis.google.com/js/plusone.js";x.parentNode.insertBefore(v,x)}else{gapi.plusone.go()}break;case"facebook":oShare.append(b,'<div class="oshare-pbt facebook"><div id="fb-root"></div><div class="fb-like" data-href="'+w+'" data-send="'+opt.send+'" data-layout="'+opt.layout+'" data-width="'+opt.width+'" data-show-faces="'+opt.faces+'" data-action="'+opt.action+'" data-colorscheme="'+opt.colorscheme+'" data-font="'+opt.font+'"></div></div>');if(typeof FB==="undefined"){(function(D,A,E){var C,B=D.getElementsByTagName(A)[0];if(D.getElementById(E)){return}C=D.createElement(A);C.id=E;C.src="//connect.facebook.net/"+opt.lang+"/all.js#xfbml=1";B.parentNode.insertBefore(C,B)}(document,"script","facebook-jssdk"))}else{FB.XFBML.parse()}break;case"twitter":oShare.append(b,'<div class="oshare-pbt twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+w+'" data-count="'+opt.count+'" data-text="'+y+'" data-via="'+opt.via+'" data-hashtags="'+opt.hashtags+'" data-related="'+opt.related+'" data-lang="'+opt.lang+'">Tweet</a></div>');if(typeof twttr==="undefined"){var z=document.createElement("script"),x=document.getElementsByTagName("script")[0];z.type="text/javascript";z.async=true;z.src="//platform.twitter.com/widgets.js";x.parentNode.insertBefore(z,x)}else{$oShare.ajax({url:"//platform.twitter.com/widgets.js",dataType:"script",cache:true})}break;case"linkedin":oShare.append(b,'<div class="oshare-pbt linkedin"><script type="IN/Share" data-url="'+w+'" data-counter="'+opt.counter+'"><\/script></div>');if(typeof window.IN==="undefined"){var t=document.createElement("script"),x=document.getElementsByTagName("script")[0];t.type="text/javascript";t.async=true;t.src="//platform.linkedin.com/in.js";t.innerHTML="lang: "+opt.lang;x.parentNode.insertBefore(t,x)}else{window.IN.init()}break;case"pinterest":oShare.append(b,'<div class="oshare-pbt pinterest"><a href="https://pinterest.com/pin/create/button/?url='+w+"&media="+opt.media+"&description="+y+'" data-pin-do="buttonPin" data-pin-config="'+opt.layout+'" data-pin-color="'+opt.color+'">Pin It</a></div>');var t=document.createElement("script"),x=document.getElementsByTagName("script")[0];t.type="text/javascript";t.async=true;t.src="//assets.pinterest.com/js/pinit.js";x.parentNode.insertBefore(t,x);break}}function e(s){if(oShare.getConfId()){var t=oShare.get('meta[property="og:title"]'),u="";if(t){u=oShare.attr(t,"content")}oShare.ajax({url:p+encodeURIComponent(encodeURIComponent(h.url))+"?format=json",type:"POST",data:{user:oShare.getUser(),nw:s,_id:h.url,title:u?u:"",category:"",action:f.id}})}}function i(t,u){if(h.enableTracking===true){if(h.trackingMode.toLowerCase()==="gstat"){if(typeof o_changeAllLinks==="function"){oShare.ajax({url:u})}}else{if(h.trackingMode.toLowerCase()==="comscore"){if(h.comscoreTag.length&&typeof utag!=="undefined"&&utag.link){var s=h.comscoreTag.split(",");if(s.length>=2){utag.link({track_page:encodeURIComponent(s[0].replace(/^\s+|\s+$/g,"")),track_zone:encodeURIComponent(s[1].replace(/^\s+|\s+$/g,"")),track_nom:"share "+t,track_type_evt:"clic"})}else{oShare.log("Comscore tag not found or invalid (should be 2 parameters, "+s.length+" found)","warn",c)}}}}}}function l(t){b=t;h=oShare.extend(h,oShare.data(t));if(!h.url){var u=document.querySelector?document.querySelector("link[rel='canonical']"):null;h.url=u?u.href:document.location.href}if(h.skin!==""){oShare.addClass(t,h.skin)}if(typeof h.networks==="string"){h.networks=h.networks.split(",");for(var s=0;s<h.networks.length;s++){h.networks[s]=h.networks[s].replace(/^\s+|\s+$/g,"")}}r();if(!h.usePlugins){n()}if(h.enableTracking===true&&h.trackingMode.toLowerCase()==="gstat"&&typeof o_changeAllLinks==="function"&&b){o_changeAllLinks([b])}}f.reload=function(s){b.innerHTML="";if(typeof s!=="undefined"){oShare.data(b,"url",s)}l(b)};l(j)});
/*END:http://c.woopic.com/oshare/js/share.min.js*/


/*BEGIN:http://c.woopic.com/oshare/js/jquery.share.min.js*/
(function(a,b){if(a.oShare){return false}a.oShare=new function(){var f=this,e={confId:null,className:"share-enabled",allowXhrCalls:true,debug:false,fb:{appId:null}},c=null,h=false,j={},g={},i=[];f.getConfId=function(){return e.confId};f.getUser=function(){return c};f.isXHRAllowed=function(){return(e.allowXhrCalls==true)};f.storage=new function(){var m=this,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function l(s){if(s){var q="",B,z,x,A,y,w,v,r=0,u=s.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{A=n.indexOf(u.charAt(r++));y=n.indexOf(u.charAt(r++));w=n.indexOf(u.charAt(r++));v=n.indexOf(u.charAt(r++));B=(A<<2)|(y>>4);z=((y&15)<<4)|(w>>2);x=((w&3)<<6)|v;q+=String.fromCharCode(B);if(w!==64){q+=String.fromCharCode(z)}if(v!==64){q+=String.fromCharCode(x)}}while(r<u.length);try{return JSON.parse(q)}catch(t){}}return{}}function o(s){s=JSON.stringify(s);var q="",z,x,v,y,w,u,t,r=0;do{z=s.charCodeAt(r++);x=s.charCodeAt(r++);v=s.charCodeAt(r++);y=z>>2;w=((z&3)<<4)|(x>>4);u=((x&15)<<2)|(v>>6);t=v&63;if(isNaN(x)){u=t=64}else{if(isNaN(v)){t=64}}q+=n.charAt(y)+n.charAt(w)+n.charAt(u)+n.charAt(t)}while(r<s.length);return q}function p(){var s="test",r="testval";if(typeof localStorage!=="undefined"){try{localStorage.setItem(s,r);if(localStorage.getItem(s)===r){return true}}catch(q){}}return false}m.get=function(r,q){if(k){var s=localStorage.getItem(r);return(q&&s?l(s):s)}return null};m.set=function(r,s,q,t){if(k){if(t){s=o(s)}localStorage.setItem(r,s)}return m};m.clear=function(q){q?localStorage.removeItem(q):localStorage.clear()};var k=p()};f.cookies=new function(t,s,x){var v=this,m=[],p,q;function o(){var z="testcookie",y=v.set(z,1).get(z)==="1";v.expire(z);return y}function l(y){var z=y.indexOf("=");z=z<0?y.length:z;return{key:decodeURIComponent(y.substr(0,z)),value:decodeURIComponent(y.substr(z+1))}}function k(y){var A={},C=y?y.split("; "):[],B;for(var z=0;z<C.length;z++){B=l(C[z]);if(A[B.key]===b){A[B.key]=B.value}}return A}function n(y){return Object.prototype.toString.call(y)==="[object Date]"&&!isNaN(y.getTime())}function u(y,z){z=z||new Date();switch(typeof y){case"number":y=new Date(z.getTime()+y*1000);break;case"string":y=new Date(y);break}if(y&&!n(y)){throw new Error("`expires` parameter cannot be converted to a valid Date instance")}return y}function r(z,B,y){z=z.replace(/[^#$&+\^`|]/g,encodeURIComponent);z=z.replace(/\(/g,"%28").replace(/\)/g,"%29");B=(B+"").replace(/[^!#$&+\:<\[\]~]/g,encodeURIComponent);y=y||{};var A=z+"="+B;A+=y.path?";path="+y.path:"";A+=y.domain?";domain="+y.domain:"";A+=y.expires?";expires="+y.expires.toUTCString():"";A+=y.secure?";secure":"";return A}function w(){m=k(document.cookie);p=document.cookie}v.get=function(y){if(p!==document.cookie){w()}return m[y]};v.set=function(z,A,y){y={path:y&&y.path||"/",domain:y&&y.domain||null,expires:y&&y.expires||null,secure:y&&y.secure!==b?y.secure:null};y.expires=u(A===b?1:y.expires);document.cookie=r(z,A,y);return v};v.expire=function(z,y){return v.set(z,b,y)};q=o()};function d(){function k(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)}return k()+k()+k()}f.log=function(m,l,k){if(e.debug&&typeof console!=="undefined"&&typeof console[l]==="function"){l=l||"log";k=k||"oShare Core";console[l]("["+k+"] "+m)}};f.setAdapter=function(k){for(var l in k){f[l]=k[l]}};f.init=function(k){e=f.extend(e,(k||{}))};f.load=function(){var k=f.get("[class^=osocial-]"),q;i=[];if(!h){var s=document.getElementsByTagName("head")[0],r=document.createElement("link");r.type="text/css";r.rel="stylesheet";r.href="//c.woopic.com/oshare/css/share.css?1453279306";s.appendChild(r);h=true}if(!c){var p="__osocial",n=f.storage.get(p);if(n){c=n}else{var l=f.cookies.get(p),t=new Date();if(l){c=l}else{c=d()}t.setDate(t.getDate()+90);f.storage.set(p,f.user,{expires:t.toGMTString()})}}if(typeof a.oShareInit==="function"){a.oShareInit()}var m=new RegExp(e.className);for(var o=0;o<k.length;o++){if(m.test(k[o].className)===false){q=k[o].className.match(/osocial-([a-z]+)( |$)/);if(q[1]!==null&&typeof j[q[1]]!=="undefined"){i.push(new j[q[1]](k[o],f));f.addClass(k[o],e.className)}}}f.trigger("oShareInitialized")};f.reload=function(k){for(var l=0;l<i.length;l++){if(typeof i[l].reload==="function"){i[l].reload(k)}}};f.registerPlugin=function(k,l){if(typeof j[k]!=="function"){j[k]=l}else{f.log("Plugin "+k+" already defined","warn")}};f.setCache=function(m,k,l){if(typeof g[m]==="undefined"){g[m]={}}g[m][k]=l};f.getCache=function(l,k){if(typeof g[l]!=="undefined"){return g[l][k]}return null}};if(a.addEventListener){a.addEventListener("load",oShare.load,false)}else{if(a.attachEvent){a.attachEvent("onload",oShare.load)}}})(window);(function(b,a,c){if(a===c){throw"oShare was not defined"}a.setAdapter({extend:function(e,d){return b.extend(true,e,d)},get:function(d,e){if(e!==c){return b(e).find(d)}else{return b(d)}},addClass:function(e,d){b(e).addClass(d)},data:function(e,d,f){if(d&&typeof f!=="undefined"){return b(e).data(d,f)}else{return b(e).data(d)}},html:function(e,d){b(e).html(d)},ajax:function(d){a.isXHRAllowed()&&b.ajax(d)},prepend:function(d,e){b(d).prepend(e)},append:function(d,e){b(d).append(e)},create:function(d){return b(d)[0]},on:function(g,f,e,d){b(g).on(f,b.proxy(e,g,d||null))},trigger:function(e,d,f){f=f||{};d=d||document;b(d).trigger(e,f)},attr:function(e,d,f){if(f===c){return b(e).attr(d)}return b(e).attr(d,f)}})})(jQuery,oShare);oShare.registerPlugin("share",function(j){var f=this,b={},d="oshare",p="//pms.orange.fr/module/socialgraf/"+oShare.getConfId()+"/shares/",c="Share Plugin",h={networks:["facebook","twitter","googleplus","linkedin","pinterest"],action:"share",caption:"partagez",count:null,url:null,text:document.title,shortenTotal:false,enableCounter:true,enableTracking:true,trackingMode:"gstat",comscoreTag:"",usePlugins:false,showShared:false,skin:"",facebook:{layout:"button_count",width:"",send:"false",faces:"false",colorscheme:"",font:"",lang:"fr_FR",name:"Facebook",shortname:"fb",text:""},twitter:{count:"horizontal",hashtags:"",via:"",related:"",lang:"fr",name:"Twitter",shortname:"tw",dnt:true,text:""},googleplus:{size:"medium",lang:"fr-FR",annotation:"bubble",name:"Google+",shortname:"gp",text:""},linkedin:{counter:"right",name:"LinkedIn",lang:"fr_FR",shortname:"in",text:"",summary:""},pinterest:{media:"",layout:"beside",color:"white",name:"Pinterest",shortname:"pin",text:""},viadeo:{text:"",encodeURL:false,shortname:"via",name:"Viadeo"}};f.id="share";function r(){var u,t,s,w,x=oShare.storage.get(d,true),v;for(u=0;u<h.networks.length;u++){t=h.networks[u];s=h[t];if(!h.usePlugins){v="oshare-bt "+s.shortname+" o_r_url_social_"+t;if(x&&x[h.url]&&x[h.url][t]){v+=" shared"}w=oShare.create('<a href="#" class="'+v+'" title="Partager sur '+s.name+'"><i class="icon-'+t+'"></i></a>');w.networkId=t;oShare.on(w,"click",function(y,z){if(z.preventDefault){z.preventDefault()}else{z.returnValue=false}a(this);i(y.network.name,this.href.substring(0,this.href.length-1))},{network:s});oShare.append(b,w)}else{k(t)}}}function n(t){if(h.enableCounter!==true){m(0)}var s=oShare.getCache(f.id,h.url);if(!s){s={refs:[f],count:{total:"undefined"}}}if(typeof t!=="undefined"){s.count.total=t}if(typeof s.count.total==="string"){if(h.count!==null){s.count.total=h.count}else{if(s.count.total==="pending"){setTimeout(function(){n()},200);return false}else{if(oShare.getConfId()){s.count.total="pending";oShare.setCache(f.id,h.url,s);oShare.ajax({url:p+encodeURIComponent(encodeURIComponent(h.url))+"?format=json",success:function(w){n(w.total)},error:function(){n(0)}});return false}}}}m(s.count.total);var v=false;for(var u=0;u<s.refs.length;u++){if(s.refs[u]==f){v=true;break}}if(!v){s.refs.push(f)}oShare.setCache(f.id,h.url,s)}function g(s){if(s>=1000000){s=(s/1000000).toFixed(2)+"M"}else{if(s>=1000){s=(s%1000===0)?(s/1000):(s/1000).toFixed(1);s+="k"}}return s}function m(v){v=(Number(v)===v&&v%1===0)?v:0;var u=oShare.get(".oshare-count",b),s=v?(h.shortenTotal?g(v):v):"",t=v?("partage"+(v>1?"s":"")):h.caption;if(!u.length){u=oShare.create('<span class="oshare-count"></span>');oShare.prepend(b,u)}else{u=u[0]}u.innerHTML='<span class="count">'+s+'</span> <span class="label'+(!v?" solo":"")+'">'+t+"</span>"}function o(s){var u,t=oShare.getCache(f.id,h.url);t.count[s]++;t.count.total++;for(u in t.refs){t.refs[u].showCount(t.count.total)}oShare.setCache(f.id,h.url,t);e(s)}function a(w){var y=w.networkId,t=h,s=(typeof t[y].url!=="undefined"&&t[y].url!="")?t[y].url:t.url,z=t[y].text!==""?encodeURIComponent(t[y].text):encodeURIComponent(t.text),x;if(typeof t[y].encodeURL=="undefined"||t[y].encodeURL==true){s=encodeURIComponent(s)}switch(y){case"facebook":x=window.open("https://www.facebook.com/sharer/sharer.php?u="+s,"","toolbar=0, status=0, width=900, height=500");break;case"twitter":x=window.open("https://twitter.com/intent/tweet?text="+z+"&url="+s+(t[y].via!==""?"&via="+t[y].via:""),"","toolbar=0, status=0, width=650, height=360");break;case"googleplus":x=window.open("https://plus.google.com/share?hl="+t[y].lang+"&url="+s,"","toolbar=0, status=0, width=900, height=500");break;case"linkedin":x=window.open("https://www.linkedin.com/shareArticle?mini=true&url="+s+"&title="+z+(t[y].summary!==""?"&summary="+encodeURIComponent(t[y].summary):""),"linkedin","toolbar=no,width=550,height=550");break;case"pinterest":var v=(typeof t[y].media!=="undefined"&&t[y].media!="")?encodeURIComponent(t[y].media):"";if(v===""){var A=oShare.get('meta[property="og:image"]');if(A){v=oShare.attr(A,"content");v?encodeURIComponent(t[y].media):null}}x=window.open("https://pinterest.com/pin/create/button/?url="+s+(v?"&media="+v:"")+"&description="+z,"pinterest","toolbar=no,width=700,height=300");break;case"viadeo":x=window.open("https://www.viadeo.com/shareit/share/?url="+s+"&title="+z+"&urllanguage=fr","viadeo","toolbar=no,width=550,height=550");break}if(x){var u=window.setInterval(function(){try{if(x==null||x.closed){window.clearInterval(u);if(t.showShared){oShare.addClass(w,"shared")}q(y);e(y)}}catch(B){}},1000)}}function q(s){var u=oShare.storage.get(d,true);if(!u||!u[h.url]||!u[h.url][s]){if(!u){u=[]}if(!u[h.url]){u[h.url]={}}u[h.url][s]=1;var t=new Date();t.setDate(t.getDate()+7);oShare.storage.set(d,u,{expires:t.toGMTString()},true)}}function k(u){opt=h[u];var w=encodeURIComponent(h.url),y=encodeURIComponent(h.text);switch(u){case"googleplus":oShare.append(b,'<div class="oshare-pbt googleplus"><div class="g-plusone" data-size="'+opt.size+'" data-href="'+w+'" data-annotation="'+opt.annotation+'"></div></div>');window.___gcfg={lang:h.googleplus.lang};if(typeof gapi==="undefined"){var x=document.getElementsByTagName("script")[0],v=document.createElement("script");v.type="text/javascript";v.async=true;v.src="//apis.google.com/js/plusone.js";x.parentNode.insertBefore(v,x)}else{gapi.plusone.go()}break;case"facebook":oShare.append(b,'<div class="oshare-pbt facebook"><div id="fb-root"></div><div class="fb-like" data-href="'+w+'" data-send="'+opt.send+'" data-layout="'+opt.layout+'" data-width="'+opt.width+'" data-show-faces="'+opt.faces+'" data-action="'+opt.action+'" data-colorscheme="'+opt.colorscheme+'" data-font="'+opt.font+'"></div></div>');if(typeof FB==="undefined"){(function(D,A,E){var C,B=D.getElementsByTagName(A)[0];if(D.getElementById(E)){return}C=D.createElement(A);C.id=E;C.src="//connect.facebook.net/"+opt.lang+"/all.js#xfbml=1";B.parentNode.insertBefore(C,B)}(document,"script","facebook-jssdk"))}else{FB.XFBML.parse()}break;case"twitter":oShare.append(b,'<div class="oshare-pbt twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+w+'" data-count="'+opt.count+'" data-text="'+y+'" data-via="'+opt.via+'" data-hashtags="'+opt.hashtags+'" data-related="'+opt.related+'" data-lang="'+opt.lang+'">Tweet</a></div>');if(typeof twttr==="undefined"){var z=document.createElement("script"),x=document.getElementsByTagName("script")[0];z.type="text/javascript";z.async=true;z.src="//platform.twitter.com/widgets.js";x.parentNode.insertBefore(z,x)}else{$oShare.ajax({url:"//platform.twitter.com/widgets.js",dataType:"script",cache:true})}break;case"linkedin":oShare.append(b,'<div class="oshare-pbt linkedin"><script type="IN/Share" data-url="'+w+'" data-counter="'+opt.counter+'"><\/script></div>');if(typeof window.IN==="undefined"){var t=document.createElement("script"),x=document.getElementsByTagName("script")[0];t.type="text/javascript";t.async=true;t.src="//platform.linkedin.com/in.js";t.innerHTML="lang: "+opt.lang;x.parentNode.insertBefore(t,x)}else{window.IN.init()}break;case"pinterest":oShare.append(b,'<div class="oshare-pbt pinterest"><a href="https://pinterest.com/pin/create/button/?url='+w+"&media="+opt.media+"&description="+y+'" data-pin-do="buttonPin" data-pin-config="'+opt.layout+'" data-pin-color="'+opt.color+'">Pin It</a></div>');var t=document.createElement("script"),x=document.getElementsByTagName("script")[0];t.type="text/javascript";t.async=true;t.src="//assets.pinterest.com/js/pinit.js";x.parentNode.insertBefore(t,x);break}}function e(s){if(oShare.getConfId()){var t=oShare.get('meta[property="og:title"]'),u="";if(t){u=oShare.attr(t,"content")}oShare.ajax({url:p+encodeURIComponent(encodeURIComponent(h.url))+"?format=json",type:"POST",data:{user:oShare.getUser(),nw:s,_id:h.url,title:u?u:"",category:"",action:f.id}})}}function i(t,u){if(h.enableTracking===true){if(h.trackingMode.toLowerCase()==="gstat"){if(typeof o_changeAllLinks==="function"){oShare.ajax({url:u})}}else{if(h.trackingMode.toLowerCase()==="comscore"){if(h.comscoreTag.length&&typeof utag!=="undefined"&&utag.link){var s=h.comscoreTag.split(",");if(s.length>=2){utag.link({track_page:encodeURIComponent(s[0].replace(/^\s+|\s+$/g,"")),track_zone:encodeURIComponent(s[1].replace(/^\s+|\s+$/g,"")),track_nom:"share "+t,track_type_evt:"clic"})}else{oShare.log("Comscore tag not found or invalid (should be 2 parameters, "+s.length+" found)","warn",c)}}}}}}function l(t){b=t;h=oShare.extend(h,oShare.data(t));if(!h.url){var u=document.querySelector?document.querySelector("link[rel='canonical']"):null;h.url=u?u.href:document.location.href}if(h.skin!==""){oShare.addClass(t,h.skin)}if(typeof h.networks==="string"){h.networks=h.networks.split(",");for(var s=0;s<h.networks.length;s++){h.networks[s]=h.networks[s].replace(/^\s+|\s+$/g,"")}}r();if(!h.usePlugins){n()}if(h.enableTracking===true&&h.trackingMode.toLowerCase()==="gstat"&&typeof o_changeAllLinks==="function"&&b){o_changeAllLinks([b])}}f.reload=function(s){b.innerHTML="";if(typeof s!=="undefined"){oShare.data(b,"url",s)}l(b)};l(j)});
/*END:http://c.woopic.com/oshare/js/jquery.share.min.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/scripts/jquery/jquery-ajaxq.js*/
// AjaxQ jQuery Plugin
// Copyright (c) 2012 Foliotek Inc.
// MIT License
// https://github.com/Foliotek/ajaxq
// Uses CommonJS, AMD or browser globals to create a jQuery plugin.

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var queues = {};
    var activeReqs = {};

    // Register an $.ajaxq function, which follows the $.ajax interface, but allows a queue name which will force only one request per queue to fire.
    // opts can be the regular $.ajax settings plainObject, or a callback returning the settings object, to be evaluated just prior to the actual call to $.ajax.
    $.ajaxq = function (qname, opts) {

        if (typeof opts === "undefined") {
            throw ("AjaxQ: queue name is not provided");
        }

        // Will return a Deferred promise object extended with success/error/callback, so that this function matches the interface of $.ajax
        var deferred = $.Deferred(),
            promise = deferred.promise();

        promise.success = promise.done;
        promise.error = promise.fail;
        promise.complete = promise.always;

        // Check whether options are to be evaluated at call time or not.
        var deferredOpts = typeof opts === 'function';
        // Create a deep copy of the arguments, and enqueue this request.
        var clonedOptions = !deferredOpts ? $.extend(true, {}, opts) : null;
        enqueue(function () {
            // Send off the ajax request now that the item has been removed from the queue
            var jqXHR = $.ajax.apply(window, [deferredOpts ? opts() : clonedOptions]);

            // Notify the returned deferred object with the correct context when the jqXHR is done or fails
            // Note that 'always' will automatically be fired once one of these are called: http://api.jquery.com/category/deferred-object/.
            jqXHR.done(function () {
                deferred.resolve.apply(this, arguments);
            });
            jqXHR.fail(function () {
                deferred.reject.apply(this, arguments);
            });

            jqXHR.always(dequeue); // make sure to dequeue the next request AFTER the done and fail callbacks are fired

            return jqXHR;
        });

        return promise;


        // If there is no queue, create an empty one and instantly process this item.
        // Otherwise, just add this item onto it for later processing.
        function enqueue(cb) {
            if (!queues[qname]) {
                queues[qname] = [];
                var xhr = cb();
                activeReqs[qname] = xhr;
            }
            else {
                queues[qname].push(cb);
            }
        }

        // Remove the next callback from the queue and fire it off.
        // If the queue was empty (this was the last item), delete it from memory so the next one can be instantly processed.
        function dequeue() {
            if (!queues[qname]) {
                return;
            }
            var nextCallback = queues[qname].shift();
            if (nextCallback) {
                var xhr = nextCallback();
                activeReqs[qname] = xhr;
            }
            else {
                delete queues[qname];
                delete activeReqs[qname];
            }
        }
    };

    // Register a $.postq and $.getq method to provide shortcuts for $.get and $.post
    // Copied from jQuery source to make sure the functions share the same defaults as $.get and $.post.
    $.each(["getq", "postq"], function (i, method) {
        $[method] = function (qname, url, data, callback, type) {

            if ($.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            return $.ajaxq(qname, {
                type: method === "postq" ? "post" : "get",
                url: url,
                data: data,
                success: callback,
                dataType: type
            });
        };
    });

    var isQueueRunning = function (qname) {
        return (queues.hasOwnProperty(qname) && queues[qname].length > 0) || activeReqs.hasOwnProperty(qname);
    };

    var isAnyQueueRunning = function () {
        for (var i in queues) {
            if (isQueueRunning(i)) return true;
        }
        return false;
    };

    $.ajaxq.isRunning = function (qname) {
        if (qname) return isQueueRunning(qname);
        else return isAnyQueueRunning();
    };

    $.ajaxq.getActiveRequest = function (qname) {
        if (!qname) throw ("AjaxQ: queue name is required");

        return activeReqs[qname];
    };

    $.ajaxq.abort = function (qname) {
        if (!qname) throw ("AjaxQ: queue name is required");

        var current = $.ajaxq.getActiveRequest(qname);
        delete queues[qname];
        delete activeReqs[qname];
        if (current) current.abort();
    };

    $.ajaxq.clear = function (qname) {
        if (!qname) {
            for (var i in queues) {
                if (queues.hasOwnProperty(i)) {
                    queues[i] = [];
                }
            }
        }
        else {
            if (queues[qname]) {
                queues[qname] = [];
            }
        }
    };

}));
/*END:https://boutique.orange.fr/medias/newshop/scripts/jquery/jquery-ajaxq.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/scripts/jquery/eto/jquery-navigation-validate.js*/
/* Extension jQery ajaxValidNav wrapper de la fonction ajax.
 * Gestion de la validation des navigations pour les requêtes AJAX. 
 * La page reference des requêtes AJAX doit implémenter l'interface ETO.Orange.Web.NavigationValidate.INavigationValidate.
 */
; (function ($) {
    /* Nom et selecteur du jeton de validation. */
    var token = {
        name: 'Navigation-Validate-Web',
        selector: '[name="Navigation-Validate-Web"]'
    };

    /* Ajout du jeton de validation en cookie dans la requête XHR. */
    var validNavBefore = function (xhr) {
        var validate = $(token.selector).val();
        if (validate) {
            xhr.setRequestHeader(token.name, validate);
        }
    };

    /* Mise à jour du jeton de retour dans la page. */
    var validNavComplete = function (request) {
        var validate = request.getResponseHeader(token.name);
        if (validate) {
            $(token.selector).val(validate);
        }
    };

    /* Gestion de la validation de la navigation pour la requête XHR. */
    $.ajaxValidNav = function (params) {
        /* Formatage des paramètres. */
        var parameters = $.extend({}, { beforeSend: validNavBefore, complete: validNavComplete }, params);

        /* Gestion de l'envoi du jeton. */
        if (params.beforeSend) {
            parameters.beforeSend = function (xhr) {
                validNavBefore(request);
                params.beforeSend(request);
            };
        }

        /* Gestion de la mise à jour du jeton. */
        if (params.complete) {
            parameters.complete = function (request) {
                validNavComplete(request);
                params.complete(request);
            };
        }

        /* Retourne l'objet AJAX de jQuery. */
        return $.ajaxq(token.name, parameters);
    };
})(jQuery);
/*END:https://boutique.orange.fr/medias/newshop/scripts/jquery/eto/jquery-navigation-validate.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/EtoUpdatePanel.js*/
if (typeof($EtoUpdatePanel) === 'undefined' ) {
var $EtoUpdatePanel = {
    /// <summary>Gestion des EtoUpdatePanel du coté client</summary>
    _updatePanel: new Object(),
    _clientStyleInclude: /^ClientStyleInclude:(.*)$/,
    _addComponentBackup: null,
    _styles: new Array(),
    _scripts: new Array(),
    _inInit: new Array(),
    _inLoad: new Array(),
    _inSearch: new Array(),
    _inRequestStart: new Array(),
    _inRequestEnd: new Array(),
    _inRequestFailed: new Array(),
    _initilisation: function () {
        $EtoUpdatePanel._scripts = new Array();
        $EtoUpdatePanel._styles = new Array();
        $('script[src]').each(function (i, item) {
            var src = $(item).attr('src').replace(/&amp;/g, "&");
            $EtoUpdatePanel._scripts.push(src);
        });
        $('link[rel="stylesheet"], style').each(function (i, item) {
            var src = $(item)[0].outerHTML.replace(/&amp;/g, "&");
            $EtoUpdatePanel._styles.push(src);
        });
    },
    _onRequestStart: function (updatePanel) {
        if (typeof ($EtoUpdatePanel._inRequestStart) != 'object') {
            return false;
        }

        for (var i = 0; i < $EtoUpdatePanel._inRequestStart.length; i++) {
            var requestStart = $EtoUpdatePanel._inRequestStart[i];
            if (typeof (requestStart) != 'function') {
                continue;
            }

            requestStart(updatePanel);
        }
    },
    _onRequestFailed: function (updatePanel, jqXHR, textStatus) {
        if (typeof ($EtoUpdatePanel._inRequestFailed) != 'object') {
            return false;
        }

        for (var i = 0; i < $EtoUpdatePanel._inRequestFailed.length; i++) {
            var requestFailed = $EtoUpdatePanel._inRequestFailed[i];
            if (typeof (requestFailed) != 'function') {
                continue;
            }

            requestFailed(updatePanel, jqXHR, textStatus);
        }
    },
    _onRequestEnd: function (updatePanel, msg) {
        if (typeof ($EtoUpdatePanel._inRequestEnd) != 'object') {
            return false;
        }

        for (var i = 0; i < $EtoUpdatePanel._inRequestEnd.length; i++) {
            var requestEnd = $EtoUpdatePanel._inRequestEnd[i];
            if (typeof (requestEnd) != 'function') {
                continue;
            }

            requestEnd(updatePanel, msg);
        }
    },
    _onInit: function () {
        if (typeof ($EtoUpdatePanel._inInit) != 'object') {
            return false;
        }

        for (var i = 0; i < $EtoUpdatePanel._inInit.length; i++) {
            var init = $EtoUpdatePanel._inInit[i];
            if (typeof (init) != 'function') {
                continue;
            }

            init();
        }
    },
    _onLoad: function () {
        if (typeof ($EtoUpdatePanel._inLoad) != 'object') {
            return false;
        }

        for (var i = 0; i < $EtoUpdatePanel._inLoad.length; i++) {
            var load = $EtoUpdatePanel._inLoad[i];
            if (typeof (load) != 'function') {
                continue;
            }

            load();
        }
    },
    _onSearch: function (item, data) {
        if (typeof ($EtoUpdatePanel._inSearch) != 'object') {
            return false;
        }

        for (var i = 0; i < $EtoUpdatePanel._inSearch.length; i++) {
            var search = $EtoUpdatePanel._inSearch[i];
            if (typeof (search) != 'function') {
                continue;
            }

            search(item, data);
        }
    },
    _sendAjax: function (id, target, argument) {
        /// <summary>Exécute une requete AJAX</summary>
        /// <param name="id" type="String">ID de l'EtoUpdatePanel</param>
        /// <param name="target" type="String">Controle déclencheur</param>
        /// <param name="argument" type="String">Arguments du controle</param>
        /// <returns type="Boolean">Etat de l'éxécution</returns>
        if ($EtoUpdatePanel._updatePanel[id] == undefined) {
            return false;
        }

        var updatePanel = $EtoUpdatePanel._updatePanel[id];
        if (updatePanel.EtatWebUserControl == false || updatePanel.RequestInProgress == true) {
            if (updatePanel.RequestInProgress == true) {
                $EtoUpdatePanel._updatePanel[id].WaitingQueries.push({ Id: id, Target: target, Argument: argument });
            }

            return false;
        }

        $EtoUpdatePanel._onRequestStart(updatePanel);
        var clientID = id.replace(/_/gi, '$') + "$" + target.replace(/_/gi, '$');
        var idClient = target.replace(/\$/gi, '_');
        var dataId = $('#' + idClient).data('id');
        if (dataId != undefined && dataId != '') {
            target = $('#' + idClient).attr(dataId);
        }

        $('#' + id + ' [data-type="affichagechargement"]').show();
        var scriptManager = $('.aspNetHidden:first input:first').attr('name') + "=" + $('.aspNetHidden:first input:first').val();
        var url = document.location.href;
        var form = "__CLIENTID=" + id
            + "&" + scriptManager
            + "&__EVENTTARGET=" + target
            + "&__EVENTARGUMENT=" + argument
            + "&__EVENTURL=" + encodeURIComponent(url)
            + "&__EVENTHANDLER=" + encodeURIComponent('//' + document.location.host + updatePanel.HttpHandler);
        $('#' + id + ' [name]').each(function (i, item) {
            var name = $(item).attr('name');
            var type = $(item).attr('type');
            if (type == 'radio' || type == 'checkbox') {
                var checked = $(item).is(':checked');
                if (!checked) {
                    return;
                }
            }
            else if (type == 'submit' || type == 'button') {
                var idClient = name.replace(/_/gi, '$');
                if (clientID != idClient && name != target) {
                    return;
                }
            }

            var value = $(item).val();
            form += "&" + encodeURIComponent(name) + "=" + encodeURIComponent(value);
        });

        $EtoUpdatePanel._updatePanel[id].RequestInProgress = true;
        var request = $.ajaxValidNav({
            url: updatePanel.HttpHandler,
            type: "POST",
            data: form,
            dataType: "html"
        });

        request.done(function (msg) {
            if (msg == '' || msg == undefined || msg == null) {
                document.location.href = "/500.html?aspxerrorpath=" + document.location.pathname;
                return;
            }

            $('#' + id + ' [data-type="DisplayAjax"]').html(msg);
            $('#' + id + ' [data-type="DisplayLoading"]').hide();
            $('#' + id + ' [data-type="EtoUpdatePanel"]').each(function (i, item) {
                var ids = $(this).attr('id');
                $EtoUpdatePanel.LoadUpdatePanel(ids, true);
            });

            if (typeof ($.validator) != "undefined" && typeof ($.validator.unobtrusive) != "undefined") {
                $.validator.unobtrusive.parse(document);
            }

            $EtoUpdatePanel.LoadUpdatePanel(id, true);
            $EtoUpdatePanel._onRequestEnd($EtoUpdatePanel._updatePanel[id], msg);
            if (updatePanel.SuccessDisplay == 0) {
                return;
            }

            $('#' + id + ' [data-type="SuccessDisplay"]').show();
            setTimeout(function () { $('#' + id + '[data-type="SuccessDisplay"]').hide(); }, updatePanel.SuccessDisplay);
        });

        request.fail(function (jqXHR, textStatus) {
            $EtoUpdatePanel._updatePanel[id].ErrorNumber = updatePanel.ErrorNumber + 1;
            if (updatePanel.RequestReload > 0 && updatePanel.ErrorNumber <= updatePanel.RequestReload) {
                setTimeout(function () { $EtoUpdatePanel._sendAjax(id, target, argument); }, updatePanel.TimesReload);
            }
            else {
                $EtoUpdatePanel.LoadUpdatePanel(id, true);
            }

            $EtoUpdatePanel._onRequestFailed($EtoUpdatePanel._updatePanel[id], jqXHR, textStatus);
            $('#' + id + ' [data-type="DisplayLoading"]').hide();
            if (updatePanel.ErrorDisplay == 0) {
                return;
            }

            $('#' + id + ' [data-type="ErrorDisplay"]').show();
            setTimeout(function () { $('#' + id + '[data-type="ErrorDisplay"]').hide(); }, updatePanel.ErrorDisplay);
        });

        return true;
    },
    _addComponent: function (component) {
        var id = component.get_id();
        if (typeof ($EtoUpdatePanel._inAddComponent[id]) === 'undefined') {
            $EtoUpdatePanel._inAddComponent[id] = component;
        }
    },
    _addInit: function (init) {
        if (typeof (init) != 'function') {
            return false;
        }

        $EtoUpdatePanel._inAddInit.push(init);
    },
    _addLoad: function (load) {
        if (typeof (load) != 'function') {
            return false;
        }

        $EtoUpdatePanel._inAddLoad.push(load);
    },
    _scriptsLoadComplete: function () {
        if ($EtoUpdatePanel._inAddComponent != null && $EtoUpdatePanel._inAddComponent != undefined) {
            Sys.Application._components = $EtoUpdatePanel._inAddComponent;
        }

        if ($EtoUpdatePanel._addComponentBackup != null) {
            Sys.Application.addComponent = $EtoUpdatePanel._addComponentBackup;
        }
    },
    AddInit: function (init) {
        /// <summary>Ajout une fonction à éxécuter au début du chargement des configurations</summary>
        /// <param name="init" type="Function">Fonction à ajouter</param>
        /// <returns type="Boolean">Etat de l'ajout</returns>
        if (typeof (init) != 'function') {
            return false;
        }

        $EtoUpdatePanel._inInit.push(init);
        return true;
    },
    AddLoad: function (load) {
        /// <summary>Ajout une fonction à éxécuter à la fin du chargement des configurations</summary>
        /// <param name="load" type="Function">Fonction à ajouter</param>
        /// <returns type="Boolean">Etat de l'ajout</returns>
        if (typeof (load) != 'function') {
            return false;
        }

        $EtoUpdatePanel._inLoad.push(load);
        return true;
    },
    AddSearch: function (search) {
        /// <summary>Ajout une fonction à éxécuter à la fin de la configuration de chaque EtoUpdatePanel</summary>
        /// <param name="search" type="Function">Fonction à ajouter</param>
        /// <returns type="Boolean">Etat de l'ajout</returns>
        if (typeof (search) != 'function') {
            return false;
        }

        $EtoUpdatePanel._inSearch.push(search);
        return true;
    },
    AddRequestStart: function (start) {
        /// <summary>Ajout une fonction à éxécuter au début de chaques requetes</summary>
        /// <param name="start" type="Function">Fonction à ajouter</param>
        /// <returns type="Boolean">Etat de l'ajout</returns>
        if (typeof (start) != 'function') {
            return false;
        }

        $EtoUpdatePanel._inRequestStart.push(start);
        return true;
    },
    AddRequestFailed: function (failed) {
        /// <summary>Ajout une fonction à éxécuter à la fin de chaques requetes en echec</summary>
        /// <param name="failed" type="Function">Fonction à ajouter</param>
        /// <returns type="Boolean">Etat de l'ajout</returns>
        if (typeof (failed) != 'function') {
            return false;
        }

        $EtoUpdatePanel._inRequestFailed.push(failed);
        return true;
    },
    AddRequestEnd: function (end) {
        /// <summary>Ajout une fonction à éxécuter à la fin de chaques requetes en succes</summary>
        /// <param name="end" type="Function">Fonction à ajouter</param>
        /// <returns type="Boolean">Etat de l'ajout</returns>
        if (typeof (end) != 'function') {
            return false;
        }

        $EtoUpdatePanel._inRequestEnd.push(end);
        return true;
    },
    Initialisation: function () {
        /// <summary>Initialise les EtoUpdatePanel de la page</summary>
        $EtoUpdatePanel._onInit();
        $EtoUpdatePanel._updatePanel = new Object();
        // Initialisation des scripts et styles
        $EtoUpdatePanel._initilisation();
        // Récupération des EtoUpdatePanel
        $('[data-type="EtoUpdatePanel"]').each(function (i, item) {
            var id = $(this).attr('id');
            $EtoUpdatePanel.LoadUpdatePanel(id, false);
        });
        $EtoUpdatePanel._onLoad();
    },
    LoadUpdatePanel: function (id, ajax) {
        /// <summary>Charge la configuration de l'EtoUpdatePanel</summary>
        /// <param name="id" type="String">ID de l'EtoUpdatePanel</param>
        /// <param name="ajax" type="String">Indique si c'est une requete Ajax</param>
        var item = $('#' + id);
        var value = $('#' + id + '_PROPERTIES').val();
        value = eval('(' + value + ')');
        var scripts = $('#' + id + '_SCRIPTS').text();
        scripts = scripts == "" ? new Array() : eval('(' + scripts + ')');
        $('#' + id + '_SCRIPTS').remove();
        var data = {
            ID: id,
            ErrorDisplay: parseInt($(item).data('errordisplay')),
            SuccessDisplay: parseInt($(item).data('successdisplay')),
            HttpHandler: $(item).data('httphandler'),
            Reloading: parseInt($(item).data('reloading')),
            RequestReload: parseInt($(item).data('requestreload')),
            TimesReload: parseInt($(item).data('timesreload')),
            LoadingDiffer: $(item).data('loadingdiffer').toLowerCase() == 'true',
            Properties: value,
            ErrorNumber: 0,
            Scripts: scripts,
            RequestInProgress: false,
            WaitingQueries: new Array()
        };

        $EtoUpdatePanel._inAddComponent = Sys.Application._components;
        if (Sys.Application.addComponent != $EtoUpdatePanel._addComponent) {
            $EtoUpdatePanel._addComponentBackup = Sys.Application.addComponent;
        }

        Sys.Application.addComponent = $EtoUpdatePanel._addComponent;
        var scriptLoader = Sys._ScriptLoader.getInstance();
        var scriptBlock = "";
        for (var i = 0; i < data.Scripts.length; i++) {
            var script = data.Scripts[i];
            if (script.Type == "ScriptStartupBlock" || script.Type == "ScriptBlock") {
                var code = script.Script.replace(/&amp;/g, "&");
                scriptBlock = code + scriptBlock;
            }
            else if (script.Type == "ClientScriptInclude") {
                var url = script.Url.replace(/&amp;/g, "&");
                if (!Sys._ScriptLoader.isScriptLoaded(url) && $.inArray(url, $EtoUpdatePanel._scripts) == -1) {
                    scriptLoader.queueScriptReference(url);
                    $EtoUpdatePanel._scripts.push(url);
                }
            }
            else if (script.Type == "ClientStyleInclude") {
                var style = script.Script.replace(/&amp;/g, "&");
                if ($.inArray(style, $EtoUpdatePanel._styles) == -1) {
                    $EtoUpdatePanel._styles.push(style);
                    scriptBlock = "$('head').append('" + style + "');" + scriptBlock;
                }
            }
        }

        scriptLoader.loadScripts(0, Function.createDelegate($EtoUpdatePanel, $EtoUpdatePanel._scriptsLoadComplete), null, null);
        setTimeout(function () {
            var loader = Sys._ScriptLoader.getInstance();
            loader.queueScriptBlock(scriptBlock);
            loader.loadScripts(0, null, null, null);
        }, 50);

        if (data.Reloading > 0) {
            setTimeout(function () { $EtoUpdatePanel.DoPostBack(id, '', '', false); }, data.Reloading);
        }

        if ($EtoUpdatePanel._updatePanel[id] != null && $EtoUpdatePanel._updatePanel[id].WaitingQueries.length > 0) {
            var requetes = $EtoUpdatePanel._updatePanel[id].WaitingQueries;
            var length = requetes.length - 1;
            for (var i = 0; i <= length; i++) {
                if (i < length) {
                    data.WaitingQueries.push(requetes[i]);
                }
            }

            $EtoUpdatePanel._updatePanel[id] = data;
            $EtoUpdatePanel._onSearch(item, data);
            var requete = requetes[length];
            $EtoUpdatePanel._sendAjax(requete.Id, requete.Target, requete.Argument);
        }
        else {
            $EtoUpdatePanel._onSearch(item, data);
            if ($EtoUpdatePanel._updatePanel[id] == null && data.LoadingDiffer == true) {
                $EtoUpdatePanel._updatePanel[id] = data;
                $EtoUpdatePanel.Reloading(id);
                return;
            }

            $EtoUpdatePanel._updatePanel[id] = data;
        }
    },
    Reloading: function (id) {
        /// <summary>Raffraichissement de l'EtoUpdatePanel</summary>
        /// <param name="id" type="String">ID de l'EtoUpdatePanel</param>
        /// <returns type="Boolean">Etat du raffraichissement</returns>
        if ($EtoUpdatePanel._updatePanel[id] == undefined) {
            return false;
        }

        $EtoUpdatePanel.DoPostBack(id, '', '', false);
        return true;
    },
    DoPostBack: function (id, target, argument, elm) {
        /// <summary>Lance un PostBack</summary>
        /// <param name="id" type="String">ID de l'EtoUpdatePanel</param>
        /// <param name="target" type="String">ID du controle déclencheur</param>
        /// <param name="argument" type="String">Argument du controle déclencheur</param>
        if ($EtoUpdatePanel._updatePanel[id] == undefined) {
            return;
        }

        if (typeof ($.validator) != "undefined" && typeof ($.validator.unobtrusive) != "undefined") {
            var isValid = $.validator.unobtrusive.validate(elm);
            if (!isValid) {
                return;
            }
        }

        $EtoUpdatePanel._sendAjax(id, target, argument);
    },
    SetDoPostBack: function (id, target, argument, elm) {
        /// <summary>Lance un PostBack</summary>
        /// <param name="id" type="String">ID de l'EtoUpdatePanel</param>
        /// <param name="target" type="String">ID du controle déclencheur</param>
        /// <param name="argument" type="String">Argument du controle déclencheur</param>
        setTimeout(function () { $EtoUpdatePanel.DoPostBack(id, target, argument, elm); }, 50);
    },
    GetProperty: function (id, nom) {
        /// <summary>Récupére une propriété</summary>
        /// <param name="id" type="String">ID de l'EtoUpdatePanel</param>
        /// <param name="nom" type="String">Name de la propriété</param>
        /// <returns type="String">Value de la propriété</returns>
        if ($EtoUpdatePanel._updatePanel[id] == undefined) {
            return null;
        }

        var values = $EtoUpdatePanel._updatePanel[id].Properties;
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            if (value.Name != nom) {
                continue;
            }

            return eval('(' + value.Value + ')');
        }

        return null;
    },
    SetProperty: function (id, nom, valeur) {
        /// <summary>Ajoute/Modifie une propriété</summary>
        /// <param name="id" type="String">ID de l'EtoUpdatePanel</param>
        /// <param name="nom" type="String">Name de la propriété</param>
        /// <param name="valeur" type="String">Value de la propriété</param>
        /// <returns type="Boolean">Etat de la modification/ajout</returns>
        if ($EtoUpdatePanel._updatePanel[id] == undefined) {
            return false;
        }

        var values = $EtoUpdatePanel._updatePanel[id].Properties;
        for (var i = 0; i < values.length; i++) {
            if (values[i].Name != nom) {
                continue;
            }

            values[i].Value = JSON.stringify(valeur).replace(/'/gi, "\\'").replace(/"/gi, "'");
            values = JSON.stringify(values).replace(/'/gi, "\\'").replace(/"/gi, "'");
            $('#' + id + '_PROPERTIES').val(values);
            return true;
        }

        return false;
    }
};

function __doPostBack(eventTarget, eventArgument) {
    var doPostBack = function () {
        var pageIsValid = typeof (Page_IsValid) == 'undefined';

        if ((!theForm.onsubmit || (theForm.onsubmit() != false)) && (pageIsValid == true || Page_IsValid == true)) {
            theForm.__EVENTTARGET.value = eventTarget;
            theForm.__EVENTARGUMENT.value = eventArgument;
            theForm.submit();
        }

        if (pageIsValid == false) {
            Page_IsValid = true;
        }
    };

    try {
        var $etoUpdatePanel = null;
        var $control = null;
        if (eventArgument == undefined) {
            $control = $('[name="' + eventTarget + '"]');
            $etoUpdatePanel = $control.parents('[data-type="EtoUpdatePanel"]');
        }
        else {
            var id = eventTarget.replace(/\$/gi, '_');
            $control = $('#' + id);
            $etoUpdatePanel = $control.parents('[data-type="EtoUpdatePanel"]');
        }

        if ($etoUpdatePanel.length == 0) {
            var prm = Sys.WebForms.PageRequestManager.getInstance();
            prm._doPostBack(eventTarget, eventArgument);
            return;
        }

        var idEtoUpdatePanel = $($etoUpdatePanel).attr('id');
        $EtoUpdatePanel.DoPostBack(idEtoUpdatePanel, eventTarget, eventArgument, $control);
    }
    catch (e) {
        doPostBack();
    }
}
}
/*END:https://boutique.orange.fr/medias/newshop/js/EtoUpdatePanel.js*/


/*BEGIN:https://boutique.orange.fr/medias/refonte-2015/js/onglets-boi.js*/
; (function ($) {

    $(function () {
        var offset = $(".bloc-price-open").offset();

        $('.js-forfait[data-group="forfait2"]').hide();

        //onglets l'essentiel
        $('body')
            .on("click", ".onglets-boi li", function (evt) {
                evt.preventDefault();

                $(".onglets-boi li").removeClass("active");
                $(this).addClass("active");

                $('.zone-onglets .onglet').removeClass('show');
                $(".onglet-" + $(this).attr('class').replace(' active', '')).addClass('show');
            })
            // Offres Open - 2 forfaits
            .on("click", ".show-button .choose label", function () {
                var forfait = $(this).attr("data-group");
                $(".choose label").removeClass("js-active");
                $(this).addClass("js-active");
                $('.js-forfait[data-group="' + forfait + '"]').show();
                $('.js-forfait:not([data-group="' + forfait + '"])').hide();
            })
            // En savoir plus qui renvoie vers onglet
            .on("click", ".col-details .content a.more-info", function (evt) {
                evt.preventDefault();
                var onglet = $(this).attr('href');
                onglet = onglet.substring(1, onglet.length);
                $('html, body').animate({
                    scrollTop: $('.' + onglet + '').offset().top
                }, 500);

                $('.'+ onglet +'').trigger("click");
            });

        // Ouverture onglet sp�cifique en fonction ancre dans url - uniquement si onglet
        if ($('.onglets-boi').length) {
            var ancre = window.location.hash.slice(1);
            if (ancre) {
                $('.onglets-boi li.' + ancre + '').trigger('click');

                $('html, body').animate({
                    scrollTop: $('.onglets-boi li.' + ancre + '').offset().top
                }, 500);
            }
        }
        

    });

})(jQuery);
/*END:https://boutique.orange.fr/medias/refonte-2015/js/onglets-boi.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/specific/internet/offer-presentation-common.js*/
; (function ($) {
    // Sauvegarde de l'onglet
    var selection = '';

    // Ajout class ie
    var ua_parser = new UAParser()
    , browser = ua_parser.getBrowser();

    if (browser.name == 'IE') {
        $('html').addClass('js-ie');
    }

    // S�lection d'une offre
    function selectionnerOffre(nomOffre) {
        if (!nomOffre) {
            return;
        }

        var url = $('[data-url-forfait="{0}"]'.format(nomOffre)).val()
            , $section = $('[data-section-forfait="{0}"]'.format(nomOffre))
            , $title_hf = $('[data-title-forfait="{0}"]'.format(nomOffre))
            , $sectionAbtesting = $('.tpl8u-cremaillere-abtesting .seven')
            , title = $title_hf.length ? $title_hf.val() : '';

        selection = nomOffre;
        $('.content-offer').removeClass('show');
        $section.addClass('show');

        $('.col.offer').removeClass('active');
        $('section[data-forfait="{0}"]'.format(nomOffre)).addClass('active');

        if (url) {
            // Valable � partir d'IE10/FF 4/Chrome 5
            if (window.history
                && window.history.pushState) {
                document.title = title;
                history.pushState({}, title, url);
				//changement de l'url du formulaire webform
				var theForm = document.forms['form1'];
     
				if (!theForm) {
				  theForm = document.form1;
				}
					 
				if (theForm) {
				  theForm.action = url;
				}
            }
            else {
                document.location.href = url;
            }
        }

        // Scroll jusqu'� la section de l'offre
        if (!$sectionAbtesting.length) {
            if ($section.length) {
                $('html,body').animate({
                    scrollTop: $section.offset().top
                }, 'slow');
            }
        } else {
            // pour abtesting, on scroll jusqu'au lien dans la cremaillere
            if ($section.length) {
                $('html,body').animate({
                    scrollTop: $sectionAbtesting.offset().top
                }, 'slow');
            }
        }
        
    }

    // Pr�-selectionne une offre Internet sur la cr�maill�re
    function preSelectionnerOffreCremaillere() {

        // Si aucune offre n'est s�lectionn�e
        if ($('.col.offer.active').length === 0) {
            $hf_Argument = $('[id$="INP_Argument"]');

            if ($hf_Argument.length) {
                var offre = $hf_Argument.val();
                if (offre && offre.length) {
                    selectionnerOffre(offre);
                }
            }
        }
    }

    // Pr�-selectionne une offre Internet sur le RTE
    function preSelectionnerOffreRte() {
        var $hiddenFieldOffre = $('[id$="HF_PreSelection_Offre"]');

        if ($hiddenFieldOffre.length) {
            var offre = $hiddenFieldOffre.val();
            if (offre && offre.length) {
                selectionnerOffre(offre);
            }
        }
    }

    $(function () {
        $('body')
            .on('prmEndRequest', function () {
               
                if (!$('.ui-dialog').length > 0) {
                    $('html,body').animate({
                        scrollTop: $('[id$="UP_Detail"]').offset().top
                    }, 'slow');
                }
            })
            // Au click sur un bloc offre
            .on('click tap touchend', '[data-forfait]', function (e) {
                var offre = this.getAttribute('data-forfait');

                if (offre && offre.length) {
                    selectionnerOffre(offre);
                }
            });

        preSelectionnerOffreCremaillere();
        preSelectionnerOffreRte();
    });

})(jQuery);
/*END:https://boutique.orange.fr/medias/newshop/js/specific/internet/offer-presentation-common.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/specific/internet/offer-presentation.js*/
function openPopinIntention() {
    $('#popin-intention .bouton-popin[data-action="identification"]').attr('href', $('#HF_Lien_Authentification').attr('value'));
    $('#popin-intention .bouton-popin[data-action="continuer"]').attr('href', $('#HF_Continuer').attr('value'));
}

; (function ($) {

    $(function () {

        var $hfs_url_parcours = $('[data-url-forfait-client]')
          , $relative_url_links = $('.offres-boi a').not('[href^="http"]').not('[href^="javascript:"]')
          , $links_to_rewrite = $('.tpl8u-cremaillere header .no-redirect')
          , $hf_route_url = $('[id$="INP_Route_Url"]')
          , $hf_host = $('[id$="INP_Host"]');

        $('body')
            .on('click', '.btn-parcours', function () {
                var $section = $(this).parents('[data-section-forfait]')
                  , $hf_lien_authentification = $('[data-lien-authentification="{0}"]'.format($section.attr('data-section-forfait')))
                  , $hf_continuer_livebox = $('[data-continuer-livebox="{0}"]'.format($section.attr('data-section-forfait')));

                $('#HF_Lien_Authentification').val($hf_lien_authentification.val());
                $('#HF_Continuer').val($hf_continuer_livebox.val());
            })
			.on('click', '.bloc-price .btn .btn-parcours', function (e) {
			    var $hiddenFieldRefonteInternetSprint8Actif = $('#HF_RefonteInternetSprint8Actif');

			    if ($hiddenFieldRefonteInternetSprint8Actif.length) {
			        var value = $hiddenFieldRefonteInternetSprint8Actif.val();

			        // Si la cl� de config sprint 8 est activ�e
			        if (value === "true") {
			            e.preventDefault();

			            // Scroll jusqu'au bloc �ligibilit�			            
			            var $blocInformationTestEligibiliteObligatoire = $(".bloc-information-test-eligibilite-obligatoire");
			            if ($blocInformationTestEligibiliteObligatoire.length) {
			                $blocInformationTestEligibiliteObligatoire.removeClass("hide");
			                $('html, body').animate({
			                    scrollTop: $blocInformationTestEligibiliteObligatoire.offset().top
			                }, 500);
			            }
			            
			        }
			        else {
			            if ($('#popin-intention').length) {
			                e.preventDefault();

			                // Affichage popin
			                $('#popin-intention').dialog('open');
			            }
			        }
			    }
			});

        for (var i = 0, hf_length = $hfs_url_parcours.length; i < hf_length; i++) {
            (function (hf_url_parcours) {
                var $hf_url_parcours = $(hf_url_parcours);

                $('[data-section-forfait="{0}"]'.format($hf_url_parcours.attr('data-url-forfait-client')))
                    .find('.btn-parcours').attr('href', $hf_url_parcours.val());
            })($hfs_url_parcours[i]);
        }

        for (var i = 0, links_length = $relative_url_links.length; i < links_length; i++) {
            (function (relative_url_link) {
                var $relative_url_link = $(relative_url_link)
                  , href_base = $relative_url_link.attr('href').replace('../', '');

                $relative_url_link.attr('href', $hf_host.val() + $hf_route_url.val() + '/' + href_base);
            })($relative_url_links[i]);
        }

        for (var i = 0, lks_to_rewrite_length = $links_to_rewrite.length; i < lks_to_rewrite_length; i++) {
            (function (link_to_rewrite) {
                var $link_to_rewrite = $(link_to_rewrite)
                  , enum_forfait = $link_to_rewrite.parents('[data-forfait]').attr('data-forfait')
                  , url = $('[data-url-forfait="{0}"]'.format(enum_forfait)).val()
                  , host = $hf_host.val().substr(0, $hf_host.val().length - 1);

                if (url) {
                    $link_to_rewrite.attr('href', host + url);
                }
            })($links_to_rewrite[i]);
        }
    });

})(jQuery);
/*END:https://boutique.orange.fr/medias/newshop/js/specific/internet/offer-presentation.js*/
