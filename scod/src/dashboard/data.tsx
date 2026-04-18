import type {
  NavItem, StatCard, Order, CargoCompany,
  Transaction, PaymentMethod, UserProfile, SecurityOption,
} from "./types";

export const NAV_ITEMS: NavItem[] = [
  { id: "home",    icon: "🏠", label: "Ana Sayfa" },
  { id: "waybill", icon: "🏷️", label: "Kargo Etiketleri", submenu: ["Kargo Barcode", "Siparişler", "Önceki Siparişler"] },
  { id: "cargo",   icon: "🚚", label: "Kargo Şirketleri" },
  { id: "scod",    icon: "🛡️", label: "SCOD", badge: "YENİ", badgeColor: "green" },
  { id: "wallet",  icon: "💰", label: "Cüzdan" },
  { id: "account", icon: "👤", label: "Hesabım" },
  { id: "about",   icon: "ℹ️", label: "Hakkımızda" },
];

export const HOME_STATS: StatCard[] = [
  { label: "Toplam Sipariş", value: "2,847",   sub: "Bu ay",  icon: "📦", trend: 12.4, iconColor: "default" },
  { label: "Teslim Edilen",  value: "2,341",   sub: "Bu ay",  icon: "✅", trend:  8.1, iconColor: "green"   },
  { label: "Bekleyen",       value: "312",     sub: "Aktif",  icon: "⏳", trend: -3.2, iconColor: "yellow"  },
  { label: "Toplam Alacak",  value: "₺48,290", sub: "Toplam", icon: "💰", trend: 15.7, iconColor: "blue"    },
];

export const MONTHLY_ORDERS = [180, 240, 190, 310, 280, 350, 420, 390, 460, 510, 480, 540];
export const MONTHS = ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"];

export const CARGO_DIST = [
  { name: "Yurtiçi", value: 38, color: "#7c3aed" },
  { name: "Aras",    value: 29, color: "#a78bfa" },
  { name: "PTT",     value: 18, color: "#ddd6fe" },
  { name: "Diğer",   value: 15, color: "#ede9fe" },
];

export const ORDERS: Order[] = [
  { id: "#48291", customer: "Ahmet Yılmaz",  address: "İstanbul, Kadıköy",  cargo: "Yurtiçi", amount: "₺340", status: "Teslim Edildi", date: "12 Mar 2026", barcode: "YK2024012938" },
  { id: "#48290", customer: "Fatma Kaya",    address: "Ankara, Çankaya",    cargo: "Aras",    amount: "₺185", status: "Yolda",         date: "12 Mar 2026", barcode: "AK2024012937" },
  { id: "#48289", customer: "Mehmet Demir",  address: "İzmir, Bornova",     cargo: "PTT",     amount: "₺520", status: "Bekliyor",      date: "11 Mar 2026", barcode: "PTT2024012936" },
  { id: "#48288", customer: "Ayşe Çelik",   address: "Bursa, Nilüfer",     cargo: "Yurtiçi", amount: "₺95",  status: "İptal",         date: "11 Mar 2026", barcode: "YK2024012935" },
  { id: "#48287", customer: "Can Arslan",    address: "Antalya, Muratpaşa", cargo: "Aras",    amount: "₺270", status: "Teslim Edildi", date: "10 Mar 2026", barcode: "AK2024012934" },
  { id: "#48286", customer: "Zeynep Aydın",  address: "İstanbul, Şişli",    cargo: "Yurtiçi", amount: "₺450", status: "İade",          date: "10 Mar 2026", barcode: "YK2024012933" },
];

export const CARGO_COMPANIES: CargoCompany[] = [
  { id: 1, name: "Yurtiçi Kargo", logo: "🟡", price: "₺28.90", scod: true,  active: true,  deliveryTime: "1-2 gün" },
  { id: 2, name: "Aras Kargo",    logo: "🔵", price: "₺26.50", scod: true,  active: true,  deliveryTime: "2-3 gün" },
  { id: 3, name: "MNG Kargo",     logo: "🟠", price: "₺29.00", scod: false, active: false, deliveryTime: "2-4 gün" },
  { id: 4, name: "PTT Kargo",     logo: "🟢", price: "₺24.00", scod: false, active: true,  deliveryTime: "3-5 gün" },
  { id: 5, name: "Sürat Kargo",   logo: "🔴", price: "₺27.50", scod: true,  active: false, deliveryTime: "1-3 gün" },
];

export const TRANSACTIONS: Transaction[] = [
  { id: "t1", description: "SCOD İadesi — Sipariş #47821", date: "12 Mar", amount: "+₺28.90",  type: "in",  method: "SCOD"        },
  { id: "t2", description: "Kargo Bedeli — Yurtiçi",       date: "11 Mar", amount: "-₺28.90",  type: "out", method: "Yurtiçi"     },
  { id: "t3", description: "SCOD İadesi — Sipariş #47654", date: "11 Mar", amount: "+₺26.50",  type: "in",  method: "SCOD"        },
  { id: "t4", description: "Bakiye Yükleme — Kredi Kartı", date: "10 Mar", amount: "+₺500.00", type: "in",  method: "Kredi Kartı" },
  { id: "t5", description: "Kargo Bedeli — Aras",          date: "09 Mar", amount: "-₺26.50",  type: "out", method: "Aras"        },
  { id: "t6", description: "SCOD İadesi — Sipariş #47210", date: "08 Mar", amount: "+₺24.00",  type: "in",  method: "SCOD"        },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "apple",   icon: "🍎", label: "Apple Pay"  },
  { id: "samsung", icon: "📱", label: "Samsung Pay" },
  { id: "credit",  icon: "💳", label: "Kredi Kartı" },
  { id: "debit",   icon: "🏦", label: "Banka Kartı" },
  { id: "other",   icon: "➕", label: "Diğer"       },
];

export const DEFAULT_PROFILE: UserProfile = {
  firstName: "Ahmet",
  lastName:  "Yılmaz",
  storeName: "AY Mağazacılık Ltd.",
  email:     "ahmet@magazam.com",
  phone:     "+90 555 123 4567",
  address:   "Kadıköy, İstanbul",
};

export const SECURITY_OPTIONS: SecurityOption[] = [
  { id: "password",  icon: "🔐", label: "Şifre Değiştirme",     description: "Hesap güvenliğiniz için şifrenizi güncelleyin", type: "button" },
  { id: "2fa",       icon: "🛡️", label: "İki Adımlı Doğrulama", description: "Hesabınıza ekstra koruma katmanı ekleyin",      type: "toggle" },
  { id: "email-ver", icon: "📧", label: "E-posta Doğrulama",     description: "E-posta adresinizi doğrulayın",                 type: "button" },
  { id: "phone-ver", icon: "📱", label: "Telefon Doğrulama",     description: "Telefon numaranızı doğrulayın",                 type: "button" },
  { id: "email-chg", icon: "✉️", label: "E-posta Değiştirme",    description: "Kayıtlı e-posta adresinizi güncelleyin",        type: "button" },
  { id: "phone-chg", icon: "☎️", label: "Telefon Değiştirme",    description: "Kayıtlı telefon numaranızı güncelleyin",        type: "button" },
];

export const ABOUT_STATS = [
  { icon: "🏪", value: "12,400+", label: "Aktif Mağaza" },
  { icon: "📦", value: "2.4M+",   label: "İşlenen Sipariş" },
  { icon: "🚚", value: "18",      label: "Kargo Entegrasyonu" },
  { icon: "⭐", value: "4.9/5",   label: "Müşteri Memnuniyeti" },
];