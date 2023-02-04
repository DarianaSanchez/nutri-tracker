import driData from '../data/dri_db.json'

export function getDRI(gender, age) {
  return driData.filter(record => (
    (record.gender === '*' || record.gender === gender)
    && (age >= record.min_age && age <= record.max_age)
  ))
}

export async function searchFoods(foodName) {
  const params = new URLSearchParams({
    'api_key': process.env.REACT_APP_API_KEY,
    'query': foodName,
  })
  const data = await fetch(
    `${process.env.REACT_APP_API_URL_SEARCH_FOOD}?${params}`
  ).then((response) => response.json());

  return data.foods
    .filter((x) => Boolean(x.servingSize))
    .slice(0, 20);
}

export async function getFood(foodId) {
  const params = new URLSearchParams({
    'api_key': process.env.REACT_APP_API_KEY,
  })
  const data = await fetch(
    `${process.env.REACT_APP_API_URL_FOOD_INFO}/${foodId}?${params}`
  ).then((response) => response.json());

  return data
}

export function round(num, pos) {
  return parseFloat(num.toFixed(pos || 2));
};

export function convertWeight(amount, unit) {
  if (unit) {
    unit = unit.toLowerCase();
  } else {
    return false;
  }

  let allUnits = {};
  allUnits['g'] = allUnits['mg'] = allUnits['mcg'] = allUnits['µg'] = amount;

  if (unit === 'g') {
    allUnits['mg'] = amount * 1000;
    allUnits['mcg'] = allUnits['µg'] = amount * 1000000;
  } else if (unit === 'mg') {
    allUnits['g'] = amount / 1000;
    allUnits['mcg'] = allUnits['µg'] = amount * 1000;
  } else if (unit === 'mcg' || unit === 'µg') {
    allUnits['g'] = amount / 1000000;
    allUnits['mg'] = amount / 1000;
  } else {
    return false;
  }

  return allUnits;
}