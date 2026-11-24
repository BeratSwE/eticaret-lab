import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import UrunKarti from '../components/UrunKarti';
import { useSepet } from '../context/SepetContext';
import { KATEGORILER, URUNLER } from '../data/urunler';

export default function AnaSayfa() {
  const router = useRouter();
  const { toplamAdet, sepeteEkle } = useSepet();

  const [aramaMetni, setAramaMetni] = useState('');
  const [seciliKategori, setSeciliKategori] = useState('Tümü');

  const filtrelenmisUrunler = useMemo(() => {
    const sorgu = aramaMetni.trim().toLowerCase();

    return URUNLER.filter((urun) => {
      const kategoriUygun =
        seciliKategori === 'Tümü' || urun.category === seciliKategori;
      const aramaUygun =
        !sorgu ||
        urun.title.toLowerCase().includes(sorgu) ||
        urun.category.toLowerCase().includes(sorgu) ||
        urun.description.toLowerCase().includes(sorgu);

      return kategoriUygun && aramaUygun;
    });
  }, [aramaMetni, seciliKategori]);

  return (
    <SafeAreaView
      style={styles.container}
      edges={['bottom', 'left', 'right']}
    >
      <View style={styles.ustBanner}>
        <View style={styles.bannerMetinAlani}>
          <Text style={styles.altEtiket}>YENİ SEZON KOLEKSİYON</Text>
          <Text style={styles.baslik}>Teknoloji & Stil</Text>
        </View>
        <Pressable
          style={styles.sepetButon}
          onPress={() => router.push('/sepet')}
        >
          <Text style={styles.butonYazi}>
            Sepetim ({toplamAdet})
          </Text>
        </Pressable>
      </View>

      <View style={styles.aramaAlani}>
        <TextInput
          style={styles.aramaInput}
          placeholder="Ürün veya kategori ara (örn: MacBook, Kulaklık)..."
          placeholderTextColor="#64748B"
          value={aramaMetni}
          onChangeText={setAramaMetni}
        />
        {aramaMetni.length > 0 && (
          <Pressable
            style={styles.temizleButon}
            onPress={() => setAramaMetni('')}
          >
            <Text style={styles.temizleYazi}>✕</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.kategoriAlani}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.kategoriListe}
        >
          {KATEGORILER.map((kategori) => {
            const aktif = seciliKategori === kategori;
            return (
              <Pressable
                key={kategori}
                style={[
                  styles.kategoriChip,
                  aktif && styles.kategoriChipAktif,
                ]}
                onPress={() => setSeciliKategori(kategori)}
              >
                <Text
                  style={[
                    styles.kategoriChipYazi,
                    aktif && styles.kategoriChipYaziAktif,
                  ]}
                >
                  {kategori}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filtrelenmisUrunler}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.liste}
        ListEmptyComponent={
          <View style={styles.bosAlani}>
            <Text style={styles.bosListe}>
              Aramanıza uygun ürün bulunamadı.
            </Text>
            <Pressable
              style={styles.sifirlaButon}
              onPress={() => {
                setAramaMetni('');
                setSeciliKategori('Tümü');
              }}
            >
              <Text style={styles.butonYazi}>Filtreleri Sıfırla</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <UrunKarti
            urun={item}
            onPress={() => router.push(`/urun/${item.id}`)}
            onHizliEkle={sepeteEkle}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
  },
  ustBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  bannerMetinAlani: {
    flex: 1,
  },
  altEtiket: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
    letterSpacing: 1,
    marginBottom: 2,
  },
  baslik: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  sepetButon: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  butonYazi: {
    color: '#052E16',
    fontWeight: 'bold',
    fontSize: 14,
  },
  aramaAlani: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    position: 'relative',
    justifyContent: 'center',
  },
  aramaInput: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingRight: 40,
    paddingVertical: 11,
    fontSize: 14,
    color: '#F8FAFC',
  },
  temizleButon: {
    position: 'absolute',
    right: 28,
    top: 22,
    padding: 4,
  },
  temizleYazi: {
    color: '#94A3B8',
    fontSize: 15,
    fontWeight: 'bold',
  },
  kategoriAlani: {
    paddingBottom: 10,
  },
  kategoriListe: {
    paddingHorizontal: 16,
    gap: 8,
  },
  kategoriChip: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
  },
  kategoriChipAktif: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  kategoriChipYazi: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '600',
  },
  kategoriChipYaziAktif: {
    color: '#052E16',
    fontWeight: 'bold',
  },
  liste: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  bosAlani: {
    alignItems: 'center',
    marginTop: 40,
  },
  bosListe: {
    textAlign: 'center',
    color: '#94A3B8',
    marginBottom: 16,
    fontSize: 15,
  },
  sifirlaButon: {
    backgroundColor: '#10B981',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
