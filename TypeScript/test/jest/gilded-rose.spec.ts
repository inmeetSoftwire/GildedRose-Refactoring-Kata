import { Item, GildedRose } from '@/gilded-rose';

describe("Standard items", () => {
  it('should decrease in quality and sellIn', () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20)]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([{
      name: "+5 Dexterity Vest",
      sellIn: 9,
      quality: 19
    }])
  })

  it('should decrease twice in quality if past sellIn date', () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", -2, 20)]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([{
      name: "+5 Dexterity Vest",
      sellIn: -3,
      quality: 18
    }])
  })
})

describe('Aged Brie', () => {
    it('should increase in quality by 1 when sellIn is positive', () => {
    const gildedRose = new GildedRose(
      [
        new Item("Aged Brie", 10, 0),
      ]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([
      {
        name: "Aged Brie",
        sellIn: 9,
        quality: 1
      }
    ])
  })

  it('should increase in quality by 2 when sellin is <= 0', () => {
    const gildedRose = new GildedRose(
      [
        new Item("Aged Brie", -8, 0)
      ]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([
      {
        name: "Aged Brie",
        sellIn: -9,
        quality: 2
      }
    ])
  })
})

describe('Backstages Passes', () => {
  it('increase in quality by 1 when sellIn is more than 10', () => {
    const gildedRose = new GildedRose(
      [
        new Item("Backstage passes to Softwire Christmas Party", 12, 40),
      ]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([
      {
        name: "Backstage passes to Softwire Christmas Party",
        sellIn: 11,
        quality: 41
      }
    ])
  })


  it('increase in quality by 2 when sellIn is between 6 and 10', () => {
    const gildedRose = new GildedRose(
      [        new Item("Backstage passes to Ryan's 27th Birthday Bash", 9, 40),
      ]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([
      {
        name: "Backstage passes to Ryan's 27th Birthday Bash",
        sellIn: 8,
        quality: 42
      }
    ])
  })

  it('increase in quality by 3 when sellIn is between 0 and 5', () => {
    const gildedRose = new GildedRose(
      [
        new Item("Backstage passes to Cambridge University", 3, 40),
      ]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([
      {
        name: "Backstage passes to Cambridge University",
        sellIn: 2,
        quality: 43
      },
    ])
  })

  it('quality is 0 when sellIn is negative', () => {
    const gildedRose = new GildedRose(
      [
         new Item("Backstage passes to Company Meeting", 0, 40)
      ]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([
      {
        name: "Backstage passes to Company Meeting",
        sellIn: -1,
        quality: 0
      },
    ])
  })
})

describe("Quality limits", () => {
  it('does not allow items quality to become negative', () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", -5, 0)]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([{
      name: "+5 Dexterity Vest",
      sellIn: -6,
      quality: 0
    }])
  })

  it('does not allow quality of items to go above 50', () => {
    const gildedRose = new GildedRose(
      [
        new Item("Aged Brie", 5, 50),
      ]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([
      {
        name: "Aged Brie",
        sellIn: 4,
        quality: 50
      },
    ])
  })
})

describe("Sulfuras items", () => {
  it('"Sulfuras" items are unchanged', () => {
    const gildedRose = new GildedRose(
      [
        new Item("Sulfuras", 0, 80)
      ]);
    const items = gildedRose.updateQuality()
    expect(items).toEqual([
      {
        name: "Sulfuras",
        sellIn: 0,
        quality: 80
      },
    ])
  })
})