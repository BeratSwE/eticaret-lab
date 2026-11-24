import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSepet } from '../context/SepetContext';

export default function SepetSayfasi() {
  const router = useRouter();
  const {
    sepet,
    urunSil,
    adetArtir,
    adetAzalt,
    sepetiTemizle,
    toplamTutar,
    toplamAdet,
  } = useSepet();

  function siparisiTamamla() {
    Alert.alert(
      'Sipariş Alındı',
      `${toplamAdet} adet ürün için ${toplamTutar.toLocaleString('tr-TR')} ₺ tutarındaki siparişiniz başarıyla oluşturuldu!`,
      [
        {
          text: 'Tamam',
          onPress: () => {
            sepetiTemizle();
            router.navigate('/');
          },
        },
      ]
    );
  }

  function sepetUrunuGoster({ item }) {
    return (
      <View style={styles.kart}>
        <View style={styles.resimKutu}>
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.resim}
            resizeMode="contain"
          />
        </View>
        <View style={styles.bilgiler}>
          <Text style={styles.urunAdi} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.fiyat}>
            {(item.price * item.adet).toLocaleString('tr-TR')} ₺
          </Text>
          <View style={styles.kontrolSatiri}>
            <View style={styles.adetAlani}>
              <Pressable
                style={styles.adetButon}
                onPress={() => adetAzalt(item.id)}
              >
                <Text style={styles.adetButonYazi}>-</Text>
              </Pressable>
              <Text style={styles.adet}>{item.adet}</Text>
              <Pressable
                style={styles.adetButon}
                onPress={() => adetArtir(item.id)}
              >
                <Text style={styles.adetButonYazi}>+</Text>
              </Pressable>
            </View>
            <Pressable onPress={() => urunSil(item.id)}>
              <Text style={styles.sil}>Kaldır</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={['bottom', 'left', 'right']}
    >
      <View style={styles.ustAlan}>
        <View>
          <Text style={styles.baslik}>Alışveriş Sepetim</Text>
          <Text style={styles.altBaslik}>
            Sepetteki toplam ürün: {toplamAdet} adet
          </Text>
        </View>
        {sepet.length > 0 && (
          <Pressable onPress={sepetiTemizle}>
            <Text style={styles.temizleLink}>Sepeti Boşalt</Text>
          </Pressable>
        )}
      </View>

      {sepet.length === 0 ? (
        <View style={styles.bosSepet}>
          <Text style={styles.bosYazi}>
            Sepetinizde henüz ürün bulunmuyor.
          </Text>
          <Pressable
            style={styles.alisverisButon}
            onPress={() => router.navigate('/')}
          >
            <Text style={styles.butonYazi}>Ürünleri Keşfet</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <FlatList
            data={sepet}
            keyExtractor={(item) => item.id.toString()}
            renderItem={sepetUrunuGoster}
            contentContainerStyle={styles.liste}
          />
          <View style={styles.altAlan}>
            <View style={styles.ozetSatir}>
              <Text style={styles.ozetEtiket}>Kargo Ücreti</Text>
              <Text style={styles.ucretsizYazi}>Ücretsiz</Text>
            </View>
            <View style={styles.ozetSatir}>
              <Text style={styles.toplamEtiket}>Genel Toplam</Text>
              <Text style={styles.toplam}>
                {toplamTutar.toLocaleString('tr-TR')} ₺
              </Text>
            </View>
            <Pressable
              style={styles.alisverisButon}
              onPress={siparisiTamamla}
            >
              <Text style={styles.butonYazi}>Siparişi Tamamla</Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
  },
  ustAlan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  baslik: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  altBaslik: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
  },
  temizleLink: {
    color: '#F87171',
    fontSize: 13,
    fontWeight: '600',
  },
  liste: {
    padding: 14,
  },
  kart: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  resimKutu: {
    width: 84,
    height: 84,
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 6,
    marginRight: 12,
  },
  resim: {
    width: '100%',
    height: '100%',
  },
  bilgiler: {
    flex: 1,
  },
  urunAdi: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  fiyat: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  kontrolSatiri: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adetAlani: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adetButon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#334155',
    borderRadius: 8,
  },
  adetButonYazi: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  adet: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginHorizontal: 14,
  },
  sil: {
    color: '#F87171',
    fontWeight: '600',
    fontSize: 13,
  },
  altAlan: {
    padding: 16,
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  ozetSatir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ozetEtiket: {
    color: '#94A3B8',
    fontSize: 14,
  },
  ucretsizYazi: {
    color: '#34D399',
    fontSize: 14,
    fontWeight: 'bold',
  },
  toplamEtiket: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
  },
  toplam: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#10B981',
  },
  alisverisButon: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  butonYazi: {
    color: '#052E16',
    fontWeight: 'bold',
    fontSize: 15,
  },
  bosSepet: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  bosYazi: {
    fontSize: 17,
    color: '#94A3B8',
    marginBottom: 20,
  },
});
