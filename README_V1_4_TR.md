# Inside the Jet Engine — Masaüstü V1.4 (Arayüz + Uygulama İkonu)

Bu sürüm, daha önce gönderilen **Full Engine Desktop V1.3** projesinin kaynak kodları üzerine hazırlanmıştır. Örnek referans görselindeki koyu/yeşil teknik arayüzden esinlenilerek **gerçek React bileşenleri** yazılmıştır. Sadece ekrana yapıştırılmış bir arayüz resmi değildir.

## V1.4 yenilikleri

- Yeni **turbofan fanı uygulama ikonu**: `desktop-assets/icon.ico` — çoklu çözünürlük (16, 24, 32, 48, 64, 128, 256 px). Electron Builder Windows EXE, kurulum ve portable paketlerinde kullanır.
- `public/images/app-icon.png` — aynı ikon programın sol üst marka alanında gösterilir.
- Zümrüt-yeşil aksanlara sahip koyu masaüstü arayüzü.
- Ana sayfada **etkileşimli motor kesit görseli**: Fan, LPC, HPC, Combustor, HPT, LPT, Nozzle etiketlerinden doğrudan ilgili mühendislik makalesine geçilir.
- Ana sayfadaki **Kesit / Şema / Sistemler** sekmeleri, ana sistem kartları, HPC'nin **Görünüm / 3D / Parçalar** modları.
- **Stator Vane**, **Aerodynamic Design** ve **Parts & Assemblies** kartları; ilgili makalelere/komponentlere gider.
- Kütüphanedeki **140 sistem ve komponent**, Türkçe/İngilizce MDX makaleleri, 7 gruplu teknik menü, teknik sözlük, arama ve 3D öğretici kompresör görüntüleyicisi korunmuştur.

**Görseller:** `public/images/engine-cutaway.webp` ve ilgili diğer görseller öğretim amaçlı hazırlanmış yapay/görsel temsillerdir. Bunlar gerçek OEM/üretici CAD çizimi veya ölçüsel teknik veri değildir. Kesit görseli bir resimdir; fareyle çevrilebilen gerçek 3D model değildir. HPC panelindeki "3D" sekmesi ise mevcut Three.js tabanlı, döndürülebilen **temsili** kompresör modelini açar.

## Windows'ta çalışma

1. ZIP dosyasını klasöre çıkart (tercihen OneDrive dışında: `C:\Projects\Inside_the_Jet_Engine_v1_4`).
2. VS Code > File > Open Folder ile **`package.json` içeren klasörü** aç.
3. İlk yükleme için terminalde: `npm.cmd install`
4. Geliştirme önizlemesi: `npm.cmd run dev`
5. Masaüstü EXE oluşturmak için `CREATE_EXE_WINDOWS.bat` dosyasını aç veya `npm.cmd run desktop:dist` çalıştır.
6. Tamamlanırsa `release/` klasöründeki kurulum/portable EXE dosyasını kullan.

Node.js LTS, npm ve internet bağlantısı ilk derleme için gerekir. `release/` içindeki eski dosyaları, paketleme hatası veya erişim hatası halinde uygulamayı kapattıktan sonra temizleyebilirsin. Kurulum sonrasında kullanıcı VS Code veya Node.js yüklemek zorunda değildir.

## Değiştirilebilir kaynaklar

| Görev | Dosya |
| --- | --- |
| Ana sayfanın motor alanı, kartlar ve butonlar | `src/components/Dashboard.tsx` |
| Genel sayfa geçişleri, arama, menü, makale | `src/App.tsx` |
| Tasarım / renkler / panel boyutları | `src/styles/main.css` içindeki `1.4 — emerald` bloğu |
| İkon görseli | `public/images/app-icon.png` |
| EXE için Windows ikonu | `desktop-assets/icon.ico` |
| EXE ikon ayarı | `package.json` → `build.win.icon` |
| Komponent hiyerarşisi | `src/data/catalog.json` |
| Teknik bölüm grupları | `src/data/chapterGroups.ts` |
| Teknik açıklamalar | `content/<component-id>/<chapter-id>.tr.mdx` ve `.en.mdx` |
| Kavramsal motor ve kart görselleri | `public/images/*.webp` |

**Önemli:** Daha önce kendi bilgisayarında V1.3 makalelerini değiştirdiysen, bu ZIP bağımsız yeni bir proje klasörüdür. Eski projendeki kendi değişikliklerini yeni projeye aktarmayı unutma. Gömülü MDX içeriğini değiştirdiğinde EXE'yi yeniden derlemelisin; dağıtılmış kurulumlar otomatik değişmez.

## Derleme test durumu

`Dashboard.tsx` ve `App.tsx` kaynakları TypeScript JSX sözdizimi açısından kontrol edilmiştir, paket yapısı ve ICO içindeki çözünürlükler doğrulanmıştır. Ancak bu çalışma ortamında npm paket indirme erişimi bulunmadığından **`npm run build` ve gerçek Windows EXE derlemesi çalıştırılamadı**. EXE'yi kendi Windows bilgisayarında oluşturup kontrol etmen gerekir.
