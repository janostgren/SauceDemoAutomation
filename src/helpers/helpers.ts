export const removeHyphensInString = (arg0: string) => (originalString: string): string =>{
return originalString.replace(/-/g, " ");
}

export const findAndUpdateObjectInArray = (objects: any[], data: any, id: string) => {
    const index = findIndexById(objects, id);
    if (index !== -1) {
      Object.assign(objects[index], data);
      objects[index]._id = id;
      return true;
    }
    return false;
  };

  export const findIndexById = (objects: any[], id: string) => {
    const index = objects.findIndex((object) => object._id === id || object._id === '');
    return index;
  };