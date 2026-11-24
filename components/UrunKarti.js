import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function UrunKarti({ urun, onPress, onHizliEkle }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.kart,
        pressed && styles.kartBasili,
      ]}
      onPress={onPress}
    >
      <View style={styles.resimKapsayici}>
        <Image
          source={{ uri: urun.thumbnail }}
          style={styles.resim}
          resizeMode="contain"
        />
        {urun.discountPercentage > 0 && (
          <View style={styles.indirimRozeti}>
            <Text style={styles.indirimYazi}>
              -%{urun.discountPercentage}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.bilgiler}>
        <View style={styles.ustSatir}>
          <Text style={styles.kategori}>{urun.category}</Text>
          <Text style={styles.puan}>★ {urun.rating}</Text>
        </View>

        <Text style={styles.baslik} numberOfLines={2}>
          {urun.title}
        </Text>

        <View style={styles.altSatir}>
          <Text style={styles.fiyat}>
            {urun.price.toLocaleString('tr-TR')} ₺
          </Text>

          {onHizliEkle && (
            <Pressable
              style={styles.ekleButon}
              onPress={(e) => {
                e.stopPropagation();
                onHizliEkle(urun);
              }}
            >
              <Text style={styles.ekleButonYazi}>+ Sepete</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  kart: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  kartBasili: {
    opacity: 0.9,
    borderColor: '#10B981',
  },
  resimKapsayici: {
    width: 96,
    height: 96,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 8,
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  resim: {
    width: '100%',
    height: '100%',
  },
  indirimRozeti: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  indirimYazi: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bilgiler: {
    flex: 1,
  },
  ustSatir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  kategori: {
    fontSize: 11,
    fontWeight: '700',
    color: '#34D399',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  puan: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FBBF24',
  },
  baslik: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 10,
  },
  altSatir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fiyat: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#10B981',
  },
  ekleButon: {
    backgroundColor: '#065F46',
    borderWidth: 1,
    borderColor: '#10B981',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  ekleButonYazi: {
    color: '#ECFDF5',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
