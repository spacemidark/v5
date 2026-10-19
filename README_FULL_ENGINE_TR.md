# INSIDE THE JET ENGINE — Full Engine Desktop v1.2

Bu, önceki React + TypeScript + Three.js + Electron projesinin **genişletilmiş motor kütüphanesi** sürümüdür. Gerçek bir Rolls-Royce motorunun teknik dokümanı değildir. Kitaptakine benzer pedagojik genel konu başlıkları kullanılır; kitabın sayfaları, fotoğrafları ve telifli görselleri kopyalanmamıştır.

## Ne değişti?

- Başlangıç ekranı **Turbofan Engine** (tam motor) olarak açılır; yalnızca HPC ile başlamaz.
- Sol menü **iç içe açılan bileşen ağacı** haline getirildi: 140 sistem/parça girişi.
- Motor kesitini temsil eden **tıklanabilir orijinal SVG şema**: Inlet, Fan, LPC, HPC, Combustor, HPT, LPT ve Exhaust.
- Yalnızca HPC altındaki stator çizimi/3D demonstrasyonu korunmuştur. Diğer modüller için henüz gerçek 3D parça modelleri eklenmemiştir.
- 18 ana konu sisteminin giriş açıklamaları ve bütün sistem/parça girişlerinin iki dilde giriş makaleleri eklendi. **Diğer bölümler taslak başlıklardır, yazılmış mühendislik makaleleri değildir.**
- Önceki **Fixed Stator Vane** ve **Variable Stator Vane** ayrıntılı MDX içerikleri değişmeden korunmuştur.
- Önceki TypeScript `count` kullanılmayan değişken hatası giderildi.

## VS Code ile açma

1. ZIP'i **Tümünü Ayıkla** ile çıkar.
2. VS Code > File > Open Folder > **package.json** bulunan klasörü aç.
3. Terminalde:

```powershell
npm.cmd install
npm.cmd run dev
```

4. Terminalde açılan `http://localhost:5173/` adresini ziyaret et.

## EXE oluşturma

Windows üzerinde `CREATE_EXE_WINDOWS.bat` dosyasına çift tıkla. Başarılı olursa `release/` klasöründe installer ve portable EXE oluşur. Bu paket **kaynak kodudur; burada Windows EXE'si derlenmedi**. İlk kurulumda internet bağlantısı gerekebilir.

## Kendi makaleni ekleme (önemli)

Örneğin **HPT → HPT Rotor Blade → Materials** bölümüne içerik eklemek için:

1. `content/hpt-rotor-blade/materials.tr.mdx` dosyasını oluştur.
2. Aşağıdaki gibi yaz:

```mdx
# HPT Rotor Blade — Malzemeler

Bu bölümde doğrulanmış kaynaklara dayanan özgün metnin bulunacak.

## Malzeme seçimini etkileyen koşullar

- Çalışma sıcaklığı
- Sürünme davranışı
- Termal yorulma
- Üretim yöntemi ve kaplama
```

3. İngilizcesi için `materials.en.mdx` dosyasını oluştur.
4. Terminalde `npm.cmd run dev` açıkken değişiklikler otomatik görünür. EXE'yi yeniden paketlersen güncelleme kullanıcılara da yansır.

**Yeni komponent eklemek için:** `src/data/catalog.json` dosyasına bir obje ekle; yeni objenin `parentId` değeri, bağlı olduğu üst öğenin `id` değeri olmalı. Örn. `parentId: "hpt"`. `status:"planned"` taslak demektir. `chapters` dizisinde verilen bölüm `id` değerleri, MDX dosya adlarıyla eşleşir.

Komponent ağaç yapısının ana bölümleri şunlardır:

1. Engine Fundamentals
2. Air Inlet & Intake
3. Fan & Bypass System
4. Low-Pressure Compressor / Booster
5. High-Pressure Compressor
6. Compressor Exit & Diffuser
7. Combustion System
8. High-Pressure Turbine
9. Low-Pressure Turbine
10. Exhaust & Nozzle
11. Shafts & Rotor Supports
12. Lubrication & Sealing
13. Fuel System
14. Engine Control & Actuation
15. Secondary Air & Cooling
16. Accessory Gearbox & Starting
17. Structures, Nacelle & Mounts
18. Operation, Testing & Maintenance

### Dürüst içerik kapsamı

Bu sürüm kapsamlı ve genişletilebilir bir **bilgi mimarisidir**, 140 parça için tamamlanmış el kitabı değildir. Sistem girişi hazırlanmış alanlar `draft`, henüz mühendislik ayrıntıları araştırılmamış alanlar `planned` görünür. Genel şemada resmedilen iki-spool tasarım temsili olup gerçek motorlarda mimari değişebilir. Kaynak gösterilmeyen ileri seviye mühendislik verileri yayınlanmamalıdır. Gerçek çizim, fotoğraf veya kitap sayfaları eklenecekse lisans/izin ayrıca kontrol edilmelidir.

### Hata halinde

Konsolda `npm` engelleniyorsa PowerShell'de `npm.cmd` kullan. TypeScript hataları için `npm.cmd run build` çalıştır. EXE oluşturma hatası varsa `CREATE_EXE_WINDOWS.bat` terminal çıktısını paylaş.


## V1.3 – Kompakt başlıklar

15 teknik konuyu silmeden 7 açılır başlıkta topladık. Ayrıntılar için `README_NAV_TR.md` dosyasına bak.
