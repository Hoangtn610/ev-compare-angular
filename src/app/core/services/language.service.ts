import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'vi';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    readonly language = signal<Language>('vi');

    private translations = {
        en: {
            // Navbar
            'nav.home': 'Home',
            'nav.compare': 'Compare',
            'nav.search': 'Search',
            'nav.login': 'Login',
            'nav.searchPlaceholder': 'Search electric vehicles...',

            // Hero
            'hero.title': 'Compare Electric Vehicles',
            'hero.subtitle': 'Find the perfect electric scooter or motorcycle for your needs',
            'hero.cta': 'Compare Now',

            // Featured
            'featured.title': 'Featured Electric Vehicles',
            'featured.subtitle': 'Top picks from leading Vietnamese brands',
            'featured.viewAll': 'View All',

            // Vehicle Card
            'card.range': 'Range',
            'card.topSpeed': 'Top Speed',
            'card.price': 'Price',
            'card.viewDetails': 'View Details',
            'card.compare': 'Add to Compare',

            // Common
            'common.km': 'km',
            'common.kmh': 'km/h',
            'common.kw': 'kW',
            'common.hours': 'hours',
            'common.years': 'years',
            'common.kg': 'kg',

            // Brands
            'brands.title': 'Browse by Brand',

            // Footer
            'footer.about': 'About EVCompare',
            'footer.aboutText': 'Your trusted platform for comparing electric vehicles in Vietnam',
            'footer.contact': 'Contact Us',
            'footer.email': 'info@evcompare.vn',
            'footer.phone': '+84 123 456 789',
            'footer.rights': '© 2025 EVCompare. All rights reserved.',

            // Compare Page
            'compare.title': 'Compare Electric Vehicles',
            'compare.selectBrand': 'Select Brand',
            'compare.selectModel': 'Select Model',
            'compare.addVehicle': 'Add Vehicle',
            'compare.specs': 'Specifications',
            'compare.battery': 'Battery Capacity',
            'compare.charging': 'Charging Time',
            'compare.power': 'Power',
            'compare.weight': 'Weight',
            'compare.warranty': 'Warranty',
            'compare.features': 'Features',
            'compare.remove': 'Remove',

            // Detail Page
            'detail.specs': 'Technical Specifications',
            'detail.reviews': 'User Reviews',
            'detail.rating': 'Rating',
            'detail.noReviews': 'No reviews yet',
            'detail.colors': 'Available Colors',
            'detail.backToHome': 'Back to Home',

            // Search Page
            'search.title': 'Search Electric Vehicles',
            'search.filters': 'Filters',
            'search.brand': 'Brand',
            'search.allBrands': 'All Brands',
            'search.priceRange': 'Price Range',
            'search.rangeKm': 'Range (km)',
            'search.minRange': 'Min Range',
            'search.maxRange': 'Max Range',
            'search.reset': 'Reset Filters',
            'search.results': 'results found',
            'search.noResults': 'No vehicles found matching your criteria',
        },
        vi: {
            // Navbar
            'nav.home': 'Trang chủ',
            'nav.compare': 'So sánh',
            'nav.search': 'Tìm kiếm',
            'nav.login': 'Đăng nhập',
            'nav.searchPlaceholder': 'Tìm kiếm xe điện...',

            // Hero
            'hero.title': 'So sánh Xe Điện',
            'hero.subtitle': 'Tìm chiếc xe máy điện hoàn hảo cho nhu cầu của bạn',
            'hero.cta': 'So sánh Ngay',

            // Featured
            'featured.title': 'Xe Điện Nổi Bật',
            'featured.subtitle': 'Lựa chọn hàng đầu từ các thương hiệu Việt Nam',
            'featured.viewAll': 'Xem Tất Cả',

            // Vehicle Card
            'card.range': 'Quãng đường',
            'card.topSpeed': 'Tốc độ tối đa',
            'card.price': 'Giá',
            'card.viewDetails': 'Xem Chi Tiết',
            'card.compare': 'Thêm vào So Sánh',

            // Common
            'common.km': 'km',
            'common.kmh': 'km/h',
            'common.kw': 'kW',
            'common.hours': 'giờ',
            'common.years': 'năm',
            'common.kg': 'kg',

            // Brands
            'brands.title': 'Duyệt theo Thương Hiệu',

            // Footer
            'footer.about': 'Về EVCompare',
            'footer.aboutText': 'Nền tảng tin cậy để so sánh xe điện tại Việt Nam',
            'footer.contact': 'Liên Hệ',
            'footer.email': 'info@evcompare.vn',
            'footer.phone': '+84 123 456 789',
            'footer.rights': '© 2025 EVCompare. Bảo lưu mọi quyền.',

            // Compare Page
            'compare.title': 'So sánh Xe Điện',
            'compare.selectBrand': 'Chọn Hãng',
            'compare.selectModel': 'Chọn Model',
            'compare.addVehicle': 'Thêm Xe',
            'compare.specs': 'Thông Số Kỹ Thuật',
            'compare.battery': 'Dung lượng Pin',
            'compare.charging': 'Thời gian Sạc',
            'compare.power': 'Công suất',
            'compare.weight': 'Trọng lượng',
            'compare.warranty': 'Bảo hành',
            'compare.features': 'Tính năng',
            'compare.remove': 'Xóa',

            // Detail Page
            'detail.specs': 'Thông Số Kỹ Thuật',
            'detail.reviews': 'Đánh Giá Người Dùng',
            'detail.rating': 'Đánh giá',
            'detail.noReviews': 'Chưa có đánh giá',
            'detail.colors': 'Màu Sắc',
            'detail.backToHome': 'Về Trang Chủ',

            // Search Page
            'search.title': 'Tìm Kiếm Xe Điện',
            'search.filters': 'Bộ Lọc',
            'search.brand': 'Thương Hiệu',
            'search.allBrands': 'Tất Cả Hãng',
            'search.priceRange': 'Khoảng Giá',
            'search.rangeKm': 'Quãng đường (km)',
            'search.minRange': 'Quãng đường tối thiểu',
            'search.maxRange': 'Quãng đường tối đa',
            'search.reset': 'Đặt Lại Bộ Lọc',
            'search.results': 'kết quả',
            'search.noResults': 'Không tìm thấy xe phù hợp với tiêu chí của bạn',
        }
    };

    setLanguage(lang: Language) {
        this.language.set(lang);
    }

    translate(key: string): string {
        const lang = this.language();
        const trans = this.translations[lang] as any;
        return trans[key] || key;
    }
}
