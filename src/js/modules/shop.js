import draggable from '@shopify/draggable';

let isOverBasket = false;

export default {
    init() {
        this.initDragging();
    },

    initDragging() {
        const items = new draggable.Draggable(document.querySelectorAll('.uit-shop__items'), {
            draggable: '.uit-shop__item',
            delay: 0,
        });

        items.on('drag:move', (event) => {
            isOverBasket = $(event.sensorEvent.target).hasClass('uit-shop__basket');
        });

        items.on('drag:stop', (event) => {
            console.log(isOverBasket);
        });
    }
};
