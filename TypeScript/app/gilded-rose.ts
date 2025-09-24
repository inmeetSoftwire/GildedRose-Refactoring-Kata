export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      
      const qualityChange = this.items[i].sellIn < 1 ? 2 : 1
      
      if (this.items[i].name === 'Aged Brie') {
        this.items[i].quality = Math.min(this.items[i].quality+qualityChange, 50)
      } else if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].sellIn < 11) {
            if (this.items[i].quality < 50) {
              this.items[i].quality = this.items[i].quality + 1
            }
          }
          if (this.items[i].sellIn < 6) {
            if (this.items[i].quality < 50) {
              this.items[i].quality = this.items[i].quality + 1
            }
          }
        }
      } else {
        if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
          this.items[i].quality = Math.max(this.items[i].quality-qualityChange, 0)
        }
      }

      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn -= 1;
      }
      
      if (this.items[i].sellIn < 0 && this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
        this.items[i].quality = 0
      }
      
    }

    return this.items;
  }
}
