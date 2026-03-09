import type { Town } from '@/types';

export const TOWNS: Town[] = [
  // ─── Mixed Cities ───────────────────────────────────────────────────
  { value: 'haifa', labelHe: 'חיפה', labelAr: 'حيفا', labelEn: 'Haifa' },
  { value: 'acre', labelHe: 'עכו', labelAr: 'عكا', labelEn: 'Acre' },
  { value: 'jaffa', labelHe: 'יפו', labelAr: 'يافا', labelEn: 'Jaffa' },
  { value: 'lod', labelHe: 'לוד', labelAr: 'اللد', labelEn: 'Lod' },
  { value: 'ramla', labelHe: 'רמלה', labelAr: 'الرملة', labelEn: 'Ramla' },
  { value: 'nof-hagalil', labelHe: 'נוף הגליל', labelAr: 'نوف هجليل', labelEn: 'Nof HaGalil' },
  { value: 'maalot-tarshiha', labelHe: 'מעלות-תרשיחא', labelAr: 'معالوت - ترشيحا', labelEn: "Ma'alot-Tarshiha" },
  { value: 'jerusalem', labelHe: 'ירושלים', labelAr: 'القدس', labelEn: 'Jerusalem' },

  // ─── Arab Cities ────────────────────────────────────────────────────
  { value: 'nazareth', labelHe: 'נצרת', labelAr: 'الناصرة', labelEn: 'Nazareth' },
  { value: 'umm-al-fahm', labelHe: 'אום אל-פחם', labelAr: 'أم الفحم', labelEn: 'Umm al-Fahm' },
  { value: 'rahat', labelHe: 'רהט', labelAr: 'رهط', labelEn: 'Rahat' },
  { value: 'tayibe', labelHe: 'טייבה', labelAr: 'الطيبة', labelEn: 'Tayibe' },
  { value: 'shfaram', labelHe: 'שפרעם', labelAr: 'شفا عمرو', labelEn: "Shfa-'Amr" },
  { value: 'tamra', labelHe: 'טמרה', labelAr: 'طمرة', labelEn: 'Tamra' },
  { value: 'sakhnin', labelHe: 'סכנין', labelAr: 'سخنين', labelEn: 'Sakhnin' },
  { value: 'baqa-al-gharbiyye', labelHe: "באקה אל-ע'רביה", labelAr: 'باقة الغربية', labelEn: 'Baqa al-Gharbiyye' },
  { value: 'tira', labelHe: 'טירה', labelAr: 'الطيرة', labelEn: 'Tira' },

  // ─── Triangle (Wadi Ara & Southern Triangle) ────────────────────────
  { value: 'qalansawe', labelHe: 'קלנסווה', labelAr: 'قلنسوة', labelEn: 'Qalansawe' },
  { value: 'kafr-qasim', labelHe: 'כפר קאסם', labelAr: 'كفر قاسم', labelEn: 'Kafr Qasim' },
  { value: 'kafr-qara', labelHe: 'כפר קרע', labelAr: 'كفر قرع', labelEn: 'Kafr Qara' },
  { value: 'arara', labelHe: 'ערערה', labelAr: 'عرعرة', labelEn: "Ar'ara" },
  { value: 'jaljulia', labelHe: "ג'לג'וליה", labelAr: 'جلجولية', labelEn: 'Jaljulia' },
  { value: 'kafr-bara', labelHe: 'כפר ברא', labelAr: 'كفر برا', labelEn: 'Kafr Bara' },
  { value: 'jatt', labelHe: "ג'ת", labelAr: 'جت', labelEn: 'Jatt' },
  { value: 'musmus', labelHe: 'מוסמוס', labelAr: 'مصمص', labelEn: 'Musmus' },
  { value: 'meiser', labelHe: 'מייסר', labelAr: 'ميسر', labelEn: 'Meiser' },
  { value: 'zalafa', labelHe: 'זלפה', labelAr: 'زلفة', labelEn: 'Zalafa' },

  // ─── Central Galilee ────────────────────────────────────────────────
  { value: 'arraba', labelHe: 'עראבה', labelAr: 'عرابة', labelEn: 'Arraba' },
  { value: 'kafr-kanna', labelHe: 'כפר כנא', labelAr: 'كفر كنا', labelEn: 'Kafr Kanna' },
  { value: 'yafa-an-naseriyye', labelHe: 'יאפא', labelAr: 'يافة الناصرية', labelEn: 'Yafa an-Naseriyye' },
  { value: 'reineh', labelHe: 'ריינה', labelAr: 'الرينة', labelEn: 'Reineh' },
  { value: 'iksal', labelHe: 'אכסאל', labelAr: 'إكسال', labelEn: 'Iksal' },
  { value: 'turan', labelHe: 'טורעאן', labelAr: 'طرعان', labelEn: "Tur'an" },
  { value: 'ein-mahil', labelHe: 'עין מאהל', labelAr: 'عين ماهل', labelEn: 'Ein Mahil' },
  { value: 'kafr-manda', labelHe: 'כפר מנדא', labelAr: 'كفر مندا', labelEn: 'Kafr Manda' },
  { value: 'kabul', labelHe: 'כאבול', labelAr: 'كابول', labelEn: 'Kabul' },
  { value: 'ilut', labelHe: 'עילוט', labelAr: 'عيلوط', labelEn: 'Ilut' },
  { value: 'mashhed', labelHe: 'משהד', labelAr: 'مشهد', labelEn: 'Mashhed' },
  { value: 'dabburiyya', labelHe: 'דבוריה', labelAr: 'دبورية', labelEn: 'Dabburiyya' },
  { value: 'basmat-tabun', labelHe: 'בסמת טבעון', labelAr: 'بسمة طبعون', labelEn: "Basmat Tab'un" },
  { value: 'kaabiyye-tabbash', labelHe: "כעביה-טבאש-חג'אג'רה", labelAr: 'كعبية - طباش - حجاجرة', labelEn: "Ka'abiyye-Tabbash-Hajajre" },
  { value: 'shibli-umm-al-ghanam', labelHe: "שבלי-אום אל-ע'נם", labelAr: 'شبلي - أم الغنم', labelEn: 'Shibli-Umm al-Ghanam' },
  { value: 'naura', labelHe: 'נאעורה', labelAr: 'الناعورة', labelEn: 'Naura' },
  { value: 'zarzir', labelHe: 'זרזיר', labelAr: 'زرزير', labelEn: 'Zarzir' },
  { value: 'beit-zarzir', labelHe: 'בית זרזיר', labelAr: 'بيت زرزير', labelEn: 'Beit Zarzir' },
  { value: 'bir-al-maksur', labelHe: 'ביר אל-מכסור', labelAr: 'بئر المكسور', labelEn: 'Bir al-Maksur' },
  { value: 'eilabun', labelHe: 'עילבון', labelAr: 'عيلبون', labelEn: 'Eilabun' },

  // ─── Western Galilee ────────────────────────────────────────────────
  { value: 'majd-al-krum', labelHe: "מג'ד אל-כרום", labelAr: 'مجد الكروم', labelEn: 'Majd al-Krum' },
  { value: 'jadeidi-makr', labelHe: "ג'דיידה-מכר", labelAr: 'جديدة - مكر', labelEn: 'Jadeidi-Makr' },
  { value: 'deir-al-asad', labelHe: 'דיר אל-אסד', labelAr: 'دير الأسد', labelEn: 'Deir al-Asad' },
  { value: 'biina', labelHe: 'בענה', labelAr: 'البعنة', labelEn: "Bi'ina" },
  { value: 'nahf', labelHe: 'נחף', labelAr: 'نحف', labelEn: 'Nahf' },
  { value: 'deir-hanna', labelHe: 'דיר חנא', labelAr: 'دير حنا', labelEn: 'Deir Hanna' },
  { value: 'kafr-yassif', labelHe: 'כפר יאסיף', labelAr: 'كفر ياسيف', labelEn: 'Kafr Yassif' },
  { value: 'abu-sinan', labelHe: 'אבו סנאן', labelAr: 'أبو سنان', labelEn: 'Abu Sinan' },
  { value: 'shaab', labelHe: 'שעב', labelAr: 'شعب', labelEn: "Sha'ab" },
  { value: 'ibillin', labelHe: 'עבלין', labelAr: 'عبلين', labelEn: "I'billin" },
  { value: 'rame', labelHe: 'ראמה', labelAr: 'الرامة', labelEn: 'Rame' },
  { value: 'kaukab', labelHe: "כוכב אבו אל-היג'א", labelAr: 'كوكب أبو الهيجاء', labelEn: 'Kaukab Abu al-Hija' },
  { value: 'mazraa', labelHe: 'מזרעה', labelAr: 'المزرعة', labelEn: "Mazra'a" },
  { value: 'fassuta', labelHe: 'פסוטה', labelAr: 'فسوطة', labelEn: 'Fassuta' },
  { value: 'miilya', labelHe: 'מעיליא', labelAr: 'معليا', labelEn: "Mi'ilya" },

  // ─── Druze Localities ───────────────────────────────────────────────
  { value: 'daliyat-al-karmel', labelHe: 'דלית אל-כרמל', labelAr: 'دالية الكرمل', labelEn: 'Daliyat al-Karmel' },
  { value: 'isfiya', labelHe: 'עספיא', labelAr: 'عسفيا', labelEn: 'Isfiya' },
  { value: 'yirka', labelHe: 'ירכא', labelAr: 'يركا', labelEn: 'Yirka' },
  { value: 'julis', labelHe: "ג'וליס", labelAr: 'جولس', labelEn: 'Julis' },
  { value: 'mughar', labelHe: "מע'אר", labelAr: 'المغار', labelEn: 'Mughar' },
  { value: 'pekiin', labelHe: 'פקיעין', labelAr: 'البقيعة', labelEn: "Peki'in" },
  { value: 'hurfeish', labelHe: 'חורפיש', labelAr: 'حرفيش', labelEn: 'Hurfeish' },
  { value: 'beit-jann', labelHe: "בית ג'ן", labelAr: 'بيت جن', labelEn: 'Beit Jann' },
  { value: 'yanuh-jat', labelHe: "ינוח-ג'ת", labelAr: 'يانوح - جت', labelEn: 'Yanuh-Jat' },
  { value: 'kisra-sumei', labelHe: 'כסרא-סמיע', labelAr: 'كسرى - سميع', labelEn: 'Kisra-Sumei' },
  { value: 'sajur', labelHe: "סאג'ור", labelAr: 'ساجور', labelEn: 'Sajur' },
  { value: 'ein-al-asad', labelHe: 'עין אל-אסד', labelAr: 'عين الأسد', labelEn: 'Ein al-Asad' },

  // ─── Golan Heights ──────────────────────────────────────────────────
  { value: 'majdal-shams', labelHe: "מג'דל שמס", labelAr: 'مجدل شمس', labelEn: 'Majdal Shams' },
  { value: 'masade', labelHe: 'מסעדה', labelAr: 'مسعدة', labelEn: "Mas'ade" },
  { value: 'buqata', labelHe: "בוקעאתא", labelAr: 'بقعاثا', labelEn: "Buq'ata" },
  { value: 'ein-qiniyye', labelHe: 'עין קנייא', labelAr: 'عين قنية', labelEn: 'Ein Qiniyye' },
  { value: 'ghajar', labelHe: "ע'ג'ר", labelAr: 'غجر', labelEn: 'Ghajar' },

  // ─── Carmel Coast ───────────────────────────────────────────────────
  { value: 'jisr-az-zarka', labelHe: "ג'סר א-זרקא", labelAr: 'جسر الزرقاء', labelEn: 'Jisr az-Zarka' },
  { value: 'fureidis', labelHe: 'פוריידיס', labelAr: 'فريديس', labelEn: 'Fureidis' },

  // ─── Negev Bedouin Towns ────────────────────────────────────────────
  { value: 'kuseife', labelHe: 'כסייפה', labelAr: 'كسيفة', labelEn: 'Kuseife' },
  { value: 'tel-sheva', labelHe: 'תל שבע', labelAr: 'تل السبع', labelEn: 'Tel Sheva' },
  { value: 'ararat-an-naqab', labelHe: 'ערערה בנגב', labelAr: 'عرعرة النقب', labelEn: "Ar'arat an-Naqab" },
  { value: 'hura', labelHe: 'חורה', labelAr: 'حورة', labelEn: 'Hura' },
  { value: 'lakiya', labelHe: 'לקייה', labelAr: 'لقية', labelEn: 'Lakiya' },
  { value: 'segev-shalom', labelHe: 'שגב שלום', labelAr: 'شقب السلام', labelEn: 'Segev Shalom' },
  { value: 'beersheba', labelHe: 'באר שבע', labelAr: 'بئر السبع', labelEn: 'Beersheba' },
  { value: 'abu-tlul', labelHe: 'אבו תלול', labelAr: 'أبو تلول', labelEn: 'Abu Tlul' },

  // ─── Upper Galilee ──────────────────────────────────────────────────
  { value: 'tuba-zangariyye', labelHe: 'טובא-זנגרייה', labelAr: 'طوبا الزنغرية', labelEn: 'Tuba-Zangariyye' },

  // ─── Circassian Villages ────────────────────────────────────────────
  { value: 'kfar-kama', labelHe: 'כפר כמא', labelAr: 'كفر كما', labelEn: 'Kfar Kama' },
  { value: 'rehaniya', labelHe: 'ריחאניה', labelAr: 'ريحانية', labelEn: 'Rehaniya' },

  // ─── Other ──────────────────────────────────────────────────────────
  { value: 'other', labelHe: 'אחר', labelAr: 'أخرى', labelEn: 'Other' },
];

export const BIRTH_YEAR_RANGE = { min: 1940, max: 2012 };

export const ISRAELI_PHONE_REGEX = /^05\d{8}$/;

export function getTownLabel(town: Town, locale: string): string {
  switch (locale) {
    case 'ar':
      return town.labelAr;
    case 'en':
      return town.labelEn;
    default:
      return town.labelHe;
  }
}
