# Inside the Jet Engine — Windows Masaüstü (Electron) v1.1

Bu sürüm, önceki React + TypeScript + MDX + Three.js projesinin **masaüstü uygulaması olarak paketlenebilen** sürümüdür. Henüz ZIP'in içinde hazır bir `.exe` yoktur: **Windows üzerinde bir defa derleyerek üretirsin.** Diğer kişiler senin oluşturacağın `.exe` dosyasını çalıştırdığında VS Code, npm veya Node.js kurmaz.

## HIZLI YOL: Windows .exe oluştur

1. ZIP dosyasını indir → sağ tıkla → **Tümünü Ayıkla**.
2. [Node.js LTS](https://nodejs.org/) yüklü olmalı. Kurulumdan sonra VS Code'u yeniden başlat.
3. Çıkarttığın klasörde **`CREATE_EXE_WINDOWS.bat`** dosyasına çift tıkla. Bu dosya 3 adımı gerçekleştirir: `npm.cmd install`, `npm.cmd run build`, `electron-builder --win --x64`.
4. İşlem başarılı olunca **`release/`** klasöründe iki farklı `.exe` oluşur:
   - `Inside the Jet Engine Setup ... .exe`: Başlat menüsü ve masaüstü kısayolu oluşturan kurulum dosyası.
   - `Inside the Jet Engine ... .exe`: Kurulum gerektirmeyen taşınabilir **portable** sürüm.
5. Kendi bilgisayarında dene, ardından istediğin kişiye kurulum veya portable `.exe` dosyasını verebilirsin. Çift tıklayarak açarlar.

**Elle yapmak istersen:** VS Code'da `package.json` dosyasının bulunduğu klasörü aç, terminale sırayla:

```powershell
npm.cmd install
npm.cmd run desktop:dist
```

Geliştirici olarak React masaüstü penceresinde canlı düzenleme:

```powershell
npm.cmd run desktop:dev
```

Bu komut Vite sunucusunu açar, ardından Electron penceresini açar. İçerikteki değişiklikler geliştirme penceresine yansır.

**Önemli:** ZIP içindeki `index.html` dosyasına çift tıklayıp masaüstü uygulaması oluşturamazsın. `CREATE_EXE_WINDOWS.bat` Windows'ta çalıştırılmalıdır; Windows `.exe` burada Linux ortamında üretilmedi.

## Kendi içeriğini düzenleme

- `content/fixed-stator-vane/overview.tr.mdx`: Fixed Stator Vane Türkçe genel bakış.
- `content/variable-stator-vane/materials.en.mdx`: VSV İngilizce malzeme bölümü.
- `src/data/catalog.json`: Komponent ağacı / konu isimleri / teknik referanslar.
- `public/images/`: Kendin hazırladığın veya lisanslı görseller.
- `public/models/`: İleride kullanacağın 3D `.glb` modelleri.
- `src/App.tsx`, `src/components/` ve `src/styles/main.css`: Arayüz ve etkileşimler.
- `electron/main.cjs`: Windows uygulama penceresi ve paketlenmiş sayfaların yüklenmesi.

**Yayınlanmış EXE içeriği sabittir.** MDX makale/teknik çizim değiştirdikten sonra `CREATE_EXE_WINDOWS.bat` ile yeniden derlemeli ve kullanıcıya yeni `.exe` dosyasını göndermelisin. Uygulamanın içine gömülü bir yazı editörü veya otomatik güncelleme sistemi bu sürümde yoktur.

React/Vite/TypeScript/MDX, uygulama hazırlanırken kullanılır; kullanıcıda yüklü olmaları gerekmez. Electron uygulama ile birlikte gerekli masaüstü çalışma ortamını paketler. Uygulama içindeki 3D demonstrasyon ve gömülü MDX makaleler internet olmadan görüntülenebilir; haricî kaynak linkleri için internet gerekir.

## Bilinmesi gerekenler

- İlk `npm.cmd install` ve EXE paketi oluşturulurken internete ihtiyaç vardır.
- Bu ZIP proje kaynak kodlarıdır. Oluşacak EXE **denetlenmedi / Windows'ta test edilmedi**; Windows'ta son kontrol kullanıcı tarafından yapılmalıdır.
- Microsoft Defender SmartScreen, imzalanmamış EXE dosyaları için güvenlik uyarısı gösterebilir. Geniş çaplı dağıtım öncesi kod imzalama düşünülmeli. Güvenlik uyarısını körlemesine geçmeyi kimseye önermeyin.
- Electron ile hazırlanmış uygulamalar tek bir küçük dosyadan ibaret değildir; portable exe boyutu büyük olabilir.
- İleride yönetim paneli, içeriklerin EXE yeniden oluşturmadan güncellenmesi ve otomatik update sistemi eklenebilir.
- Windows x64 için yapılandırılmıştır. ARM64 veya macOS sürümü ayrıca ayarlanmalıdır.
- Mevcut eski projende makaleleri düzenlediysen, bu yeni sürümdeki `content/` dosyalarına son değişikliklerini aktar. Bu paket, daha önce paylaşılan React v1.0 temel alınarak hazırlanmıştır.

## Teknik mimari

```
React + TypeScript + MDX + Three.js
             ↓ vite build
       dist/ (statik web)
             ↓ Electron (izole Chromium penceresi)
       electron-builder
             ↓
       release/*.exe
```

### Güvenlik

Electron uygulaması yerel `app://desktop` protokolüyle paketli dosyaları sunar. `nodeIntegration=false`, `contextIsolation=true`, `sandbox=true` ve dış URL kontrolü kullanılır. Uygulama üretim modunda uzaktan JavaScript çekmez; haricî güvenli bağlantılar sistem tarayıcısında açılır. Kod güvenliği, güncelleme ve dağıtım süreçleri yine ayrıca değerlendirilmelidir.

---
**v1.2 EK:** Uygulama artık bütün motor için genişletilmiş navigasyon ağacı içerir. Başlamak için `README_FULL_ENGINE_TR.md` dosyasını okuyun.
