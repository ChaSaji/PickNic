// 半径内のランダムなポイントを生成する関数
export const getRandomPointInRadius = (latitude, longitude, radiusInMeters) => {
  const getRandomOffset = () => (Math.random() - 0.5) * 2;

  const earthRadiusInMeters = 6371000;

  const deltaLatitude =
    (radiusInMeters / earthRadiusInMeters) * (180 / Math.PI);
  const deltaLongitude = deltaLatitude / Math.cos(latitude * (Math.PI / 180));

  const randomLatitude = latitude + getRandomOffset() * deltaLatitude;
  const randomLongitude = longitude + getRandomOffset() * deltaLongitude;

  return {
    latitude: randomLatitude,
    longitude: randomLongitude,
  };
};
