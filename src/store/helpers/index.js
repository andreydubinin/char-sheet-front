export const isEmpty = obj => {
  for (let key in obj)
    return false;
  return true
};

export const delKeys = obj => {
  for(var key in obj){
    if (obj.hasOwnProperty(key)) {
      if(obj[key] !== null && typeof(obj[key]) === 'object'  && !(obj[key] instanceof Date)){
        delKeys(obj[key]);

        if(isEmpty(obj[key])) {
          delete obj[key];
        }
      }
      if(obj[key] === null){
        delete obj[key];
      }
      else if (obj[key] === '') {
        delete obj[key];
      }
    }
  }
};
