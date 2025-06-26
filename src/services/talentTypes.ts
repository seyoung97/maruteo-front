// 재능 카테고리 타입
export interface TalentCategory {
  id: string;
  name: string;
  subCategories: TalentSubCategory[];
}

// 재능 하위 카테고리 타입  
export interface TalentSubCategory {
  id: string;
  name: string;
  categoryId: string;
}

// 선택된 재능 타입
export interface SelectedTalent {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
}

// 재능 선택 상태 타입
export interface TalentSelectionState {
  selectedCategory: string | null;
  selectedTalents: SelectedTalent[];
  searchTerm: string;
}