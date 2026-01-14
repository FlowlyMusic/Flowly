package com.flowly.music;

import android.os.Bundle;
import android.widget.EditText;
import android.widget.Button;
import android.widget.ListView;
import java.util.ArrayList;

public class MainActivity extends Activity {
    
    // Uygulama içindeki elemanları tanımlıyoruz
    private EditText searchBar;
    private Button searchBtn;
    private ListView musicList;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // Ekrandaki parçaları koda bağlıyoruz
        searchBar = findViewById(R.id.search_bar);
        searchBtn = findViewById(R.id.search_btn);
        musicList = findViewById(R.id.music_list);
        
        // Butona tıklandığında ne olacağını yazıyoruz
        searchBtn.setOnClickListener(v -> {
            String sarkiAdi = searchBar.getText().toString();
            aramaMotorunuCalistir(sarkiAdi);
        });
    }
    
    private void aramaMotorunuCalistir(String query) {
        // Buraya birazdan "YouTube Extractor" kodunu ekleyeceğiz
        // Bu kısım kota harcamadan internetten şarkı getirecek
    }
}
