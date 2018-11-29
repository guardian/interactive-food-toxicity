import draggable from '@shopify/draggable';

let isOverBasket = false,
    basket = [],
    $source,
    draggableItems;

export default {
    init() {
        this.initDragging();
    },

    initDragging() {
        draggableItems = new draggable.Draggable(document.querySelectorAll('.uit-shop__items'), {
            draggable: '.uit-shop__item',
            delay: 200,
        });

        this.bindings();
    },

    bindings() {
        draggableItems.on('drag:start', (event) => {
            $source = $(event.data.originalSource);
            $source.addClass('is-selected');
        });

        draggableItems.on('drag:move', (event) => {
            isOverBasket = $(event.sensorEvent.target).hasClass('uit-shop__basket');
            if (isOverBasket) {
                $('.uit-shop__basket').addClass('is-above');
            } else {
                $('.uit-shop__basket').removeClass('is-above');
            }
        });

        draggableItems.on('drag:stop', (event) => {
            $source.removeClass('is-selected');

            if (isOverBasket) {
                this.addToBasket($source);
            }
        });

        $('.uit-shop__item').click((e) => {
            this.addToBasket($(e.currentTarget));
        })
    },

    addToBasket($item) {
        $item.addClass('is-in-basket');
        basket.push($item.data('item'));

        basket.forEach((item, i) => {
            $('.uit-shop__basket-item--' + i).text(item);
        });
    }
};
