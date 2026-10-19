# V1.3 – Sadeleştirilmiş Teknik Bölümler

Bu sürümde **15 ayrı teknik bölüm düğmesi yerine 7 ana başlık** bulunuyor.

- 01 Genel bakış
- 02 Çalışma prensibi
- 03 Tasarım ve geometri
- 04 Malzemeler ve üretim
- 05 Titreşim ve güvenilirlik
- 06 Montaj ve doğrulama
- 07 Örnekler ve kaynaklar

Ana başlığa tıklayınca alt konular açılır. Her teknik metin eskisi gibi `content/<komponent-id>/<bölüm-id>.tr.mdx` ve `.en.mdx` dosyalarından okunur; **mevcut 15 makale ve bütün 140 sistem/parça girişi silinmedi**. Özel VSV ve Fixed Stator Vane alt başlıkları da kendi grupları altında korunur.

Yeni grupların adı ve hangi makalelerin altında olacağı: `src/data/chapterGroups.ts`.

Grupları gösteren React arayüzü: `src/components/ChapterNavigator.tsx`.

Renkler ve boşluklar: `src/styles/main.css` sonundaki `v1.3 Compact chapter navigator` bölümü.

Geliştirme için `npm.cmd install` ve `npm.cmd run dev`.
Windows uygulamasını güncellemek için `CREATE_EXE_WINDOWS.bat`.
Değişikliklerden sonra EXE yeniden oluşturulmalıdır; eski kurulum kendiliğinden güncellenmez.

Not: Bir gruba yeni bir bölüm eklemek istersen `chapterGroups.ts` içindeki `ids` dizisine MDX dosyanın `chapter id` değerini ekle. Liste dışındaki yeni bölümler kaybolmasın diye otomatik olarak "Diğer konular" grubunda görünür.
