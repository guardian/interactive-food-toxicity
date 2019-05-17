module.exports =  {
    init: function() {
        this.bindings();
    },

    bindings: function() {
        $('.uit-items__button').one('click', function() {
            this.revealOtherItems();
        }.bind(this));
    },

    revealOtherItems: function() {
        $('.uit-items').addClass('is-expanded');
        $('.uit-market__content').height(this.getItemsHeight());

        $(window).resize(function() {
            $('.uit-market__content').height(this.getItemsHeight());
        }.bind(this));
    },

    getItemsHeight: function() {
        return $('.uit-items__initial').outerHeight() + $('.uit-items__other').outerHeight();
    },
};
