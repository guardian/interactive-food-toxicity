var windowTop, windowHeight, windowBottom;

module.exports =  {
    init: function() {
        this.bindings();
    },

    bindings: function() {
        $(window).scroll(function() {
            this.fixMap();
        }.bind(this));

        $(window).resize(function() {
            this.fixMap();
        }.bind(this));

    },

    percentageOfHeight: function(percentage) {
        return (windowHeight / 100) * percentage;
    },

    showMenu: function() {
        $('html').addClass('nav-is-expanded');
        $('.uit-dropdown__button').unbind();
        $('.uit-dropdown__button').click(function(e) {
            e.preventDefault();
            this.hideMenu();
        }.bind(this));
    },

    fixMap: function() {
        windowTop = $(window).scrollTop();
        windowHeight = $('.uit-shop').height();
        windowBottom = $('.uit-shop').offset().top + windowHeight;

        if (windowTop > $('.uit-shop').offset().top - this.percentageOfHeight(50)) {
            $('.uit-cart__mobile').addClass('is-visible');
        } else {
            $('.uit-cart__mobile').removeClass('is-visible');
        }

        if (windowTop > windowBottom - this.percentageOfHeight(80) ||
        windowTop < $('.uit-shop').offset().top - this.percentageOfHeight(50) ) {
            $('.uit-cart__mobile').removeClass('is-visible');
        } else {
            $('.uit-cart__mobile').addClass('is-visible');
        }
    },

    hideMenu: function() {
        $('html').removeClass('nav-is-expanded');
        $('.uit-dropdown__button').unbind();
        $('.uit-dropdown__button').click(function(e) {
            e.preventDefault();
            this.showMenu();
        }.bind(this));
    },

    changeNav: function(step) {
        $('.uit-nav__category').each(function(i, el) {
            $(el).removeClass('uit-highlighted');
            if ($(el).hasClass('uit-nav__category--' + step)) {
                $(el).addClass('uit-highlighted');
                $('.uit-mobile-nav__category-title').html(sections[step]);
                $('.uit-nav__category-title').removeClass('uit-nav__hidden');
            }
        }.bind(this));
    }
};
