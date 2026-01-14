async function searchMusic() {
    const term = document.getElementById('searchInput').value;
    const list = document.getElementById('resultsList');
    if(!term) return alert("Kanka şarkı adı yazmadın!");
    
    list.innerHTML = "<p style='padding:20px; text-align:center;'>Şarkılar aranıyor, bekle kanka...</p>";

    try {
        // YouTube'un arama sayfasına gidip veri çekiyoruz
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.youtube.com/results?search_query=' + term)}`);
        const data = await response.json();
        const html = data.contents;

        // Video ID ve Başlıkları Regex ile ayıklıyoruz
        const videoIds = [...html.matchAll(/"videoId":"(.*?)"/g)].map(m => m[1]).slice(0, 10);
        
        list.innerHTML = ""; // Yükleniyor yazısını sil
        
        videoIds.forEach((id, index) => {
            list.innerHTML += `
                <div class="song-card">
                    <img src="https://img.youtube.com/vi/${id}/mqdefault.jpg">
                    <div class="song-info">
                        <p class="song-name">${term} - Kayıt ${index + 1}</p>
                        <p class="song-sub">Flowly Müzik</p>
                        <div class="action-btns">
                            <button class="btn-p" onclick="play('${id}', '${term} ${index+1}')">▶ OYNAT</button>
                            <button class="btn-m" onclick="download('${id}')">📥 İNDİR</button>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        list.innerHTML = "<p style='color:red;'>Hata oluştu kanka, tekrar dene!</p>";
    }
}

function play(id, name) {
    document.getElementById('now-playing').innerText = "🎵 Çalıyor: " + name;
    // Videoyu 0x0 boyutuyla gizli bir şekilde çalıştırıyoruz
    document.getElementById('hidden-engine').innerHTML = `<iframe width="0" height="0" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0"></iframe>`;
}

function download(id) {
    // Güvenli bir dönüştürücü üzerinden indirme başlatır
    window.open(`https://ezmp3.cc/api/convert?url=https://www.youtube.com/watch?v=${id}`, '_blank');
}
