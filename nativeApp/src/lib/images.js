const images = {
  curry: require("../../assets/curry.png"),
  uncarry: require("../../assets/uncarry.png"),
  guratan: require("../../assets/guratan.png"),
  unguratan: require("../../assets/unguratan.png"),
  gyoza: require("../../assets/gyoza.png"),
  ungyoza: require("../../assets/ungyoza.png"),
  korokke: require("../../assets/korokke.png"),
  unkorokke: require("../../assets/unkorokke.png"),
  miso: require("../../assets/miso.png"),
  unmiso: require("../../assets/unmiso.png"),
  oden: require("../../assets/oden.png"),
  unoden: require("../../assets/unoden.png"),
  pasta: require("../../assets/pasta.png"),
  unpasta: require("../../assets/unpasta.png"),
  piza: require("../../assets/piza.png"),
  unpiza: require("../../assets/unpiza.png"),
  ponchi: require("../../assets/ponchi.png"),
  unponchi: require("../../assets/unponchi.png"),
  ramen: require("../../assets/ramen.png"),
  unramen: require("../../assets/unramen.png"),
  sake: require("../../assets/sake.png"),
  unsake: require("../../assets/unsake.png"),
  tkg: require("../../assets/tkg.png"),
  untkg: require("../../assets/untkg.png"),
  unagi: require("../../assets/unagi.png"),
  ununagi: require("../../assets/ununagi.png"),
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
    locked == 1 ? "lock" : cooked == 1 ? pass2Photo : "un" + pass2Photo;
  return images[imageName];
};

export default getImageSource;
