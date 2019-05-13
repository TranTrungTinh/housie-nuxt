const roomsType = [
  { key: 0, value: 'Phòng trọ' },
  { key: 1, value: 'Nhà nguyên căn' },
  { key: 2, value: 'Căn hộ' }
];

export const getRoomsType = () => roomsType;
export const getValueByCode = code => {
  const item = roomsType.find(e => e.key === code);
  if(!item) return 'Phòng';
  return item.value;
}