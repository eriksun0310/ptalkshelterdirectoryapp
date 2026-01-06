import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppColors } from '@/constants/theme';

export interface SelectedArea {
  city: string | null;
  district: string | null;
}

interface SectionData {
  title: string;
  data: string[];
  isExpanded: boolean;
}

interface AreaPickerModalProps {
  visible: boolean;
  onClose: () => void;
  selectedArea: SelectedArea;
  onSelect: (area: SelectedArea) => void;
  regions: Record<string, string[]>;
}

export default function AreaPickerModal({
  visible,
  onClose,
  selectedArea,
  onSelect,
  regions,
}: AreaPickerModalProps) {
  const [expandedCity, setExpandedCity] = useState<string | null>(null);

  // 轉換資料格式給 SectionList
  const sections: SectionData[] = Object.entries(regions).map(([city, districts]) => ({
    title: city,
    data: expandedCity === city ? [`全部${city}`, ...districts] : [],
    isExpanded: expandedCity === city,
  }));

  // 點擊縣市 - 展開/收合
  const handleCityPress = (city: string) => {
    setExpandedCity(expandedCity === city ? null : city);
  };

  // 點擊「全部地區」
  const handleSelectAll = () => {
    onSelect({ city: null, district: null });
    onClose();
  };

  // 點擊「全部XX市」
  const handleSelectCityAll = (city: string) => {
    onSelect({ city, district: null });
    onClose();
  };

  // 點擊區域
  const handleSelectDistrict = (city: string, district: string) => {
    onSelect({ city, district });
    onClose();
  };

  // 渲染縣市標題
  const renderSectionHeader = ({ section }: { section: SectionData }) => {
    const isSelected = selectedArea.city === section.title;

    return (
      <Pressable
        style={[styles.cityRow, section.isExpanded && styles.cityRowExpanded]}
        onPress={() => handleCityPress(section.title)}
      >
        <View style={styles.cityContent}>
          <Ionicons
            name={section.isExpanded ? 'chevron-down' : 'chevron-forward'}
            size={16}
            color={AppColors.textSecondary}
          />
          <Text style={styles.cityText}>{section.title}</Text>
        </View>
        {isSelected && <Ionicons name="checkmark" size={18} color={AppColors.primary} />}
      </Pressable>
    );
  };

  // 渲染區域項目
  const renderItem = ({ item, section }: { item: string; section: SectionData }) => {
    const isAllCity = item.startsWith('全部');
    const city = section.title;
    const district = isAllCity ? null : item;

    const isSelected = isAllCity
      ? selectedArea.city === city && selectedArea.district === null
      : selectedArea.city === city && selectedArea.district === item;

    return (
      <Pressable
        style={[styles.districtRow, isSelected && styles.districtRowSelected]}
        onPress={() =>
          isAllCity ? handleSelectCityAll(city) : handleSelectDistrict(city, item)
        }
      >
        <Text style={[styles.districtText, isSelected && styles.districtTextSelected]}>
          {item}
        </Text>
        {isSelected && <Ionicons name="checkmark" size={16} color={AppColors.primary} />}
      </Pressable>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={() => {}}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>選擇地區</Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <Ionicons name="close" size={24} color={AppColors.textPrimary} />
            </Pressable>
          </View>

          {/* 全部地區選項 */}
          <Pressable
            style={[
              styles.allAreaRow,
              !selectedArea.city && styles.allAreaRowSelected,
            ]}
            onPress={handleSelectAll}
          >
            <Text
              style={[
                styles.allAreaText,
                !selectedArea.city && styles.allAreaTextSelected,
              ]}
            >
              全部地區
            </Text>
            {!selectedArea.city && <Ionicons name="checkmark" size={18} color={AppColors.primary} />}
          </Pressable>

          {/* 縣市列表 */}
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
            stickySectionHeadersEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: AppColors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '75%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.divider,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },
  allAreaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.divider,
    backgroundColor: AppColors.surface,
  },
  allAreaRowSelected: {
    backgroundColor: AppColors.primaryLight,
  },
  allAreaText: {
    fontSize: 16,
    color: AppColors.textPrimary,
  },
  allAreaTextSelected: {
    color: AppColors.primary,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 40,
  },
  cityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: AppColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.divider,
  },
  cityRowExpanded: {
    backgroundColor: AppColors.background,
  },
  cityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cityText: {
    fontSize: 16,
    color: AppColors.textPrimary,
  },
  districtRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 44,
    paddingRight: 16,
    backgroundColor: AppColors.background,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.divider,
  },
  districtRowSelected: {
    backgroundColor: AppColors.primaryLight,
  },
  districtText: {
    fontSize: 15,
    color: AppColors.textSecondary,
  },
  districtTextSelected: {
    color: AppColors.primary,
    fontWeight: '600',
  },
});
