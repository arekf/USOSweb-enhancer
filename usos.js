// ==UserScript==
// @name USOSweb-enhancer
// @description
// @author arekf
// @version 0.1
// @include https://www.usosweb.uj.edu.pl/
// @include https://www.usosweb.uj.edu.pl/kontroler.php
// @include https://www.usosweb.uj.edu.pl/kontroler.php*
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function() {
	;(function($) {
		var enhancer = {
			settings: {
				homeAddress: 'https://www.usosweb.uj.edu.pl/kontroler.php?_action=actionx:news/default()',
				homeTitle: 'USOSweb',
				
				hideTips: true,
				
				topBarContent: '<a href="https://www.uj.edu.pl/"><strong>Uniwersytet Jagielloński</a></strong>',
				topBarMailboxLink: true,
				navigationMailboxLink: true
			},
				
			init: function () {
				this.fixHomeAnchor();
				this.handleSubnavigation();
				this.fixTopBar();
				this.hideTips();
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
			
			fixTopBar: function () {
				$('body > div.do_not_print table td:first-child').html(enhancer.settings.topBarContent);
			},
			
			hideTips: function () {
				if (enhancer.settings.hideTips) {
					$('table.decori').hide();
				}
			}
		};
		
		enhancer.init();
	})(jQuery);
}, false);