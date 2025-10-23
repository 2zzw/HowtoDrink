export interface Ingredient {
  name: string
  amount: string
  unit?: string
}

export interface Drink {
  id: string
  name: string
  type: 'tea' | 'coffee' | 'alcohol'
  description: string
  ingredients: Ingredient[]
  steps: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  prepTime: number // 分钟
  image?: string
}

export type DrinkType = 'tea' | 'coffee' | 'alcohol'
