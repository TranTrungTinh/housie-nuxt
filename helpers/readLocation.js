const jsonCities = require('@/assets/json/tinh_tp.json');
const jsonDistricts = require('@/assets/json/quan_huyen.json');
const jsonTowns = require('@/assets/json/xa_phuong.json');

const cookingData = item => ({ key: item.code, value: item.name_with_type });

export const getCitiesByCode = (code) => {
  return Object.values(jsonCities)
        .filter(item => item.code === `${code}`).map(cookingData);
}

export const getDistrictsByCode = (code) => {
  return Object.values(jsonDistricts)
        .filter(item => item.parent_code === `${code}`).map(cookingData).sort((a, b) => a.value.localeCompare(b.value));
}

export const getTownsByCode = (code) => {
  return Object.values(jsonTowns)
        .filter(item => item.parent_code === `${code}`).map(cookingData).sort((a, b) => a.value.localeCompare(b.value));
}

export const getNameDistrict = (code) => {
  const result = getDistrictsByCode(79).find(item => item.key === code);
  if(!result) return '';
  return result.value;
}