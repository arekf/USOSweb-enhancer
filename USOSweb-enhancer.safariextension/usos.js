// ==UserScript==
// @name USOSweb-enhancer
// @description
// @author arekf
// @version 0.1
// @include https://www.usosweb.uj.edu.pl/
// @include https://www.usosweb.uj.edu.pl/kontroler.php
// @include https://www.usosweb.uj.edu.pl/kontroler.php*
// @license MIT
// ==/UserScript==

/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Arkadiusz Fal
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

;(function($) {
	var enhancer = {
		settings: {
			homeAddress: 'https://www.usosweb.uj.edu.pl/kontroler.php?_action=actionx:news/default()',
			homeTitle: 'USOSweb',
			
			topBarContent: '<a href="https://www.uj.edu.pl/"><strong>Uniwersytet Jagielloński</a></strong>',
			navigationMailboxLink: false,
			navigationMailboxLink: true,
			
			hideStaffLink: true,
		},
			
		init: function () {
			this.fixHomeAnchor();
			this.handleSubnavigation();
			this.handleMailboxLinks();
			this.fixTopBar();
			this.hideStaffLink();
		},
		
		fixHomeAnchor: function () {
			var homeAnchor = $('<a class="home"> ' + enhancer.settings.homeTitle + '</a>');
			homeAnchor.attr('href', enhancer.settings.homeAddress);
			
			if (window.location == enhancer.settings.homeAddress) {
				$('#layout-c12-t .m a').removeClass('highlighted');
				homeAnchor.addClass('highlighted');
			}
			
			$('#layout-c12-t .m').prepend(homeAnchor);
		},
		
		handleSubnavigation: function () {
			$('.subitems').each(function () {
				if ($(this).children().length == 0) {
					$(this).remove();
				}
			});
			
			$('#layout-c21 div.level1').each(function () {
				if ($(this).next().hasClass('subitems')) {
					$(this).addClass('dropdown');
				}
			});
			
			$('#layout-c12').mouseenter(function () {
				$('.subitems').hide();
			});
			
			$('#layout-c21 div.level1').mouseenter(function () {
				$('.subitems').hide();
				var next = $(this).next();
				if ($(next).hasClass('subitems') && $(next).children().length > 0) {
					next.css('display', 'inline', 'important');
					next.css('margin-left', -($(this).outerWidth() / 2) - ($(next).outerWidth() / 2));
				}
			});
			
			$('.subitems').mouseleave(function () {
				$(this).hide();
			});
		},
		
		handleMailboxLinks: function () {
			if (this.isLogged())
			{
				if (!enhancer.settings.topBarMailboxLink) {
					var navHtml = $('#casmenu td:nth-child(2)').html();
					$('#casmenu td:nth-child(2)').html(navHtml.substr(navHtml.indexOf("</a>") + 7));
				}
			
				if (enhancer.settings.navigationMailboxLink) {
					var anchor = '<a class="mailbox">POCZTA</a>';
					$('#layout-c12-t .m a:first-child').after(anchor);
				
					$('a.mailbox').click(function () {
						$('#layout-c12-t .m a').removeClass('highlighted');
						$(this).addClass('highlighted');
						$('#layout-c21').remove();
					
						$('#layout-c22').html('<iframe class="mailbox" src="https://mbox.uj.edu.pl"></iframe>');
						$('#layout-c22').css('margin-top', '-65px', 'important');
						$('#layout-c22').css('height', '720px', 'important');
					
						$(document).attr('title', 'poczta - USOSweb - Uniwersytet Jagielloński w Krakowie');
					});
				}
			}
		},
		
		fixTopBar: function () {
			$('body > div.do_not_print table td:first-child').html(enhancer.settings.topBarContent);
		},
		
		hideStaffLink: function () {
			$('a:contains("DLA PRACOWNIKÓW")').hide();
		},
		
		isLogged: function() {
			return !!($('a.casmenu').text() != "zaloguj się");
		}
	};
	
	enhancer.init();
	
})(jQuery);