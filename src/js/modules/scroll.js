let windowHeight, scrollTop, shopHeight, shopTop;

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
        shopHeight = $('.uit-market').height();
        shopTop = $('.uit-market').offset().top;

        if (scrollTop + windowHeight > shopTop + shopHeight + 400) {
            $('.uit-basket-wrapper').removeClass('is-visible');
        } else if (scrollTop + windowHeight > shopTop) {
            $('.uit-basket-wrapper').addClass('is-visible');
        } else {
            $('.uit-basket-wrapper').removeClass('is-visible');
        }
    }
};
