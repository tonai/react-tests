import { useEffect, useState } from 'react';

import categoryService from '../../services/categoryService/categoryService';

export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryService.getCategories().then(setCategories);
  }, []);
  
  return categories;
}
