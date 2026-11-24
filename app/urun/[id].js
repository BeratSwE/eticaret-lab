import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Stack,
  useLocalSearchParams,
  useRouter,
} from 'expo-router';
import { useSepet } from '../../context/SepetContext';
import { URUNLER } from '../../data/urunler';

export default function UrunDetay() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { sepeteEkle } = useSepet();

  const urun = URUNLER.find((item) => item.id.toString() === String(id));

  const indirimOrani = urun?.discountPercentage || 0;
  const eskiFiyat = urun
    ? Math.round(urun.price / (1 - indirimOrani / 100))
    : 0;

  return (
    <>
      <Stack.Screen
        options={{
          title: urun ? urun.category : 'Ürün Detayı',
        }}
      />
      <SafeAreaView
        style={styles.container}
        edges={['bottom', 'left', 'right']}
      >
        {urun ? (
          <ScrollView contentContainerStyle={styles.icerik}>
            <View style={styles.resimKutu}>
              <Image
                source={{ uri: urun.thumbnail }}
                style={styles.resim}
                resizeMode="contain"
              />
            </View>

            <View style={styles.etiketSatiri}>
              <View style={styles.kategoriRozet}>
                <Text style={styles.kategoriYazi}>{urun.category}</Text>
              </View>
              <Text style={styles.puan}>★ {urun.rating} / 5.0</Text>
            </View>

            <Text style={styles.baslik}>{urun.title}</Text>

            <View style={styles.fiyatKart}>
              <View>
                {indirimOrani > 0 && (
                  <Text style={styles.eskiFiyat}>
                    {eskiFiyat.toLocaleString('tr-TR')} ₺
                  </Text>
                )}
                <Text style={styles.fiyat}>
                  {urun.price.toLocaleString('tr-TR')} ₺
                </Text>
              </View>
              {indirimOrani > 0 && (
                <View style={styles.indirimEtiket}>
                  <Text style={styles.indirimEtiketYazi}>
                    %{indirimOrani} İndirim
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.kargoKutu}>
              <Text style={styles.kargoYazi}>
                ✓ Ücretsiz Hızlı Kargo • 24 Saatte Kargoda
              </Text>
            </View>

            <Text style={styles.aciklamaBaslik}>Ürün Açıklaması</Text>
            <Text style={styles.aciklama}>{urun.description}</Text>

            <Pressable
              style={styles.buton}
              onPress={() => {
                sepeteEkle(urun);
                router.push('/sepet');
              }}
            >
              <Text style={styles.butonYazi}>Sepete Ekle ve Sepete Git</Text>
            </Pressable>
          </ScrollView>
        ) : (
          <View style={styles.mesajAlani}>
            <Text style={styles.hata}>Ürün bilgisi bulunamadı.</Text>
            <Pressable
              style={styles.buton}
              onPress={() => router.back()}
            >
              <Text style={styles.butonYazi}>Geri Dön</Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
  },
  mesajAlani: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icerik: {
    padding: 20,
    paddingBottom: 36,
  },
  resimKutu: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 18,
  },
  resim: {
    width: '100%',
    height: 230,
  },
  etiketSatiri: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  kategoriRozet: {
    backgroundColor: '#064E3B',
    borderWidth: 1,
    borderColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  kategoriYazi: {
    color: '#6EE7B7',
    fontSize: 12,
    fontWeight: 'bold',
  },
  puan: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FBBF24',
  },
  baslik: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 14,
  },
  fiyatKart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 12,
  },
  eskiFiyat: {
    fontSize: 14,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  fiyat: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
  },
  indirimEtiket: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  indirimEtiketYazi: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  kargoKutu: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E293B',
    padding: 10,
    borderRadius: 10,
    marginBottom: 18,
  },
  kargoYazi: {
    color: '#34D399',
    fontSize: 13,
    fontWeight: '600',
  },
  aciklamaBaslik: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  aciklama: {
    fontSize: 15,
    lineHeight: 24,
    color: '#CBD5E1',
    marginBottom: 26,
  },
  buton: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  butonYazi: {
    color: '#052E16',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hata: {
    fontSize: 16,
    color: '#F87171',
    textAlign: 'center',
    marginBottom: 16,
  },
});
