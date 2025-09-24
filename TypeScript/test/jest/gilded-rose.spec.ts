import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  it('decreases in quality and sellIn for standard item', () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20)]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([{
      name: "+5 Dexterity Vest",
      sellIn: 9,
      quality: 19
    }])
  })

  it('decreases twice in quality if past sellIn date', () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", -2, 20)]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([{
      name: "+5 Dexterity Vest",
      sellIn: -3,
      quality: 18
    }])
  })

});
