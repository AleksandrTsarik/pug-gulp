"use strict";

let fieldSuggest = {
    field: '.js-suggest',
    options: '.js-suggest-options',
    item: '.js-suggest-item',
    itemEmpty: '.js-suggest-item-empty',
    val: '.js-suggest-val',
    caption: '.js-suggest-caption',
    buttonClear: '.js-suggest-clear',
    buttonSearch: '.js-suggest-search',
    init: function init() {
      let t = this;
      $(t.field + ' ' + t.caption).on('keyup', function () {
        t.toggleOptions(this);
      });
      $(t.buttonClear).on('click', function () {
        t.clearInput(this);
      });
      $(t.item).on('click', function () {
        t.selectOption(this);
      });
      /*$('body').on('click', function(event){
          if(!event.target.closest(t.field)) t.hideAllOptions();
      })*/
    },
    toggleOptions: function toggleOptions(obj) {
      let t = this,
          p = $(obj).closest(t.field);
  
      if (obj.value != '') {
        $(t.field).not(p).removeClass('is-open');
        p.addClass('is-open');
        p.find(t.buttonClear).addClass('is-show');
        p.find(t.item).each(function () {
          if ($(this).html().trim().toLowerCase().indexOf($(obj).val().trim().toLowerCase()) != -1) {
            $(this).removeClass('is-hidden');
          } else {
            $(this).addClass('is-hidden');
          }
        });
  
        if (p.find(t.item + ':visible').length == 0) {
          $(t.itemEmpty).show();
        } else {
          $(t.itemEmpty).hide();
        }
      } else {
        t.hideAllOptions();
        p.find(t.buttonClear).removeClass('is-show');
      }
    },
    hideAllOptions: function hideAllOptions() {
      let t = this;
      $(t.field).removeClass('is-open');
    },
    clearInput: function clearInput(obj) {
      let t = this,
          p = $(obj).closest(t.field);
      p.find(t.caption).val('');
      p.find(t.buttonClear).removeClass('is-show');
      t.hideAllOptions();
    },
    selectOption: function selectOption(obj) {
      let t = this,
          p = $(obj).closest(t.field);
      t.hideAllOptions();
      p.find(t.caption).val($(obj).html());
      p.find(t.val).val($(obj).data('val'));
    }
  };
  let fieldSelect = {
    field: '.js-select-field',
    caption: '.js-select-caption',
    value: '.js-select-value',
    option: '.js-select-option',
    subm: 'js-form-submit',
    nav: 'js-nav-select',
    navItem: '.js-nav-item',
    init: function init() {
      let t = this;
      $(t.caption).on('click', function () {
        t.toggleOptions(this);
      });
      $(t.option).on('click', function () {
        t.selectOption(this);
      });
      $('body').on('click', function (event) {
        if (!event.target.closest(t.field)) t.hideAllOptions();
      });
    },
    toggleOptions: function toggleOptions(obj) {
      let t = this,
          p = $(obj).closest(t.field);
      $(t.field).not(p).removeClass('is-open');
      p.toggleClass('is-open');
    },
    hideAllOptions: function hideAllOptions() {
      let t = this;
      $(t.field).removeClass('is-open');
    },
    selectOption: function selectOption(obj) {
      let t = this,
          p = $(obj).closest(t.field);
      t.hideAllOptions();
      p.find(t.caption).html($(obj).html());
      p.find(t.value).val($(obj).data('val'));
  
      if ($(obj).hasClass(t.subm)) {
        // console.log('submit');
        p.find('form').submit();
      }
  
      if ($(p).hasClass(t.nav)) {
        $(t.navItem).removeClass('is-active');
        $(t.navItem + '[data-id="' + $(obj).data('val') + '"]').addClass('is-active');
      }
    }
  };
  let gTabs = {
    parentTabs: '.js-tabs-parent',
    captionTab: '.js-tab-caption',
    blockTab: '.js-tab-block',
    init: function init() {
      let t = this;
      $(t.captionTab).on('click', function () {
        t.activeTab(this);
      });
    },
    activeTab: function activeTab(obj) {
      let t = this,
          p = $(obj).closest(t.parentTabs);
      p.find(t.captionTab).removeClass('is-active');
      $(obj).addClass('is-active');
      let idx = p.find(t.captionTab).index($(obj));
      p.find(t.blockTab).removeClass('is-active');
      p.find(t.blockTab).eq(idx).addClass('is-active');
      gProduct.reactive();
    }
  };
  
  let gCounter = {
    el: '.js-counter',
    elMinus: '.js-counter-minus',
    elPlus: '.js-counter-plus',
    elInput: '.js-counter-count',
    basket: '.js-basket',
    basketCount: '.js-basket-count',
    baskerPrice: '.js-basket-price',
    baskerOldPrice: '.js-basket-oldprice',
    basketRemove: '.js-basket-remove',
    basketSum: '.js-basket-sum',
    basketDiscount: '.js-basket-discount',
    baskerEmpty: '.js-basket-empty',
    blockClass: '.is-blocked',
    init: function init() {
      let t = this;
      $(t.elMinus).on('click', function () {
        t.counterMinus(this);
      });
      $(t.elPlus).on('click', function () {
        t.counterPlus(this);
      });
      $(t.elInput).on('keyup blur', function () {
        t.fieldValidation(this);
      });
      $(t.basketRemove).on('click', function () {
        t.removeItem(this);
      });
      t.calc();
    },
    fieldValidation: function fieldValidation(obj) {
      let regexp = /^[0-9@]+$/;
  
      if ($.trim(obj.value) === '') {
        obj.value = 1;
      }
  
      if (regexp.test(obj.value) !== true) {
        obj.value = obj.value.replace(/[^0-9@]+/, '');
      }
  
      if (parseInt(obj.value) < 1) obj.value = 1;
      if (parseInt(obj.value) > 9999) obj.value = 9999;
      this.buttons(obj);
    },
    counterMinus: function counterMinus(obj) {
      let t = this,
          field = $(obj).closest(t.el).find(t.elInput)[0],
          i = 0;
      if ($(obj).closest(t.blockClass).length != 0) return false;
      t.fieldValidation(field);
      i = parseInt(field.value);
      i--;
      if (i < 1) i = 1;
      field.value = i;
      t.buttons(field);
    },
    counterPlus: function counterPlus(obj) {
      let t = this,
          field = $(obj).closest(t.el).find(t.elInput)[0],
          i = 0;
      if ($(obj).closest(t.blockClass).length != 0) return false;
      t.fieldValidation(field);
      i = parseInt(field.value);
      i++;
      if (i > 9999) i = 9999;
      field.value = i;
      t.buttons(field);
    },
    buttons: function buttons(obj) {
      let t = this,
          parent = $(obj).closest(t.el);
  
      if (obj.value <= 1) {
        parent.find(t.elMinus).addClass('is-disabled');
      } else {
        parent.find(t.elMinus).removeClass('is-disabled');
      }
  
      if (obj.value >= 9999) {
        parent.find(t.elPlus).addClass('is-disabled');
      } else {
        parent.find(t.elPlus).removeClass('is-disabled');
      }
  
      t.calc();
    },
    removeItem: function removeItem(obj) {
      let t = this;
      $(obj).closest(t.basket).addClass('is-hidden');
      t.calc();
  
      if ($(t.basket + ':visible').length == 0) {
        $(t.baskerEmpty).addClass('is-show');
        $(t.basketCount).html('');
      } else {
        $(t.basketCount).html('(' + $(t.basket + ':visible').length + ' шт)');
      }
    },
    calc: function calc() {
      let t = this,
          sum = 0,
          oldsum = 0,
          disc = 0;
      $(t.el + ':visible').each(function () {
        let price = parseFloat($(this).data('price')) * parseInt($(this).find(t.elInput).val()),
            oldprice = parseFloat($(this).data('oldprice')) * parseInt($(this).find(t.elInput).val());
        sum += price;
        oldsum += oldprice;
        price = new Intl.NumberFormat('ru-RU').format(price.toFixed(2));
        oldprice = new Intl.NumberFormat('ru-RU').format(oldprice.toFixed(2));
        $(this).closest(t.basket).find(t.baskerPrice).html('<span class="price_rub">o</span> ' + price);
        $(this).closest(t.basket).find(t.baskerOldPrice).html('<span class="price_rub">o</span> ' + oldprice);
      });
      disc = Math.abs(oldsum - sum);
      sum = new Intl.NumberFormat('ru-RU').format(sum.toFixed(2));
      disc = new Intl.NumberFormat('ru-RU').format(disc.toFixed(2));
      $(t.basketDiscount).html(disc + ' <span class="price_rub">o</span>');
      $(t.basketSum).html(sum + ' <span class="price_rub">o</span>');
    }
  };

  $(function () {
    fieldSuggest.init(); //field suggest
    fieldSelect.init() //field select
    gTabs.init() //gTabs select
    gCounter.init() //gCounter select
  })