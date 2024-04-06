import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should degrade quality & sell date by 1 for normal items', () => {
    const gildedRose = new GildedRose([new Item('normal item', 2, 50)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(49);
  });
});
