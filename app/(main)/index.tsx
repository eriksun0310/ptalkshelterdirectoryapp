import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AreaPickerModal, { SelectedArea } from '@/components/AreaPickerModal';
import { AppColors } from '@/constants/theme';
import { TAIWAN_REGIONS, mockShelters } from '@/mocks/shelters';
import type { ShelterListItem } from '@/types';
import { SHELTER_TAG_LABELS } from '@/types';

export default function ShelterListScreen() {
  const router = useRouter();

  // 篩選狀態
  const [selectedArea, setSelectedArea] = useState<SelectedArea>({
    city: null,
    district: null,
  });
  const [showAreaPicker, setShowAreaPicker] = useState(false);

  // 模擬載入狀態（之後會用 TanStack Query）
  const [isLoading] = useState(false);

  // 篩選後的資料
  const filteredShelters = useMemo(() => {
    let result = [...mockShelters];

    if (selectedArea.city) {
      result = result.filter((s) => s.city === selectedArea.city);
    }

    if (selectedArea.district) {
      result = result.filter((s) => s.district === selectedArea.district);
    }

    return result;
  }, [selectedArea]);

  // 篩選按鈕文字
  const areaButtonText = useMemo(() => {
    if (selectedArea.district) {
      return `${selectedArea.city}・${selectedArea.district}`;
    }
    if (selectedArea.city) {
      return selectedArea.city;
    }
    return '選擇地區';
  }, [selectedArea]);

  // 是否有篩選
  const hasFilter = selectedArea.city !== null;

  // 清除篩選
  const handleClearFilter = () => {
    setSelectedArea({ city: null, district: null });
  };

  // 渲染列表項目
  const renderItem = useCallback(
    ({ item }: { item: ShelterListItem }) => (
      <Pressable
        style={styles.card}
        onPress={() => router.push(`/(main)/shelter/${item.id}` as any)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>

        <Text style={styles.cardLocation}>
          {item.city}・{item.district}
        </Text>

        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.shortDescription}
        </Text>

        {item.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {item.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{SHELTER_TAG_LABELS[tag]}</Text>
              </View>
            ))}
          </View>
        )}
      </Pressable>
    ),
    [router]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* 篩選列 */}
      <View style={styles.filterBar}>
        <Pressable
          style={[styles.filterButton, hasFilter && styles.filterButtonActive]}
          onPress={() => setShowAreaPicker(true)}
        >
          <Text style={[styles.filterButtonText, hasFilter && styles.filterButtonTextActive]}>
            {areaButtonText}
          </Text>
          {hasFilter ? (
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                handleClearFilter();
              }}
              hitSlop={8}
            >
              <Ionicons name="close" size={18} color={AppColors.textOnPrimary} />
            </Pressable>
          ) : (
            <Ionicons name="chevron-down" size={18} color={AppColors.primary} />
          )}
        </Pressable>
      </View>

      {/* 列表 */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={AppColors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredShelters}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search" size={48} color="#ccc" />
              <Text style={styles.emptyText}>沒有找到符合條件的結果</Text>
            </View>
          }
        />
      )}

      {/* 地區選擇 Modal */}
      <AreaPickerModal
        visible={showAreaPicker}
        onClose={() => setShowAreaPicker(false)}
        selectedArea={selectedArea}
        onSelect={setSelectedArea}
        regions={TAIWAN_REGIONS}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  filterBar: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: AppColors.surface,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: AppColors.primary,
    gap: 10,
  },
  filterButtonActive: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: AppColors.primary,
  },
  filterButtonTextActive: {
    color: AppColors.textOnPrimary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.primary,
    flex: 1,
  },
  cardLocation: {
    fontSize: 14,
    color: AppColors.textSecondary,
    marginTop: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: AppColors.textMuted,
    marginTop: 8,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  tag: {
    backgroundColor: AppColors.tagBackground,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: AppColors.tagText,
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: AppColors.textMuted,
    marginTop: 12,
  },
});
