const images = {
  curry: require("../../assets/curry.png"),
  guratan: require("../../assets/guratan.png"),
  gyoza: require("../../assets/gyoza.png"),
  korokke: require("../../assets/korokke.png"),
  miso: require("../../assets/miso.png"),
  oden: require("../../assets/oden.png"),
  pasta: require("../../assets/pasta.png"),
  piza: require("../../assets/piza.png"),
  ponchi: require("../../assets/ponchi.png"),
  ramen: require("../../assets/ramen.png"),
  sake: require("../../assets/sake.png"),
  tkg: require("../../assets/tkg.png"),
  unagi: require("../../assets/unagi.png"),
  kyushokub: require("../../assets/kyushokub.png"),
  morningb: require("../../assets/morningb.png"),
  italyb: require("../../assets/italyb.png"),
  shizuokab: require("../../assets/shizuokab.png"),
  beef: require("../../assets/beef.png"),
  buta: require("../../assets/buta.png"),
  carrot: require("../../assets/carrot.png"),
  kiui: require("../../assets/kiui.png"),
  men: require("../../assets/men.png"),
  mikan: require("../../assets/mikan.png"),
  negi: require("../../assets/negi.png"),
  nori: require("../../assets/nori.png"),
  onion: require("../../assets/onion.png"),
  pain: require("../../assets/pain.png"),
  potato: require("../../assets/potato.png"),
  sakuranbo: require("../../assets/sakuranbo.png"),
  tamago: require("../../assets/tamago.png"),
  un: require("../../assets/un.png"),
  lock: require("../../assets/lock.png"),
};

const getImageSource = ({ pass2Photo, locked = 0, cooked = 1 }) => {
  const imageName =
    // locked == 1 ? "lock" : cooked == 1 ? pass2Photo : "un" + pass2Photo;
    locked == 1 ? "lock" : cooked == 1 ? pass2Photo : "un";
  return images[imageName];
};

export default getImageSource;
