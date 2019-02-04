import draggable from '@shopify/draggable';

const basketLimit = 4;

let isOverBasket = false,
    basket = [],
    $source,
    draggableItems;

export default {
    init() {
        this.initDragging();
        this.updateLabel();
    },

    initDragging() {
        draggableItems = new draggable.Draggable(document.querySelectorAll('.uit-shop__items'), {
            draggable: '.uit-shop__item',
            delay: 200,
            mirror: {
                constrainDimensions: true,
            }
        });

        this.bindings();
    },

    bindings() {
        draggableItems.on('drag:start', (event) => {
            $source = $(event.data.originalSource);
            $source.addClass('is-selected');
        });

        draggableItems.on('drag:move', (event) => {
            isOverBasket = $(event.sensorEvent.target).parents('.uit-checkout__basket').length > 0 || $(event.sensorEvent.target).hasClass('uit-checkout__basket');

            if (isOverBasket) {
                $('.uit-checkout__basket').addClass('is-above');
            } else {
                $('.uit-checkout__basket').removeClass('is-above');
            }
        });

        draggableItems.on('drag:stop', (event) => {
            $source.removeClass('is-selected');
            $('.uit-checkout__basket').removeClass('is-above');

            if (isOverBasket) {
                this.addToBasket($source);
            }
        });

        $('.uit-shop__items--shelf .uit-shop__item').click((e) => {
            this.addToBasket($(e.currentTarget));
        });

        $('.uit-checkout__button').click((e) => {
            this.showResults();
        });
    },

    addToBasket($item) {
        $(this.findEmptySlotInBasket()).html($item.html()).data('item', $item.data('item'));
        $item.addClass('is-in-basket');
        basket.push($item.data('item'));

        $('.uit-shop__item-delete').one('click', (e) => {
            this.removeFromBasket($(e.currentTarget).parent());
        });

        if (this.isBasketFull()) {
            $('.uit').addClass('is-checkoutable')
        } else {
            $('.uit').removeClass('is-checkoutable');
        }

        this.updateLabel();
    },

    removeFromBasket($item) {
        const itemName = $item.data('item');
        basket = basket.filter(item => item !== itemName);
        $item.empty();
        $item.removeAttr('data-item');
        $('.uit-shop__item[data-item=' + itemName + ']').removeClass('is-in-basket');

        if (this.isBasketFull()) {
            $('.uit').addClass('is-checkoutable')
        } else {
            $('.uit').removeClass('is-checkoutable');
        }

        this.updateLabel();
    },

    updateLabel() {
        const spacesLeftInBasket = basketLimit - basket.length;
        const text = spacesLeftInBasket === 1 ? '1 item' : spacesLeftInBasket + ' items';
        $('.uit-checkout__basket-count').text(text);
    },

    findEmptySlotInBasket() {
        return $('.uit-checkout__basket .uit-shop__item:empty:first');
    },

    isBasketFull() {
        return basket.length === basketLimit;
    },

    showResults() {
        for (var i in basket) {
            const $item = $('.uit-items__item[data-item=' + basket[i] + ']');

            $('.uit-items__receipt').append($item[0].outerHTML);
            $item.remove();
        }

        $('.uit').addClass('is-checkedout');

        $('.uit-market__content').animate({
            scrollLeft: $('.uit-market__content').get(0).scrollWidth - $('.uit-market__content').width()
        }, 6000, 'swing', function() {
            $('.uit').addClass('is-final');
        }.bind(this))
    }
};
