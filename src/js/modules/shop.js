import draggable from '@shopify/draggable';

let isOverBasket = false,
    basket = [],
    $source;

export default {
    init() {
        this.initDragging();
    },

    initDragging() {
        const items = new draggable.Draggable(document.querySelectorAll('.uit-shop__items'), {
            draggable: '.uit-shop__item',
            delay: 0,
        });

        items.on('drag:start', (event) => {
            $source = $(event.data.originalSource);
            $source.addClass('is-selected');

        });

        items.on('drag:move', (event) => {
            isOverBasket = $(event.sensorEvent.target).hasClass('uit-shop__basket');
            if (isOverBasket) {
                $('.uit-shop__basket').addClass('is-above');
            } else {
                $('.uit-shop__basket').removeClass('is-above');
            }
        });

        items.on('drag:stop', (event) => {
            $source.removeClass('is-selected');

            if (isOverBasket) {
                this.addToBasket($source);
            }
        });
    },

    addToBasket($item) {
        $item.addClass('is-in-basket');
        basket.push($item.data('item'));

        basket.forEach((item, i) => {
            $('.uit-shop__basket-item--' + i).text(item);
        });
    }
};
