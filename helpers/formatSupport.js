export const formatImg = (imgPath) => {
  if(!imgPath) return '';
  const path = 'https://s3-hoozing.s3.amazonaws.com/';
  const index = imgPath.indexOf('/');
  if(!index) return '';
  const str = imgPath.substr(0 , index);
  return str !== 'images' ? imgPath : `${path}${imgPath}`;
}

export const formatName = (firstName, lastName) => {
  return `${firstName.trim()} ${lastName.trim()}`;
}