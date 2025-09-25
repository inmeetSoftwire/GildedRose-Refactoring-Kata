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
  getBackstagePassQualityChange(index: number) {

    // if (this.items[index].sellIn <= 0) {
    //   return -this.items[index].quality
    // } else if (this.items[index].sellIn <= 5) {
    //   return 3
    // } else if (this.items[index].sellIn <= 10) {
    //   return 2;
    // } else {
    //   return 1
    // }

    let qualityChange = 1;
    switch (true) {
      case (this.items[index].sellIn <= 0):
        return -this.items[index].quality;
      case (this.items[index].sellIn <= 5):
        qualityChange++;
      case (this.items[index].sellIn <= 10):
        qualityChange++;
    }
    return qualityChange
    
  }

  getItemQuality(currentQuality, qualityChange) {
    const finalQuality = currentQuality + qualityChange
    return Math.min(Math.max(0, finalQuality), 50)
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name.includes('Sulfuras')) {
        continue;
      }

      let qualityChange = 0
      
      // if (this.items[i].name === 'Aged Brie') {
      //   qualityChange = this.items[i].sellIn <= 0 ? 2 : 1
      // } else if (this.items[i].name.includes('Backstage passes')) {
      //   qualityChange = this.handleBackstagePassQuality(i)
      // } else {
      //     qualityChange = this.items[i].sellIn <= 0 ? -2 : -1
      // }

      switch (true) {
        case (this.items[i].name === 'Aged Brie') : {
          qualityChange = this.items[i].sellIn <= 0 ? 2 : 1
          break
        }
        case (this.items[i].name.includes('Backstage passes')): {
          qualityChange = this.getBackstagePassQualityChange(i)
          break
        }
        default: {
          qualityChange = this.items[i].sellIn <= 0 ? -2 : -1
        }
      }

      if (this.items[i].name.includes("Conjured")) {
        qualityChange *= 2
      }
      
      this.items[i].quality = this.getItemQuality(this.items[i].quality, qualityChange)
      this.items[i].sellIn -= 1;
      
    }

    return this.items;
  }
}
