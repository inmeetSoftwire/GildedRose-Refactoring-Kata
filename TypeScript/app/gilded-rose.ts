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
      if (this.items[i].name.startsWith('Sulfuras')) {
        continue;
      }

      let qualityChange = 0
      
      if (this.items[i].name === 'Aged Brie') {
        qualityChange = this.items[i].sellIn < 1 ? 2 : 1
      } else if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].sellIn < 6) {
          qualityChange = 3
        } else if (this.items[i].sellIn < 11) {
          qualityChange = 2;
        } else {
          qualityChange = 1
        }
      } else {
          qualityChange = this.items[i].sellIn < 1 ? -2 : -1
      }
      const finalQuality = this.items[i].quality + qualityChange
      this.items[i].quality = Math.min(Math.max(0, finalQuality), 50)
      
      this.items[i].sellIn -= 1;
            
      if (this.items[i].sellIn < 0 && this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
        this.items[i].quality = 0
      }
      
    }

    return this.items;
  }
}
