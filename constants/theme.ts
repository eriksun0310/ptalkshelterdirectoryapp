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
 * 極簡色系：黑白灰 + 單一主色藍
 */
export const AppColors = {
  // 主色調（唯一的彩色）
  primary: '#4A90E2',           // 天空藍
  primaryLight: '#F0F7FF',      // 極淺藍（幾乎白）
  primarySoft: 'rgba(74, 144, 226, 0.08)',

  // 背景色
  background: '#F5F5F5',        // 淺灰背景
  surface: '#FFFFFF',           // 卡片白

  // 文字色
  textPrimary: '#333333',       // 主要文字
  textSecondary: '#666666',     // 次要文字
  textMuted: '#999999',         // 淡化文字
  textOnPrimary: '#FFFFFF',     // 主色上的文字

  // 功能色（統一用灰色系）
  success: '#666666',
  successLight: '#F0F0F0',
  error: '#666666',
  errorLight: '#F0F0F0',
  warning: '#666666',
  warningLight: '#F0F0F0',

  // 標籤色（淺灰）
  tagBackground: '#F0F0F0',
  tagText: '#666666',

  // 其他
  border: '#E5E5E5',
  divider: '#EEEEEE',
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
