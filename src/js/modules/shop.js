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
            isOverBasket = $(event.sensorEvent.target).parents('.uit-shop__basket').length > 0 || $(event.sensorEvent.target).hasClass('uit-shop__basket');

            if (isOverBasket) {
                $('.uit-shop__basket').addClass('is-above');
            } else {
                $('.uit-shop__basket').removeClass('is-above');
            }
        });

        draggableItems.on('drag:stop', (event) => {
            $source.removeClass('is-selected');
            $('.uit-shop__basket').removeClass('is-above');

            if (isOverBasket) {
                this.addToBasket($source);
                this.addToReceipt($source);
            }
        });

        $('.uit-shop__items--shelf .uit-shop__item').click((e) => {
            this.addToBasket($(e.currentTarget));
            this.addToReceipt($(e.currentTarget));
        });
    },

    addToBasket($item) {
        $(this.findEmptySlotInBasket()).html($item.html()).data('item', $item.data('item'));
        $item.addClass('is-in-basket');
        basket.push($item.data('item'));

        $('.uit-shop__item-delete').one('click', (e) => {
            this.removeFromBasket($(e.currentTarget).parent());
        });

        if (basket.length != 0){
            $('.uit-shop__button').css('opacity', '1');
        }

        console.log('add');
        console.log(basket);
    },

    removeFromBasket($item) {
        const itemName = $item.data('item');
        basket = basket.filter(item => item !== itemName);
        $item.empty();
        $item.removeAttr('data-item');
        $('.uit-shop__item[data-item=' + itemName + ']').removeClass('is-in-basket');

        if (basket.length == 0){
            $('.uit-shop__button').css('opacity', '.2');
        }

        this.removeFromReceipt(itemName);

        console.log('remove');
        console.log(basket);
    },

    addToReceipt($item) {
        $('.uit-shop__receipt')
        .append('<div class='+
        $item.data('item') +
        '>' +
        $item.data('item')+'</div>');
    },

    removeFromReceipt(itemName) {
        $('.' + itemName).remove();
    },

    findEmptySlotInBasket() {
        return $('.uit-shop__basket .uit-shop__item:empty:first');
    }
};
