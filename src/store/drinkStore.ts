import { defineStore } from 'pinia'
import type { Drink, DrinkType } from '@/types/drink'

export const useDrinkStore = defineStore('drinks', {
  state: () => ({
    drinks: [] as Drink[],
    searchQuery: ''
  }),

  getters: {
    filteredDrinks: (state) => {
      if (!state.searchQuery) return state.drinks

      const query = state.searchQuery.toLowerCase()
      return state.drinks.filter(drink =>
        drink.name.toLowerCase().includes(query) ||
        drink.description.toLowerCase().includes(query) ||
        drink.ingredients.some(ingredient =>
          ingredient.name.toLowerCase().includes(query)
        )
      )
    },

    drinksByType: (state) => {
      return (type: DrinkType) =>
        state.drinks.filter(drink => drink.type === type)
    }
  },

  actions: {
    setSearchQuery(query: string) {
      this.searchQuery = query
    },

    addDrink(drink: Drink) {
      this.drinks.push(drink)
    },

    initDrinks() {
      // 初始化示例数据
      this.drinks = [
        // 奶茶类 (5种)
        {
          id: 'tea-1',
          name: '经典珍珠奶茶',
          type: 'tea',
          description: '经典的台式奶茶，搭配Q弹珍珠',
          ingredients: [
            { name: '红茶', amount: '200', unit: 'ml' },
            { name: '牛奶', amount: '100', unit: 'ml' },
            { name: '黑糖珍珠', amount: '50', unit: 'g' },
            { name: '糖浆', amount: '20', unit: 'ml' }
          ],
          steps: [
            '煮制红茶200ml',
            '加入牛奶和糖浆调制成奶茶',
            '将珍珠用黑糖煮熟',
            '杯中放入珍珠，倒入奶茶'
          ],
          difficulty: 'easy',
          prepTime: 10
        },
        {
          id: 'tea-2',
          name: '抹茶拿铁',
          type: 'tea',
          description: '日式抹茶与牛奶的完美结合',
          ingredients: [
            { name: '抹茶粉', amount: '2', unit: '茶匙' },
            { name: '热水', amount: '50', unit: 'ml' },
            { name: '牛奶', amount: '150', unit: 'ml' },
            { name: '蜂蜜', amount: '15', unit: 'ml' }
          ],
          steps: [
            '用热水将抹茶粉调成抹茶液',
            '加热牛奶至温热',
            '将抹茶液和牛奶混合',
            '加入蜂蜜调味'
          ],
          difficulty: 'easy',
          prepTime: 5
        },
        {
          id: 'tea-3',
          name: '泰式柠檬茶',
          type: 'tea',
          description: '酸甜清爽的泰式风味',
          ingredients: [
            { name: '红茶', amount: '200', unit: 'ml' },
            { name: '柠檬汁', amount: '30', unit: 'ml' },
            { name: '炼乳', amount: '20', unit: 'ml' },
            { name: '糖浆', amount: '15', unit: 'ml' },
            { name: '冰块', amount: '适量' }
          ],
          steps: [
            '煮制红茶并冷却',
            '在杯中加入柠檬汁和炼乳',
            '加入冰块',
            '倒入红茶，搅拌均匀'
          ],
          difficulty: 'easy',
          prepTime: 3
        },
        {
          id: 'tea-4',
          name: '芋泥奶茶',
          type: 'tea',
          description: '香浓芋泥与奶茶的融合',
          ingredients: [
            { name: '红茶', amount: '150', unit: 'ml' },
            { name: '牛奶', amount: '100', unit: 'ml' },
            { name: '芋泥', amount: '80', unit: 'g' },
            { name: '糖浆', amount: '15', unit: 'ml' },
            { name: '珍珠', amount: '30', unit: 'g' }
          ],
          steps: [
            '制作红茶奶茶',
            '在杯底加入芋泥',
            '加入煮好的珍珠',
            '缓缓倒入奶茶'
          ],
          difficulty: 'medium',
          prepTime: 15
        },
        {
          id: 'tea-5',
          name: '椰果奶茶',
          type: 'tea',
          description: '椰香与奶茶的完美搭配',
          ingredients: [
            { name: '红茶', amount: '200', unit: 'ml' },
            { name: '椰浆', amount: '50', unit: 'ml' },
            { name: '牛奶', amount: '50', unit: 'ml' },
            { name: '椰果', amount: '40', unit: 'g' },
            { name: '糖浆', amount: '20', unit: 'ml' }
          ],
          steps: [
            '煮制红茶',
            '加入椰浆、牛奶和糖浆调制',
            '杯中加入椰果',
            '倒入调制好的奶茶'
          ],
          difficulty: 'easy',
          prepTime: 8
        },

        // 咖啡类 (5种)
        {
          id: 'coffee-1',
          name: '经典拿铁',
          type: 'coffee',
          description: '意式浓缩与牛奶的经典组合',
          ingredients: [
            { name: '意式浓缩咖啡', amount: '30', unit: 'ml' },
            { name: '牛奶', amount: '150', unit: 'ml' },
            { name: '奶泡', amount: '适量' }
          ],
          steps: [
            '萃取意式浓缩咖啡',
            '蒸汽加热牛奶并打发',
            '将牛奶缓缓倒入咖啡',
            '在表面加上奶泡'
          ],
          difficulty: 'medium',
          prepTime: 5
        },
        {
          id: 'coffee-2',
          name: '摩卡咖啡',
          type: 'coffee',
          description: '巧克力与咖啡的甜蜜邂逅',
          ingredients: [
            { name: '意式浓缩咖啡', amount: '30', unit: 'ml' },
            { name: '巧克力酱', amount: '20', unit: 'ml' },
            { name: '牛奶', amount: '120', unit: 'ml' },
            { name: '鲜奶油', amount: '适量' }
          ],
          steps: [
            '在杯底加入巧克力酱',
            '萃取意式浓缩咖啡',
            '加热牛奶并倒入杯中',
            '顶部加上鲜奶油'
          ],
          difficulty: 'easy',
          prepTime: 7
        },
        {
          id: 'coffee-3',
          name: '卡布奇诺',
          type: 'coffee',
          description: '咖啡、牛奶、奶泡1:1:1的经典比例',
          ingredients: [
            { name: '意式浓缩咖啡', amount: '30', unit: 'ml' },
            { name: '牛奶', amount: '90', unit: 'ml' },
            { name: '奶泡', amount: '90', unit: 'ml' }
          ],
          steps: [
            '萃取意式浓缩咖啡',
            '制作等量的牛奶和奶泡',
            '依次倒入咖啡、牛奶、奶泡',
            '可撒上可可粉装饰'
          ],
          difficulty: 'medium',
          prepTime: 6
        },
        {
          id: 'coffee-4',
          name: '焦糖玛奇朵',
          type: 'coffee',
          description: '香甜焦糖与咖啡的艺术',
          ingredients: [
            { name: '意式浓缩咖啡', amount: '30', unit: 'ml' },
            { name: '牛奶', amount: '120', unit: 'ml' },
            { name: '焦糖酱', amount: '15', unit: 'ml' },
            { name: '香草糖浆', amount: '10', unit: 'ml' }
          ],
          steps: [
            '在杯底加入香草糖浆',
            '加热牛奶',
            '缓缓倒入牛奶',
            '在表面加入浓缩咖啡和焦糖酱'
          ],
          difficulty: 'medium',
          prepTime: 8
        },
        {
          id: 'coffee-5',
          name: '美式咖啡',
          type: 'coffee',
          description: '简单纯粹的咖啡体验',
          ingredients: [
            { name: '意式浓缩咖啡', amount: '30', unit: 'ml' },
            { name: '热水', amount: '150', unit: 'ml' }
          ],
          steps: [
            '萃取意式浓缩咖啡',
            '加入热水稀释',
            '可根据喜好添加糖或牛奶'
          ],
          difficulty: 'easy',
          prepTime: 3
        },

        // 酒品类 (5种)
        {
          id: 'alcohol-1',
          name: '莫吉托',
          type: 'alcohol',
          description: '清爽的古巴经典鸡尾酒',
          ingredients: [
            { name: '白朗姆酒', amount: '50', unit: 'ml' },
            { name: '青柠汁', amount: '30', unit: 'ml' },
            { name: '薄荷叶', amount: '8-10', unit: '片' },
            { name: '苏打水', amount: '100', unit: 'ml' },
            { name: '糖浆', amount: '20', unit: 'ml' }
          ],
          steps: [
            '在杯中捣碎薄荷叶',
            '加入青柠汁和糖浆',
            '加入朗姆酒和冰块',
            '最后加入苏打水，轻轻搅拌'
          ],
          difficulty: 'easy',
          prepTime: 5
        },
        {
          id: 'alcohol-2',
          name: '长岛冰茶',
          type: 'alcohol',
          description: '多种烈酒调制的强力鸡尾酒',
          ingredients: [
            { name: '伏特加', amount: '15', unit: 'ml' },
            { name: '金酒', amount: '15', unit: 'ml' },
            { name: '白朗姆酒', amount: '15', unit: 'ml' },
            { name: '龙舌兰', amount: '15', unit: 'ml' },
            { name: '柠檬汁', amount: '25', unit: 'ml' },
            { name: '可乐', amount: '适量' }
          ],
          steps: [
            '在调酒壶中加入所有烈酒',
            '加入柠檬汁和冰块',
            '摇匀后倒入杯中',
            '加入可乐至满杯'
          ],
          difficulty: 'medium',
          prepTime: 6
        },
        {
          id: 'alcohol-3',
          name: '玛格丽特',
          type: 'alcohol',
          description: '经典的盐边鸡尾酒',
          ingredients: [
            { name: '龙舌兰', amount: '50', unit: 'ml' },
            { name: '君度橙酒', amount: '25', unit: 'ml' },
            { name: '青柠汁', amount: '25', unit: 'ml' },
            { name: '盐', amount: '适量' }
          ],
          steps: [
            '在杯口涂抹青柠汁并蘸盐',
            '将所有液体加入调酒壶',
            '加冰块后摇匀',
            '过滤倒入杯中'
          ],
          difficulty: 'medium',
          prepTime: 7
        },
        {
          id: 'alcohol-4',
          name: '蓝色夏威夷',
          type: 'alcohol',
          description: '充满热带风情的蓝色鸡尾酒',
          ingredients: [
            { name: '白朗姆酒', amount: '30', unit: 'ml' },
            { name: '蓝橙力娇酒', amount: '15', unit: 'ml' },
            { name: '椰浆', amount: '30', unit: 'ml' },
            { name: '菠萝汁', amount: '60', unit: 'ml' },
            { name: '柠檬汁', amount: '15', unit: 'ml' }
          ],
          steps: [
            '将所有液体加入调酒壶',
            '加冰块后摇匀',
            '过滤倒入装有冰块的杯中',
            '可用菠萝片装饰'
          ],
          difficulty: 'easy',
          prepTime: 5
        },
        {
          id: 'alcohol-5',
          name: '白俄罗斯',
          type: 'alcohol',
          description: '简单易做的奶油鸡尾酒',
          ingredients: [
            { name: '伏特加', amount: '50', unit: 'ml' },
            { name: '咖啡力娇酒', amount: '25', unit: 'ml' },
            { name: '鲜奶油', amount: '25', unit: 'ml' }
          ],
          steps: [
            '将伏特加和咖啡力娇酒加入杯中',
            '加入冰块搅拌',
            '缓缓倒入鲜奶油',
            '无需搅拌让其自然分层'
          ],
          difficulty: 'easy',
          prepTime: 3
        }
      ]
    }
  }
})

