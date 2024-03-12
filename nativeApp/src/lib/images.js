const images = {
  "badge.jpg": require("../../assets/badge.png"),
  "beef.jpg": require("../../assets/beef.png"),
  "carrot.jpg": require("../../assets/carrot.png"),
  "curry.jpg": require("../../assets/curry.png"),
  // "uncurry.jpg": require("../../assets/uncurry.png"),
  "onion.jpg": require("../../assets/onion.png"),
  "potate.jpg": require("../../assets/potato.png"),
  // "school.jpg": require("../../assets/school.png"),
  lock: require("../../assets/lock.png"),
};

const getImageSource = ({ pass2Photo, locked = 0, cooked = 1 }) => {
  const imageName =
    locked == 1 ? "lock" : cooked == 1 ? pass2Photo : "un" + pass2Photo;
  return images[imageName];
};

export default getImageSource;
