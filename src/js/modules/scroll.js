let windowTop, windowHeight, windowBottom;

let scrollTop, shopHeight, shopTop;

module.exports =  {
    init: function() {
        this.bindings();
        this.fixBasket();
    },

    bindings: function() {
        $(window).scroll(function() {
            this.fixBasket();
        }.bind(this));

        $(window).resize(function() {
            this.fixBasket();
        }.bind(this));
    },

    percentageOfHeight: function(percentage) {
        return (windowHeight / 100) * percentage;
    },

    fixBasket: function() {
        scrollTop = $(window).scrollTop();
        windowHeight = $(window).height();
        shopHeight = $('.uit-shop').height();
        shopTop = $('.uit-shop').offset().top;

        $('.uit-shop__checkout').removeClass('is-visible is-fixed');

        if (scrollTop + windowHeight > shopTop) {
            console.log('basket should be visible');
            $('.uit-shop__checkout').addClass('is-visible');
        }

        if (scrollTop + windowHeight > shopTop + shopHeight) {
            console.log('basket should be fixed')
            $('.uit-shop__checkout').addClass('is-fixed');
        }

        if (scrollTop + windowHeight > shopTop + shopHeight + 400 && $(window).width() < 959) {
            $('.uit-shop__checkout').removeClass('is-visible');
        }
    }
};
