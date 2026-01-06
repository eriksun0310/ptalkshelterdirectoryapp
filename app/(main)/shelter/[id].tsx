import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppColors } from '@/constants/theme';
import { mockShelters } from '@/mocks/shelters';
import { SHELTER_TAG_LABELS } from '@/types';

export default function ShelterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // 取得詳細資料（之後會用 TanStack Query）
  const shelter = useMemo(() => {
    return mockShelters.find((s) => s.id === id);
  }, [id]);

  if (!shelter) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color={AppColors.error} />
          <Text style={styles.errorText}>找不到此流浪動物之家</Text>
        </View>
      </SafeAreaView>
    );
  }

  // 聯絡方式處理
  const handleContact = async (type: 'line' | 'phone' | 'facebook' | 'instagram') => {
    let url = '';

    switch (type) {
      case 'line':
        if (shelter.contact.line) {
          // LINE 深連結
          url = shelter.contact.line.startsWith('http')
            ? shelter.contact.line
            : `https://line.me/R/ti/p/${shelter.contact.line}`;
        }
        break;
      case 'phone':
        if (shelter.contact.phone) {
          url = `tel:${shelter.contact.phone.replace(/-/g, '')}`;
        }
        break;
      case 'facebook':
        url = shelter.contact.facebook || '';
        break;
      case 'instagram':
        url = shelter.contact.instagram || '';
        break;
    }

    if (!url) {
      Alert.alert('提示', '此聯絡方式暫無提供');
      return;
    }

    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert('錯誤', '無法開啟此連結');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* 基本資訊 */}
        <View style={styles.section}>
          <Text style={styles.name}>{shelter.name}</Text>
          <Text style={styles.location}>
            {shelter.city}・{shelter.district}
          </Text>

          {shelter.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {shelter.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{SHELTER_TAG_LABELS[tag]}</Text>
                </View>
              ))}
            </View>
          )}

          <Text style={styles.description}>{shelter.description}</Text>
        </View>

        {/* 注意事項 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>注意事項</Text>

          <View style={styles.noticeList}>
            <NoticeItem
              label="是否需要提前聯絡"
              value={shelter.notices.requiresAppointment}
            />
            <NoticeItem
              label="是否可臨時拜訪"
              value={shelter.notices.allowsDropIn}
            />
            <NoticeItem
              label="是否接受志工"
              value={shelter.notices.acceptsVolunteers}
            />
            <NoticeItem
              label="是否接受物資捐贈"
              value={shelter.notices.acceptsDonations}
            />
          </View>

          {shelter.notices.specialNotes && (
            <View style={styles.specialNotes}>
              <Ionicons name="information-circle" size={20} color={AppColors.warning} />
              <Text style={styles.specialNotesText}>{shelter.notices.specialNotes}</Text>
            </View>
          )}
        </View>

        {/* 聯絡方式 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>聯絡方式</Text>
          <Text style={styles.contactHint}>點擊按鈕將跳轉至外部應用程式</Text>

          <View style={styles.contactButtons}>
            {shelter.contact.line && (
              <ContactButton
                icon="chatbubble-ellipses"
                label="LINE"
                color="#00B900"
                onPress={() => handleContact('line')}
              />
            )}
            {shelter.contact.phone && (
              <ContactButton
                icon="call"
                label="電話"
                color="#007AFF"
                onPress={() => handleContact('phone')}
              />
            )}
            {shelter.contact.facebook && (
              <ContactButton
                icon="logo-facebook"
                label="Facebook"
                color="#1877F2"
                onPress={() => handleContact('facebook')}
              />
            )}
            {shelter.contact.instagram && (
              <ContactButton
                icon="logo-instagram"
                label="Instagram"
                color="#E4405F"
                onPress={() => handleContact('instagram')}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 注意事項項目
function NoticeItem({ label, value }: { label: string; value: boolean }) {
  return (
    <View style={styles.noticeItem}>
      <Text style={styles.noticeLabel}>{label}</Text>
      <View style={[styles.noticeBadge, value ? styles.noticeBadgeYes : styles.noticeBadgeNo]}>
        <Text style={[styles.noticeBadgeText, value ? styles.noticeBadgeTextYes : styles.noticeBadgeTextNo]}>
          {value ? '是' : '否'}
        </Text>
      </View>
    </View>
  );
}

// 聯絡按鈕
function ContactButton({
  icon,
  label,
  color,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.contactButton, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={24} color="#fff" />
      <Text style={styles.contactButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: AppColors.error,
    marginTop: 12,
  },
  section: {
    backgroundColor: AppColors.surface,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColors.textPrimary,
  },
  location: {
    fontSize: 16,
    color: AppColors.textSecondary,
    marginTop: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  tag: {
    backgroundColor: AppColors.tagBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    color: AppColors.tagText,
  },
  description: {
    fontSize: 16,
    color: AppColors.textSecondary,
    lineHeight: 24,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: 12,
  },
  noticeList: {
    gap: 12,
  },
  noticeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noticeLabel: {
    fontSize: 16,
    color: AppColors.textPrimary,
  },
  noticeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  noticeBadgeYes: {
    backgroundColor: AppColors.successLight,
  },
  noticeBadgeNo: {
    backgroundColor: AppColors.errorLight,
  },
  noticeBadgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  noticeBadgeTextYes: {
    color: AppColors.success,
  },
  noticeBadgeTextNo: {
    color: AppColors.error,
  },
  specialNotes: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: AppColors.warningLight,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  specialNotesText: {
    flex: 1,
    fontSize: 14,
    color: AppColors.warning,
    lineHeight: 20,
  },
  contactHint: {
    fontSize: 12,
    color: AppColors.textMuted,
    marginBottom: 12,
  },
  contactButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    minWidth: 120,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.textOnPrimary,
  },
});
