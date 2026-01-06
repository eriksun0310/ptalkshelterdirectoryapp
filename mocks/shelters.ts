import type { ShelterDetail } from '@/types';

/** 台灣縣市與區域對照 */
export const TAIWAN_REGIONS: Record<string, string[]> = {
  台北市: ['中正區', '大同區', '中山區', '松山區', '大安區', '萬華區', '信義區', '士林區', '北投區', '內湖區', '南港區', '文山區'],
  新北市: ['板橋區', '三重區', '中和區', '永和區', '新莊區', '新店區', '土城區', '蘆洲區', '汐止區', '樹林區', '淡水區', '三峽區'],
  台中市: ['中區', '東區', '南區', '西區', '北區', '北屯區', '西屯區', '南屯區', '太平區', '大里區', '霧峰區', '烏日區', '豐原區', '后里區', '大甲區'],
  台南市: ['中西區', '東區', '南區', '北區', '安平區', '安南區', '永康區', '歸仁區', '新化區', '左鎮區', '玉井區', '楠西區', '南化區'],
  高雄市: ['楠梓區', '左營區', '鼓山區', '三民區', '鹽埕區', '前金區', '新興區', '苓雅區', '前鎮區', '旗津區', '小港區', '鳳山區', '大寮區'],
  桃園市: ['桃園區', '中壢區', '大溪區', '楊梅區', '蘆竹區', '大園區', '龜山區', '八德區', '龍潭區', '平鎮區', '新屋區', '觀音區'],
};

/** 假資料：流浪動物之家列表 */
export const mockShelters: ShelterDetail[] = [
  {
    id: '1',
    name: '浪浪天堂',
    city: '台中市',
    district: '太平區',
    shortDescription: '專門收容中大型犬，環境寬敞舒適',
    tags: ['remote', 'appointment'],
    description:
      '浪浪天堂成立於2018年，位於台中市太平區山區，專門收容被棄養的中大型犬。園區佔地約500坪，目前收容約80隻狗狗。我們致力於給每一隻毛孩一個溫暖的家，也歡迎有愛心的朋友來擔任志工或認養。',
    notices: {
      requiresAppointment: true,
      allowsDropIn: false,
      acceptsVolunteers: true,
      acceptsDonations: true,
      specialNotes: '山區路小，建議開車前往。雨天路滑請小心駕駛。',
    },
    contact: {
      line: '@langlangtiantang',
      phone: '0912-345-678',
      facebook: 'https://facebook.com/langlangtiantang',
      instagram: 'https://instagram.com/langlangtiantang',
    },
  },
  {
    id: '2',
    name: '毛孩避風港',
    city: '新北市',
    district: '三峽區',
    shortDescription: '收容老年犬貓，提供安養照護服務',
    tags: ['small', 'appointment'],
    description:
      '毛孩避風港是一間專門收容老年犬貓的小型私人狗園，成立於2020年。我們相信每一個生命都值得被善待，特別是那些被遺棄的老毛孩。目前園區有30隻狗狗和15隻貓咪。',
    notices: {
      requiresAppointment: true,
      allowsDropIn: false,
      acceptsVolunteers: true,
      acceptsDonations: true,
      specialNotes: '園區空間有限，每次最多接待5位訪客。',
    },
    contact: {
      line: '@maohaibifenggang',
      phone: '0923-456-789',
      facebook: 'https://facebook.com/maohaibifenggang',
    },
  },
  {
    id: '3',
    name: '希望狗園',
    city: '桃園市',
    district: '大溪區',
    shortDescription: '大型收容園區，接受臨時探訪',
    tags: ['remote'],
    description:
      '希望狗園位於桃園大溪，是北部規模較大的私人收容園區之一。成立於2015年，目前收容超過200隻流浪犬。我們有完善的醫療設備和專業的照護團隊，歡迎大家來參觀認養。',
    notices: {
      requiresAppointment: false,
      allowsDropIn: true,
      acceptsVolunteers: true,
      acceptsDonations: true,
      specialNotes: '開放時間：週二至週日 10:00-17:00，週一休園。',
    },
    contact: {
      phone: '03-388-1234',
      facebook: 'https://facebook.com/hopedogpark',
      instagram: 'https://instagram.com/hopedogpark',
    },
  },
  {
    id: '4',
    name: '愛心浪浪之家',
    city: '台南市',
    district: '新化區',
    shortDescription: '家庭式照護，每隻狗狗都是家人',
    tags: ['small', 'private', 'appointment'],
    description:
      '愛心浪浪之家是由一對退休夫妻經營的小型私人狗園。我們採用家庭式照護，目前照顧20隻狗狗。每一隻毛孩在這裡都被當作家人對待，我們希望能為牠們找到真正愛牠們的主人。',
    notices: {
      requiresAppointment: true,
      allowsDropIn: false,
      acceptsVolunteers: false,
      acceptsDonations: true,
      specialNotes: '因人力有限，暫不開放志工服務，但歡迎物資捐贈。',
    },
    contact: {
      line: '@aixinlanglang',
      phone: '0934-567-890',
    },
  },
  {
    id: '5',
    name: '汪星人樂園',
    city: '高雄市',
    district: '大寮區',
    shortDescription: '南部最大私人狗園，設施完善',
    tags: ['remote'],
    description:
      '汪星人樂園是南部規模最大的私人收容園區，佔地超過1000坪。我們有專業的獸醫團隊、寬敞的活動空間、以及完善的訓練設施。目前收容約150隻流浪犬，歡迎來參觀認養！',
    notices: {
      requiresAppointment: false,
      allowsDropIn: true,
      acceptsVolunteers: true,
      acceptsDonations: true,
      specialNotes: '園區位於工業區內，請使用導航定位。提供免費停車場。',
    },
    contact: {
      line: '@wangxingren',
      phone: '07-788-5566',
      facebook: 'https://facebook.com/wangxingrenpark',
      instagram: 'https://instagram.com/wangxingrenpark',
    },
  },
];

/** 模擬 API 延遲 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** 模擬取得列表（支援篩選與分頁） */
export async function getMockShelters(params?: {
  city?: string;
  district?: string;
  page?: number;
  limit?: number;
}) {
  await delay(500); // 模擬網路延遲

  let filtered = [...mockShelters];

  if (params?.city) {
    filtered = filtered.filter((s) => s.city === params.city);
  }

  if (params?.district) {
    filtered = filtered.filter((s) => s.district === params.district);
  }

  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = filtered.slice(start, end);

  return {
    items,
    total: filtered.length,
    page,
    limit,
    hasMore: end < filtered.length,
  };
}

/** 模擬取得詳細資料 */
export async function getMockShelterById(id: string) {
  await delay(300);

  const shelter = mockShelters.find((s) => s.id === id);
  if (!shelter) {
    throw new Error('Shelter not found');
  }

  return shelter;
}
