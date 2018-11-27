import draggable from '@shopify/draggable';

export default {
    init() {
        this.initDragging();
    },

    initDragging() {
        const shoppingArea = new draggable.Droppable(document.querySelectorAll('.uit-shop__area'), {
            draggable: '.uit-shop__item',
            dropzone: '.uit-shop__area',
            mirror: {
                constrainDimensions: true,
            }
        });

        shoppingArea.on("droppable:over", function() {
          $('.uit-shop__area').removeClass('draggable-droppable--occupied');
        });
    }
};
