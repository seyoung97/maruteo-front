import { useMemo, useState } from 'react';
import { TALENT_CATEGORIES } from '../data/talentData';
import type { SelectedTalent, TalentSelectionState, TalentSubCategory } from '../services/talentTypes';

export const useTalentSelection = () => {
  const [state, setState] = useState<TalentSelectionState>({
    selectedCategory: null,
    selectedTalents: [],
    searchTerm: '',
  });

  // 검색어로 필터링된 하위 카테고리들 (전체 데이터에서 검색)
  const filteredSubCategories = useMemo(() => {
    // 검색어가 있는 경우: 전체 데이터에서 검색
    if (state.searchTerm) {
      const searchResults: TalentSubCategory[] = [];
      TALENT_CATEGORIES.forEach(category => {
        const matchingSubCategories = category.subCategories.filter(subCat =>
          subCat.name.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
        searchResults.push(...matchingSubCategories);
      });
      return searchResults;
    }
    
    // 검색어가 없는 경우: 선택된 카테고리의 하위 카테고리만 표시
    const currentCategory = TALENT_CATEGORIES.find(
      cat => cat.id === state.selectedCategory
    );
    
    return currentCategory ? currentCategory.subCategories : [];
  }, [state.selectedCategory, state.searchTerm]);

  // 카테고리 선택
  const selectCategory = (categoryId: string) => {
    setState(prev => ({
      ...prev,
      selectedCategory: categoryId,
    }));
  };

  // 검색어 설정
  const setSearchTerm = (term: string) => {
    setState(prev => ({ 
      ...prev, 
      searchTerm: term,
      // 검색어가 있을 때는 카테고리 선택을 무시
      selectedCategory: term ? null : prev.selectedCategory
    }));
  };

  // 재능 토글 (체크/언체크)
  const toggleTalent = (subCategory: TalentSubCategory) => {
    const category = TALENT_CATEGORIES.find(cat => cat.id === subCategory.categoryId);
    if (!category) return;

    setState(prev => {
      const isSelected = prev.selectedTalents.some(talent => talent.id === subCategory.id);
      
      if (isSelected) {
        // 선택 해제
        return {
          ...prev,
          selectedTalents: prev.selectedTalents.filter(talent => talent.id !== subCategory.id)
        };
      } else {
        // 선택 추가
        const newTalent: SelectedTalent = {
          id: subCategory.id,
          name: subCategory.name,
          categoryId: subCategory.categoryId,
          categoryName: category.name,
        };
        return {
          ...prev,
          selectedTalents: [...prev.selectedTalents, newTalent]
        };
      }
    });
  };

  // 재능이 선택되었는지 확인
  const isTalentSelected = (talentId: string) => {
    return state.selectedTalents.some(talent => talent.id === talentId);
  };

  // 선택된 재능들 반환
  const getSelectedTalents = () => state.selectedTalents;

  // 상태 초기화
  const resetSelection = () => {
    setState({
      selectedCategory: null,
      selectedTalents: [],
      searchTerm: '',
    });
  };

  return {
    // 상태
    selectedCategory: state.selectedCategory,
    selectedTalents: state.selectedTalents,
    searchTerm: state.searchTerm,
    filteredSubCategories,
    categories: TALENT_CATEGORIES,
    
    // 액션
    selectCategory,
    setSearchTerm,
    toggleTalent,
    isTalentSelected,
    getSelectedTalents,
    resetSelection,
  };
};