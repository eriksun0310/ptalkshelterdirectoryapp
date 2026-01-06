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
 * 方案 A：暖橙大地色系
 * 適合流浪動物收容所 app - 傳達溫暖、關懷、希望
 */
export const AppColors = {
  // 主色調
  primary: '#E07B4C',           // 溫暖陶土橙
  primaryLight: '#FCE8E0',      // 主色淺色版 (背景用)
  primarySoft: 'rgba(224, 123, 76, 0.12)', // 主色透明版 (按鈕背景)

  // 次要色
  secondary: '#5C8A6B',         // 自然草綠
  secondaryLight: '#E8F5E9',    // 綠色淺色版

  // 背景色
  background: '#FDF6F3',        // 暖白背景
  surface: '#FFFFFF',           // 卡片/表面白

  // 文字色
  textPrimary: '#3D3D3D',       // 主要文字 (暖灰)
  textSecondary: '#666666',     // 次要文字
  textMuted: '#8A8A8A',         // 淡化文字
  textOnPrimary: '#FFFFFF',     // 主色上的文字

  // 功能色
  success: '#5C8A6B',           // 成功/是
  successLight: '#E8F5E9',
  error: '#C62828',             // 錯誤/否
  errorLight: '#FFEBEE',
  warning: '#D4A84B',           // 警示/暖黃
  warningLight: '#FFF8E1',

  // 標籤色 (沿用橙色系)
  tagBackground: '#FFF3E0',
  tagText: '#E65100',

  // 其他
  border: '#E8E8E8',
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
