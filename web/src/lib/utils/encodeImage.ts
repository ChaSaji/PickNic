
export const encodeImage = async (file:File) => {

    // ファイルをData URL形式で読み込むためのPromiseを作成
    const dataURL = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = function(event) {
        const base64String = (event.target as FileReader).result as string;
        const dataURL = `data:image/jpeg;base64,${base64String.split(',')[1]}`;
        resolve(dataURL);
      };
  
      reader.onerror = function(error) {
        console.error('ファイルの読み込み中にエラーが発生しました', error);
        reject(error);
      };
  
      reader.readAsDataURL(file); // readAsDataURLの引数はFile型
    });
  return dataURL
};