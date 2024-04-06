import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should degrade quality & sell date by 1 for normal items', () => {
    const gildedRose = new GildedRose([new Item('normal item', 1, 50)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(49);
  });

  it('should not allow quality be negative', () => {
    const gildedRose = new GildedRose([new Item('normal item', 2, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
  });

  it('should increase aged brie quality as it gets older', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(1);
  });

  it('should increase aged bries quality by 2 when sellIn date has passed', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(2);
  });

  it('should not allow quality to be more than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 49)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
  });

  it('should not affect sulfuras quality or sellIn date', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(80);
  });

  it('should increase quality of backstage passes by 1 when sellIn date is more than 10 days', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(1);
  });

  it('should increase quality of backstage passes by 2 if the sellIn date is 10 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(2);
  });

  it('should increase quality of backstage passes by 3 if the sellIn date is 5 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(3);
  });

  it('should set quality of backstage passes to 0 if the sellIn date has passed', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
  });
});
