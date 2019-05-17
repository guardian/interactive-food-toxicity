import Draggable from '@Shopify/draggable/lib/draggable';

const basketLimit = 4;

let isOverBasket = false,
    basket = [],
    draggableItems;

export default {
    init() {
        this.initDragging();
        this.updateLabel();
    },

    initDragging() {
        draggableItems = new Draggable(document.querySelectorAll('.uit-shop__items'), {
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
            $(event.data.originalSource).addClass('is-selected');
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
            $(event.data.originalSource).removeClass('is-selected');
            $('.uit-checkout__basket').removeClass('is-above');

            if (isOverBasket) {
                this.addToBasket($(event.data.source).removeClass('draggable-source--is-dragging'));
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
        const itemName = $item.data('item');

        $(this.findEmptySlotInBasket()).html($item[0].outerHTML);
        $('.uit-shop .uit-shop__item[data-item=' + itemName + ']').addClass('is-in-basket');
        basket.push(itemName);

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
        $('.uit-checkout__basket .uit-shop__item[data-item=' + itemName + ']').parent().empty();
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
        return $('.uit-checkout__basket').find('.uit-checkout__basket-item:empty:first');
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

        this.extendJqueryEasing();

        $('.uit-market__content').height(this.getItemsHeight());

        $('.uit-market__content').animate({
            scrollLeft: $('.uit-market__content').get(0).scrollWidth - $('.uit-market__content').width()
        }, 6000, $.bez([0.3, 0.7, 0.7, 0.3]), function() {
            $('.uit').addClass('is-final');
            $(window).resize(function() {
                this.repositionMarket();
            }.bind(this));
        }.bind(this))
    },

    getItemsHeight() {
        var height = 0;

        $('.uit-items__initial').children().each(function(i, el) {
            height += $(el).outerHeight();
        });

        return height;
    },

    repositionMarket() {
        $('.uit-market__content').scrollLeft($('.uit-market__content').get(0).scrollWidth);
    },

    extendJqueryEasing() {
        let $ = window.$;

        $.extend({ bez: function(encodedFuncName, coOrdArray) {
            if ($.isArray(encodedFuncName)) {
              coOrdArray = encodedFuncName;
              encodedFuncName = 'bez_' + coOrdArray.join('_').replace(/\./g, 'p');
            }
            if (typeof $.easing[encodedFuncName] !== "function") {
              var polyBez = function(p1, p2) {
                var A = [null, null], B = [null, null], C = [null, null],
                    bezCoOrd = function(t, ax) {
                      C[ax] = 3 * p1[ax], B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax], A[ax] = 1 - C[ax] - B[ax];
                      return t * (C[ax] + t * (B[ax] + t * A[ax]));
                    },
                    xDeriv = function(t) {
                      return C[0] + t * (2 * B[0] + 3 * A[0] * t);
                    },
                    xForT = function(t) {
                      var x = t, i = 0, z;
                      while (++i < 14) {
                        z = bezCoOrd(x, 0) - t;
                        if (Math.abs(z) < 1e-3) break;
                        x -= z / xDeriv(x);
                      }
                      return x;
                    };
                return function(t) {
                  return bezCoOrd(xForT(t), 1);
                }
              };
              $.easing[encodedFuncName] = function(x, t, b, c, d) {
                return c * polyBez([coOrdArray[0], coOrdArray[1]], [coOrdArray[2], coOrdArray[3]])(t/d) + b;
              }
            }
            return encodedFuncName;
    }})
    }
};
