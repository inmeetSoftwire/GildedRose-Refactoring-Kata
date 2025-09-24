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

  it('does not allow items quality to become negative', () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", -5, 0)]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([{
      name: "+5 Dexterity Vest",
      sellIn: -6,
      quality: 0
    }])
  })

  it('aged brie increases in quality the older it gets', () => {
    const gildedRose = new GildedRose(
      [
        new Item("Aged Brie", 10, 0),
        new Item("Aged Brie", -8, 0)
      ]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([
      {
        name: "Aged Brie",
        sellIn: 9,
        quality: 1
      }, 
      {
        name: "Aged Brie",
        sellIn: -9,
        quality: 2
      }
    ])
  })

  it('does not allow quality of items to go above 50', () => {
    const gildedRose = new GildedRose(
      [
        new Item("Aged Brie", 5, 50),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
        new Item("Elixir of the Mongoose", 5, 49)
      ]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([
      {
        name: "Aged Brie",
        sellIn: 4,
        quality: 50
      }, 
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 4,
        quality: 50
      },
      {
        name: "Elixir of the Mongoose",
        sellIn: 4,
        quality: 48
      },
    ])
  })

  it('does not allow quality of items to go above 50', () => {
    const gildedRose = new GildedRose(
      [
        new Item("Aged Brie", 5, 50),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
        new Item("Elixir of the Mongoose", 5, 49)
      ]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([
      {
        name: "Aged Brie",
        sellIn: 4,
        quality: 50
      }, 
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 4,
        quality: 50
      },
      {
        name: "Elixir of the Mongoose",
        sellIn: 4,
        quality: 48
      },
    ])
  })

  it('"Sulfuras" items are unchanged', () => {
    const gildedRose = new GildedRose(
      [
        new Item("Sulfuras", 0, 80),
         new Item("Sulfuras, Hand of Ragnaros", -1, 80)
      ]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([
      {
        name: "Sulfuras",
        sellIn: 0,
        quality: 80
      }, 
      {
        name: "Sulfuras, Hand of Ragnaros",
        sellIn: -1,
        quality: 80
      },
    ])
  })

  it('"Backstage passes" are unchanged', () => {
    const gildedRose = new GildedRose(
      [
        new Item("Backstage passes to Softwire Christmas Party", 12, 40),
        new Item("Backstage passes to Ryan's 27th Birthday Bash", 9, 40),
        new Item("Backstage passes to Cambridge University", 3, 40),
         new Item("Backstage passes to Company Meeting", 0, 40)
      ]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([
      {
        name: "Backstage passes to Softwire Christmas Party",
        sellIn: 11,
        quality: 41
      }, 
      {
        name: "Backstage passes to Ryan's 27th Birthday Bash",
        sellIn: 8,
        quality: 42
      },
      {
        name: "Backstage passes to Cambridge University",
        sellIn: 2,
        quality: 43
      },
      {
        name: "Backstage passes to Company Meeting",
        sellIn: -1,
        quality: 0
      },
    ])
  })

});
