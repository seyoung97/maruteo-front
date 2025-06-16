let idCounter = 0;

export const generateID = (prefix = 'blog-id-'): string => {
   
  return `${prefix}${(idCounter += 1)}`;
};
