/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

/**
 * 方案 B：淺藍沉穩色系
 * 適合流浪動物收容所 app - 傳達安定、可靠、安心
 */
export const AppColors = {
  // 主色調
  primary: '#4A90E2',           // 天空藍 - 安定、可靠
  primaryLight: '#E3F2FD',      // 主色淺色版 (背景用)
  primarySoft: 'rgba(74, 144, 226, 0.12)', // 主色透明版 (按鈕背景)

  // 次要色
  secondary: '#50C878',         // 草綠 - 自然、友善
  secondaryLight: '#E8F5E9',    // 綠色淺色版

  // 背景色
  background: '#F7F7F7',        // 暖灰/象牙白 - 閱讀舒適
  surface: '#FFFFFF',           // 卡片/表面白

  // 文字色
  textPrimary: '#3D3D3D',       // 主要文字 (暖灰)
  textSecondary: '#666666',     // 次要文字
  textMuted: '#8A8A8A',         // 淡化文字
  textOnPrimary: '#FFFFFF',     // 主色上的文字

  // 功能色
  success: '#50C878',           // 成功 - 草綠
  successLight: '#E8F5E9',
  error: '#C62828',             // 錯誤/否
  errorLight: '#FFEBEE',
  warning: '#FF9F43',           // 警示/急件 - 橘色
  warningLight: '#FFF3E0',
  info: '#FFD166',              // 輕提醒 - 柔和黃
  infoLight: '#FFFDE7',

  // 標籤色 (淺米色 - 自然感)
  tagBackground: '#D9C3A4',
  tagText: '#5D4E37',

  // 其他
  border: '#E0E0E0',
  divider: '#F0F0F0',
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
