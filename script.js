const data = async () => {
  let require = await fetch("http://127.0.0.1:5500/song/");
  console.log(await require.text());
};
data();
