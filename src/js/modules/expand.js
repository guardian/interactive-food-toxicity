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
        console.log($('.uit-items__other').height());
        $('.uit-items').addClass('is-expanded');
    }
};
