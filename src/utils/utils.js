import driData from '../data/dri_db.json'

// TODO: make these config values
const API_KEY = '2FKsAypWtW6GUN6SHe0AECjHK3xOFtkaG9Jas0x8'
const API_URL_SEARCH_FOOD = 'https://api.nal.usda.gov/fdc/v1/foods/search'
const API_URL_FOOD_INFO = 'https://api.nal.usda.gov/fdc/v1/food'

export function getDRI(gender, age) {
  return driData.filter(record => (
    (record.gender === '*' || record.gender === gender)
    && (age >= record.min_age && age <= record.max_age)
  ))
}

export async function searchFoods(foodName) {
  const params = new URLSearchParams({
    'api_key': API_KEY,
    'query': foodName,
  })
  const data = await fetch(
    `${API_URL_SEARCH_FOOD}?${params}`
  ).then((response) => response.json());

  return data.foods
    .filter((x) => Boolean(x.servingSize))
    .slice(0, 20);
}

export async function getFood(foodId) {
  const params = new URLSearchParams({
    'api_key': API_KEY,
  })
  const data = await fetch(
    `${API_URL_FOOD_INFO}/${foodId}?${params}`
  ).then((response) => response.json());

  return data
}
